/*
 * Wazuh app - Class for Wazuh-API functions
 * Copyright (C) 2015-2020 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

// Require some libraries
import { ErrorResponse } from './error-response';
import { getConfiguration } from '../lib/get-configuration';
import { read } from 'read-last-lines';
import path from 'path';
import { log } from '../logger';
import { UpdateConfigurationFile } from '../lib/update-configuration';
import jwtDecode from 'jwt-decode';
import { WAZUH_ROLE_ADMINISTRATOR_ID } from '../../util/constants';
import { ManageHosts } from '../lib/manage-hosts';
import { ManageNidsHosts } from '../lib/manage-nids-hosts';
import { ApiInterceptor } from '../lib/api-interceptor';
const updateConfigurationFile = new UpdateConfigurationFile();

export class WazuhNidsCtrl {
  /**
   * Constructor
   * @param {*} server
   */
  constructor(server) {
    this.manageNidsHosts = new ManageNidsHosts();
  }

  /**
   * Returns nodes from master
   * @param {Object} req
   * @param {Object} reply
   * @returns {Object} Configuration File or ErrorResponse
   */
  async getNodes(req, reply) {
    try {
      const data = await this.manageNidsHosts.getNodes();      
      return {
        statusCode: 200,
        error: 0,
        data: (data || [])
      };
    } catch (error) {
      return ErrorResponse(error.message || error, 3019, 500, reply);
    }
  }

  /**
   * Delete selected node
   * @param {Object} req
   * @param {Object} reply
   * @returns {Object} Configuration File or ErrorResponse
   */
  async deleteNode(req, reply) {
    try {
      const data = await this.manageNidsHosts.deleteNode(req.payload);      
      return {
        statusCode: 200,
        error: 0,
        data: []
      };
    } catch (error) {
      return ErrorResponse(error.message || error, 3019, 500, reply);
    }
  }

  /**
   * Add new node
   * @param {Object} req
   * @param {Object} reply
   * @returns {Object} Configuration File or ErrorResponse
   */
  async enrollNode(req, reply) {
    try {
      const data = await this.manageNidsHosts.enrollNode(req.payload);      
      return {
        statusCode: 200,
        error: 0,
        data: []
      };
    } catch (error) {
      return ErrorResponse(error.message || error, 3019, 500, reply);
    }
  }

}
