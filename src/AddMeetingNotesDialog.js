import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import { Tree, SampleTree, minimalTheme } from 'react-lazy-paginated-tree';
import { makeStyles } from '@material-ui/core/styles';

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

// minimalTheme.listItemStyle.padding="0 0px";

console.log(`minimalTheme: ${JSON.stringify(minimalTheme)}`);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

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

const AddMeetingNotesDialog = ({userDomain, open, setOpen, addMeetingNotes}) => {  
    const [sharingLevel, setSharingLevel] = React.useState('private');
      
    const handleSharingLevelChange = (event) => {
        setSharingLevel(event.target.value);
    };


    const onCancel = () => {
        setOpen(false);
    }
    const onAddMeetingNotesButtonPressed = () => {
        addMeetingNotes(
                {sharingLevel, userDomain}
            );
    }
    return (
        <Dialog maxWidth="lg" open={open}  aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Meeting Notes</DialogTitle>
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
                {/*
                <Box my={2}>
                    <FormControl fullWidth={true} margin="normal">
                        <FormLabel component="legend">Notes Template</FormLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            value=""
                            
                            displayEmpty
                            
                        >
                            <MenuItem value="">
                            <em>Select a template</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box my={2}>
                    <FormControl fullWidth={true}>
                        <FormLabel component="legend">Notes Folder</FormLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            value=""
                            
                            displayEmpty
                            
                        >
                            <MenuItem value="">
                            <em>Select a folder</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>    
                </Box>
            */}
                <Box my={2}>
                    <FormLabel component="legend">Sharing</FormLabel>
                    <RadioGroup size="small" aria-label="sharing" name="sharing" onChange={handleSharingLevelChange} value={sharingLevel} >
                        {/* TODO: use shared constants for the values */}
                        <FormControlLabel value="private" control={<Radio size="small"/>} label="Private"/>
                        <Box my={-1}>
                        <FormControlLabel value="domain" control={<Radio size="small"/>} label={`Domain (${userDomain})`} />
                        </Box>
                        <FormControlLabel value="public" control={<Radio size="small"/>} label="Public" />
                    </RadioGroup>
                </Box>
            </DialogContent>
        
            <DialogActions>
            <Button  onClick={onCancel} color="primary">
                Cancel
            </Button>
            <Button onClick={onAddMeetingNotesButtonPressed} color="primary">
                Add Notes
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddMeetingNotesDialog;