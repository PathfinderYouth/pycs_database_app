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
   * 
   * @param {string} filepath The path to the file in the Cloud Storage. 
   */
  getDownload(filepath){
    this.storage.ref().child(filepath).getDownloadURL().then((url) => {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
            let blob = xhr.response;
            return window.URL.createObjectURL(blob);
        };
        xhr.open('GET', url);
        xhr.send();

    }).catch((error) => {
        console.log("Error occured while setting up download link");
        console.log(error);
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
}