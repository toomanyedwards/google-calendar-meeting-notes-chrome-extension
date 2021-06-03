import React, {useEffect, useState} from "react";

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import Typography from "@material-ui/core/Typography";

// Icons
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


const useTreeItemStyles = makeStyles(
  theme => (
    {
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
    }
  )
);

const LazyTreeItem = (props) => {
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

/**
 * Tree view that lazily loads child nodes as parent nodes are expanded
 */
const LazyTreeView = ({loadChildNodes, onSelectionChanged, allowParentNodeSelection=false, onErrors}) => {
  const ROOT_NODE_ID="LazyTreeView_root";
     
  const [treeData, setTreeData] = useState(
    {
      nodeIdToNodeMap: new Map().set(
        ROOT_NODE_ID, 
        {
          id: ROOT_NODE_ID,
          name: ROOT_NODE_ID,
          mayHaveChildren: true,
          treePath: '/'
        }
      )
    }
  );
  // Array of ids of the expanded tree nodes
  const [expanded, setExpanded] = React.useState([]);
  // id of the selected node (if any)
  const [selected, setSelected] = React.useState("");
  const [errors, setErrors] = useState([]);
   
  
  const getNode = (nodeId) => {
    return treeData.nodeIdToNodeMap.get(nodeId);
  }

  const getChildNodeIds = (nodeId) => {
    return treeData.nodeIdToChildNodeIdsMap.get(nodeId);
  } 

  const getRootNode = () => {
    return getNode(ROOT_NODE_ID);
  }

  const isTreeInitialized = () => {
    return getRootNode().childrenLoaded;
  }

  useEffect(
    () => {
      async function loadRootChildren() {
        if(!isTreeInitialized()) {
          await addNodeChildren(ROOT_NODE_ID)
        }
      }
      loadRootChildren();
    },[]
  );

  const handleErrors = (errors) => {
    setErrors(errors);
    onErrors(errors);
  }

  const addNodeChildren = async (parentNodeId) => {
    
    var childNodes;

    try{
      childNodes = (parentNodeId === ROOT_NODE_ID)?await loadChildNodes():await loadChildNodes(parentNodeId);
    }
    catch(errors) {
      console.log(`LazyTreeView: addNodeChildren: Errors: ${JSON.stringify(errors)}`);
      handleErrors(errors);
      return;
    }

    const parentNode = getNode(parentNodeId);
    parentNode.childrenLoaded = true;

    const nodeIdToNodeMap = new Map(treeData.nodeIdToNodeMap);
    nodeIdToNodeMap.set(parentNodeId, parentNode);

    const childNodeIds = [];
    childNodes.map( 
      childNode => {
          childNode.treePath = `${parentNode.treePath}/${childNode.name}`;
          nodeIdToNodeMap.set(childNode.id, childNode); 
          childNodeIds.push(childNode.id);
        }
    );

    const nodeIdToChildNodeIdsMap = new Map(treeData.nodeIdToChildNodeIdsMap);

    nodeIdToChildNodeIdsMap.set(parentNodeId, childNodeIds);

    setTreeData(
        {
          nodeIdToNodeMap,
          nodeIdToChildNodeIdsMap
        }
    );

    return childNodes;
  }

  const onNodeSelect = (event, nodeId) => {
    const node = getNode(nodeId);
    
    // Prevent clicking the expander icon from triggering a selecion
    if (allowParentNodeSelection && event.target.closest('.MuiTreeItem-iconContainer')) {
        return;
    }

    // Don't select the node if it may have children and parent node selection
    // is not allowed
    if(node.mayHaveChildren && !allowParentNodeSelection) {
        return;
    }

    // Toggle selection of the node
    if (selected === nodeId) {
        setSelected("");
        onSelectionChanged(null);
    } else {
        setSelected(nodeId);
        onSelectionChanged(node);
    }
}

  const renderTreeItems = (nodeId) => {
   
    if(!isTreeInitialized()) {
      return null;
    }

    const node = getNode(nodeId);

    var children;
    if (node.mayHaveChildren) {
      if(node.childrenLoaded) {
        const childNodeIds = getChildNodeIds(nodeId);
        children = Array.isArray(childNodeIds) ? childNodeIds.map((childNodeId) => renderTreeItems(childNodeId)) : null;
      }
      else {
        children = <div>Loading...</div>
      }
    }

   if(nodeId === ROOT_NODE_ID) {
      return children;
    } else {
      return (
        <LazyTreeItem labelIcon={node.icon} key={nodeId} nodeId={nodeId} labelText={node.name}>
          {children}
        </LazyTreeItem>
      );
    }    
  }

  const onNodeToggle = (event, nodeIds) => {
    // If we allow parent node selection, don't toggle if the node label was the source of the toggle.
    // The expander icon only must be used in that situation since we don't want clicking
    // on the node label to trigger both a toggle and selection.
    if (allowParentNodeSelection && !event.target.closest('.MuiTreeItem-iconContainer')) {
      return;
    }
    // Get the ids of the newly expanded nodes
    const expandingNodes = nodeIds.filter(x => !expanded.includes(x));
    setExpanded(nodeIds);

    if (expandingNodes[0]) {
      const nodeId = expandingNodes[0];
      const node = getNode(nodeId);

      if(!node.childrenLoaded) {
        addNodeChildren(nodeId);
      }
    }
  }

  return (
    !isTreeInitialized()?
      (
        (errors.length === 0)?
          <div style={{
            position: 'relative',
            display:'flex',
            width:"100%",
            justifyContent: 'center'
            }}>
            <CircularProgress />
          </div>
          :
          <div/>
      )
    :
      (
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          onNodeToggle={onNodeToggle}
          onNodeSelect={onNodeSelect}
          expanded={expanded}
          selected={selected}
        >
          {renderTreeItems(ROOT_NODE_ID)}
        </TreeView>
      )
  );
}

export default LazyTreeView;