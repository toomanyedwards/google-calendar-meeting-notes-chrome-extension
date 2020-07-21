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



const useStyles = makeStyles({
    root: {
      '& p': {
        margin: 0,
      },
    },
  });

const MyListItem = (props) => {
    const classes = useStyles();

    return (
        <ListItem className={classes.root} dense={true} {...props}/>
    );
  
}

const lazySample = [
    {
      id: 1,
      name: '2017',
      description: 'Last Year',
      children: [],
      page: 0,
      numChildren: 5,
      expanded: false,
      selected: false,
    },
    {
      id: 5,
      name: '2018',
      description: 'Current Year',
      children: [],
      page: 0,
      numChildren: 5,
      expanded: false,
      selected: false,
    },
  ]

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const loadChildrenPaginated = async (node, pageLimit = 5) => {
    await sleep(500);
    const children = [];
    for (let i = 0; i < pageLimit; i += 1) {
      children.push({
        id: i * node.page,
        name: `${node.name}${i + (node.page - 1) * pageLimit}`,
        description: '',
        children: [],
        numChildren: pageLimit * 3,
        page: 0,
        expanded: false,
        selected: false,
      });
    }
    return children;
  };
  
const SelectGoogleDriveResourceDialog = ({gapi, open, setOpen}) => {  
  const [areNodesLoaded, setNodesLoaded] = React.useState(false);
  var treeNodes;

  useEffect(() => {
    async function listGoogleDrive() {
      console.log(`useEffect 1`)
      if(open && !areNodesLoaded) {
        console.log(`useEffect 2`)
        await sleep(5000);
        console.log(`useEffect 3`)
      
        setNodesLoaded(true);
      } else if (!open) {
        setNodesLoaded(false);
      }
    }

    listGoogleDrive()
  })
  /*nodes={JSON.parse(JSON.stringify(lazySample))}*/

  const onCancel = () => {
      setOpen(false);
  }
    

  const getNodes = (open) => {
    console.log(`getNodes1: open: Foo${open}`);
    return JSON.parse(JSON.stringify(lazySample));
  }
    return (
      
        <Dialog maxWidth="lg" open={open}  aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Select a Notes Template File</DialogTitle>
            <DialogContent>
                <FormControl size="small" margin="dense">
                { areNodesLoaded? 
                  <Tree
                  nodes={JSON.parse(JSON.stringify(lazySample))}
                      id="tree"
                      loadChildren={loadChildrenPaginated}
                      pageLimit={3}
                      theme={minimalTheme}
                      paginated
                      useLocalState
                      Checkbox={() => false}
                      ListItem={MyListItem}
                  />:
                  <div/>
                }
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
            orderBy:"name",
            q:"'root' in parents and trashed=false",
            'pageSize': 10,
            'fields': "nextPageToken, files(id, name, mimeType, trashed)"
          }
        }, 
        response => {
            console.log(`listGoogleDrive response: ${JSON.stringify(response)}`);
            
            if(response.result.files) {
              resolve(response);
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
