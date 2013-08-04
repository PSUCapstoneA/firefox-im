(function() {
'use static';
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Views = FirefoxIM.Views || {};

  FirefoxIM.Views.UserView = Backbone.View.extend({

    el: FirefoxIM.Templates.user(),

    events: {
    },

    initialize: function(model, options) {
      this.user = model;
    },

    render: function() {
      $(document.body).append(this.$el);
      this.renderUserInfo(this.user);
      return this;
    },

    renderUserInfo: function(user) {
    }
  });

  window.FirefoxIM = FirefoxIM;
}())