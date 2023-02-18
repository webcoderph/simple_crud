const db = require('../config/database');


module.exports = {
	getPosts: () => {
		return new Promise((resolve, reject) => {
			db.select().from('posts').then((rows) => resolve(rows)).catch((err) => reject(err));
		})
	},
	createPost: (data) => {
		return new Promise((resolve, reject) => {
			db('posts').insert(data).then(() => {
				db.select().from('posts').then((rows) => {
					resolve(rows);
				});
			}).catch((e) => {
				reject(e)
			});
		})

	},
  updatePost: (data) => {
    return new Promise((resolve, reject) => {
      db('posts')
      .where('id', data.id)
      .update(data.post).then((row) => {
        resolve(row);
      }).catch((e) => reject(e))
    })
  },
  findBy: (data) => {
    return new Promise((resolve, reject) => {
      db('posts').where(data).first().then((row) => {
        resolve(row);
      }).catch((e) => {
        reject(e);
      });
    })
  },
  deleteBy: (id) => {
    return new Promise((resolve, reject) => {
      db('posts').where('id', id).del().then((row) => {
        resolve(row);
      }).catch((e) => {
        reject(e);
      });
    })
  }
};
