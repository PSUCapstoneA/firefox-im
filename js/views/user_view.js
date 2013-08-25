(function() {
'use static';
  var FirefoxIM = window.FirefoxIM || {};
  FirefoxIM.Views = FirefoxIM.Views || {};

  FirefoxIM.Views.UserView = Backbone.View.extend({

    el: FirefoxIM.Templates.user(),

    events: {
      "click #submit": "editUser" 
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
      $('#username').val(user.get("username"));
      $('#email').val(user.get("email"));
      $('#phone').val(user.get("phone"));
    },
    
    editUser: function(){
      FirefoxIM.userList.remove({id: FirefoxIM.user.id});
      this.addsNewUser();
    },

    displayErrorMessage: function(usernameExistsError, emailError){
      if(usernameExistsError){
        $("#userInfo").before('<p class="newUserInputError">Username already exists. Please pick another username.</p>');
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
      $('.newUserInputError').remove();
      FirefoxIM.router.navigate('chatList', {trigger: true});
    }
  });

  window.FirefoxIM = FirefoxIM;
}())