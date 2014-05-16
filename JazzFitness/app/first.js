define(['services/auth'], function (auth) {
  return {
    canActivate: function () {

      if (!auth.isAuthenticated()) {
        return { redirect: 'welcome' };
      }

      if (auth.isInRole('Trainer')) {
        return { redirect: 'clients' };
      }

      return { redirect: 'workout' };

    }
  };
});