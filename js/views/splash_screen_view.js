(function() {
'use static';
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Views = FirefoxIM.Views || {};

  FirefoxIM.Views.SplashScreenView = Backbone.View.extend({

    el: FirefoxIM.Templates.splashScreenView(),

    events: {
      "click #signin": "siginIn",
    },

    initialize: function(firebaseRef, options) {
      this.auth = new FirebaseSimpleLogin(firebaseRef, this.authCallback);
      this.install = new FirefoxIM.Views.InstallView();
    },

    render: function() {
      $(document.body).append(this.$el);
      return this;
    },

    authCallback: function(error, user) {
      if (error) {
        FirefoxIM.router.navigate('error', {trigger: true});
      } else if (user) {
        FirefoxIM.user = user;
        FirefoxIM.router.navigate('chatList', {trigger: true});
      }
    },

    siginIn: function() {
      this.auth.login('persona');
    }
  });

  window.FirefoxIM = FirefoxIM;
}())
