import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const MEETING_NOTES_BUTTON_CONTAINER_REACT_INJECT_EL_ID = "meeting_notes_button_container_react_injection_el";

const getAddMeetingNotesButtonContainerHtml = () => {
  return `
      <div id="add_meeting_notes_button_container">	
      </div>
  `;
}

/**
 * Get the element where the react meeting notes button container will be injected
 */

const getMeetingNotesButtonContainerReactInjectionEl = () => {
  return document.getElementById(MEETING_NOTES_BUTTON_CONTAINER_REACT_INJECT_EL_ID);
}

/**
 * Inserts the element where the meeting notes button container react component will be added
 * 
 * @param {*} meetingNotesButtonContainerReactInjectionElParent 
 */
const insertMeetingNotesButtonContainerReactInjectionEl = (meetingNotesButtonContainerReactInjectionElParent) => {
  console.log(`insertMeetingNotesButtonContainerReactInjectionEl`);
  
  meetingNotesButtonContainerReactInjectionElParent.insertAdjacentHTML(
    'afterbegin', 
    `<div id='${MEETING_NOTES_BUTTON_CONTAINER_REACT_INJECT_EL_ID}'/>` 
  );
}

const getEventDetailsTabPanel = () => {
  return document.getElementById("tabEventDetails");
}

const getAddMeetingNotesButton = () => {
  return document.getElementById("add_meeting_notes_button");
}

const insertReactAddMeetingNotesButtonContainer = (injectionEl) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    injectionEl
  );
}




/**
 * Document mutation obeserver
 */
var observer = new MutationObserver(
  (mutations) => {  
      mutations.forEach(
          () => {
              console.log("mutation");
              // Look for the event details tab panel
              const eventDetailsTabPanel = getEventDetailsTabPanel();
              // If we found the event details tab panel...
              if( eventDetailsTabPanel ) {
                  console.log("Found events details tab panel");
                  // If the element where the react meeting notes button container should be injected can't be found...
                  if( !getMeetingNotesButtonContainerReactInjectionEl() ) {
                    // Insert it
                    const addMeetingNotesButtonContainerReactInjectionEl = insertMeetingNotesButtonContainerReactInjectionEl(eventDetailsTabPanel)

                    // Insert the react meeting notes button container
                    insertReactAddMeetingNotesButtonContainer( getMeetingNotesButtonContainerReactInjectionEl() );  
                  }
              }
          }
      )
  }    
);

const target = document.querySelector("body");
const config = { childList:true, subtree:true};

/**
 * Observe all mutations to the DOM body
 * TODO: Optimize this later if necessary
 */

observer.observe(target, config);