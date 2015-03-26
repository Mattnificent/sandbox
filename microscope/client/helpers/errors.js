// Local (client-only) collection
// I guess this is here because it can't be in lib/collections
// Wouldn't it be more consistent if it was in client/collections, though?
Errors = new Mongo.Collection(null);

throwError = function(message) {
  Errors.insert({message: message});
};
