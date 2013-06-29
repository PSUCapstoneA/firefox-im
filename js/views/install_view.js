(function() {
  // Namespace FirefoxIM.Views
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Views = FirefoxIM.Views || {};

  /**
   * Handles installing the app on Firefox OS
   * 
   */
  FirefoxIM.Views.InstallView = Backbone.View.extend({
    initialize: function() {
      this.manifestURL = location.href.substring(0, location.href.lastIndexOf("/")) 
        + "/manifest.webapp",
      if (navigator && navigator.mozApps && navigator.mozApps.install) {
        navigator.mozApps.checkInstall(this.manifestURL).onsuccess(function() {
          this.render();
        })
      }
    },

    el: FirefoxIM.Templates.installButton(),

    events: {
      "click": "installApp" 
    },

    render: function() {
      $('menu').append(this.$el);
    },

    hideInstall: function() {
      this.$el.hide();
    },

    installApp: function(e) {
      e.preventDefault();
      var install = navigator.mozApps.install(manifestURL);
      install.onsuccess = _.bind(this.hideInstall, this);
      install.onerror = function() {
        // App wasn't installed, info is in this.error.name
        console.log('Install failed, error: ' + this.error.name);
      };
    }

  });

  window.FirefoxIM = FirefoxIM;
}())