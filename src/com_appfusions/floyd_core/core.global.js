import FloydConfig from "./core.floyd.configsystem";
import FloydContext from "./core.floyd.context";
import FloydAppEngine from "./core.floyd.appengine";

var __floydHooks = __floydHooks || [];
/*
    AppFusions Floyd Core

    Author: Daniele Vistalli <dan@appfusions.com>
*/
(function(hooks) {

    var floyd = {
        version : '0.0.2alpha',

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
            var action;
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
        config : FloydConfig,
        apps : FloydAppEngine,
        context : FloydContext

    }

    // Make floyd available in the global namespace as __floyd.
    window.__floyd = floyd;
        
    // Experimental If dojo.define is available register floyd as a module under the name 'floyd'.
    if (window.define != null) {
        define('floyd',floyd);
    }
    
    floyd.config._initConfigFromAppRegistry();
        
    // As soon as loaded process the hooks queue
    floyd.start();

})(__floydHooks);

export default window.__floyd;