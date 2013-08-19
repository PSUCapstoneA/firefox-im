(function() {
  // Namespace FirefoxIM.Views
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Views = FirefoxIM.Views || {};

  /**
   * Handles installing the app on Firefox OS
   * 
   */
  FirefoxIM.Views.NewUserInputView = Backbone.View.extend({
    initialize: function(empty,options) {},

    el: FirefoxIM.Templates.newUserInputs(),

    events: {
      "click #submit": "addsNewUser" 
    },

    render: function() {
      $(document.body).append(this.$el);
      return this;
    },

    displayErrorMessage: function(usernameExistsError, emailError){
      if(usernameExistsError){
        $("#newUserInputs").before('<p class="newUserInputError">Username already exists. Please pick another username.</p>');
      }
    },

    addsNewUser: function(){
      var username = $("#username").val();
      var email = $("#email").val();
      var phone = $("#phone").val();

      if(FirefoxIM.userList.findWhere({"username": username})){
        var usernameExistsError = true;
        this.displayErrorMessage(usernameExistsError);
        return;
      }  
      
      var newUser = new FirefoxIM.Models.User({"id": FirefoxIM.user.id, "username": username, "email": email, "phone": phone});
      FirefoxIM.userList.add(newUser);
      FirefoxIM.router.navigate('chatList', {trigger: true});
    }

  });

    
  window.FirefoxIM = FirefoxIM;
}())