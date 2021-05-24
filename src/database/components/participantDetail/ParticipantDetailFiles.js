import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { inject, observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DeleteForever } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import { participantStore } from '../../../injectables';
import service from '../../../facade/service';
import '../style/ParticipantDetailFiles.css';
import '../style/ParticipantDetailPage.css';


/**
 * Participant files page component that utilizes the specialized fileField
 * @param {string} user userID (display name or email)
 */
export const ParticipantDetailFiles = inject('participantStore')(
  observer(({ user }) => {
    const { currentParticipant, setCurrentParticipant } = participantStore;
    const [newFileName, setNewFileName] = useState('');
    const [newFile, setNewFile] = useState(null);
    const [files, setFiles] = useState(null);
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    // if currentParticipant is defined, extract the name, status, and get the storage path, else leave undefined
    let participantName;

    if (!!currentParticipant) {
      const {
        nameLast,
        nameGiven
      } = currentParticipant;
      participantName = nameLast !== '' ? `${nameGiven} ${nameLast}` : undefined;
    }
    
    let storagePath = `Application/${currentParticipant.id}`;

    let storagePath = `Applications/${currentParticipant.id}`;

    /**
     * OnChange handler for file field
     * @param {Object} event
     */
    const handleChange = ({ target: { value, files } }) => {
      if (value !== '') {
        setError(false);
      }
      setNewFileName(value);
      setNewFile(files);
    };

    /**
     * OnSubmit handler for file field
     * @param {Object} values form values object
     */
    const handleFileSubmit = () => {
      const storage = service.getStorage();
        storage.addFile(
          storagePath,
          newFile,
          () => {
            enqueueSnackbar('File added.', {
              variant: 'success',
            });
            setNewFileName('');
            setNewFile(null);
            setSubmitting(false);
            setFiles(null);
          },
          () => {
            enqueueSnackbar('There was a problem adding the file.', {
              variant: 'error',
            });
            setSubmitting(false);
          },
        )
    }

    /**
     * Creates a file object. If the files field is empty, show an error message, if not, create a files
     * object with the file text, timestamp, and username.
     */
    const addFile = () => {
      if (newFileName === '') {
        setError(true);
      } else {
        if (window.confirm('Add new file?')) {
          setSubmitting(true);
          handleFileSubmit();
        }
      }
    };

    const getFiles = (filepath) => {
      const storage = service.getStorage();
      storage.getListFiles(
        filepath,
        (list)=>{
          setFiles(list);
        },
        () => {
          enqueueSnackbar('There was a problem getting the files.', {
            variant: 'error',
          });
          setFiles([]);
        }
      );
    }

    const handleDelete = (filename, index) => {
      const storage = service.getStorage();
      if(window.confirm("Permanently delete this file?")){
        storage.deleteFile(
          `${storagePath}/${filename}`,
          ()=>{
            enqueueSnackbar("File deleted.", {
              variant: 'success'
            });
            let newFiles = files;
            newFiles.splice(index, 1);
            setFiles([...newFiles]);
          }
        );
      }
    }

    const downloadFile = (filename) => {
      const storage = service.getStorage();
      storage.downloadFile(storagePath, filename);
    }

    return (
      <>
        <div className="participant-detail-header">
          <div className="participant-detail-header-text">
            <Typography variant="h6">{`Participant Files`}</Typography>
            <Typography variant="h5">{participantName}</Typography>
          </div>
        </div>
        <FormControl component="fieldset" fullWidth>
          <div className="participant-detail-form-contents">
          <TextField
              value={newFileName}
              onChange={handleChange}
              type="file"
              error={error}
              helperText={error && 'Please select a file'}
              InputProps={{disableUnderline:true}}
            />
            <div className="participant-files-ap-addButton">
              <Button
                color="primary"
                variant="contained"
                disabled={isSubmitting}
                onClick={() => addFile()}
              >
                Add File
              </Button>
            </div>
              <div className="field-files-historyContainer">
              {!!files ? (
                files.length > 0 ?
                  files.map((name, index) => {
                    return (
                      <div key={`file-${index}`}>
                        <div className="field-files-fileContainer">
                          <div className="field-files-fileBody">
                            <Typography variant="body1">
                                <Button size="large" onClick={()=>downloadFile(name)}>
                                  <Typography color="primary" variant="body1">
                                    {name}
                                  </Typography>
                                </Button>
                              <Tooltip title="Delete" aria-label="delete">
                                <IconButton onClick={() => handleDelete(name, index)}>
                                  <DeleteForever color="error"/>
                                </IconButton>
                              </Tooltip>
                            </Typography>
                          </div>
                        </div>
                      {index !== files.length - 1 && <Divider />}
                    </div>
                    );
                  }) : (
                    <div className="field-files-emptyHistory">
                      <Typography variant="body2" color="textSecondary">
                        No files to display
                      </Typography>
                    </div>
                  )
              ) : (
                <div>
                  <CircularProgress color="primary" />
                  {getFiles(storagePath)}
                </div>
              )}
            </div>
          </div>
        </FormControl>
      </>
    );
  }),
);
