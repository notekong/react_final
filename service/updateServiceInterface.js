import { db } from '../database';

export const updateItem = (details, userId, database) => {

  var noteArray = [];
  var tempUser = '';
  var tempPass = '';
  var tempKey = '';
  var tempNote = [details];

  for (item of database) {
    if ( item["key"] === userId) {
      tempUser = item["username"];
      tempPass = item["password"];
      tempKey = item["key"];
      noteArray = item["notes"];
    }
    else {
      //console.log("false")
    }
  }

  noteArray.push(tempNote)

  var postData = {
    username: tempUser,
    password: tempPass,
    key: tempKey,
    notes: noteArray,
  };


  // Write the new post's data simultaneously.
  var updates = {};
  updates['/items/' + userId] = postData;

  return db.ref().update(updates);
}
