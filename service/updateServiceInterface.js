import { db } from '../database';

export const updateItem = (title, details, key) => {

  var noteArray = []


  // et a key for a new Post.
  // var newPostKey = db.ref().child('posts').push().key;

  var postData = {
    notes: noteArray,
  };


  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/items/' + key] = postData;

  return db.ref().update(updates);
}
