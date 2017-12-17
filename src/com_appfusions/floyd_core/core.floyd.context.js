"use strict";

var contextSystem = {
    
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
    
}

export default contextSystem;