import React from 'react'
import { app } from "../base";

// Imports need for to download ZIPs
import JSZip, { folder } from 'jszip';
import FileSaver from 'file-saver';

/*
    Updated: 2021 04 17
    Authors: @Brian Duong(2021 Group 2)

    README:

    Required: 
    1. Cloud Storage for Firebase has been setup.
    2. app refers to a firebase config in a base.js file. Make sure to export firebase.initializeApp(config) as app.

    Incomplete file upload feature for PYCS.

    Description:
    This component will allow you to upload files to the selected Firebase Cloud Storage.

    Multiple files can be uploaded. Click on the path button to show the files that are in the database.
    Click on the file names to download them. Click on their respective delete buttons to remove them from the database.

    Notes:
    The first goal was to make this feature useable. Everything is bare bones and doesn't adhere to well written code. 
    I wanted to use States to update the page when a file was uploaded.

    The filepath is being passed as a string parameter, but for future iterations the filepath should be stored as a state. The state would
    then be changed based on the ID of the application.

    The filepath of which we planned to store the files is Application/[applicationID].
    applicationID would be taken from the application's record in the database.

    Demo:
    https://youtu.be/Dbj_rWfIMFI
    A video demonstrating the use of the feature.


    Final remarks:
    If there are any concerns please contact @bduong4 on Github. (Please specify who you are and reason for contacting)

    Try your best

*/

const UploadFiles = () => {


    /**
     * The submit button for the files.
     */
    const onSubmit = () => {
        let files = document.getElementById("inputUpload").files;
        console.log(files.length);
        const storageRef = app.storage().ref();
        console.log("Uploading these files:")

        // Change filepath to change the directory of where the files will be saved in the Cloud Storage
        let filepath = "/Applications/User1";

        for (let i = 0; i < files.length; i++) {
            console.log("Uploaded: " + files[i].name);
            const fileRef = storageRef.child(filepath + "/" + files[i].name);
            fileRef.put(files[i]);
        }
    }





    // Add an li element to the ul tag and make it download files on click.
    /**
     * Adds a clickable li tag to to the specified ul tag on the webpage
     * @param {string} filepath Filepath of the files in the Cloud Storage
     * @param {string} filename Filename in the Cloud Storage
     */
    const addDownload = (filepath, filename) => {
        let storageRef = app.storage().ref();
        let fullDBFilePath = filepath + "/" + filename;

        // The ul tag that will have li tags appended to it.
        let ulListing = document.getElementById("listing");
        ulListing.innerHTML = "";


        storageRef.child(fullDBFilePath).getDownloadURL()
            .then((url) => {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    var blob = xhr.response;
                    let a = document.createElement('a');
                    let linkText = document.createTextNode(filename);
                    a.appendChild(linkText);
                    a.title = "Download file: " + filename;
                    a.href = window.URL.createObjectURL(blob);

                    a.setAttribute('download', filename);
                    a.setAttribute('id', filename);

                    let temp_li = document.createElement("li");
                    temp_li.appendChild(a);
                    ulListing.appendChild(temp_li);


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
     * List all the files of this specific filepath
     * @param {string} filepath Filepath of the files in the Cloud Storage
     */
    const onList = (filepath) => {

        let storageRef = app.storage().ref();
        let listRef = storageRef.child(filepath);

        let ulListing = document.getElementById("listing");
        ulListing.innerHTML = "";

        // Find all the prefixes and items.
        listRef.listAll()
            .then((res) => {

                console.log("Retriving files from path " + filepath + ":")
                res.items.forEach((itemRef) => {
                    console.log(itemRef["name"]);

                    addDownload(filepath, itemRef['name']);
                });
            }).catch((error) => {
                console.log("Error occured while listing file from database:");
                console.log(error);
            });
    }

    /**
     * Delete the specified file
     * @param {string} filepath Filepath of the file in the Cloud Storage
     * @param {string} filename Filename of the file to be deleted
     */
    const deleteFile = (filepath, filename) => {
        let storageRef = app.storage().ref();
        let fileRef = storageRef.child(filepath + "/" + filename);

        fileRef.delete().then(() => {
            console.log("File successfully deleted: " + filename);

        }).catch((error) => {
            console.log("Error while deleting file: " + filename);
            console.log(error);
        })


    }

    /**
     * Add delete buttons for the corresponding files in the filepath
     * @param {string} filepath Filepath of the files in the Cloud Storage
     */
    const addDeleteButton = (filepath) => {
        let storageRef = app.storage().ref();
        let listRef = storageRef.child(filepath);

        let ulDeletes = document.getElementById("deletes");
        ulDeletes.innerHTML = "";

        listRef.listAll()
            .then((res) => {
                console.log("Now adding buttons from the path: " + filepath + ".");
                res.items.forEach((itemRef) => {
                    let filename = itemRef["name"];
                    console.log(filename);

                    let temp_li = document.createElement("li");
                    temp_li.setAttribute("style", "list-style-type:none");
                    let button = document.createElement("button");
                    temp_li.append(button);
                    button.textContent = "Delete " + filename;

                    button.onclick = () => {
                        const confirmBox = window.confirm(
                            "Do you want to delete: " + filename + "?"
                        )
                        if (confirmBox) {
                            deleteFile(filepath, filename);
                        }
                    }

                    ulDeletes.appendChild(temp_li);



                })
            })

    }

    /**
     * Code for the Mass File Download feature below
     */


    const zipDownload_t10 = async () => {
        // Make sure that rootFolderName matches the parent folder that is declared in the component for file attachment
        const rootFolderName = "Applications";
        let storageRef = app.storage().ref();
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

                    // Add the files from this folder page to the zip
                    processFileList_t10(folderPage.items, zip);
                    // This will print all the file names if uncommented. ENABLE LINE if you want to see files added to the database
                    // printFolderList_t8(folderPage.items);
                }
                // Change the page token
                nextPageToken = mostRecentPage.nextPageToken;
            }
            while (nextPageToken !== null)
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

                // Download the file
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

    const processFileList_t10 = async (listOfItems, zip) => {
        // Create a storage reference
        let storageRef = app.storage().ref();

        // Iterate through all the items in the list
        listOfItems.forEach(async (itemRef) => {
            const content = storageRef.child(itemRef.fullPath).getDownloadURL().then(downloadUrlAsPromise_t10);
            zip.folder(itemRef.parent.fullPath).file(itemRef.name, content);
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

    /**
     * Added for visiblity during the demo.
     * This serves no purpose. Styling should match the webapplication from group 1 developers.
     */
    const divStyle = {
        border: "2px solid #73AD21",
        padding: "20px",
        width: "200px",
        height: "150px"
    }

    return (
        <div>
            <div style={divStyle}>
                <input id="inputUpload" type="file" multiple />
                <br></br>
                <button onClick={onSubmit} >Submit</button>
                <br />
            </div>

            <br />
            <button onClick={() => {
                onList("/Applications/User1");
                addDeleteButton("/Applications/User1");
            }}>/Applications/User1</button>

            <div >
                <ul id="listing"></ul>
                <ul id="deletes"></ul>
            </div>
            <br />

            <div>
                <p>Test for ZIP download</p>
                <button onClick={zipDownload_t10}>zipDownload_t10 (Last iteration, Download should work, has compression LvL 9, proper file naming)</button>

            </div>

        </div>
    )
}

export default UploadFiles
