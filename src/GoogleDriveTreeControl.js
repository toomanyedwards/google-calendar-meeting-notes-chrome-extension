/*global chrome*/

import React, {useEffect} from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { makeStyles } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import DocumentIcon from '@material-ui/icons/Description';
import Typography from "@material-ui/core/Typography";



const useTreeItemStyles = makeStyles(theme => ({
  
    content: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      "$expanded > &": {
        fontWeight: theme.typography.fontWeightRegular
      }
    },
   
    expanded: {},
    label: {
      fontWeight: "inherit",
      color: "inherit"
    },
    labelRoot: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0.5, 0)
    },
    labelIcon: {
      marginRight: theme.spacing(1)
    },
    labelText: {
      fontWeight: "inherit",
      flexGrow: 1
    }
  }));

  function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const {
      labelText,
      labelIcon: LabelIcon,
      labelInfo,
      color,
      bgColor,
      ...other
    } = props;
  
    return (
      <TreeItem
        
        label={
          <div className={classes.labelRoot}>
            <LabelIcon color="inherit" className={classes.labelIcon} />
            <Typography variant="body2" className={classes.labelText}>
              {labelText}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </div>
        }
        style={{
          "--tree-view-color": color,
          "--tree-view-bg-color": bgColor
        }}
        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          group: classes.group,
          label: classes.label
        }}
        {...other}
      />
    );
  }

const { useState } = React;

const ROOT_NODE_ID = "root";


const GDTCTreeItem = (props) => {
    const {labelIcon} = props;

    
    return (
        <TreeItem 
            onMouseEnter={(event)=>{console.log(`onMouseEnter: ${event.relatedTarget.tagName}`)}}
            {...props}
            label= {labelIcon}        
        />
    );
}

const GoogleDriveTreeControl = ({open, onSelectionChanged}) => {
    const [treeData, setTreeData] = useState({});
    
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState("");
    const [isTreeInitialized, setTreeInitialized] = useState(false);


    const addChildNodes = (parentId, childNodes) => {
        console.log(`addChildNodes`)
        var treeNodeMap = new Map(treeData.treeNodeMap);
        
        var parentNode = treeNodeMap.get(parentId);
        if(parentNode) {
            parentNode.childrenLoaded = true;
            treeNodeMap.set(parentId, parentNode);
        }
        
        var childNodeIds = [];
        childNodes.map( childNode => {
                console.log(`Adding child node: ${childNode.id} ${JSON.stringify(childNode)}`);
                treeNodeMap.set(childNode.id, childNode); 
                childNodeIds.push(childNode.id);
            }
        );

        var nodeChildrenMap = new Map(treeData.nodeChildrenMap);

        nodeChildrenMap.set(parentId, childNodeIds);

        setTreeData(
            {
                treeNodeMap,
                nodeChildrenMap

            }
        );
        //setNodeChildrenMap(new Map(nodeChildrenMap.set(parentId, childNodeIds)));
    }

    const renderTreeItems = (nodeId) => {
        console.log(`rendering: ${nodeId}`);
        if(!treeData.nodeChildrenMap) {
            return null;
        }
        const nodeChildrenIds = treeData.nodeChildrenMap.get(nodeId);
        if(nodeId === ROOT_NODE_ID) {
            if(Array.isArray(nodeChildrenIds)) {
                return nodeChildrenIds.map((childId) => renderTreeItems(childId));
            }
            else {
                return null;
            }
        } else {
            const node = treeData.treeNodeMap.get(nodeId);    

            const icon = node.isFolder?FolderIcon:DocumentIcon;
            

            if(node.isFolder && !node.childrenLoaded) {
                return (<StyledTreeItem labelIcon={icon}  key={nodeId} nodeId={nodeId} labelText={node.name}><div>Loading...</div></StyledTreeItem>)
            }
            else {
                console.log("rendering children")
                return (
                    <StyledTreeItem labelIcon={icon} key={nodeId} nodeId={nodeId} labelText={node.name}>
                        {Array.isArray(nodeChildrenIds) ? nodeChildrenIds.map((childId) => renderTreeItems(childId)) : null}
                    </StyledTreeItem>
                );
            }
        }    
    }
        
    useEffect(() => {
        async function initializeTreeItems() {
          console.log(`useEffect 1`);
          if(open && !isTreeInitialized) {
            console.log(`useEffect 2`);
            const filesList = await listGoogleDrive();
            
            const childNodes = filesList.map(
                file => {
                    return {
                        id: file.id,
                        name: file.name,
                        isFolder: file.mimeType === "application/vnd.google-apps.folder",
                        childrenLoaded: false
                    };
                }
            )
            console.log(`childNodes: ${JSON.stringify(childNodes)}`);

            addChildNodes(ROOT_NODE_ID, childNodes);
            
            
            
            console.log(`Initialized`);
            setTreeInitialized(true);
            
          } else if (!open) {
            // Invalidate the nodes when the component is hidden
            // Perhaps optimize and support explicit refresh later
            setTreeInitialized(false);
          }
        }
    
        initializeTreeItems();
      })


    
    
    
    const onNodeToggle = (event, nodeIds) => {
        console.log(`onNodeToggle: ${JSON.stringify(nodeIds)}`);
        const expandingNodes = nodeIds.filter(x => !expanded.includes(x));
        setExpanded(nodeIds);

        if (expandingNodes[0]) {
            const nodeId = expandingNodes[0];
            const node = treeData.treeNodeMap.get(nodeId);

            console.log(`onNodeToggle 2: ${JSON.stringify(node)}`);

            if(!node.childrenLoaded) {
                listGoogleDrive(nodeId).then(
                    filesList => {
                        const childNodes = filesList.map(
                            file => {
                                return {
                                    id: file.id,
                                    name: file.name,
                                    isFolder: file.mimeType === "application/vnd.google-apps.folder",
                                    childrenLoaded: false
                                };
                            }
                        )
                        console.log(`childNodes: ${JSON.stringify(childNodes)}`);
            
                        addChildNodes(nodeId, childNodes);
                    }
                    
                
                );
            } 
            
        }

    }
    const onNodeSelect = (event, nodeId) => {
        const node = treeData.treeNodeMap.get(nodeId)
        console.log(`onNodeSelect`);
        /*if (event.target.closest('.MuiTreeItem-iconContainer')) {
            return;
        }*/
        // Don't select folders
        if(node.isFolder) {
            return;
        }

    

        if (selected === nodeId) {
            console.log(`Deselected: ${node.name}`);
            setSelected("");
            onSelectionChanged(null);
        } else {
            console.log(`Selected: ${node.name}`);
            setSelected(nodeId);
            onSelectionChanged(node);
        }
    }

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expanded}            
            onNodeToggle={onNodeToggle}
            onNodeSelect={onNodeSelect}
            selected={selected}
            


        >
        {renderTreeItems(ROOT_NODE_ID)}
        </TreeView>
    );
}

export default GoogleDriveTreeControl;

const listGoogleDrive = (folderId="root") => {
    return new Promise(
    (resolve, reject) => {
      chrome.runtime.sendMessage(
        {
          type: "listGoogleDrive",
          listParams: {
            orderBy:"folder, name",
            q:`'${folderId}' in parents and trashed=false`,
            pageSize: 10,
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
