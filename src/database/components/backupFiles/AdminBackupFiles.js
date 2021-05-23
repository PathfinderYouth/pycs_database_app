import React, { useState } from 'react';

import { inject, observer } from 'mobx-react';
import Button from '@material-ui/core/Button';


import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DeleteForever, FolderSpecialSharp } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import { participantStore } from '../../../injectables';

import JSZip, { folder } from 'jszip';
import FileSaver from 'file-saver';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
const AdminBackupFiles = () => {

  const [isClicked, setClicked] = useState(false);
  const storage = firebase.storage();
  const db = firebase.firestore();

  /**
   * Code for the Mass File Download feature below
   */
  const zipDownload_t10 = async () => {
    // Make sure that rootFolderName matches the parent folder that is declared in the component for file attachment
    const rootFolderName = "Application";
    let storageRef = storage.ref();
    let applicationsRef = storageRef.child(rootFolderName)

    let mostRecentPage;
    // Passing null to the pageToken is fine
    let nextPageToken = null;
    let folderRef;
    let folderPage;

    // Create the zip file
    let zip = new JSZip();


    // Putting all of the code in a function so that .then can be used on it after it's done
    const downloadFiles = async () => {
      let x = 0;
      let db = firebase.firestore();
      

      do {
        mostRecentPage = await applicationsRef.list({
          // Select the next 20 folders for the page
          maxResults: 20,
          pageToken: nextPageToken,
        });

        // Next is to iterate over the
        for (let i = 0; i < mostRecentPage.prefixes.length; i++) {
          folderRef = storageRef.child(mostRecentPage.prefixes[i].fullPath);
          // maxResults here indicates how many files you will grab from the folder
          // It's currently set to 20 meaning only 20 files from an application will be read
          // The code is written so that it only requests files from Firebase once
          folderPage = await folderRef.list({
            maxResults: 20,
          });
          console.log("Folder page: ", folderPage);
          console.log(folderPage.items[0].parent.name);

          let applicantData = returnApplicantData(folderPage.items[0].parent.name, db);


          console.log("applicantdata before processfilelist:");
          console.log(applicantData[0]);
          // Add the files from this folder page to the zip
          processFileList_t10(folderPage.items, zip, applicantData);
          // This will print all the file names if uncommented. ENABLE LINE if you want to see files added to the database
          // printFolderList_t8(folderPage.items);
          //console.log(folderPage.items);
        }
  
        
        // Change the page token
        nextPageToken = mostRecentPage.nextPageToken;

      }
      while (nextPageToken !== undefined)
    }

    downloadFiles()
      .then(() => {
        
        let today = new Date();
        let yyyy = today.getFullYear();
        let mm = String(today.getMonth() + 1).padStart(2, "0");
        let dd = String(today.getDate()).padStart(2, "0");
        let date = yyyy + "_" + mm + "_" + dd;

        let hour = String(today.getHours()).padStart(2, "0");
        let minutes = String(today.getMinutes()).padStart(2, "0");
        let seconds = String(today.getSeconds()).padStart(2, "0");
        let time = hour + minutes + seconds;

        const fullDate = date + "_" + time;

        let zipFileComment = `
***Please ensure that you read the instructions and notes as some actions have permanent consequences.***

***The information here is confidential and should only be accessed by PYCS staff who have been given authority to access application files.***

***DO NOT share any of the information that is stored here to those unauthorized by PYCS.***

Cloud Storage back up for Pathfinder Youth Centre Socity.

How to navigate folders:
- The folder organization matches how files are stored in the Cloud Storage in Firebase
- Applications/ will hold all the folders of the applications that have files uploaded to them
- Applications/ WILL NOT contain folders for applications that do not have files uploaded to them
- The naming scheme for application folders is [Last name]_[First name]_[Email]_[Application ID]
  - Please search for the correct folder using the first three identifiers.
  - The "Application ID" is only meant for those who would like to reference the live database in Firebase


There should be additional documentation on the proper use and storage of back-up ZIP files.
Please refer to this documentation for a more detailed understanding of how the back-up feature is intended to be used.

DISCLAIMER: This ZIP file should NOT be empty. If this is empty please contact the 2021 
developers that worked on this feature.

Back-up date (yyyy_mm_dd_HHMMSS): ${fullDate}

Description last edited: 2021_05_14
                  `

        //Download the file
        zip.generateAsync({
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: {
            level: 9
          },
          comment: zipFileComment
        }).then(function (content) {
          FileSaver.saveAs(content, fullDate + ".zip");

        });
      });
  }

  const returnApplicantData = async (applicationID, db) => {
    let documentDoesNotExist = false;

    const permanentString = 'permanent';
    const newString = 'new';
    let applicantData = [];
    getApplicantData(applicationID, newString, applicantData, db, documentDoesNotExist).then(() => {
      // if (documentDoesNotExist) {
        getApplicantData(applicationID, permanentString, applicantData, db, documentDoesNotExist);
      // }
    });
    console.log("inside returnapplicantdata");
    console.log(applicantData);
    return applicantData;
  }

  const getApplicantData = async (applicationID, collectionName, applicantData, db, documentDoesNotExist) => {
    let docRef = db.collection(collectionName).doc(applicationID);
    docRef.get().then((doc) => {
      if (doc.exists) {

        // console.log("Document data:", doc.data());
        const data = doc.data();
        applicantData.push(data.nameLast);
        applicantData.push(data.nameGiven);
        applicantData.push(data.email);

      } else {
        documentDoesNotExist = true;
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

  }

  const processFileList_t10 = async (listOfItems, zip, applicantData) => {
    // let docRef = db.collection("permanent").doc(applicationID);
    // docRef.get().then((doc) => {
    //   if (doc.exists) {
    //     console.log("Document data:", doc.data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // }).catch((error) => {
    //   console.log("Error getting document:", error);
    // });
    // Create a storage reference
    const parentFolder = 'Applications';
    let storageRef = storage.ref();
    
    console.log("procesfilelist applicantdata:");
    console.log(applicantData);

    // Iterate through all the items in the list
    listOfItems.forEach(async (itemRef) => {
      const content = storageRef.child(itemRef.fullPath).getDownloadURL().then(downloadUrlAsPromise_t10);
      zip.folder(parentFolder + '/' + applicantData[0] + '_' + applicantData[1] + '_' + applicantData[2] + '_' + itemRef.parent.name).file(itemRef.name, content);
      // console.log("itemRef.parent.name = ", itemRef.parent.name);
    })
  }


  const downloadUrlAsPromise_t10 = (url) => {

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = "blob";
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(new Error("Ajax error for " + url + ": " + xhr.status));
          }
        }
      }
      xhr.send();
    });
  
  }


  return (
    <>
      <div className="participant-detail-form-contents">
        <div className="participant-files-ap-addButton">
          <Button size="large"
            color="primary"
            variant="contained"
            disabled={isClicked}
            onClick={() => {
              // let db = firebase.firestore();
              // let docRef = db.collection("permanent").doc("QVi1Y73y0aj9sbeIHKKp");
              // docRef.get().then((doc) => {
              //   if (doc.exists) {
              //     console.log("Document data:", doc.data());
              //     console.log(doc.data().nameGiven);
              //     console.log(doc.data().nameLast);
              //     console.log(doc.data().email);
              //   } else {
              //     // doc.data() will be undefined in this case
              //     console.log("No such document!");
              //   }
              // }).catch((error) => {
              //   console.log("Error getting document:", error);
              // });
              zipDownload_t10();
              // returnApplicantData("QVi1Y73y0aj9sbeIHKKp");
            }} >
            Backup Files
          </Button>
        </div>
      </div>
    </>
  );
};



export default AdminBackupFiles;

