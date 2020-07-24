/*global chrome*/

import React, {useEffect} from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Tree, minimalTheme } from 'react-lazy-paginated-tree';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import ListItem from '@material-ui/core/ListItem';

import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme } from "@material-ui/core/styles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import GoogleDriveTreeControl from './GoogleDriveTreeControl';


const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});


var googleDriveTreeNodes;

  
const SelectGoogleDriveResourceDialog = ({open, setOpen}) => {  
  const classes = useStyles();
  const [selectionInfo, setSelectionInfo] = React.useState(null);
 
    const onCancel = () => {
      setOpen(false);
  }
    
  const onSelectionChanged = (selectionInfo) => {
    console.log(`onSelectionChanged: ${JSON.stringify(selectionInfo)}`);
    setSelectionInfo(selectionInfo);
  }
  
  return (
    <Dialog maxWidth="lg" open={open}  aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Select a Notes Template File</DialogTitle>
      <DialogContent>
        <FormControl size="small" margin="dense">
          <GoogleDriveTreeControl id="1" name="Applications" open={open} onSelectionChanged={onSelectionChanged}/>
        
        </FormControl>
      </DialogContent>
  
      <DialogActions>
        <Button  onClick={onCancel} color="primary">Cancel</Button>
        <Button onClick={onCancel} disabled={!!!selectionInfo} color="primary">Select</Button>
      </DialogActions>
    </Dialog>
  );
}





export default SelectGoogleDriveResourceDialog;
