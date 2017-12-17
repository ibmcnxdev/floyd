"use strict";

var appEngine = {
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
}

export default appEngine;