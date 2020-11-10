/*
 * Wazuh app - Module for Wazuh utils routes
 * Copyright (C) 2015-2020 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { WazuhNidsCtrl } from '../controllers';

export async function WazuhNidsRoutes(server) {
  const ctrl = new WazuhNidsCtrl(server);

  // Get nids nodes
  await server.route({    
    method: 'GET',
    path: '/nids/nodes',
    handler(req, reply) {
      return ctrl.getNodes(req, reply);
    }
  });

  // Delete specific node
  server.route({
    method: 'PUT',
    path: '/nids/node/delete',
    handler(req, reply) {      
      return ctrl.deleteNode(req, reply);
    }
  });

  // Add new node
  server.route({
    method: 'POST',
    path: '/nids/node/enroll',
    handler(req, reply) {      
      return ctrl.enrollNode(req, reply);
    }
  });

}