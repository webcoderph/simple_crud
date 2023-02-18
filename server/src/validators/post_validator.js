const { findBy } = require('../models/post');

module.exports = {
	title: {
	  custom: {
        options: (value, { req, location, path }) => {
          if (req.method === 'POST') {
            return findBy({
              title: value
            }).then(post => {
                if (post) {
                    return Promise.reject('Title is already taken!')
                }
            })
          }

          return value
            
        }
    },	
    isLength: {
			errorMessage: 'Title should be at least 7 chars long',
			options: { min: 7, max: 50 },
		},
	},

	content: {
		isLength: {
			errorMessage: 'Content should be at least 7 chars long',
			options: { min: 7, max: 300 },
		},
	},
};
