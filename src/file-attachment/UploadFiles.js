import React from 'react'
import { app } from "./../base";

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

        </div>
    )
}

export default UploadFiles
