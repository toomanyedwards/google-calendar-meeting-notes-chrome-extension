import React, {useEffect, useState} from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import SelectGoogleDriveResourceDialog from './SelectGoogleDriveResourceDialog';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';



const AddMeetingNotesDialog = ({userDomain, defaultSharingLevel, defaultNotesTemplateInfo, defaultNotesDestinationInfo, open, setOpen, addMeetingNotes}) => {  
    const [isSelectNotesTemplateDialogOpen, setSelectNotesTemplateDialogOpen] = useState(false);
    const [isSelectNotesDestinationDialogOpen, setSelectNotesDestinationDialogOpen] = useState(false);
    const [sharingLevel, setSharingLevel] = useState("");
    const [notesTemplateInfo, setNotesTemplateInfo] = useState(null);
    const [notesDestinationInfo, setNotesDestinationInfo] = useState(null);
      
    const handleSharingLevelChange = (event) => {
        setSharingLevel(event.target.value);
    };

    useEffect(
        () => {
            setSharingLevel(defaultSharingLevel);
        }, 
        [defaultSharingLevel]
    );

    useEffect(
        () => {
            setNotesTemplateInfo(defaultNotesTemplateInfo);
        }, 
        [defaultNotesTemplateInfo]
    );

    useEffect(
        () => {
            setNotesDestinationInfo(defaultNotesDestinationInfo);
        }, 
        [defaultNotesDestinationInfo]
    );

    const handleCancel = () => {
        setOpen(false);
    }
    const handleAddMeetingNotesButtonPressed = () => {
        addMeetingNotes(
                {
                    sharing:{
                        sharingLevel, 
                        userDomain
                    }, 
                    notesTemplateInfo, 
                    notesDestinationInfo
                }
            );
    }
    const handleChangeNotesTemplateButtonPressed = () => {
        setSelectNotesTemplateDialogOpen(true);
    }

    const handleChangeNotesDestinationButtonPressed = () => {
        setSelectNotesDestinationDialogOpen(true);
    }

    const handleNotesTemplateSelected = (notesTemplateInfo) => {
        setNotesTemplateInfo(notesTemplateInfo);
        console.log(`handleNotesTemplateSelected: ${JSON.stringify(notesTemplateInfo)}`);
        
    }

    const handleNotesDestinationSelected = (notesDestinationInfo) => {
        setNotesDestinationInfo(notesDestinationInfo);
        console.log(`handleNotesDestinationSelected: ${JSON.stringify(notesDestinationInfo)}`);
        
    }

    return (
        <div>
            <SelectGoogleDriveResourceDialog 
                open={isSelectNotesTemplateDialogOpen} 
                setOpen={setSelectNotesTemplateDialogOpen} 
                onSelectionConfirmed={handleNotesTemplateSelected} 
                fileMimeTypes={["application/vnd.google-apps.document"]}
                title="Select a Notes Template File"
            />
            <SelectGoogleDriveResourceDialog 
                open={isSelectNotesDestinationDialogOpen} 
                setOpen={setSelectNotesDestinationDialogOpen}
                onSelectionConfirmed={handleNotesDestinationSelected} 
                title="Select a Notes Destination Folder"
                allowFolderSelection={true}
            />
            <Dialog  open={open}  aria-labelledby="form-dialog-title" fullWidth={true} maxWidth = {'xs'}>
                <DialogTitle id="form-dialog-title">Add Meeting Notes</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Notes Template:
                    </DialogContentText>
                    <Tooltip title={notesTemplateInfo?notesTemplateInfo.treePath:"<Click to select>"}>
                        <TextField
                            id="notesTemplate"
                            size="medium"
                            fullWidth
                            
                            value={notesTemplateInfo?notesTemplateInfo.name:"<Click to select>"}
                            variant="outlined"
                            
                            InputProps={{
                                readOnly: true,
                            }}
                            onClick={handleChangeNotesTemplateButtonPressed}
                        />
                    </Tooltip>
                    <Box my={3}>
                    <DialogContentText>
                        Notes Destination:
                    </DialogContentText>
                    
                    <Tooltip title={notesDestinationInfo?notesDestinationInfo.treePath:"<Click to select>"}></Tooltip>
                        <TextField
                            id="notesDestination"
                            variant="outlined"
                            value={notesDestinationInfo?notesDestinationInfo.name:"<Click to select>"}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            onClick={handleChangeNotesDestinationButtonPressed}
                        />
                    </Tooltip>
                 
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
                    <Button onClick={handleCancel} color="primary">Cancel</Button>
                    <Button disabled={!!!notesTemplateInfo || !!!notesDestinationInfo} onClick={handleAddMeetingNotesButtonPressed} color="primary">Add Notes</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddMeetingNotesDialog;