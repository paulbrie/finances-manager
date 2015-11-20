function intval(val) {
    return parseInt(val) > 0;
}

function isBool(val) {
  if (val == 0 || val == 1) {
    return true;
  }

  return false;
}

/**
 * defines the list of public and private methods of the api
 * for example tasks_get maps /api/tasks/get with the model tasks and the method getTasks
 */
var dictionary = {

  movements_get: {
    expose: true,
    model: 'movements',
    method: 'get',
    params: {},
    authenticated: false
  },
  movements_delete: {
    expose: true,
    model: 'movements',
    method: 'del',
    params: {
      id: {
        constraint: "[0-9]+",
        required: true
      }
    },
    authenticated: false
  },
  movements_add: {
    expose: true,
    model: 'movements',
    method: 'add',
    params: {
      date: {
        constraint: ".+",
        required: true
      },
      from: {
        constraint: "[0-9]",
        required: true
      },
      to: {
        constraint: "[0-9]",
        required: true
      },
      amount: {
        constraint: ".+",
        required: true
      },
      title: {
        constraint: ".+",
        required: true 
      },
      description: {
        constraint: ".+",
        required: false 
      },
      type: {
        constraint: "[0-9]",
        required: true  
      }
    },
    authenticated: false
  },
  movements_update: {
    expose: true,
    model: 'movements',
    method: 'update',
    params: {
      id: {
        constraint: "[0-9]+",
        required: true
      },
      date: {
        constraint: ".+",
        required: true
      },
      from: {
        constraint: "[0-9]",
        required: true
      },
      to: {
        constraint: "[0-9]",
        required: true
      },
      amount: {
        constraint: ".+",
        required: true
      },
      title: {
        constraint: ".+",
        required: true 
      },
      description: {
        constraint: ".+",
        required: false 
      },
      type: {
        constraint: "[0-9]",
        required: true  
      }
    },
    authenticated: false
  },
  categories_get: {
    expose: true,
    model: 'categories',
    method: 'get',
    params: {},
    authenticated: false  
  },
  users_login: {
    expose: true,
    model: 'users',
    method: 'login',
    params: {
      user: {
        constraint: ".+",
        required: true
      },
      password: {
        constraint: ".+",
        required: true
      }
    },
    authenticated: false
  }
};

function loadResource(req, callback) {
    console.log("\n\n###### API loadResource ######");
    // is the call done by the program itself?
    if(req.internalCall) {
        console.log("------- It is an internal call\n -------", req.internalCall);
        var resource        = req.internalCall.resource;
        var method          = req.internalCall.method;
        var externalParams  = req.internalCall.params || {};

    // else it is a http call
    } else if (req.route.methods.post) {
        console.log("------- It is a POST call -------\n", req.params, req.body);
        var resource        = req.params.resource;
        var method          = req.params.method;
        var externalParams  = req.body || {};
    } else {
        console.log("------- It is a GET call -------\n", req.params);
        var resource        = req.params.resource;
        var method          = req.params.method;
        var externalParams  = req.params || {};
    }
    
    console.log("params", req);

    
    console.log("------- resource/call -------\n", "       " + resource + "/" + method);
    console.log("------- externalParams -------\n", externalParams);
    console.log("------- callback -------\n", callback);

    var endpoint = dictionary[resource + "_" + method];
    if(!endpoint.expose && !req.internalCall) {
        callback({result: false, msg: 'This endpoint does not exist.'});
    } else {
        var params      = {};
        // if this endpoint is defined in the dictionary
        if(endpoint) {
            if(endpoint.authenticated && !req.session.user.logged) {
                callback({result: false, msg: 'you must be logged'});
            } else {
                // load the model
                var model = require('../models/' + endpoint.model);
                // if we have parameters, inject them
                var check = "";
                //console.log("endpoint.params", endpoint.params);
                if(endpoint.params) {
                    var i = 1;
                    for (var param in endpoint.params) {
                        var key = req.internalCall || req.route.methods.post ? param : "param" + i;
                        /**
                         * TODO: is required mechanism at param level
                         */

                        // if the parameter exists, prepare it for the model
                        if(key in externalParams) {
                            // if constraint is of type regex
                            if(typeof endpoint.params[param].constraint == "string") {
                                var regEx = new RegExp(endpoint.params[param].constraint, 'gi');
                                if(externalParams[key].match(regEx) == null) {
                                    console.log("---- is null");
                                    check += "Parameter " + param + " is not accepted. ";
                                }
                                // else it is a function
                            } else {
                                if(!endpoint.params[param].constraint(externalParams[key])) {
                                    check += "Parameter " + param + "(" +
                                    externalParams[key] + ") is not accepted. ";
                                }
                            }
                            params[param] = externalParams[key];
                        } else {
                            if(endpoint.params[param].required) {
                              check += "parameter " + param + " is required";  
                            }
                            console.log("parameter " + param + " does not exist");
                        }

                        i++;
                    }
                }
                if(check !== "") {
                    callback({result: false, msg: check});
                } else {
                    // invoke the endpoint
                    model[dictionary[resource + "_" + method].method](callback, params, req);
                }

            }
        } else {
            callback({result: false, msg: 'resource not found'});
        }
        console.log("###### API loadResource END ######\n\n");
    }
}

module.exports = function(app) {
    return {
        index: function(req, res, next) {
            res.set('Content-Type', 'application/json');
            loadResource(
                req,
                function(result) {
                    res.send(result);
                }
            );
        },
        loadResource: loadResource
    };
}