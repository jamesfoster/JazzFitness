define(['knockout', 'services/auth', 'plugins/router'], function (ko, auth, router) {

  var vm = {
    canActivate: canActivate,

    email: ko.observable(),
    password: ko.observable(),

    login: login
  };

  function canActivate() {
    if (auth.isAuthenticated()) {
      return { redirect: '' };
    }

    return true;
  }

  function login() {
    var e = vm.email(), p = vm.password();

    vm.password(null);

    auth
      .login(e, p)
      .then(function () {
        router.navigate('');
      }, function (error) {
        alert("failed to login: " + error.message);
      });
  }

  return vm;
});