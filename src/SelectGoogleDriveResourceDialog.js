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
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
 
  /*
  useEffect(() => {
    async function initializeTreeNodes() {
      console.log(`useEffect 1`);
      if(open && !isTreeInitialized) {
        googleDriveTreeNodes = [];
        console.log(`useEffect 2`);
        const filesList = await listGoogleDrive();
        console.log(`useEffect 3: ${filesList}`);
        filesListToTreeNodes(filesList);
        setTreeInitialized(true);
      } else if (!open) {
        // Invalidate the nodes when the component is hidden
        // Perhaps optimize and support explicit refresh later
        setTreeInitialized(false);
      }
    }

    initializeTreeNodes()
  })

  const filesListToTreeNodes = (filesList) => {
    console.log(`filesListToTreeNodes 1`);
    filesList.forEach(file => {
      googleDriveTreeNodes.push({
        id: file.id,
        name: file.name,
        description: '',
        children: [],
        numChildren: file.mimeType === "application/vnd.google-apps.folder"?1:0,
        page: 0,
        expanded: false,
        selected: false,
      }

      );
    });

    console.log(`filesListToTreeNodes 2: ${JSON.stringify(lazySample)}`);


    console.log(`filesListToTreeNodes 3: ${JSON.stringify(googleDriveTreeNodes)}`);
    console.log(`filesListToTreeNodes 4: ${JSON.stringify(lazySample)}`);
    JSON.parse(JSON.stringify(lazySample));
    
    console.log(`filesListToTreeNodes 5`);
    
    JSON.parse(JSON.stringify(googleDriveTreeNodes));

    console.log(`filesListToTreeNodes 6`);
  }
*/
  const onCancel = () => {
      setOpen(false);
  }
    
  const handleToggle = (event, nodeIds) => {
    if (event.target.closest(".MuiTreeItem-iconContainer")) {
      setExpanded(nodeIds);
    }
  };

  const handleSelect= (_, newSelected) => {
    if (selected === newSelected) {
      console.log(`unselected: ${JSON.stringify(newSelected)}`);
      setSelected("");
    } else {
      console.log(`selected: ${newSelected}`);
      setSelected(newSelected);
    }
  }
    
  return (
    <Dialog maxWidth="lg" open={open}  aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Select a Notes Template File</DialogTitle>
      <DialogContent>
        <FormControl size="small" margin="dense">
          <GoogleDriveTreeControl id="1" name="Applications" open={open} />
        {/*<TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
        <TreeItem nodeId="3" label="Chrome" />
        <TreeItem nodeId="4" label="Webstorm" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="6" label="Material-UI">
          <TreeItem nodeId="7" label="src">
            <TreeItem nodeId="8" label="index.js" />
            <TreeItem nodeId="9" label="tree-view.js" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeView>*/}
        </FormControl>
      </DialogContent>
  
      <DialogActions>
        <Button  onClick={onCancel} color="primary">Cancel</Button>
        <Button onClick={onCancel} color="primary">Select</Button>
      </DialogActions>
    </Dialog>
  );
}

const listGoogleDrive = () => {
    return new Promise(
    (resolve, reject) => {
      chrome.runtime.sendMessage(
        {
          type: "listGoogleDrive",
          listParams: {
            orderBy:"folder, name",
            q:"'root' in parents and trashed=false",
            pageSize: 10,
            fields: "nextPageToken, files(id, name, mimeType)"
          }
        }, 
        response => {
            console.log(`listGoogleDrive response: ${JSON.stringify(response)}`);
            
            if(response.filesList) {
              resolve(response.filesList);
            } else {
              const errors = response.errors;
              console.log(`listGoogleDrive errors: ${errors}`);
              reject(errors);
            }
            resolve(response);
        }
      )  
    }
  );
}

export default SelectGoogleDriveResourceDialog;
