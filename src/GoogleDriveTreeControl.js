/*global chrome*/

import React, {useEffect} from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
const { useState } = React;

const ROOT_NODE_ID = "root";

const GoogleDriveTreeControl = ({open}) => {
    const [treeData, setTreeData] = useState({});
    
    const [expanded, setExpanded] = React.useState([]);
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
            
            if(node.isFolder && !node.childrenLoaded) {
                return (<TreeItem key={nodeId} nodeId={nodeId} label={node.label}><div>Loading...</div></TreeItem>)
            }
            else {
                console.log("rendering children")
                return (
                    <TreeItem key={nodeId} nodeId={nodeId} label={node.label}>
                        {Array.isArray(nodeChildrenIds) ? nodeChildrenIds.map((childId) => renderTreeItems(childId)) : null}
                    </TreeItem>
                );
            }
        }    
    }
        /*
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
          {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
      );
*/
    useEffect(() => {
        async function initializeTreeItems() {
          console.log(`useEffect 1`);
          if(open && !isTreeInitialized) {
            console.log(`useEffect 2`);
            const filesList = await listGoogleDrive();
            
            //setNodeChildrenMap(new Map());
            const childNodes = filesList.map(
                file => {
                    return {
                        id: file.id,
                        label: file.name,
                        isFolder: file.mimeType === "application/vnd.google-apps.folder",
                        childrenLoaded: false
                    };
                }
            )
            console.log(`childNodes: ${JSON.stringify(childNodes)}`);

            addChildNodes(ROOT_NODE_ID, childNodes);
            console.log(`useEffect 4`);
            /*
            setTreeItems(
                filesList.map(
                    file => {
                        if( file.mimeType === "application/vnd.google-apps.folder") {
                            return (
                                <TreeItem nodeId={file.id} label={file.name} childrenLoaded={false} children={<TreeItem nodeId="foo" label="bar"/>}>
                                    <div>Loading...</div>
                                </TreeItem>
                            );
                        }
                        else {
                            return (<TreeItem nodeId={file.id} label={file.name}/>);
                        }
                    }
                )
            );
            */
            //const filesList = await listGoogleDrive();
            //setTreeItems (<TreeItem id="1" label="Foo"/>);
            /*
            console.log(`useEffect 2`);
            const filesList = await listGoogleDrive();
            console.log(`useEffect 3: ${filesList}`);
            filesListToTreeNodes(filesList);*/
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
                                    label: file.name,
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
            /*fetchChildNodes(childId).then(result =>
              setChildNodes(
                result.children.map(node => <MyTreeItem key={node.id} {...node} />)
              
            );
          }
        listGoogleDrive(modes)
        */
        }

    }
    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expanded}            
            onNodeToggle={onNodeToggle}


        >
        {renderTreeItems(ROOT_NODE_ID)}
        </TreeView>
    );
}

export default GoogleDriveTreeControl;
/*
export default function MyTreeItem(props) {
  const [treeNodes, setTreeNodes] = useState(null);
  const [isTreeInitialized, setTreeInitialized] = useState(false);
  const [expanded, setExpanded] = React.useState([]);

  useEffect(() => {
    async function initializeTreeNodes() {
      console.log(`useEffect 1`);
      if(props.open && !isTreeInitialized) {
        
        console.log(`useEffect 2`);
        const filesList = await listGoogleDrive();
        console.log(`useEffect 3: ${filesList}`);
        filesListToTreeNodes(filesList);
        setTreeInitialized(true);
      } else if (!props.open) {
        // Invalidate the nodes when the component is hidden
        // Perhaps optimize and support explicit refresh later
        setTreeInitialized(false);
      }
    }

    initializeTreeNodes()
  })

  const filesListToTreeNodes = (filesList) => {
    
    setTreeNodes(
        filesList.map(file => <MyTreeItem key={file.id} {...file} />)
    )
  }
  
  function fetchChildNodes(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          children: [
            {
              id: "2",
              name: "Calendar"
            },
            {
              id: "3",
              name: "Settings"
            },
            {
              id: "4",
              name: "Music"
            }
          ]
        });
      }, 1000);
    });
  }

  const handleChange = (event, nodes) => {
    const expandingNodes = nodes.filter(x => !expanded.includes(x));
    setExpanded(nodes);
    if (expandingNodes[0]) {
      const childId = expandingNodes[0];
      /*fetchChildNodes(childId).then(result =>
        setChildNodes(
          result.children.map(node => <MyTreeItem key={node.id} {...node} />)
        
      );
    }
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      onNodeToggle={handleChange}
    >
        

        {/*{treeNodes || [<div key="stub" />]}
      
    </TreeView>
  );
}
*/
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
