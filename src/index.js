/*global chrome*/


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const MEETING_NOTES_BUTTON_CONTAINER_REACT_INJECT_EL_ID = "meeting_notes_button_container_react_injection_el";
const ADD_MEETING_NOTES_BUTTON_CONTAINER_ID = "ADD_MEETING_NOTES_BUTTON_CONTAINER_ID";

/**
 * Get the element where the react meeting notes button container will be injected
 */

const getMeetingNotesButtonContainerReactInjectionEl = () => {
  return document.getElementById(MEETING_NOTES_BUTTON_CONTAINER_REACT_INJECT_EL_ID);
}

const getUserEmail = () => {
  return document.getElementById("xOrgEmail").textContent;
}

const getUserDomain = () => {
  const userEmail = getUserEmail();
  return userEmail.substring(userEmail.lastIndexOf("@")+1);
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

const getEventDetailsTabPanelEl = () => {
  return document.getElementById("tabEventDetails");
}

const getAddMeetingNotesButtonContainerEl = () => {
  return document.getElementById(ADD_MEETING_NOTES_BUTTON_CONTAINER_ID);
}

const hasMeetingNotes = () => {
  var nodeList = document.querySelectorAll("a[href*='meetingNotesExt']");
  if(nodeList && nodeList[0]) {
      return true;
  } else {
    return false;
  }
}

const getMeetingTitle = () => {
  return document.getElementById("xTiIn").getAttribute("data-initial-value")
}

const insertReactAddMeetingNotesButtonContainer = (injectionEl, meetingDescriptionEl) => {
  ReactDOM.render(
    <React.StrictMode>
      <App meetingDescriptionEl={meetingDescriptionEl} getMeetingTitle={getMeetingTitle} buttonContainerId={ADD_MEETING_NOTES_BUTTON_CONTAINER_ID}/>
    </React.StrictMode>,
    injectionEl
  );
}

const getMeetingDescriptionEl = () => {
  var nodeList = document.querySelectorAll("div[id*='T2Ybvb']");
  if(nodeList && nodeList[0]) {
      // console.log(`getMeetingDescriptionEl: ${JSON.stringify(nodeList[0])}`)
      return nodeList[0];
  }
}


/**
 * Document mutation obeserver
 */
var observer = new MutationObserver(
  (mutations) => {  
      mutations.forEach(
        () => {
          // console.log("mutation");

            // Look for the meeting details element 
            const meetingDescriptionEl = getMeetingDescriptionEl();

            // If the react injection point doesn't exist yet...
            if( !getMeetingNotesButtonContainerReactInjectionEl() ) {
              
              // Look for the event details tab panel element 
              const eventDetailsTabPanelEl = getEventDetailsTabPanelEl();

              // if the event details panel and meeting description element exist
              if( eventDetailsTabPanelEl && meetingDescriptionEl) {
  

                console.log(`domain: ${getUserDomain()}`);

                // Insert it
                const addMeetingNotesButtonContainerReactInjectionEl = insertMeetingNotesButtonContainerReactInjectionEl(eventDetailsTabPanelEl)

                // Insert the react meeting notes button container
                insertReactAddMeetingNotesButtonContainer( 
                  getMeetingNotesButtonContainerReactInjectionEl(),
                  meetingDescriptionEl
                );  
              }
            } else {
              if( hasMeetingNotes() && isAddMeetingNotesButtonVisible() ) {
                  hideAddMeetinNotesButton();
              } else if( !hasMeetingNotes() && !isAddMeetingNotesButtonVisible()) {
                  showAddMeetinNotesButton();
              }
            }
          } 
      )
  }    
);

const isAddMeetingNotesButtonVisible = () => {
  return getAddMeetingNotesButtonContainerEl().style.display != "none";
}

const hideAddMeetinNotesButton = () => {
  getAddMeetingNotesButtonContainerEl().style.display = "none";
}

const showAddMeetinNotesButton = () => {
  getAddMeetingNotesButtonContainerEl().style.display = "";
}


/**
 * For now, disable the escape key so the meeting details window doesn't get closed
 * out from underneath the dialog. TODO: Should do this conditionally so if the extension
 * dialogs aren't shown, then escape key works
 */
window.addEventListener("keydown", function(event) {
    if(event.keyCode === 27){ // Escape key
      event.preventDefault();
      event.stopImmediatePropagation();
      event.cancelBubble = true;
    }
  }, true
)

const target = document.querySelector("body");
const config = { childList:true, subtree:true};

/**
 * Observe all mutations to the DOM body
 * TODO: Optimize this later if necessary
 */

observer.observe(target, config);