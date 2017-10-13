/*
*
* Client side Javascript API for interacting with Floyd Connections Micro-App container
*
* You will need to include this script into your App html file to simply enable communication & features
*
*/
(function() {
    
    var cnxApp = window.cnxApp || {
    
        MODE_VIEW : 'View',
        MODE_EDIT : 'Edit',
    
        _queryParams : {},
        _initHandler : null,
        _propertiesCallBack : null,
        _topicCallback : null,
    
        messageListener : null,
    
        _init : function(widgetContext) {
            if (typeof this._initHandler === "function") {
                this._initHandler(widgetContext);
            }
        },
        // Sets the callBack function to be called when the context is passed to the widget
        onInit : function(callBack) {
            this._initHandler = callBack;
        },
        appReady : function() {
            parent.postMessage({
                'command' : 'appReady',
                'widgetInstanceId' : this._queryParams.widgetInstanceId
            }, '*');
        },
        // Sends the container a message to adjust the iWidget / iFrame height
        setHeight : function(height) {
    
            if (typeof height === 'undefined') {
                console.log('Computing height');
                var body = document.body, html = document.documentElement;
                height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
            }
    
            parent.postMessage( {
                'command' : 'setHeight',
                'height' : height,
                'widgetInstanceId' : this._queryParams.widgetInstanceId
            }, '*');
        },
        // Sets the "widgetTitle" property of the iWidget. Only available to a user with ownership rights over the widget/community
        setTitle : function(newTitle) {
            parent.postMessage( {
                'command' : 'setTitle',
                'title' : newTitle,
                'widgetInstanceId' : this._queryParams.widgetInstanceId
            }, '*');
        },
    
        // Set and stores a proerty in the iWidget storage area for the instance, requires author rights, so use only in config mode
        setProperty : function(propertyName, value, commit) {
            var doCommit = commit || false;
    
            parent.postMessage( {
                'command' : 'setProperty',
                'name' : propertyName,
                'value' : value,
                'commit' : doCommit,
                'widgetInstanceId' : this._queryParams.widgetInstanceId
            }, '*');
        },
    
        // Sends a message to the container to push all the settings from the widget instance propertySet
        getProperties : function(callbackFunction) {
            this._propertiesCallBack = callbackFunction;
            parent.postMessage( {
                'command' : 'getProperties',
                'widgetInstanceId' : this._queryParams.widgetInstanceId
            }, '*');
        },
    
        // openWindow mimics window.open to open windows without sandbox contraints
        openWindow : function(urlToOpen,name,specs,replace) {
            parent.postMessage( {
                'command' : 'openWindow',
                'url' : urlToOpen,
                'name' : name,
                'specs' : specs,
                'replace' : replace,
                'widgetInstanceId' : this._queryParams.widgetInstanceId
            }, '*');
        },
    
        // Sends data to a different widget in the page, matching happens on widgetAlias(es)
        sendToTopic : function(topic, message) {
            parent.postMessage( {
                'command' : 'sendToTopic',
                'topic' : topic,
                'message' : message,
                'widgetInstanceId' : this._queryParams.widgetInstanceId
            }, '*');
        },
    
        // Sets a name for this widget to allow widget-2-widget communication
        registerForTopic : function(topic, callbackOnData) {
            if (typeof callbackOnData !== 'undefined') {
                this._topicCallback = callbackOnData;
            }
            parent.postMessage( {
                'command' : 'registerForTopic',
                'topic' : topic,
                'widgetInstanceId' : this._queryParams.widgetInstanceId
            }, '*');
       },
    
        appDialog : function(title, iFrameUrl, width, height) {
            parent.postMessage( {
                'command' : 'appDialog',
                'title' : title,
                'iFrameUrl' : iFrameUrl,
                'width' : width | '900',
                'height' : height | '500',
                'widgetInstanceId' : this._queryParams.widgetInstanceId
            }, '*');
        }
    
    };
    
        // Extact parameters from query string
        var hash;
        var hashes = window.location.search.slice(1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            cnxApp._queryParams[hash[0]] = hash[1];
        }
    
        if (typeof cnxApp._queryParams.widgetInstanceId === 'undefined') {
            console.log('[E] cannot get widgetInstanceId from URL', location.href);
        }
    
        cnxApp.messageListener = window.addEventListener('message', function(event) {
            // If event is valid then check type and passa data to cnxApp;
            if (typeof event.data === 'object') {
                if (typeof event.data.source === 'object' &&
                    event.data.source.resourceType === 'community') {
                        cnxApp._init(event.data);
                } else if (typeof event.data.command === 'string') {
                    if (event.data.command === 'appProperties') {
    
                    } else if (event.data.command === 'topicMessage') {
                        if (typeof cnxApp._topicCallback === 'function') {
                            cnxApp._topicCallback(event.data.message)
                        } else {
                            console.log("[W] no callback defind for topicMessage");
                        }
                    }
                }
            }
        }, false);
    
    
    window.cnxApp = cnxApp;
    
    })();