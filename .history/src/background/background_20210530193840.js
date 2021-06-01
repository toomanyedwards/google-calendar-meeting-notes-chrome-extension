
const API_KEY = 'AIzaSyBHH78gDxV2O5N_F7ZKxz-E1SNOP82citw';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const CLIENT_ID="370393194814-avjjeu46inmjr38cku9312crolphgftt.apps.googleusercontent.com";

const SCOPE=chrome.runtime.getManifest().oauth2.scopes.join(' ');
const ADD_NOTES_BUTTON_CLICKED_MSG = "ADD_NOTES_BUTTON_CLICKED_MSG";

/*

Message received: {"type":"listGoogleDrive","listParams":{"orderBy":"folder, name","q":"'root' in parents and trashed=false and (mimeType='application/vnd.google-apps.folder' or mimeType='application/vnd.google-apps.document' )","fields":"nextPageToken, files(id, name, mimeType)"}}
background.js:367 listGoogleDrive: listingFiles Fooz
background.js:373 listGoogleDrive gapi.client.load error gapi.client.Error: La
background.js:374 listGoogleDrive gapi.client.load error2 "gapi.client.Error: La"
background.js:383 listGoogleDrive: listingFiles File api.client.drive.files found
cb=gapi.loaded_0:221 Uncaught uB {message: "La", rM: true, stack: "gapi.client.Error: La↵    at new uB (https://apis.…pgmombdlemcndjbhmnhnbjdgcnmic/background.js:332:9"}
(anonymous) @ cb=gapi.loaded_0:221
setTimeout (async)
_.gk @ cb=gapi.loaded_0:221
(anonymous) @ cb=gapi.loaded_0:238
Dk @ cb=gapi.loaded_0:230
Promise.then (async)
yk @ cb=gapi.loaded_0:230
_.Ck @ cb=gapi.loaded_0:230
Uk @ cb=gapi.loaded_0:237
_.Ek.dh @ cb=gapi.loaded_0:236
(anonymous) @ cb=gapi.loaded_0:231
(anonymous) @ cb=gapi.loaded_0:1043
_.Ek @ cb=gapi.loaded_0:231
IC @ cb=gapi.loaded_0:1043
listGoogleDrive @ background.js:370
(anonymous) @ background.js:332
cb=gapi.loaded_0:225 GET https://content.googleapis.com/drive/v3/files?orderBy=folder%2C%20name&q=%27root%27%20in%20parents%20and%20trashed%3Dfalse%20and%20(mimeType%3D%27application%2Fvnd.google-apps.folder%27%20or%20mimeType%3D%27application%2Fvnd.google-apps.document%27%20)&fields=nextPageToken%2C%20files(id%2C%20name%2C%20mimeType)&key=AIzaSyBHH78gDxV2O5N_F7ZKxz-E1SNOP82citw 401
Ch @ cb=gapi.loaded_0:225
g @ cb=gapi.loaded_0:225
Dh @ cb=gapi.loaded_0:226
(anonymous) @ cb=gapi.loaded_0:226
d @ cb=gapi.loaded_0:164
b @ cb=gapi.loaded_0:159
background.js:399 listGoogleDrive errors bizz: [object Object]
background.js:401 listGoogleDrive errors foo: {"result":{"error":{"errors":[{"domain":"global","reason":"authError","message":"Invalid Credentials","locationType":"header","location":"Authorization"}],"code":401,"message":"Invalid Credentials"}},"body":"{\n \"error\": {\n  \"errors\": [\n   {\n    \"domain\": \"global\",\n    \"reason\": \"authError\",\n    \"message\": \"Invalid Credentials\",\n    \"locationType\": \"header\",\n    \"location\": \"Authorization\"\n   }\n  ],\n  \"code\": 401,\n  \"message\": \"Invalid Credentials\"\n }\n}\n","headers":{"cache-control":"private, max-age=0","content-encoding":"gzip","content-length":"162","content-type":"application/json; charset=UTF-8","date":"Sun, 30 May 2021 03:15:41 GMT","expires":"Sun, 30 May 2021 03:15:41 GMT","server":"GSE","vary":"Origin, X-Origin","www-authenticate":"Bearer realm=\"https://accounts.google.com/\", error=invalid_token"},"status":401,"statusText":null}
background.js:402 listGoogleDrive errors: [{"domain":"global","reason":"authError","message":"Invalid Credentials","locationType":"header","location":"Authorization"}]
background.js:340 listGoogleDrive errors buzz: [object Object]
background.js:341 listGoogleDrive errors: [{"domain":"global","reason":"authError","message":"Invalid Credentials","locationType":"header","location":"Authorization"}]
*/

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
  /*try{
    await gapi.client.load(DISCOVERY_DOCS);
    console.log("gapi client loaded");
  }catch(e) {
    console.log(`gapi.client.load error ${e.toString()}`);
    console.log(`gapi.client.load error2 ${JSON.stringify(e.toString())}`);
  }
  */
  
  /*gapi.client.load('drive', 'v2', function() {
    console.log(`GOOGLE DRIVE LOADED!`)
  });
  */

  await gapi.client.load('drive', 'v2');
  console.log(`GOOGLE DRIVE LOADED!`)

  //listFiles();
  
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

