/*global chrome*/


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const MEETING_NOTES_BUTTON_CONTAINER_REACT_INJECT_EL_ID = "meeting_notes_button_container_react_injection_el";

/**
 * Get the element where the react meeting notes button container will be injected
 */

const getMeetingNotesButtonContainerReactInjectionEl = () => {
  return document.getElementById(MEETING_NOTES_BUTTON_CONTAINER_REACT_INJECT_EL_ID);
}

const removeAddMeetingNotesButtonContainerEl = () => {
  const addMeetingNotesButtonContainerEl = getAddMeetingNotesButtonContainerEl();

  if(addMeetingNotesButtonContainerEl) {
    addMeetingNotesButtonContainerEl.remove();
  }
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
  return document.getElementById("addMeetingNotesButtonContainer");
}

const getMeetingNotesAnchor = () => {
  var nodeList = document.querySelectorAll("a[href*='meetingNotesExt']");
  if(nodeList && nodeList[0]) {
      console.log(`foo: ${JSON.stringify(nodeList[0])}`)
      return nodeList[0];
  }
}

const getMeetingTitle = () => {
  return document.getElementById("xTiIn").getAttribute("data-initial-value")
}

const insertReactAddMeetingNotesButtonContainer = (injectionEl, meetingDescriptionEl) => {
  ReactDOM.render(
    <React.StrictMode>
      <App meetingDescriptionEl={meetingDescriptionEl} getMeetingTitle={getMeetingTitle}/>
    </React.StrictMode>,
    injectionEl
  );
}

const getMeetingDescriptionEl = () => {
  var nodeList = document.querySelectorAll("div[id*='T2Ybvb']");
  if(nodeList && nodeList[0]) {
      console.log(`getMeetingDescriptionEl: ${JSON.stringify(nodeList[0])}`)
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
          console.log("mutation");

            // Look for the meeting details element 
            const meetingDescriptionEl = getMeetingDescriptionEl();

            // If the react injection point doesn't exist yet...
            if( !getMeetingNotesButtonContainerReactInjectionEl() ) {
              
              // Look for the event details tab panel element 
              const eventDetailsTabPanelEl = getEventDetailsTabPanelEl();

              if( eventDetailsTabPanelEl && meetingDescriptionEl) {
                console.log("Inserting react injection point");
  
                // Insert it
                const addMeetingNotesButtonContainerReactInjectionEl = insertMeetingNotesButtonContainerReactInjectionEl(eventDetailsTabPanelEl)

                // Insert the react meeting notes button container
                insertReactAddMeetingNotesButtonContainer( 
                  getMeetingNotesButtonContainerReactInjectionEl(),
                  meetingDescriptionEl
                );  
              }
            } else {
              if( getMeetingNotesAnchor() ) {
                if( !isAddMeetingNotesButtonHidden()) {
                  hideAddMeetinNotesButton();
                }
              } else {
                if( isAddMeetingNotesButtonHidden()) {
                  showAddMeetinNotesButton();
                }
              }
            } 
          }
      )
  }    
);

const isAddMeetingNotesButtonHidden = () => {
  return getAddMeetingNotesButtonContainerEl().style.display === "none";
}

const hideAddMeetinNotesButton = () => {
  getAddMeetingNotesButtonContainerEl().style.display = "none";
}

const showAddMeetinNotesButton = () => {
  getAddMeetingNotesButtonContainerEl().style.display = "";
}


/**
 * Handle escape key
 */
window.addEventListener("keydown", function(event) {
    if(event.keyCode === 27){
      console.log("escape key pressed")
      window.alert(`esc: ${event.cancelable}`)
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