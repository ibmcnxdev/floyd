var __floydHooks = __floydHooks || [];
(function(hooks) {

    console.log("Floyd - profiles demo loaded");

    hooks.push(function(floyd) {
        // floyd.loader.loadCss('/files/muse-static/com_appfusions/floyd_samples/profiles/css/profilesCustomization.css');
    })
    hooks.push({ 
        query: '#friendsSection', 
        callback: function(floyd) {
            floyd.apps.runApplication('#socialTagsSection', 'before', '/files/muse-static/com_appfusions/floyd_samples/profiles/social/index.html', '100%', '40px', false, false, { test: 'blue' } );
            floyd.apps.runApplication('#profileHeader', 'after', '/files/muse-static/com_appfusions/floyd_samples/common/index.html', '100%', '40px', false, false, { test: 'blue' } );
            floyd.apps.runApplication('#friendsSection', 'after', '/files/muse-static/com_appfusions/floyd_samples/profiles/myPayroll/index.html', '100%', '200px', false, false, { test: 'blue' } );
            floyd.apps.runApplication('#friendsSection', 'after', '/files/muse-static/com_appfusions/floyd_samples/profiles/myLearning/index.html', '100%', '200px', false, false, { test: 'blue' } );
        } 
    });

    if (require('floyd')) {
        require('floyd').start();
    } 
        
})(__floydHooks)