const deleteGoogleDriveFile = async (fileId) => {
  console.log(`deleteGoogleDriveFile: fileId: ${fileId}`);
  try {
    await gapi.client.drive.files.delete({fileId});
  }
  catch(resultErrors) {
    const errors = resultErrors.result.error.errors;
    console.log(`deleteGoogleDriveFile errors: ${JSON.stringify(errors)}`);
    throw errors
  }
}

const logErrors = errors => {

}

const copyNotesDocTemplate = async (meetingNotesTitle, meetingNotesTemplate, meetingNotesFolder) => {
  console.log(`copyNotesDocTemplate: meetingNotesTitle: ${meetingNotesTitle} meetingNotesTemplate: ${JSON.stringify(meetingNotesTemplate)} meetingNotesFolder: ${JSON.stringify(meetingNotesFolder)}`);
  
  try {
    
    const result = await gapi.client.drive.files.copy(
      {
        fileId: meetingNotesTemplate.id,
        resource: {
          name: meetingNotesTitle,
          parents:[meetingNotesFolder.id]
        } 
      }
    );

    const fileId = result.result.id;
    
    console.log(`Created file: ${fileId}`)
    return fileId;
  }catch(resultErrors) {
    const errors = resultErrors.result.error.errors;
    console.log(`copyNotesDocTemplate errors: ${errors}`);

    if( errors.length === 1 && errors[0].reason === "notFound" ){

      const errorMessage = errors[0].message;

      // Get the id of the folder or file not found
      // Just extracting the id from the error message since it's not available as a property on
      // the error :-/
      const notFoundId = errorMessage.substring(errorMessage.indexOf(": ")+2, errorMessage.length-1);

      if(notFoundId === meetingNotesTemplate.id) {
          // Set the mesage to an application level message
        errors[0].originalMessage = errors[0].message;
        errors[0].message = `Could not find the notes template file: ${meetingNotesTemplate.name}.`;
      } else if (notFoundId === meetingNotesFolder.id) {
        // Set the mesage to an application level message
        errors[0].originalMessage = errors[0].message;
        errors[0].message = `Could not find the notes destination folder: ${meetingNotesFolder.name}.`;
      }
    }

    throw errors;
  }
}


/**
 * Handle the add notes button clicked
 */
const handleAddNotesButtonClicked = async ({meetingNotesTitle, meetingNotesTemplate, meetingNotesFolder, meetingNotesSharing}) => {
  console.log(`handleAddNotesButtonClicked: ${meetingNotesTitle}`);

  
  const token = await setGapiToken();
  var errors = [];
  var fileId;
  try{
    fileId = await copyNotesDocTemplate(meetingNotesTitle, meetingNotesTemplate, meetingNotesFolder);
  }catch(copyFileErrors) {
    console.log(`handleAddNotesButtonClicked.copyFileErrors: ${JSON.stringify(copyFileErrors)}`);
    errors = errors.concat(copyFileErrors);
    throw errors;
  }

  try {
    await setMeetingNotesSharing(fileId, meetingNotesSharing);
    return fileId;
  }
  catch(sharingErrors) {
    console.log(`handleAddNotesButtonClicked.sharingErrors: ${JSON.stringify(sharingErrors)}`);
    errors = errors.concat(sharingErrors);
    try{
      await deleteGoogleDriveFile(fileId);
    }catch(fileDeleteErrors) {
      console.log(`handleAddNotesButtonClicked.fileDeleteErrors: ${JSON.stringify(fileDeleteErrors)}`);
      errors = errors.concat(fileDeleteErrors);
     }
     console.log(`handleAddNotesButtonClicked.errors: ${JSON.stringify(errors)}`);
     throw errors;
  }
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
    console.log(`setGoogleDriveFileSharingPrivate success!`);
  }catch(sharingErrors) {
    const errors = sharingErrors.result.error.errors;
    console.log(`setGoogleDriveFileSharingPrivate errors: ${JSON.stringify(errors)}`);
    try{
      await deleteGoogleDriveFile(fileId);
    }
    catch(deleteErrors) {
      errors.push(deleteErrors.result.error.errors);
    }
    throw errors
  }
} 

