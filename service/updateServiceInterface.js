import { db } from '../database';

export const updateItem = (title, details, userId, database) => {

  var noteArray = [];
  var tempUser = '';
  var tempPass = '';
  var tempKey = '';
  var tempNote = [title, details];

  for (item of database) {
    if ( item["key"] === userId) {
      tempUser = item["username"];
      tempPass = item["password"];
      tempKey = item["key"];
      noteArray = item["notes"];
    }
    else {
      console.log("false")
    }
  }

  noteArray.push(tempNote)

  console.log(noteArray)

  // Get a key for a new Post.
  // var newPostKey = db.ref().child('posts').push().key;

  var postData = {
    username: tempUser,
    password: tempPass,
    key: tempKey,
    notes: noteArray,
  };


  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/items/' + userId] = postData;

  return db.ref().update(updates);
}
