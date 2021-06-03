/*global chrome*/

import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorsDialog from './ErrorsDialog.js'


import GoogleDriveTreeControl from './GoogleDriveTreeControl'

  
const SelectGoogleDriveResourceDialog = ({open, setOpen, onSelectionConfirmed, title, allowFolderSelection=false, fileMimeTypes=[]}) => {  
  const [selectionInfo, setSelectionInfo] = React.useState(null);
  const [errors, setErrors] = React.useState([]);
 
  const handleCancel = () => {
      setOpen(false);
  }

  const handleSelectionConfirmed = () => {
    onSelectionConfirmed(
      selectionInfo
    );
    setOpen(false);
  }
    
  const onSelectionChanged = (selectionInfo) => {
    console.log(`onSelectionChanged: ${JSON.stringify(selectionInfo)}`);
    setSelectionInfo(selectionInfo);
  }
  
  const handleErrors = (errors) => {
    console.log(`SelectGoogleDriveResourceDialog: errors: ${errors.toString()}`);  

    /*errors.map(
      error=> {
        console.log(`SelectGoogleDriveResourceDialog: error: ${error.toString()}`);
      }
    );*/


    setErrors([{message:"Error reading drive"}]);
  }

  const handleErrorsDialogClose = () => {
    setOpen(false);
    setErrors([]);
  }

  return (
    <div>
      <ErrorsDialog open={errors.length != 0} title="Error Selecting From Google Drive" errors={errors} onClose={handleErrorsDialogClose}/>

      <Dialog maxWidth="lg" open={open}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>

        <DialogContent>
          <GoogleDriveTreeControl
            id="1" 
            name="Applications" 
            open={open} 
            onSelectionChanged={onSelectionChanged} 
            allowFolderSelection={allowFolderSelection} 
            fileMimeTypes={fileMimeTypes}
            onErrors={handleErrors}
          />
        </DialogContent>
    
        <DialogActions>
          <Button onClick={handleCancel} color="primary">Cancel</Button>
          <Button onClick={handleSelectionConfirmed} disabled={!!!selectionInfo} color="primary">Select</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}





export default SelectGoogleDriveResourceDialog;
