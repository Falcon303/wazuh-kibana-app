import React, { Component, Fragment, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import {
  EuiBasicTable,
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiToolTip,
  EuiTitle,
  EuiHealth,
  EuiSpacer,
  EuiCallOut,
  EuiOverlayMask,
  EuiConfirmModal,
  EuiDescribedFormGroup,
  EuiLoadingSpinner,
  EuiFlexGrid,
  EuiFieldText,
  EuiFormRow,
  EuiForm
} from '@elastic/eui';
// import { toastNotifications } from 'ui/notify';
// import { WzRequest } from '../../../react-services/wz-request';
// import { NidsRequest } from '../../../react-services/nids-request';
// import { ActionAgents } from '../../../react-services/action-agents';
// import { AppNavigate } from '../../../react-services/app-navigate';
// import { GroupTruncate } from '../../../components/common/util';
// import { WzSearchBar, filtersToObject } from '../../../components/wz-search-bar';
// import { getAgentFilterValues } from '../../../controllers/management/components/management/groups/get-agents-filters-values';
import { WzButtonPermissions } from '../../../components/common/permissions/button';
import { NidsRequest } from '../../../react-services/nids-request';
// import { ManageNidsHosts } from '../../../../server/lib/manage-nids-hosts';
// // import { EuiFlexItem, EuiFlexGroup, EuiSideNav, EuiIcon, EuiButtonEmpty, EuiToolTip } from '@elastic/eui';
// import chrome from 'ui/chrome';
// import axios from 'axios';
// import { log } from '../../../../server/logger';
// import { connect } from 'react-redux';
import { toggleAddNodeMenu } from '../../../redux/actions/nidsActions';
// import { withReduxProvider, withGlobalBreadcrumb, withUserAuthorizationPrompt } from '../../../components/common/hocs';
import { useSelector, useDispatch } from 'react-redux';
// import { compose } from 'redux';


const NidsAddNode = () => {
  const [newNodeData, setNewNodeData] = useState({
    name: "",
    ip: "",
    port: "",
    nodeuser: "",
    nodepass: "",
    agent: ""
  })
  const dispatch = useDispatch();

  const handleRequest = () => {
    const enrollData = {
      Node:newNodeData,
      Tags:[],
      Group:[],
      Orgs:[],
      Suricata:{}
  }
    var params = {
      method: "POST",
      path: '/node/enrollNewNode',
      data: enrollData
    }
    NidsRequest.genericReq('POST', '/nids/node/enroll', params)
  }
  

  const handleChangeEdit = (e) => {
    setNewNodeData({            
        ...newNodeData,
        [event.target.name]: event.target.value
    })
  }

  return (
    <div>
      <EuiPanel paddingSize="m">
        {/* Header */}
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFlexGroup>
              <EuiFlexItem>
                  <EuiTitle size={'s'} style={{ padding: '6px 0px' }}>
                    <h2>Add node </h2>
                  </EuiTitle>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <WzButtonPermissions
              buttonType='empty'
              iconType="cross"
              onClick={() => {
                  dispatch(toggleAddNodeMenu(false));
                }
              }
            >
              Close
            </WzButtonPermissions>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="xs" />
        {/* First row */}
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow label="Node name">
              <EuiFieldText name="name" aria-label="Node name" onChange={handleChangeEdit}/>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
        {/* Second row */}
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow label="Node IP">
              <EuiFieldText name="ip" aria-label="Node IP" onChange={handleChangeEdit}/>
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Node port">
              <EuiFieldText name="port" aria-label="Node port" onChange={handleChangeEdit}/>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
        {/* Third row */}
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow label="Node user">
              <EuiFieldText name="nodeuser" aria-label="Node user" onChange={handleChangeEdit}/>
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Node password">
              <EuiFieldText name="nodepass" aria-label="Node password" onChange={handleChangeEdit}/>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
        {/* Fiveth row */}
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow>
              <h4>Agents</h4>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiFlexGroup>
          <EuiFlexItem>
          <EuiFormRow label="Agent ID">
              <EuiFieldText name="agent" aria-label="Agent ID" onChange={handleChangeEdit}/>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
        {/* Fourth row */}
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow>
              <EuiButton onClick={() => {handleRequest()}}>Add</EuiButton>                
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </div>
  )
}

export default NidsAddNode