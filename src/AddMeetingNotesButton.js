/*global chrome*/
import React from 'react';
import styled, {css} from 'styled-components'
 
const AddMeetingNotesButton = ({className, getMeetingDescriptionEl, getMeetingTitle}) => {  
  return (
    <button 
      id="add_meeting_notes_button" 
      onClick={
        ()=>{
          addMeetingNotes(getMeetingDescriptionEl(), getMeetingTitle());
        }
      } 
      class={className}>Add Meeting Notes
    </button>
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
