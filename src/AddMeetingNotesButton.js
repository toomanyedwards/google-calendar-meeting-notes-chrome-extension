import React from 'react';
import styled from 'styled-components'
 
const AddMeetingNotesButton = ({className}) => {
  return <button id="add_meeting_notes_button" class={className}>Add Meeting Notes</button>
};

const StyledAddMeetingNotesButton = styled(AddMeetingNotesButton)`
    display: inline-block;
    background-color: rgb(14, 114, 237);
    color: rgb(255, 255, 255);
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
`;

export default StyledAddMeetingNotesButton;
