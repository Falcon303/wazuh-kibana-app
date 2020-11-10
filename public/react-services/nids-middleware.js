import React from 'react'
import { NidsRequest } from './nids-request'
import { getAllNodes } from '../redux/actions/nidsActions';
import { useSelector, useDispatch } from 'react-redux';
import { withReduxProvider } from '../components/common/hocs';

// export async function MDeleteNode (params) {
//     console.log("MDelete");
//     const data = await NidsRequest.genericReq('PUT', '/nids/node/delete', params);  
//     GetAllNodes()
// }