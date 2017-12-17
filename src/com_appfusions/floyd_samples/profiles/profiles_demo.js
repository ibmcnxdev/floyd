var __floydHooks = __floydHooks || [];
(function(hooks) {

    console.log("Floyd - profiles demo loaded");

    hooks.push(function(floyd) {
        // floyd.loader.loadCss('/files/customizer/com_appfusions/floyd_samples/profiles/css/profilesCustomization.css?repoName=floyd');
    })
    hooks.push({ 
        query: '#friendsSection', 
        callback: function(floyd) {
            floyd.apps.runApplication('#socialTagsSection', 'before', '/files/customizer/com_appfusions/floyd_samples/profiles/social/index.html?repoName=floyd', '100%', '40px', false, false, { test: 'blue' } );
            floyd.apps.runApplication('#profileHeader', 'after', '/files/customizer/com_appfusions/floyd_samples/common/index.html?repoName=floyd', '100%', '40px', false, false, { test: 'blue' } );
            floyd.apps.runApplication('#friendsSection', 'after', '/files/customizer/com_appfusions/floyd_samples/profiles/myPayroll/index.html?repoName=floyd', '100%', '200px', false, false, { test: 'blue' } );
            floyd.apps.runApplication('#friendsSection', 'after', '/files/customizer/com_appfusions/floyd_samples/profiles/myLearning/index.html?repoName=floyd', '100%', '200px', false, false, { test: 'blue' } );
        } 
    });

    if (require('floyd')) {
        require('floyd').start();
    } 
        
})(__floydHooks)