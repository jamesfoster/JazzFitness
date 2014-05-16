define(['services/auth', 'knockout', 'plugins/router'], function (auth, ko, router) {
  var name = ko.observable();
  var email = ko.observable();
  var password = ko.observable();

  function register() {
    var user = {
      name: name(),
      email: email(),
      password: password(),
      username: email()
    };

    password(null);

    auth
      .register(user)
      .then(function (data) {
        name(null);
        email(null);
        router.navigate('workout');
      }, function (error) {
        alert("failed to register: " + error.message);
      });
  }


  return {
    name: name,
    email: email,
    password: password,

    register: register
  };
});