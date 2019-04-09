import { db } from '../database';

export const addItem = (username, password) => {

  // Get a key for a new Post.
  var newPostKey = db.ref().child('posts').push().key;

  var postData = {
    username: username,
    password: password,
    key: newPostKey
  };


  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/items/' + newPostKey] = postData;

  return db.ref().update(updates);

}