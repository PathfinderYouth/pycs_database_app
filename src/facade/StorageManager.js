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
   * Get a list of file names for the given participant
   * @param {string} filepath 
   */
  getListFiles(filepath, onSuccess, onError){
    // Find all the prefixes and items.
    let promises = [];
    this.storage.ref().child(filepath).listAll().then((res) => {
      res.items.forEach(itemRef => {
        promises.push(new Promise((res, rej) =>{
          let fileItem = {};
          fileItem.name = itemRef.name;
          itemRef.getDownloadURL().then(url => {
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
              fileItem.href = window.URL.createObjectURL(xhr.response);
              res(fileItem);
            }
            xhr.open('GET', url);
            xhr.send();
          })
        }));
      });
      Promise.all(promises).then((fileList)=>onSuccess(fileList),onError);
    }).catch((error) => {
        onError();
    });
    
  }

  /**
   * Get a download URL for the specified file.
   * @param {string} filepath The path to the file in the Cloud Storage. 
   */
  getDownload(filepath, onSuccess, onError){
    this.storage.ref().child(filepath).getDownloadURL().then((url) => {
      console.log(url);
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
          onSuccess(window.URL.createObjectURL(xhr.response));
      };
      xhr.open('GET', url);
      xhr.send();
    }).catch((error) => {
        onError();
    });
  }

    /**
     * 
     * @param {string} filepath 
     * @param {FileList} files 
     * @param {onSuccess?: () => void} onSuccess 
     * @param {onError?: () => void} onError 
     */
    addFile(filepath, files, onSuccess, onError){
      for (let i = 0; i < files.length; i++) {
        const fileRef = this.storage.ref().child(`${filepath}/${files[i].name}`);
        fileRef.put(files[i]).then(onSuccess, onError);
      }
    }

    /**
     * Delete the specified file
     * @param {string} filepath Filepath of the file in the Cloud Storage
     * @param {onSuccess?: () => void} onSuccess 
     * @param {onError?: () => void} onError 
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