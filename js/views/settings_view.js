(function() {
'use static';
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Views = FirefoxIM.Views || {};

  FirefoxIM.Views.SettingsView = Backbone.View.extend({

    el: FirefoxIM.Templates.settings(),

    events: {
      'click #settings-save': 'saveSettings',
      'click .settings-close': 'closeSettings'
    },

    defaultSettings: {

    },

    initialize: function(model, options) {
      this.user = model;
      this.settings = _.defaults(this.user.settings, this.defaultSettings);
    },

    render: function() {
      $(document.body).empty().append(this.$el);
      this.renderSettings(this.settings)
      return this;
    },

    renderSettings: function(settings) {
    },

    saveSettings: function() {
      //TODO save settings
      this.closeSettings();
    },

    closeSettings: function() {
      FirefoxIM.router.navigate("chatList", {trigger: true});
    }

  });

  window.FirefoxIM = FirefoxIM;
}())