var __floydHooks = __floydHooks || [];
/*
    AppFusions Floyd Core

    Author: Daniele Vistalli <dan@appfusions.com>
*/
(function(hooks) {

    var floyd = {
        version : '0.0.1alpha',

        debugEnabled : true,

        debug: function(message) {
            if (!this.debugEnabled) return;
            console.log("Floyd.DEBUG " + message);
        },

        utils: {
            /*
            *
            * waitFor is an utility function from the Connections customizer samples codebase.
            * It's really helpful to attach "customizations" to delayed-loading ui elements in connections.
            *
            */
            waitFor : function(callback, elXpath, elXpathRoot, maxInter, waitTime) {
                floyd.debug("waitFor ["+elXpath+"] WATCH STARTED !!! interval "+waitInter+" (max:"+maxInter+")");
                if(!elXpathRoot) var elXpathRoot = dojo.body();
                if(!maxInter) var maxInter = 60;  // number of intervals before expiring
                if(!waitTime) var waitTime = 500;  // 1000=1 second
                if(!elXpath) return;
                var waitInter = 0;  // current interval
                var intId = setInterval( function(){
                    if( ++waitInter<maxInter && !dojo.query(elXpath,elXpathRoot).length) return;
                    clearInterval(intId);
                    if( waitInter >= maxInter) { 
                        floyd.debug("waitFor ["+elXpath+"] WATCH EXPIRED!!! interval "+waitInter+" (max:"+maxInter+")");
                    } else {
                        floyd.debug("waitFor ["+elXpath+"] WATCH TRIPPED AT interval "+waitInter+" (max:"+maxInter+")");
                        callback(floyd);
                    }
                }, waitTime);
            }

        },
        /* Startup function of Floyd, processes queued hooks */
        start: function() {
            this.debug("(start) Floyd is processing hooks");
            while (action = hooks.pop()) {
                // Fire actions that are hooked up
                // 1- can be a function, immediately fired
                // 2- can be an object
                // {
                //      callback: function()                                                // Mandatory
                //      query: xpath query selector for item to wait for                    // Mandatory
                //      root: undefined or additional selector to narrow down the DOM query // Optional | undefined
                //      retries: how main retries to do before giving up                    // Optional | undefined
                //      timeout: the delay in milliseconts between DOM scans                // Optional | undefined
                // }
                if (typeof action == 'function' ) {
                    this.debug('Starting action, immediate');
                    try {
                       action(floyd);
                    } catch(err) {
                        this.debug('Exception in callback');
                    }
                } else {
                    try {
                        this.debug('Starting action for query ' + action.query);
                        this.utils.waitFor(action.callback, action.query, action.root, action.retries, action.timeout);
                    } catch(err) {
                        this.debug("Invalid parameters passed in hook");
                    }
                }
            }
        },
        loader : {
            /*
            *
            * Resource loading services for Connections Customizer
            *
            * loadCss(url) : Injects in the head a CSS link to a local or remote resource
            * loadJs(url) : Injects in the head a <script> tag with local or remote resource
            *
            */
            loadCss : function(cssUrl) {
                var cssNode = document.createElement('link');
                cssNode.rel = "stylesheet";
                cssNode.type = "text/css";
                cssNode.href = cssUrl;
                document.head.appendChild(cssNode);
            },
            loadJs : function(jsUrl) {
                var script = document.createElement('script');
                script.src = jsUrl;
                /* script.onload = function () { console.log("Script loaded"); }; */
                document.head.appendChild(script);
            }

        },
        apps : {
            /*
            * The manager object holds a list of applications added to the page.
            * 
            * Key is the application name, value is an object with information for manipulating apps.
            */ 
            manager : {},

            /*
            * runCnxApplications installs an iFrame based application with the same capabilities
            * found in community apps.
            *
            * Parameters:
            * locator: 'query' | 'widget'
            * relation: 'before' | 'after'
            * appUrl : url of the iframe to be installed
            * width: requested width
            * height: requested height
            * debug: debug mode for the app
            * contextOnUrl: pass context information on iFrame url
            * options: any "options" object you want posted to the appIFrame
            */
            runApplication : function(locator, relation, appUrl, width, height, debug, contextOnUrl, options) {

                var width = width || '100%';
                var height = height || '100px';

                var appNode = dojo.place(
                    '<div style="width: ' + width + '; height: ' + height + '; " ><iframe src="' + appUrl + '" width="100%" height="100%" frameborder="0"></div>',
                    dojo.query(locator)[0],
                    relation
                );



            },
        },
        context : {

            is : function(contextQuestion) {

                // Default is to return false
                return false;
            },
            get : function(contextInformation) {

                // Default is to return null
                return null;
            },
            matches : function(matcher, valueToMatch) {

                // Default is to return false
                return false;
            }

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

    // If dojo.define is available register floyd as a module under the name 'floyd'.
    if (define) {
        define('floyd',floyd);
    }

    // Also make floyd available in the global namespace as __floyd.
    window.__floyd = floyd;
    
    // As soon as loaded process the hooks queue
    floyd.start();

})(__floydHooks);

