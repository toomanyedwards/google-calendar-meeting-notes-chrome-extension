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
const LazyTreeView = ({open, loadChildNodes, onSelectionChanged, allowParentNodeSelection=false, onErrors}) => {
  const ROOT_NODE_ID="LazyTreeView_root";
    /*
        treeData consists of two Maps:  
    */
  const [treeData, setTreeData] = useState({});
  // Array of ids of the expanded tree nodes
  const [expanded, setExpanded] = React.useState([]);
  // id of the selected node (if any)
  const [selected, setSelected] = React.useState("");
  const [errors, setErrors] = useState([]);
   // True, if the root children are loaded
  const [areRootChildrenLoaded, setRootChildrenLoaded] = useState(false);

  useEffect(
    () => {
      async function loadRootChildren() {
        if(open && !areRootChildrenLoaded) {
          if( await addNodeChildren(ROOT_NODE_ID)) {
            setRootChildrenLoaded(true);
            console.log(`Children loaded`);
          } else{
            console.log(`Children not loaded`);
          }
        } else if (!open) {
          // Invalidate the nodes when the component is hidden
          // Perhaps optimize and support explicit refresh later
          setRootChildrenLoaded(false);
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

    const nodeIdToNodeMap = new Map(treeData.nodeIdToNodeMap);

    if(parentNodeId != ROOT_NODE_ID) {
      const parentNode = nodeIdToNodeMap.get(parentNodeId);
      console.log(`Adding children to ${parentNode.name}`)
      parentNode.childrenLoaded = true;
      nodeIdToNodeMap.set(parentNodeId, parentNode);
    }

    const childNodeIds = [];
    childNodes.map( 
      childNode => {
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
    const node = treeData.nodeIdToNodeMap.get(nodeId);
    
    console.log(`onNodeSelect: allowParentNodeSelection:${allowParentNodeSelection}`);
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
        console.log(`Deselected: ${node.name}`);
        setSelected("");
        onSelectionChanged(null);
    } else {
        console.log(`Selected: ${node.name}`);
        setSelected(nodeId);
        onSelectionChanged(node);
    }
}

  const renderTreeItems = (nodeId) => {
   
    if(!areRootChildrenLoaded) {
      return null;
    }
    const childNodeIds = treeData.nodeIdToChildNodeIdsMap.get(nodeId);
    if(nodeId === ROOT_NODE_ID) {
      if(Array.isArray(childNodeIds)) {
        return childNodeIds.map((childNodeId) => renderTreeItems(childNodeId));
      }
      else {
        return null;
      }
    } 
    else {
      const node = treeData.nodeIdToNodeMap.get(nodeId);    

      if(node.mayHaveChildren && !node.childrenLoaded) {
        return (<LazyTreeItem labelIcon={node.icon}  key={nodeId} nodeId={nodeId} labelText={node.name}><div>Loading...</div></LazyTreeItem>)
      }
      else {
        return (
            <LazyTreeItem labelIcon={node.icon} key={nodeId} nodeId={nodeId} labelText={node.name}>
              {Array.isArray(childNodeIds) ? childNodeIds.map((childNodeId) => renderTreeItems(childNodeId)) : null}
            </LazyTreeItem>
        );
      }
    }    
  }

  const onNodeToggle = (event, nodeIds) => {
    console.log(`onNodeToggle: ${JSON.stringify(nodeIds)} allowParentNodeSelection: ${allowParentNodeSelection}`);

    // If we allow parent node selection, don't toggle if the node label was the source of the toggle.
    // The expander icon only must be used in that situation since we don't want clicking
    // on the node label to trigger both a toggle and selection.
    if (allowParentNodeSelection && !event.target.closest('.MuiTreeItem-iconContainer')) {
      return;
    }

    console.log(`onNodeToggle: toggling`);

    // Get the ids of the newly expanded nodes
    const expandingNodes = nodeIds.filter(x => !expanded.includes(x));
    setExpanded(nodeIds);

    if (expandingNodes[0]) {
      const nodeId = expandingNodes[0];
      const node = treeData.nodeIdToNodeMap.get(nodeId);

      if(!node.childrenLoaded) {
        addNodeChildren(nodeId);
      }
    }
  }

  return (
    !areRootChildrenLoaded?
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