const setGoogleDriveFileSharingDomain = async (fileId, userDomain) => {
  try{
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
  }catch(errors) {
    console.log(`setGoogleDriveFileSharingDomain errors: ${errors}`);

    if( errors.length === 1 && errors[0].reason === "insufficientFilePermissions" ){
      // Set the mesage to an application level message
      errors[0].originalMessage = errors[0].message;
      errors[0].message = `You do not have permissions to share this file with the ${userDomain} domain.`;
    }

    throw errors;
  }
}

const setGoogleDriveFileSharingPublic = async (fileId) => {
  console.log(`setGoogleDriveFileSharingPublic ${fileId}`);
  try{
    await setGoogleDriveFilePermissions(
      fileId,
      {
        role: "writer",
        type: "anyone",
        withLink: false,
        allowFileDiscovery: true
      }
    );
  }catch(errors) {
    console.log(`setGoogleDriveFileSharingPublic errors: ${errors}`);

    if( errors.length === 1 && errors[0].reason === "insufficientFilePermissions" ){
      // Set the mesage to an application level message
      errors[0].originalMessage = errors[0].message;
      errors[0].message = `You do not have permissions to share this file as public.`;
    }

    throw errors;
  }
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
  (message, sender, sendResponse) => {
    console.log(`Message received: ${JSON.stringify(message)}`);
     // setGapiToken();
  
    switch(message.type) {
      case "addNotes":
        handleAddNotesButtonClicked(message).
          then( 
            (fileId)=>{
              console.log(`handleAddNotesButtonClicked 1: ${fileId}`);
              sendResponse({meetingNotesDocUrl: getGoogleDocUrlForId(fileId)});
              console.log(`handleAddNotesButtonClicked 2`);
            }
          ).catch(
            (errors) => {
              console.log(`handleAddNotesButtonClicked 2 errors: ${JSON.stringify(errors)}`);
              sendResponse({errors});
            }
          );
  
        break;
      case "listGoogleDrive":
        listGoogleDrive(message.listParams). 
            then(
              (filesList) => {
                console.log(`listGoogleDrive 1: ${filesList}`);
                sendResponse({filesList});
              }
            ).catch(
              (errors) => {
                console.log(`listGoogleDrive errors buzz: ${errors.toString()}`);
                console.log(`listGoogleDrive errors: ${JSON.stringify(errors)}`);
                sendResponse({errors});
              } 
            );

    }
    
    return true;

  }
);

const getGoogleDocUrlForId = (googleFileId) => {
  return `https://docs.google.com/document/d/${googleFileId}/edit?usp=sharing`
}

function flatten(obj) {
  var result = Object.create(obj);
  for(var key in result) {
      result[key] = result[key];
  }
  return result;
}

const retry = async (numberOfTimesToRetry, func, ...parms) => {
  for (let i = 0; i < n; i++) {
    try {
      return await func(parms);
    } catch {}
  }

  throw new Error(`Failed retrying ${n} times`);
}

const listGoogleDrive = async (listParams) => {
  
    console.log(`listGoogleDrive: listingFiles Fooz`);

    try{
      await gapi.client.load(DISCOVERY_DOCS+"foo");
      console.log("listGoogleDrive gapi client loaded");
    }catch(e) {
      console.log(`listGoogleDrive gapi.client.load error ${e.toString()}`);
      console.log(`listGoogleDrive gapi.client.load error2 ${JSON.stringify(e.toString())}`);
    }

    var filesList = [];
    try{
      do {
        if(!gapi.client.drive.files) {
          console.log(`listGoogleDrive: listingFiles File api.client.drive.files not found`);
        } else {
          console.log(`listGoogleDrive: listingFiles File api.client.drive.files found`);
        }

        const response = await gapi.client.drive.files.list(listParams);
        console.log(`listGoogleDrive: Page: ${JSON.stringify(response)}`);
        
        listParams.pageToken = response.result.nextPageToken;
        filesList = filesList.concat(response.result.files);
      }while(listParams.pageToken)
      

      console.log(`listGoogleDrive: ${JSON.stringify(filesList)}`);

      return filesList;
    }
    catch(e) {
      console.log(`listGoogleDrive errors bizz: ${e.toString()}`);
      const errors = e.result.error.errors;
      console.log(`listGoogleDrive errors foo: ${JSON.stringify(flatten(e))}`);
      console.log(`listGoogleDrive errors: ${JSON.stringify(errors)}`);
      throw errors;
    }
    console.log(`listGoogleDrive: listingFiles`);
   
  }
   