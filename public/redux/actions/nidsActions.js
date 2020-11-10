import { NidsRequest } from '../../react-services/nids-request';

// export const getAllNodes = async ()=> {
export async function getAllNodes() {
  console.log("ACTIONS --> getAllNodes");
  const nodes = await NidsRequest.genericReq('GET', '/nids/nodes', {});
  console.log("nodes.data.data");
  console.log(nodes.data.data);
  // return (dispatch) => {
  return {
    type: 'NODES', 
    data: nodes.data.data
    // console.log("inside dispatch");
    // dispatch(accGetAllNodes(nodes.data.data))
  }
}
// function accGetAllNodes(nodes){
//   console.log("accGetAllNodes");
//   console.log(nodes);
//   return {
//     type: 'NODES', 
//     data: nodes
//   }
// };


/**
 * Toggle the tab selected for NIDS
 * @param {Boolean} tab
 */
export const changeTabSelected = value => {
    return {
      type: 'TAB',
      tab: value
    };
  };
  
  /**
   * Toggle Add node panel
   * @param {Boolean} 
   */
  export const toggleAddNodeMenu = value => {
    return {
      type: 'ADD_NODE',
      status: value
    };
  };