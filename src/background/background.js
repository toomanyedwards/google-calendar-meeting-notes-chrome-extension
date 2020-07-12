
const API_KEY = 'AIzaSyBHH78gDxV2O5N_F7ZKxz-E1SNOP82citw';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const CLIENT_ID="370393194814-avjjeu46inmjr38cku9312crolphgftt.apps.googleusercontent.com";

const SCOPE=chrome.runtime.getManifest().oauth2.scopes.join(' ');
const ADD_NOTES_BUTTON_CLICKED_MSG = "ADD_NOTES_BUTTON_CLICKED_MSG";

/**
 * Initialize google api client
 */

onGAPILoad = async () => {
  console.log("Initializing gapi");
  
  await gapi.client.init(
    {
      apiKey: API_KEY,
      discoveryDocs: DISCOVERY_DOCS
    }
  );
  console.log("gapi initialized");

  await setGapiToken();
  
  listFiles();
  
}

/**
 * Gets the token for the current chrome user
 * NOTE: Not guaranteed to google user logged into calendar
 */
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



/**
 * Gets the user oauth token
 */
const getUserToken = async () => {
  const token = await getChromeUserToken();
  console.log(`User token: ${token}`)
  return token;
}

/**
 * Sets the google api client token
 */
const setGapiToken = async () => {
  const token = await getUserToken();
  console.log(`Setting gapi token to: ${token}`);

  // Set the gapi token
  gapi.auth.setToken({
    'access_token': token,
  });

  return token;
}

const copyNotesDocTemplate = async (meetingNotesTitle, meetingNotesTemplateId, meetingNotesFolderId) => {
  console.log(`copyNotesDocTemplate: ${meetingNotesTemplateId} ${meetingNotesTitle} ${meetingNotesFolderId}`);
  
  try {
    
    const result = await gapi.client.drive.files.copy(
      {
        fileId: meetingNotesTemplateId,
        resource: {
          name: meetingNotesTitle,
          parents:[meetingNotesFolderId]
        } 
      }
    );

    const fileId = result.result.id;
    
    console.log(`Created file: ${fileId}`)
    return fileId;
  }catch(e) {
    console.log(`copyNotesDocTemplate errors: ${JSON.stringify(e)}`)
  }

  // console.log(`result: ${JSON.stringify(result)}`);
}


/**
 * Handle the add notes button clicked
 */
const handleAddNotesButtonClicked = async ({meetingNotesTitle, meetingNotesTemplateId, meetingNotesFolderId, meetingNotesSharing}) => {
  console.log(`handleAddNotesButtonClicked: ${meetingNotesTitle}`);

  const token = setGapiToken();

  const fileId = await copyNotesDocTemplate(meetingNotesTitle, meetingNotesTemplateId, meetingNotesFolderId);

  /*
  var perms = await gapi.client.drive.permissions.list({fileId});  
  console.log(`perms: ${JSON.stringify(perms)}`);

  const permissionId = perms.result.permissions[0].id;
  console.log(`perms: ${JSON.stringify(permissionId)}`);

  //perms = await gapi.client.drive.permissions.delete({fileId, permissionId});  

  //perms = await gapi.client.drive.permissions.list({fileId});  
  // /console.log(`perms: ${JSON.stringify(perms)}`);

  await setGoogleDirveFilePermissions(fileId, meetingNotesFilePermissions);

  perms = await gapi.client.drive.permissions.list({fileId});  
  console.log(`perms: ${JSON.stringify(perms)}`);
  */

  await setMeetingNotesSharing(fileId, meetingNotesSharing);
  return fileId;
}

