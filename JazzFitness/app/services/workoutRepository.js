define(['parse'], function (Parse) {

  var Workout = Parse.Object.extend("Workout");

  return {
    addWorkoutForClient: function (workoutData, userId) {
      var workout = new Workout();

      var user = new Parse.User();
      user.id = userId;

      workout.set('trainer', Parse.User.current());
      workout.set('client', user);

      return workout.save(workoutData);
    }
  };

});