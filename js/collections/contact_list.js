(function() {

'use static';
// Mimick namespace
var FirefoxIM = window.FirefoxIM || {};
FirefoxIM.Collections = FirefoxIM.Collections || {};

//Contactlist list is the collection of users backed by 'Firebase' any chat
//that is added to the collection will be automatically synched with the firebase

FirefoxIM.Collections.UserList = Backbone.Firebase.Collection.extend({
        //Reference to this collection's model.
        model: FirefoxIM.Models.User,
});

window.FirefoxIM = FirefoxIM;
}())

