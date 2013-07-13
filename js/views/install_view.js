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
      var installView = this;
      this.manifestURL = location.href.substring(0, location.href.lastIndexOf("/")) + "/manifest.webapp";
      if (navigator && navigator.mozApps && navigator.mozApps.install) {
        var request = navigator.mozApps.checkInstalled(this.manifestURL);
        request.onsuccess = function() {
          installView.render();
        };
      }
    },

    el: FirefoxIM.Templates.installButton(),

    events: {
      "click": "installApp" 
    },

    render: function() {
      $('#signin').after(this.$el);
    },

    hideInstall: function() {
      this.$el.hide();
    },

    installApp: function(e) {
      e.preventDefault();
      var install = navigator.mozApps.install(this.manifestURL);
      install.onsuccess = _.bind(this.hideInstall, this);
      install.onerror = function() {
        // App wasn't installed, info is in this.error.name
        console.log('Install failed, error: ' + this.error.name);
      };
    }

  });

  window.FirefoxIM = FirefoxIM;
}())