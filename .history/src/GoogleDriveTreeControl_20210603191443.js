/*global chrome*/

import React, {useState} from "react";

import LazyTreeView from './LazyTreeView';
import DocumentIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';

const GoogleDriveTreeControl = ({onSelectionChanged, allowFolderSelection=false, fileMimeTypes=[], onErrors}) => {

  const [errors, setErrors] = useState([]);

  const GOOGLE_DRIVE_FOLDER_MIME_TYPE = "application/vnd.google-apps.folder";
  const mimeTypes = [GOOGLE_DRIVE_FOLDER_MIME_TYPE].concat(fileMimeTypes);
  
  const loadFolderChildNodes = async  (folderId="root") => {
    const folderListing = await listGoogleDrive(folderId, mimeTypes);
    
    return folderListing.map(
      folderChild => {
        const isFolder = folderChild.mimeType === GOOGLE_DRIVE_FOLDER_MIME_TYPE;
        return {
          id: folderChild.id,
          name: folderChild.name,
          icon: isFolder?FolderIcon:DocumentIcon,
          mayHaveChildren: isFolder
        }
      }
    );
  }

  const handleErrors = (errors) => {
    console.log(`GoogleDriveTreeControl: errors: ${errors.toString()}}`);
    setErrors(errors);
    onErrors(errors)
  }

  return (
    (errors.length !=0)?
      <div/>
    :
      <LazyTreeView open onSelectionChanged={onSelectionChanged} loadChildNodes={loadFolderChildNodes} allowParentNodeSelection={allowFolderSelection} onErrors={handleErrors} />

  );

}


const listGoogleDrive = (folderId="root", mimeTypes) => {
    console.log(`listGoogleDrive: folderId: ${folderId} mimeTypes: ${JSON.stringify(mimeTypes)}`);


    const mimeTypeQuery = (mimeTypes && mimeTypes.length != 0) ?"mimeType='" + mimeTypes.join("' or mimeType='") + "' ":"";
    console.log(`listGoogleDrive: mimeTypeQuery: ${mimeTypeQuery}`);
    const query = `'${folderId}' in parents and trashed=false` + (mimeTypes?` and (${mimeTypeQuery})`:"");

    console.log(`listGoogleDrive: query: ${JSON.stringify(query)}`);

    return new Promise(
    (resolve, reject) => {
      chrome.runtime.sendMessage(
        {
          type: "listGoogleDrive",
          listParams: {
            orderBy:"folder, name",
            q:query,
            //pageSize: 10,
            fields: "nextPageToken, files(id, name, mimeType)"
          }
        }, 
        response => {           
            if(response.filesList) {
              resolve(response.filesList);
            } else {
              const errors = response.errors;
              console.log(`listGoogleDrive errors: ${errors.toString())}`);
              reject(errors);
            }
            resolve(response);
        }
      )  
    }
  );
}


export default GoogleDriveTreeControl;
