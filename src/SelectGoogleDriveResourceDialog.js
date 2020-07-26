/*global chrome*/

import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import GoogleDriveTreeControl from './GoogleDriveTreeControl'

  
const SelectGoogleDriveResourceDialog = ({open, setOpen, onSelectionConfirmed, title, allowFolderSelection=false, fileMimeTypes=[]}) => {  
  const [selectionInfo, setSelectionInfo] = React.useState(null);
 
  const handleCancel = () => {
      setOpen(false);
  }

  const handleSelectionConfirmed = () => {
    onSelectionConfirmed(
      {
        id: selectionInfo.id,
        name: selectionInfo.name
      }
    );
    setOpen(false);
  }
    
  const onSelectionChanged = (selectionInfo) => {
    console.log(`onSelectionChanged: ${JSON.stringify(selectionInfo)}`);
    setSelectionInfo(selectionInfo);
  }
  
  return (
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
        />
      </DialogContent>
  
      <DialogActions>
        <Button onClick={handleCancel} color="primary">Cancel</Button>
        <Button onClick={handleSelectionConfirmed} disabled={!!!selectionInfo} color="primary">Select</Button>
      </DialogActions>
    </Dialog>
  );
}





export default SelectGoogleDriveResourceDialog;
