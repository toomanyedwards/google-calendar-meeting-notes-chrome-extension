import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const getMeetingNotesAnchor = () => {
  var nodeList = document.querySelectorAll("a[href*='meetingNotesExt']");
  if(nodeList && nodeList[0]) {
      console.log(`foo: ${JSON.stringify(nodeList[0])}`)
      return nodeList[0];
  }
}

const getEventDetailsTabPanel = () => {
  return document.getElementById("tabEventDetails");
}

const getAddMeetingNotesButton = () => {
  return document.getElementById("add_meeting_notes_button");
}

const insertAddMeetingNotesButton = (eventDetailsTabPanel) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    eventDetailsTabPanel
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
              const eventDetailsTabPanel = getEventDetailsTabPanel();
              if( getEventDetailsTabPanel() ) {
                  console.log("Found events details tab panel");
                  if( !getAddMeetingNotesButton() ) {
                    console.log("Did not find meeting notes button");
                    insertAddMeetingNotesButton(eventDetailsTabPanel);
                  }
              }
          }
      )
  }    
);

const target = document.querySelector("body");
const config = { childList:true, subtree:true};

// Initialize the DOM mutation observer
observer.observe(target, config);