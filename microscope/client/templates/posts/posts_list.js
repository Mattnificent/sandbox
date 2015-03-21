//  postsList Helpers
//    posts Helper

Template.postsList.helpers({
    posts: function() {    return Posts.find();  }
});

