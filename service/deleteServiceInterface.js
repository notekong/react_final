import { db } from '../database';

export const deleteItem = (indexId, userId, database) => {

  var noteArray = [];
  var tempUser = '';
  var tempPass = '';
  var tempKey = '';

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

  noteArray.remove(int(indexId))

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
