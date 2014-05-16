define(['viewmodels/user', 'services/clientRepository', 'knockout', 'plugins/router'], function (user, clientRepo, ko, router) {
  var vm = {
    clients: ko.observable(),
    searchTerm: ko.observable(),
    search: search,
    selectClient: selectClient,
    
    canActivate: canActivate,
    activate: activate
  };

  function canActivate() {
    return user.isTrainer();
  }

  function activate() {
    vm.searchTerm(null);
    return search();
  }

  function search() {

    return clientRepo
      .findClients(vm.searchTerm())
      .then(function (clients) {
        vm.clients(clients);
      }, function (error) {
        alert("Error fetching clients: " + error.message);
      });

  }

  function selectClient(client) {
    router.navigate("client/" + client.id);
  }

  return vm;
});