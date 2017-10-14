var __floydHooks = __floydHooks || [];
(function(hooks) {

    console.log("Floyd - homepage demo loaded");
    
    hooks.push(function(floyd) {
        // floyd.loader.loadCss('/files/muse-static/com_appfusions/floyd_samples/profiles/css/profilesCustomization.css?repoName=floyd');
    })
    hooks.push({

        // Use meetings as baseline
        query: '#72ff08f8-7111-4d31-8f85-fe99866219f2_container', 
        callback: function(floyd) {
            floyd.apps.runApplication('#72ff08f8-7111-4d31-8f85-fe99866219f2_container', 'before', '/files/muse-static/com_appfusions/floyd_samples/common/youtube-floyd.html?repoName=floyd', '100%', '240px', false, false, {  } );
            floyd.apps.runApplication('#activityStreamHeader', 'before', '/files/muse-static/com_appfusions/floyd_samples/common/index.html?repoName=floyd', '100%', '40px', false, false, {  } );
            floyd.apps.runApplication('#com_ibm_social_as_nav_ASSideNav_0', 'after', '/files/muse-static/com_appfusions/floyd_samples/common/index.html?repoName=floyd', '100%', '200px', false, false, {  } );
        } 
    });

    if (require('floyd')) {
        require('floyd').start();
    } 
        
})(__floydHooks)