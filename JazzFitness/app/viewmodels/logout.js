define(['services/auth'], function (auth) {
  return {
    canActivate: function () {

      auth.logout();

      return { redirect: 'welcome' };

    }
  };
});