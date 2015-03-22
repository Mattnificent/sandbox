Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id', {
	
  name: 'postPage',

  // Return the first post with the post id 
	data: function() { 
    return Posts.findOne(this.params._id); 
  }

});

Router.route('/submit', { name: 'postSubmit'});

// Hook to render accessDenied if not user
var requireLogin = function() {
  if (! Meteor.user()) {
    // To avoid access denied while login occurs
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    }
    else {
      this.render('accessDenied');
    } 
  }
  else {
    this.next();
  }
}


Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});

