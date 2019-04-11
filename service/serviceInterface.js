import { db } from '../database';

export const addItem = (username, password) => {

  // Get a key for a new Post.
  var newPostKey = db.ref().child('posts').push().key;

  var postData = {
    username: username,
    password: password,
    key: newPostKey,
    notes: [[" ", " "], ]
  };


  // Write the new post's data simultaneously.
  var updates = {};
  updates['/items/' + newPostKey] = postData;

  return db.ref().update(updates);

}