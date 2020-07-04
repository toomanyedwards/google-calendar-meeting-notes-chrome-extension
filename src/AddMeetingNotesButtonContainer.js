/*global chrome*/

import React from 'react';
import AddMeetingNotesButon from './AddMeetingNotesButton.js'

 
const AddMeetingNotesButtonContainer = ({iconUrl}) => 
    <div class="FrSOzf">	
        <div aria-hidden="true" class="tzcF6">
            <span class="DPvwYc uSx8Od" aria-hidden="true">
                <div>
                    <img alt="" aria-hidden="true" src={chrome.runtime.getURL("google-doc-128.png")} class="I6gAld"/>
                </div>
            </span>
        </div>
        <AddMeetingNotesButon/>
    </div>
 
export default AddMeetingNotesButtonContainer;