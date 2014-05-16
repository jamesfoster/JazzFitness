define(['parse'], function (Parse) {

  var Trainer = Parse.Object.extend('Trainer');
  
  return {
    getTrainer: getTrainer,
    makeTrainer: makeTrainer
  };


  function getTrainer(userId) {
    var user = new Parse.User();
    user.id = userId;

    var query = new Parse.Query(Trainer);
    query.equalTo('user', user);

    return query.first();
  }

  function makeTrainer(userId) {
    return getTrainer(userId)
      .then(function(trainer) {
        if (trainer) {
          return Parse.Promise.error("Already a trainer");
        }

        return addNewTrainer(userId);
      });
  }

  function addNewTrainer(userId) {
    var trainer = new Trainer();

    var user = new Parse.User();
    user.id = userId;

    trainer.set('user', user);
    trainer.set('clients', []);

    return trainer.save();
  }
});