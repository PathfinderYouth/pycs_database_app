import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import '../style/ParticipantDetailNotes.css';
import '../style/ParticipantDetailPage.css';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import { useSnackbar } from 'notistack';

const AdminBackupFiles = () => {


	const [isClicked, setClicked] = useState(false);
	const storage = firebase.storage();
	const db = firebase.firestore();
	const { enqueueSnackbar } = useSnackbar();
	const [downloadCounter, setDownloadCounter] = useState('No Download In Process'); 

	/**
	 * Code for the Mass File Download feature below
	 */
	const zipDownload = async () => {
		// Make sure that rootFolderName matches the parent folder that is declared in the component for file attachment
		const rootFolderName = "Applications";
		let storageRef = storage.ref();
		let applicationsRef = storageRef.child(rootFolderName)
		let isEmpty = true;

		setClicked(true);
		enqueueSnackbar('Your download is now being processed. Please do not leave this page while downloading.', {
			variant: 'Info',
		});


		let mostRecentPage;
		// Passing null to the pageToken is fine
		let nextPageToken = null;
		let folderRef;
		let folderPage;

		// Create the zip file
		let zip = new JSZip();

		// Putting all of the code in a function so that .then can be used on it after it's done
		const downloadFiles = async () => {
			let applicationsProcessed = 0;
			
			do {
				mostRecentPage = await applicationsRef.list({
					// Select the next 20 folders for the page
					maxResults: 50,
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



					await returnApplicantData(db, folderPage.items[0].parent.name)
						.then((arrData) => {
							processFileList(folderPage.items, zip, arrData);
						});

					if (isEmpty === true) {
						isEmpty = false;
					}

					setDownloadCounter('' + ++applicationsProcessed);
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
- If an application folder is named with "[missing]", this means the application that these files belong to is missing data.
	- e.g. if a folder is named "Doe_[missing]_JohnDoe@test.com_xSUNCPmqXr1WkN1Zb1rbt", 
		this means someone with the last name Doe and email JohnDoe@test.com is missing their first name in their application.
- If an application folder is named "[missing]_[missing]_[missing]_[Application ID]", this may be because the database has files to an application that no longer exists.
	- These files are still downloaded because the Backup feature downloads all the application files in the database.

There should be additional documentation on the proper use and storage of back-up ZIP files. 
As well as information on how to maintain the database (if that is your responsibility).  

Please refer to this documentation for a more detailed understanding of how the back-up feature is intended to be used.
Contact Ruth or an authorized adminstrator for access to this documentation.

DISCLAIMER: This ZIP file should NOT be empty. If this ZIP file is empty, please contact the 2021 BCIT Student 
developers that worked on this feature.

Back-up date (yyyy_mm_dd_HHMMSS): ${fullDate}

Author: @Brian D.
Description last edited: 2021_05_23
                  `

				if (isEmpty === false) {

					zip.file("README.txt", zipFileComment);

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
						enqueueSnackbar('Download complete!', {
							variant: 'success',
						});
						
					});
				} else {
					enqueueSnackbar('There are no applications with files attached to them. No download can be done.', {
						variant: 'error',
					});
				}
				setClicked(false);

			});
	}

	const returnApplicantData = async (db, applicationID) => {
		let applicantData;

		applicantData = await searchForApplicantData(db, "new", applicationID);
		if (applicantData === undefined) {
			applicantData = await searchForApplicantData(db, "permanent", applicationID);
			if (applicantData === undefined) {
				enqueueSnackbar('We found files to an application that no longer exists. Proceeding with download.', {
					variant: 'error',
				});
			}
		}

		return applicantData;
	}

	const searchForApplicantData = async (db, collectionName, applicationID) => {
		let applicantData;
		await db.collection(collectionName).doc(applicationID).get()
			.then(getApplicantData)
			.then((arrData) => {
				applicantData = arrData;
			})
			.catch((err) => {
				// This applicationID does not exist in the collection
			});
		return applicantData;
	}

	const getApplicantData = (doc) => {
		return new Promise((resolve, reject) => {
			if (doc.exists) {
				const data = doc.data();
				resolve([data.nameLast, data.nameGiven, data.email]);
			} else {
				// This document does not exist
				reject("This document can not be found");
			}
		})

	}



	const processFileList = async (listOfItems, zip, applicantData) => {
		const parentFolder = 'Applications';
		let storageRef = storage.ref();

		if (applicantData === undefined) {
			applicantData = ['[missing]', '[missing]', '[missing]'];
		} else {
			for (let i = 0; i < 3; i++) {
				if (applicantData[i] === undefined || applicantData[i].length == 0) {
					applicantData[i] = '[missing]';
				}
			}
		}
		// Iterate through all the items in the list
		listOfItems.forEach(async (itemRef) => {
			const content = storageRef.child(itemRef.fullPath).getDownloadURL().then(downloadUrlAsPromise);
			zip.folder(parentFolder + '/' + applicantData[0] + '_' + applicantData[1] + '_' + applicantData[2] + '_' + itemRef.parent.name).file(itemRef.name, content);
		})
	}


	const downloadUrlAsPromise = (url) => {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.responseType = "blob";
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						resolve(xhr.response);
					} else {
						reject("Unable to complete get request. Ajax error: " + xhr.statusText)
					}
				}
			}
			xhr.send();
		});

	}


	return (
		<>
			<div className="backupTextArea">

				<h1 style={{ color: 'red' }}>CAUTION!</h1>
				<h2>BACKUP will download ALL files that are currently uploaded.</h2>
				<h2>Please do not leave this page until the download has finished.</h2>
				<p>
					Inside this zip download will have all applications that have files attached to them in the format of <i style={{ color: 'blue' }}>LastName_FirstName_Email_ApplicationID</i><br></br>
        			Each of these folders contains their respective uploaded files to be accessed .
      			</p>
				<div className="participant-detail-form-contents">
					<div className="participant-files-ap-addButton">
						<Button size="large"
							color="primary"
							variant="contained"
							disabled={isClicked}
							onClick={() => {
								zipDownload();
							}} >
							Backup Files
          				</Button>
					</div>
					<h4>Applications Processed: {downloadCounter}</h4>
				</div>
			</div>
		</>
	);
};

export default AdminBackupFiles;

