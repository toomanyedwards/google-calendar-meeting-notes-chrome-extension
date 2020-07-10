/*global chrome*/

import React from 'react';
import AddMeetingNotesButton from './AddMeetingNotesButton.js'

 
const AddMeetingNotesButtonContainer = props => 
    <div id={props.buttonContainerId} class="FrSOzf">	
        <div aria-hidden="true" class="tzcF6">
            <span class="DPvwYc uSx8Od" aria-hidden="true">
                <div>
                    <img alt="" aria-hidden="true" src={chrome.runtime.getURL("google-doc-128.png")} class="I6gAld"/>
                </div>
            </span>
        </div>
        <div class="j3nyw">
            <AddMeetingNotesButton {...props}/>
        </div>
    </div>
 
export default AddMeetingNotesButtonContainer;