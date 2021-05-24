import * as firebase from 'firebase/app';
import 'firebase/storage';

/**
 * This class is used to simplify the interaction between the UI and cloud storage.
 */
export default class StorageManager {
  static instance;

  /**
   * Get an instance of StorageManager.
   * @returns {StorageManager}
   *  Instance of StorageManager
   */
  static getInstance() {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  constructor() {
    if (StorageManager.instance) {
      throw new Error('StorageManager is a singleton class');
    }

    this.storage = firebase.storage();
  }

  /**
   * Get a list of file names for the given participant's filepath.
   * @param {string} filepath The path to the applicant's folder in the Cloud Storage
   * @param {onSuccess?: () => void} onSuccess The callback function to call when the files references are obtained.
   * @param {onError?: () => void} onError The callback function for when an error occurs.
   */
  getListFiles(filepath, onSuccess, onError){
    // Find all the prefixes and items.
    let fileList = [];
    this.storage.ref().child(filepath).listAll().then((res) => {
      res.items.forEach(itemRef => {
          fileList.push(itemRef.name);
      });
      onSuccess(fileList);
    }).catch((error) => {
      console.log(error);
      onError();
    });
    
  }

  /**
   * Download a file from Firebase. CORS must be setup for the Firebase.
   * @param {string} filepath The path to the folder in the Cloud Storage.
   * @param {string} filename The name of the file in the Cloud Storage.
   */
  downloadFile(filepath, filename){
    //Get a download URL for the specified file.
    this.storage.ref().child(`${filepath}/${filename}`).getDownloadURL()
            .then((url) => {
              //With the url, create an AJAX request.
              var xhr = new XMLHttpRequest();
              xhr.responseType = 'blob';
              xhr.onload = (event) => {
                //Once the file contents are obtained has finished, create an invisible download link and automatically click it to finish the download.
                var blob = xhr.response;
                let a = document.createElement('a');
                a.href = window.URL.createObjectURL(blob);
                a.setAttribute('download', filename);
                a.click();
              };
              xhr.open('GET', url);
              xhr.send();
            })
            .catch((error) => {
              console.log("Error occured while setting up download link:");
              console.log(error);
            });
  }

    /**
     * Add a file to an applicant's folder in the Cloud Storage.
     * @param {string} filepath The path to the applicant's folder.
     * @param {FileList} files The list of file objects to upload.
     * @param {onSuccess?: () => void} onSuccess Callback function for when files are successfully uploaded.
     * @param {onError?: () => void} onError Callback function for when an error occurs.
     */
    addFile(filepath, files, onSuccess, onError){
      for (let i = 0; i < files.length; i++) {
        const fileRef = this.storage.ref().child(`${filepath}/${files[i].name}`);
        fileRef.put(files[i]).then(onSuccess, onError);
      }
    }

    /**
     * Delete the specified file
     * @param {string} filepath Filepath of the file in the Cloud Storage.
     * @param {onSuccess?: () => void} onSuccess Callback function for when the file is successfully deleted.
     * @param {onError?: () => void} onError Callback function for when a failure occurs.
     */
  deleteFile = (filepath, onSuccess, onError) => {
      let fileRef = this.storage.ref().child(filepath);

      fileRef.delete().then(() => {
        onSuccess();
      }).catch((error) => {
        onError();
    })
  }
}