const setGoogleDriveFileSharingPrivate = async (fileId) => {
  console.log(`setGoogleDriveFileSharingPrivate ${fileId}`);
  try{
    const permissionsResult = await gapi.client.drive.permissions.list({fileId:fileId});
    
    // Remove any permissions that aren't owner
    await Promise.all(
      permissionsResult.result.permissions.map(
        async (permission) => {
          const role = permission.role;
          if(role != "owner") {
            await gapi.client.drive.permissions.delete({fileId, id: permission.id});   
          }
        }
      )
    );  
  }catch(e) {
    const errors = e.result.error.errors;
    console.log(`setGoogleDriveFileSharingPrivate errors: ${JSON.stringify(errors)}`);
    throw errors
  }
} 

const setGoogleDriveFileSharingDomain = async (fileId, userDomain) => {
  console.log(`setGoogleDriveFileSharingDomain: ${fileId} ${userDomain}`);
  await setGoogleDriveFilePermissions(
    fileId,
    {
      role: "writer",
      type: "domain",
      domain: userDomain,
      withLink: false,
      allowFileDiscovery: true
    }
  );
}

const setGoogleDriveFileSharingPublic = async (fileId) => {
  console.log(`setGoogleDriveFileSharingPublic ${fileId}`);
  await setGoogleDriveFilePermissions(
    fileId,
    {
      role: "writer",
      type: "anyone",
      withLink: false,
      allowFileDiscovery: true
    }
  );
}

/**
 * TODO: Use constants for sharing level
 */
const setMeetingNotesSharing = async (fileId, meetingNoteSharing) => {
  switch(meetingNoteSharing.sharingLevel) {
    case "private":
      await setGoogleDriveFileSharingPrivate(fileId);
      break;
    case "domain":
      await setGoogleDriveFileSharingDomain(fileId, meetingNoteSharing.userDomain);
      break;
    case "public":
      await setGoogleDriveFileSharingPublic(fileId);
      break;
  }
  
}

/**
 * Sets the permissions of a google drive file
 * 
 * @param {*} fileId 
 * @param {*} permissions 
 */
const setGoogleDriveFilePermissions = async (fileId, permissions) => {
  try{
    await gapi.client.drive.permissions.create(
      {
        fileId:fileId,
        resource: permissions
      }
    );
  }catch(e) {
    const errors = e.result.error.errors;
    console.log(`setGoogleDriveFilePermissions errors: ${JSON.stringify(errors)}`);
    throw errors;
  }  

}

/**
 * Listen for messages from content script
 */
chrome.extension.onMessage.addListener(
  (request, sender, sendResponse) => {
    console.log(`Message received: ${JSON.stringify(request)}`);
     // setGapiToken();
  
    console.log("Message received 2");
    //listFiles2();
    console.log("Message received 3");

    //sendResponse({meetingNotesDocUrl: await handleAddNotesButtonClicked(request.meetingTitle)});
    //return true;
   
    
    handleAddNotesButtonClicked(request).
      then( 
        (fileId)=>{
          sendResponse({meetingNotesDocUrl: getGoogleDocUrlForId(fileId)});
        }
      ).catch(
        (errors) => {
          console.log(`handleAddNotesButtonClicked errors: ${JSON.stringify(errors)}`);
          sendResponse({errors});
        }
      );
    
    return true;
    /*
    switch(request.message) {
      case ADD_NOTES_BUTTON_CLICKED_MSG: 
        const result = await handleAddNotesButtonClicked(request.meetingTitle);

        console.log(`File id: ${getGoogleDocUrlForId(result.result.id)}`)
        sendResponse({meetingNotesDocUrl:getGoogleDocUrlForId(result.result.id)})
    }
    sendResponse({meetingNotesDocUrl:"foo"});
    */

  }
);

const getGoogleDocUrlForId = (googleFileId) => {
  return `https://docs.google.com/document/d/${googleFileId}/edit?usp=sharing`
}

const listFiles = async () => {
  console.log("Listing files")
  response = await gapi.client.drive.files.list(
    {
      'pageSize': 10,
      'fields': "nextPageToken, files(id, name)"
    }
  );

  response.result.files.forEach(
    (file)  => {
      console.log(`${file.name} (${file.id})`)
    }
  ); 
}