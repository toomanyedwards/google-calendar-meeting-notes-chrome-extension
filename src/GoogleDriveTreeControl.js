/*global chrome*/

import React from "react";

import LazyTreeView from './LazyTreeView';
import DocumentIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';

const GoogleDriveTreeControl = ({open, onSelectionChanged, selectingFolder=false}) => {
  
  const loadFolderChildNodes = async  (folderId="root") => {
    
    const folderListing = await listGoogleDrive(folderId, selectingFolder)
  
    return folderListing.map(
      folderChild => {
        const isFolder = folderChild.mimeType === "application/vnd.google-apps.folder";
        return {
          id: folderChild.id,
          name: folderChild.name,
          icon: isFolder?FolderIcon:DocumentIcon,
          mayHaveChildren: isFolder
        }
      }
    );
  }

  return (<LazyTreeView open onSelectionChanged={onSelectionChanged} loadChildNodes={loadFolderChildNodes} allowParentNodeSelection={selectingFolder}/>);

}


const listGoogleDrive = (folderId="root", selectFolder) => {
    return new Promise(
    (resolve, reject) => {
      chrome.runtime.sendMessage(
        {
          type: "listGoogleDrive",
          listParams: {
            orderBy:"folder, name",
            q:`'${folderId}' in parents and trashed=false ${selectFolder?'and mimeType = \'application/vnd.google-apps.folder\'':''}`,
            //pageSize: 10,
            fields: "nextPageToken, files(id, name, mimeType)"
          }
        }, 
        response => {
            console.log(`listGoogleDrive response: ${JSON.stringify(response)}`);
            
            if(response.filesList) {
              resolve(response.filesList);
            } else {
              const errors = response.errors;
              console.log(`listGoogleDrive errors: ${errors}`);
              reject(errors);
            }
            resolve(response);
        }
      )  
    }
  );
}


export default GoogleDriveTreeControl;
