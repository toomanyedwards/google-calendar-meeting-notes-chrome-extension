/*global chrome*/
import React, {useEffect} from 'react';
import styled, {css} from 'styled-components'
import AddMeetingNotesDialog from './AddMeetingNotesDialog.js'
import AddingMeetingNotesDialog from './AddingMeetingNotesDialog.js'
import ErrorsDialog from './ErrorsDialog.js'
import {getChromeStorageSyncData, setChromeStorageSyncData, clearChromeStorageSyncData, removeChromeStorageSyncData} from './chromeUtils.js'


const AddMeetingNotesButton = ({className, userDomain, meetingDescriptionEl, getMeetingTitle}) => {  
  const [isAddMeetingNotesDialogOpen, setAddMeetingNotesDialogOpen] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [isErrorsDialogOpen, setErrorsDialogOpen] = React.useState(false);
  const [addingMeetingNotes, setAddingMeetingNotes] = React.useState(false);
  const [config, setConfig] = React.useState({});

  useEffect(
    () => {
      const initializeDefaults = async() => {
        const defaultConfig = await getChromeStorageSyncData();
        if(!defaultConfig.sharing) {
        //if(true) {
          setConfig(
            {
              sharing: {
                sharingLevel:"private",
                userDomain: userDomain
              }
            }
          );
        } else {
          setConfig(
            defaultConfig
          );
        }
      }
      initializeDefaults();
    },[]
  );
      
  const openAddMeetingNotesDialog = async () => {
    console.log("openAddMeetingNotesDialog 1");
/*
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
    console.log("openAddMeetingNotesDialog 2");*/
    setAddMeetingNotesDialogOpen(true);
  };

  const addMeetingNotes = ({sharing, notesTemplateInfo, notesDestinationInfo}) => {
    const meetingTitle = getMeetingTitle();
    return new Promise(
      (resolve, reject) => {
        chrome.runtime.sendMessage(
          {
            type: "addNotes",
            meetingNotesTitle: meetingTitle + " Notes",
            meetingNotesTemplate: notesTemplateInfo,
            meetingNotesFolder: notesDestinationInfo,

            // google
            //meetingNotesTemplateId: "1bAoZmcWXQnofin2esddfdTWB0Ko0MkNJBsQPpS9SZS4",
            //meetingNotesFolderId: " 1TNkioETxxx10b9Ikg0D0bZVbVSnW8XZt",
            meetingNotesSharing:sharing
          }, 
          response => {
              console.log('addMeetingNotesButton clicked response', response);
              
              if(response.meetingNotesDocUrl) {
                  // console.log(`getMeetingNotesTitle: ${getMeetingNotesTitle()}`);
                  addNotesDocToMeetingDescription(meetingDescriptionEl, response.meetingNotesDocUrl)
              } else {
                const errors = response.errors;
                console.log(`addMeetingNotes errors: ${JSON.stringify(errors)}`);
                console.log(`addMeetingNotes errors2: ${errors.toString()}`);
                /*errors.map(
                  error => {
                    console.log(`addMeetingNotes errors foo: ${error.toString()}`);
                  }
                )*/
                
                reject(errors);
              }
              resolve(response);
          }
        )  
      }
    );
  }



  const handleAddMeetingNotes = async (meetingNotesConfig) => {
    console.log(`handleAddMeetingNotes 1`);
    setAddMeetingNotesDialogOpen(false);
    console.log(`handleAddMeetingNotes 2`);
    setAddingMeetingNotes(true);
    console.log(`handleAddMeetingNotes 3`);
    try{
      await addMeetingNotes(meetingNotesConfig);
      // If successful, set the config as the new default
      setChromeStorageSyncData(meetingNotesConfig);

    }catch(errors){
      setErrors(errors);
      console.log(`handleAddMeetingNotes errors: ${JSON.stringify(errors)}`);
      setAddingMeetingNotes(false);
      console.log(`handleAddMeetingNotes 2`);

      setErrorsDialogOpen(true);
      console.log(`handleAddMeetingNotes 3`);
    }
    finally{
      setAddingMeetingNotes(false);
    }
  }

  const handleErrorsDialogClose = () => {
    setErrorsDialogOpen(false);
  }

  return (
    <div>
      <button 
        id="add_meeting_notes_button" 
        onClick={openAddMeetingNotesDialog}
        class={className}>Add Meeting Notes
      </button>
      <AddingMeetingNotesDialog open={addingMeetingNotes}/>
      <ErrorsDialog title={"Error creating meeting notes"} open={isErrorsDialogOpen} onClose={handleErrorsDialogClose} errors={errors}/>
      <AddMeetingNotesDialog 
        defaultSharingLevel={config.sharing?config.sharing.sharingLevel:""} 
        defaultNotesTemplateInfo={config.notesTemplateInfo}
        defaultNotesDestinationInfo={config.notesDestinationInfo}
        userDomain={userDomain} 
        open={isAddMeetingNotesDialogOpen} 
        setOpen={setAddMeetingNotesDialogOpen} 
        addMeetingNotes={handleAddMeetingNotes}
      />
    </div>
  )
};


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
