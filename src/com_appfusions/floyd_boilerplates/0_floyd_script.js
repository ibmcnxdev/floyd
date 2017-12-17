var __floydHooks = __floydHooks || [];
(function(hooks) {

    /*
    function installProfilesDemo() {
        console.log('Profiles initialized after loading floyd');
    }

    // Push function to be call immediately, regardless of timing
    hooks.push(installProfilesDemo);

    // Push function to be called when a DOM element is available, polling till it exists on page
    // Push to the hooks array as an object. See floyd_core/core.global.js for details
    
    hooks.push({ 
        query: '#friendsSection', 
        callback: function() { 
            console.log('Network is loaded');
            console.log(dojo.query('#friendsSection')[0]);
        } 
    });
    */

    if (require('floyd')) {
        require('floyd').start();
    } 
        
})(__floydHooks)