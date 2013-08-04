(function() {
'use static';
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Views = FirefoxIM.Views || {};

  FirefoxIM.Views.SettingsView = Backbone.View.extend({

    el: FirefoxIM.Templates.settings(),

    events: {
    },

    initialize: function(model, options) {
      this.settings = model;
    },

    render: function() {
      $(document.body).append(this.$el);
      this.renderSettings(this.settings);
      return this;
    },

    renderSettings: function(user) {
    }
  });

  window.FirefoxIM = FirefoxIM;
}())