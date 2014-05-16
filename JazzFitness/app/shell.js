define(['plugins/router', 'durandal/app', 'viewmodels/user', 'knockout'], function (router, app, user, ko) {

  var vm = {
    router: router,
    user: user,
    search: search,
    activate: activate
  };

  function search() {
    //It's really easy to show a message box.
    //You can add custom options too. Also, it returns a promise for the user's response.
    app.showMessage('Search not yet implemented...');
  }

  function  activate() {
    router.map([
        { route: '',                           title: '',              moduleId: 'first'                                           },
        { route: 'welcome',                    title: 'Welcome',       moduleId: 'viewmodels/welcome'                              },
        { route: 'login',                      title: 'Login',         moduleId: 'viewmodels/login'                                },
        { route: 'logout',                     title: 'Logout',        moduleId: 'viewmodels/logout'                               },
        { route: 'register',                   title: 'Register',      moduleId: 'viewmodels/register'                             },
        { route: 'clients',                    title: 'Clients',       moduleId: 'viewmodels/clients',     nav: vm.user.isTrainer  },
        { route: 'client/:id',                 title: 'Client',        moduleId: 'viewmodels/client'                               },
        { route: 'workout',                    title: 'Workout',       moduleId: 'viewmodels/workout',     nav: true               },
        { route: 'session',                    title: 'Session',       moduleId: 'viewmodels/session',     nav: true               }
    ]);

    buildNavigationModel();
    subscribeToNavChanges();

    router.activate();
  }

  function buildNavigationModel() {
    var nav = [], routes = router.routes;

    for (var i = 0; i < routes.length; i++) {
      var current = routes[i];

      if (current.nav && (!ko.isObservable(current.nav) || current.nav())) {
        nav.push(current);
      }
    }

    router.navigationModel(nav);
  }
  
  function subscribeToNavChanges() {
    var routes = router.routes;

    for (var i = 0; i < routes.length; i++) {
      var current = routes[i];

      if (ko.isObservable(current.nav)) {
        current.nav.subscribe(buildNavigationModel);
      }
    }
  }

  return vm;
});