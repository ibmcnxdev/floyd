"use strict";

import axios from 'axios';
import Floyd from './core.global';

var configSystem = {

    _initConfigFromAppRegistry : function() {

        axios.get("/appregistry/api/v3/extensions/?type=floyd.config&limit=100")
        .then(function (response) {
            
            Floyd.debug("Successfully loaded floyd config extensions: " + response.data.items.length);

            response.data.items.forEach(function(item) {
                item.payload.extensions.forEach(function(extension) {
                    if (extension.type == "css") {
                        Floyd.debug("[Floyd] Loading CSS: " + extension.url);
                        Floyd.loader.loadCss(extension.url);
                    } else if (extension.type == "js") {
                        Floyd.debug("[Floyd] Loading JS: " + extension.url);
                        Floyd.loader.loadJs(extension.url);
                    } else {
                        Floyd.debug("Unknown extension type for Floyd: " + extension);
                    }
                }
                );
            });
        })
        .catch(function(reason) {
            Floyd.debug("Error loading floyd config extensions");
            Floyd.debug(reason)
        })

    },

    plugins : {
        /*
        *   Plugins are a type of extension for floyd which is being designed.
        *   Ideally plugins will fall in the following categories
        *
        *   - Command plugins performing specific actions / patterns by name (eg. floyd.doCommand('commandname',parametersObject )
        *   - Context detection plugins. Functions that will extract from browser state information on context.
        *       eg.
                floyd.context.is('<checkname>') returns true/false.

                floyd.context.is('homepage')
                floyd.context.is('communities')
                floyd.context.is('communities/my')
                floyd.context.is('communities/member')
                floyd.context.is('communities/all')
                floyd.context.is('communities/invites')
                floyd.context.is('communities/community')
                floyd.context.is('communities/community/<uuid>')
                floyd.context.is('profiles/mine')
                floyd.context.is('profiles/others')
                floyd.context.is('profiles/others/sameorg')
                floyd.context.is('profiles/others/otherorg')
                floyd.context.is('profiles/search')

                floyd.context.get('<context information>') returns a value

                floyd.context.get('cnx.appname') returns the app ('homepage','profiles', 'activities' etc)

                floyd.context.matches('<matcher>','<value to match>') returns true/false. applies on the client side the 
                    same matching logic that customizer uses on the server. Allows for fine-grain, client side decisions.

                Context detection plugins will declare the scopes they cover at registration time.
                A scope is a "segment" in the query namespace. ()

        */
        registerPlugin : function(pluginName,  pluginObject) {
            /*
            * This will register in a safe way features updates into the Floyd plugin registry and into other handlers
            */
        }
    }

}

export default configSystem;