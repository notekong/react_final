import { db } from '../database';

export const updateItem = (title, details, uniqueid) => {

  var noteArray = []

  var postData = {
    title: username,
    details: password,
    uniqueid: newPostKey
  };


  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/items/' + uniqueid + '/' + noteArray] = postData;

  return db.ref().update(updates);
