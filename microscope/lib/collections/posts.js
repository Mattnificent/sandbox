Posts = new Mongo.Collection('posts');

// Only allow owners to update and remove
Posts.allow({
  update: function(userId, post) {
    return ownsDocument(userId, post);
  },
  remove: function(userId, post) {
    return ownsDocument(userId, post);
  },
});

// Security from hackers assigning post to someone else from the console
// Couldn't they do a remove, then an add for the fieldname, then?
// Also, this reads horribly...
// Could it be stated more simply "allow [url,title] updates only"
// Also, why is there an allow and a deny?  How much do they overlap?
//    why use one versus the other?
Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});



Meteor.methods({
  
  // What exactly is postAttributes?
  // What does check do?
  postInsert: function(postAttributes) {
    
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    // Return early for posts with existing link
    var postWithSameLink = Posts.findOne( {url: postAttributes.url} );
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

    // What is _.extend?
    var user = Meteor.user();
    var post = 
      _.extend(postAttributes, {
        userId: user._id,
        author: user.username,
        submitted: new Date()
      });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  }
});


