define(['parse'], function (Parse) {

  var subscribers = [];

  return {
    register: register,
    login: login,
    logout: logout,
    isAuthenticated: isAuthenticated,
    isInRole: isInRole,
    subscribe: subscribe,
    unsubscribe: unsubscribe
  };


  function register(data) {

    var user = new Parse.User();

    return user.signUp(data).then(updateSubscribers);

  }

  function login(email, password) {

    return Parse.User.logIn(email, password).then(updateSubscribers);

  }

  function logout() {

    Parse.User.logOut();

    updateSubscribers();

  }

  function isAuthenticated() {
    updateSubscribers();
    return Parse.User.current() != null;
  }

  function isInRole(roleName, userId) {
    var Role = Parse.Object.extend(roleName);

    var query = new Parse.Query(Role);

    query.equalTo('user', getUserOrCurrent(userId));

    return query.first()

      .then(function(role) {

        return role != null;

      });
  }

  function getUserOrCurrent(userId) {
    if (!userId) {

      return Parse.User.current();

    } else {

      var user = new Parse.User();

      user.id = userId;

      return user;

    }
  }

  function subscribe(callback) {
    subscribers.push(callback);

    var user = Parse.User.current();
    user = user && mapUser(user);

    callback(user);
  }
  
  function unsubscribe(callback) {
    var index = subscribers.indexOf(callback);
    if (index > -1) {
      subscribers.splice(index, 1);
    }
  }

  function updateSubscribers() {
    var user = Parse.User.current();
    user = user && mapUser(user);

    for (var i in subscribers) {
      subscribers[i](user);
    }
  }

  function mapUser(user) {
    return {
      id: user.id,

      name: user.get("name"),

      email: user.get("email"),

      isTrainer: function() {
        return isInRole('Trainer', user.id);
      }
    };
  }

});