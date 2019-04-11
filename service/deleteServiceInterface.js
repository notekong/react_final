import { db } from '../database';

export const deleteItem = (indexId, userId, database) => {

  let userRef = db.ref('items/' + userId + '/notes/' + indexId);
  userRef.remove()
}