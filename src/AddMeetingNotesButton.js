/*global chrome*/
import React from 'react';
import styled, {css} from 'styled-components'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';



 
const AddMeetingNotesButton = ({className, getMeetingDescriptionEl, getMeetingTitle}) => {  
  const [addMeetingNotesDialogOpen, setAddMeetingNotesDialogOpen] = React.useState(false);

  const openAddMeetingNotesDialog = () => {
    setAddMeetingNotesDialogOpen(true);
  };


  /*
  onClick={
        ()=>{
          addMeetingNotes(getMeetingDescriptionEl(), getMeetingTitle());
        }
      } 

  */

  const closeAddMeetingNotesDialog = () => {
    setAddMeetingNotesDialogOpen(false);
  };

  return (
    <div>
      <button 
        id="add_meeting_notes_button" 
        onClick={openAddMeetingNotesDialog}
        class={className}>Add Meeting Notes
      </button>
      <Dialog maxWidth="lg" open={addMeetingNotesDialogOpen}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Meeting Notes</DialogTitle>
        <DialogContent>
          
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
        <FormControl fullWidth={true} >
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
          <Button  onClick={closeAddMeetingNotesDialog} color="primary">
            Cancel
          </Button>
          <Button color="primary">
            Add Notes
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  )
};

const addMeetingNotes = (meetingDescriptionEl, meetingTitle) => {
  console.log(`Meeting title: ${meetingTitle}`)

  chrome.runtime.sendMessage(
    {
        meetingTitle: meetingTitle
    }, 
    (response) => {
        console.log('addMeetingNotesButton clicked response', response);
        
        if(response.meetingNotesDocUrl) {
            // console.log(`getMeetingNotesTitle: ${getMeetingNotesTitle()}`);
            addNotesDocToMeetingDescription(meetingDescriptionEl, response.meetingNotesDocUrl)
        } else {

        }
        
    }
  );
}

const getAddDescriptionDiv = () => {
  var nodeList = document.querySelectorAll("div[jsname='V67aGc']");
  if(nodeList && nodeList[0]) {
      console.log(`foo: ${JSON.stringify(nodeList[0])}`)
      return nodeList[0];
  }
}

const removeAddDescriptionDiv = () => {
  const addDescriptionDiv = getAddDescriptionDiv();
  
  if(addDescriptionDiv) {
      console.log(`addDescriptionDiv: ${addDescriptionDiv}`);
      addDescriptionDiv.remove();
  }
}

const addNotesDocToMeetingDescription = (meetingDescriptionEl, meetingNotesDocUrl) => {
  removeAddDescriptionDiv();

  meetingDescriptionEl.insertAdjacentHTML('afterbegin', 
  `<div>Meeting Notes: <a id='foo' href='${meetingNotesDocUrl}&meetingNotesExt='true'>${meetingNotesDocUrl}</a><div>`  
  );
}


const StyledAddMeetingNotesButton = styled(AddMeetingNotesButton)`
    display: inline-block;
    color: rgb(255, 255, 255);
    background-color: rgb(14, 114, 237);
    line-height: 36px;
    font-family: "Google Sans", Roboto, Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: 14px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    padding: 0px 16px;
    border-radius: 4px;


    &:hover {
        background-color: rgb(66, 133, 244);
        cursor: pointer;
      }

    &:disabled {
        background-color: grey;
    }
`;

export default StyledAddMeetingNotesButton;
