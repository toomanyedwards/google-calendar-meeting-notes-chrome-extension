/*global chrome*/
import React from 'react';
import styled, {css} from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AddMeetingNotesDialog from './AddMeetingNotesDialog.js'
import AddingMeetingNotesDialog from './AddingMeetingNotesDialog.js'
import {getChromeStorageSyncData, setChromeStorageSyncData, clearChromeStorageSyncData, removeChromeStorageSyncData} from './chromeUtils.js'


const AddMeetingNotesButton = ({className, userDomain, meetingDescriptionEl, getMeetingTitle}) => {  
  const [isAddMeetingNotesDialogOpen, setAddMeetingNotesDialogOpen] = React.useState(false);
  const [addingMeetingNotes, setAddingMeetingNotes] = React.useState(false);

  const setDefaultMeetingNotesConfig = ({notesTemplateId, noteTemplateName, meetingNotesFolderId, meetingNotesFolderName, sharing}) => {
    new Promise(
     (resolve) => {
       chrome.storage.sync.set(
        {notesTemplateId, noteTemplateName, meetingNotesFolderId, meetingNotesFolderName, sharing}, 
         (response) => {
           console.log(`Data set: ${JSON.stringify(response)}`);
         }
       )  
     }
   );
  }


  const getDefaultMeetingNotesConfig = () => {
     return new Promise(
      resolve => {
        chrome.storage.sync.get(
          null,
          response => {
            console.log(`Data get: ${JSON.stringify(response)}`);
            resolve(response);
          }
        );
      }
     )
  }
  
  const test = async () => {
    await setDefaultMeetingNotesConfig({notesTemplateId:"someNotesTemplateId", noteTemplateName:"someName"});
    await getDefaultMeetingNotesConfig();
  }
  

  const openAddMeetingNotesDialog = async () => {
    console.log("openAddMeetingNotesDialog 1");

    var data; 
    await clearChromeStorageSyncData();
    data = await getChromeStorageSyncData(null);
    console.log(`cleared data: ${JSON.stringify(data)}`);
    await setChromeStorageSyncData({foo:"bar", buzz:"bazz"});
    data = await getChromeStorageSyncData(null);
    console.log(`all data: ${JSON.stringify(data)}`);
    await removeChromeStorageSyncData("buzz");
    data = await getChromeStorageSyncData(null);
    console.log(`removed buzz: ${JSON.stringify(data)}`);

    console.log(`openAddMeetingNotesDialog 1.5: ${JSON.stringify(data)}`);
    console.log("openAddMeetingNotesDialog 2");
    setAddMeetingNotesDialogOpen(true);
  };

  const addMeetingNotes = () => {
    const meetingTitle = getMeetingTitle();
    return new Promise(
      resolve => {
        chrome.runtime.sendMessage(
          {
            meetingNotesTitle: meetingTitle + " Notes",
            meetingNotesTemplateId: "1WX8GXmSmq1lWJ992jZ4Wwsg8oiZL9-YwxOc_2iQ8eOI",
            meetingNotesFolderId: "1gl7XMIbtTolHBdOfMcfMjZwnQFgoElbK",
            meetingNotesFilePermission: {
              role: "writer",
              type: "domain",
              domain: "civitaslearning.com",
              withLink: false,
              allowFileDiscovery: true
            }
          }, 
          response => {
              console.log('addMeetingNotesButton clicked response', response);
              
              if(response.meetingNotesDocUrl) {
                  // console.log(`getMeetingNotesTitle: ${getMeetingNotesTitle()}`);
                  addNotesDocToMeetingDescription(meetingDescriptionEl, response.meetingNotesDocUrl)
              } else {
  
              }
              resolve(response);
          }
        )  
      }
    );
  }



  const handleAddMeetingNotes = async (meetingDescriptionEl, meetingTitle) => {
    console.log(`handleAddMeetingNotes 1`);
    setAddMeetingNotesDialogOpen(false);
    console.log(`handleAddMeetingNotes 2`);
    setAddingMeetingNotes(true);
    console.log(`handleAddMeetingNotes 3`);
    try{
      await addMeetingNotes();
    }catch(e){
      console.log(`Exception: ${JSON.stringify(e)}`);
    }
    finally{
      setAddingMeetingNotes(false);
    }

    
    //await addingMeetingNotes();
    //setAddingMeetingNotes(true);

/*    console.log(`addMeetingNotes 1`);
    setAddingMeetingNotes(true);
    console.log(`Meeting title: ${meetingTitle}`);
    await addMeetingNotes(meetingDescriptionEl, meetingTitle);
    setAddingMeetingNotes(false);
  /*
    new Promise(
      (resolve) => {
        chrome.runtime.sendMessage(
          {
              meetingTitle: meetingTitle
          }, 
          (response) => {
            setAddingMeetingNotes(false);

              console.log('addMeetingNotesButton clicked response', response);
              
              if(response.meetingNotesDocUrl) {
                  // console.log(`getMeetingNotesTitle: ${getMeetingNotesTitle()}`);
                  addNotesDocToMeetingDescription(meetingDescriptionEl, response.meetingNotesDocUrl)
              } else {
  
              }
            }
        )  
      }
    );*/
  }
/*
  

  const cancelAddMeetingNotesDialog = () => {
    setAddMeetingNotesDialogOpen(false);
  };

  const handleAddMeetingNotesButtonPressed = () => {
    setAddMeetingNotesDialogOpen(false);
    setAddingMeetingNotes(true);
    addMeetingtNotes();
  };
*/

  const addMeetingtNotes = async () => {
    
    await addMeetingNotes(meetingDescriptionEl, getMeetingTitle());
    

  }

  return (
    <div>
      <button 
        id="add_meeting_notes_button" 
        onClick={openAddMeetingNotesDialog}
        class={className}>Add Meeting Notes
      </button>
      <AddingMeetingNotesDialog open={addingMeetingNotes}/>
      <AddMeetingNotesDialog userDomain={userDomain} open={isAddMeetingNotesDialogOpen} setOpen={setAddMeetingNotesDialogOpen} addMeetingNotes={handleAddMeetingNotes}/>
    </div>
  )
};

const getChromeUserToken = () => 
  new Promise(
    (resolve) => {
      chrome.identity.getAuthToken(
        {interactive: true},
        (token) => {
          console.log(`Chrome user token is: ${token}`)
          resolve(token)
        }
      )
    }
  );





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
