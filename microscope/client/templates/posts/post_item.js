//  postItem Helpers
//    domain Helper

Template.postItem.helpers({
  // Returns true if postItem creator == logged in user
  ownPost: function() {
    return this.userId === Meteor.userId();
  },

  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});

