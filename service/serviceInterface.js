import { db } from '../database';

export const addItem = (username, password) => {
	db.ref('items/').push({
		username: username,
		password: password,
	});
}