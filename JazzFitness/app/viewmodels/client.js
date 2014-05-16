define(['services/clientRepository', 'services/trainerRepository', 'knockout'], function (clientRepo, trainerRepo, ko) {
  var vm = {
    id: null,
    name: ko.observable(),
    makeTrainer: makeTrainer,
    activate: activate
  };
  
  function activate(clientId) {
    vm.id = clientId;

    return clientRepo
      .getClient(clientId)
      .then(function(client) {
        vm.name(client.name);
      }, function(error) {
        alert("Error fetching client: " + error.message);
      });

  }

  function makeTrainer() {

    trainerRepo.makeTrainer(vm.id)
      .then(function() {
        alert("Successfully made " + vm.name() + " a trainer");
      }, function(error) {
        console.log(error);
        alert(error);
      });

  }

  return vm;
});