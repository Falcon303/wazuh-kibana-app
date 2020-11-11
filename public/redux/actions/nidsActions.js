import { NidsRequest } from '../../react-services/nids-request';

export function getAllNodes() {
  return async (dispatch) => {
    const nodes = await NidsRequest.genericReq('GET', '/nids/nodes', {});
    dispatch(accGetAllNodes(nodes.data.data))
  }
}
function accGetAllNodes(nodes){
  return {
    type: 'NODES', 
    payload: nodes
  }
};

export function deleteNode(uuid) {
  var params = {
    method: "DELETE",
    path: `/node/${uuid}`
  }             
  return async (dispatch) => {
    const data = await NidsRequest.genericReq('PUT', '/nids/node/delete', params);  
    dispatch(getAllNodes())
  }
}

export function addNode(nodeData) {
  var params = {
    method: "POST",
    path: '/node/enrollNewNode',
    data: nodeData
  }  
  return async (dispatch) => {
    const data = await NidsRequest.genericReq('POST', '/nids/node/enroll', params)        
    dispatch(getAllNodes())
  }
}

export function editNode(nodeData) {
  var params = {
    method: "PUT",
    path: '/node/updateNodeReact',
    data: nodeData
  }  
  return async (dispatch) => {
    const data = await NidsRequest.genericReq('PUT', '/nids/node/editNode', params)        
    dispatch(getAllNodes())
  }
}

/**
 * Toggle the tab selected for NIDS
 * @param {Boolean} tab
 */
export const changeTabSelected = value => {
  return {
    type: 'TAB',
    payload: value
  };
};
  
/**
 * Toggle Add node panel
 * @param {Boolean} 
 */
export const toggleAddNodeMenu = value => {
  return {
    type: 'ADD_NODE',
    payload: value
  };
};
  
/**
 * Put the node to edit
 * @param {String} 
 */
export const nodeForEdit = value => {
  return {
    type: 'EDIT_NODE',
    payload: value
  };
};