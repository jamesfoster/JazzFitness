define(['knockout', 'services/auth'], function(ko, auth) {

  var vm = {
    name: ko.observable(),
    isTrainer: ko.observable()
  };

  auth.subscribe(function(user) {
    if (user) {

      vm.name(user.name);

      vm.isTrainer(auth.isInRole('Trainer', user.id));

    } else {

      vm.name(null);

      vm.isTrainer(false);

    }
  });

  return vm;

});