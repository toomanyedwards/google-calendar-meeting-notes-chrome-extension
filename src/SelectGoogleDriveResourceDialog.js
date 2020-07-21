import React from 'react';

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
    const onCancel = () => {
        setOpen(false);
    }
    
    return (
        <Dialog maxWidth="lg" open={open}  aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Select a Notes Template File</DialogTitle>
            <DialogContent>
                <FormControl size="small" margin="dense">
                    <Tree
                        nodes={JSON.parse(JSON.stringify(lazySample))}
                        loadChildren={loadChildrenPaginated}
                        pageLimit={3}
                        theme={minimalTheme}
                        paginated
                        useLocalState
                        Checkbox={() => false}
                        ListItem={MyListItem}
                    />
                </FormControl>
            </DialogContent>
        
            <DialogActions>
                <Button  onClick={onCancel} color="primary">Cancel</Button>
                <Button onClick={onCancel} color="primary">Select</Button>
            </DialogActions>
        </Dialog>
    );
}

export default SelectGoogleDriveResourceDialog;
