define(['parse'], function (Parse) {

  return {
    findClients: findClients,
    getClient: getClient,
  };

  function findClients(search) {
    var query;

    if (!search) {
      query = new Parse.Query(Parse.User);
    } else {
      var queryName = new Parse.Query(Parse.User);
      var queryEmail = new Parse.Query(Parse.User);

      queryName.contains("name", search);
      queryEmail.contains("email", search);

      query = Parse.Query.or(queryName, queryEmail);
    }

    query.limit(20);

    return query
      .find()
      .then(function(users) {
        return users.map(mapUser);
      });
  }
  
  function getClient(id) {
    var query = new Parse.Query(Parse.User);

    return query
      .get(id)
      .then(mapUser);
  }

  function mapUser(user) {
    return {
      id: user.id,
      name: user.get("name"),
      email: user.get("email")
    };
  }

});