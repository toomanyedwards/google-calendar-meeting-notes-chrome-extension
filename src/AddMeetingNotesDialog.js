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
import Select from '@material-ui/core/Select';



const AddMeetingNotesDialog = ({open, setOpen, addMeetingNotes}) => {  
    const onCancel = () => {
        setOpen(false);
    }
    const onAddMeetingNotesButtonPressed = () => {
        addMeetingNotes();
    }
    return (
        <Dialog maxWidth="lg" open={open}  aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Meeting Notes</DialogTitle>
            <DialogContent>{/*
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
                    <RadioGroup aria-label="gender" name="gender1" value={"private"} >
                        <FormControlLabel value="private" control={<Radio />} label="Private" />
                        <FormControlLabel value="domain" control={<Radio />} label="Domain" />
                        <FormControlLabel value="public" control={<Radio />} label="Public" />
                        
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