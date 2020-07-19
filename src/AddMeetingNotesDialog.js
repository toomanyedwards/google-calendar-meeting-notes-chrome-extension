import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import ListItem from '@material-ui/core/ListItem';
import { Tree, minimalTheme } from 'react-lazy-paginated-tree';
import { makeStyles } from '@material-ui/core/styles';
import SelectGoogleDriveResourceDialog from './SelectGoogleDriveResourceDialog';
import TextField from '@material-ui/core/TextField';

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
    const [isSelectGoogleDriveResourceDialogOpen, setSelectGoogleDriveResourceDialogOpen] = React.useState(false);
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
    const onChangesNotesTemplateButtonPressed = () => {
        setSelectGoogleDriveResourceDialogOpen(true);
    }
    return (
        <div>
            <SelectGoogleDriveResourceDialog open={isSelectGoogleDriveResourceDialogOpen} setOpen={setSelectGoogleDriveResourceDialogOpen}/>
            <Dialog  open={open}  aria-labelledby="form-dialog-title" fullWidth={true}
maxWidth = {'xs'}>
                <DialogTitle id="form-dialog-title">Add Meeting Notes</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Notes Template:
                    </DialogContentText>
                    <TextField
                        id="standard-read-only-input"
                        size="medium"
                        fullWidth
                        defaultValue="<none selected>"
                        variant="outlined"
                        
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Button onClick={onChangesNotesTemplateButtonPressed} color="primary">Change</Button>
                    
                    <Box my={3}>
                    <DialogContentText>
                        Notes Destination:
                    </DialogContentText>
                    
                    <TextField
                        id="standard-read-only-input"
                        variant="outlined"
                        defaultValue="<none selectedkjgjhgjhgkjhgkjhfkghfgffhkgfhjgfjhgfhjgfhjgf>"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                 
                    <Button onClick={onChangesNotesTemplateButtonPressed} color="primary">Change</Button>
                    </Box>
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
                    <Button onClick={onCancel} color="primary">Cancel</Button>
                    <Button onClick={onAddMeetingNotesButtonPressed} color="primary">Add Notes</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddMeetingNotesDialog;