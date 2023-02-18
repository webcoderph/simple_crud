const router = require('express').Router();

const { getPosts, createPost, findBy, deleteBy, updatePost } = require('../models/post');
const { checkSchema, validationResult } = require('express-validator');
const postValidator = require('../validators/post_validator');

router.get('/', async (req, res) => {
  try {
    let posts = await getPosts();
    res.json(posts)
  } catch (error) {
    if (error){
      res.status(401)
    }
  }
})

router.post('/create', checkSchema(postValidator), async (req, res) => {
	const errors = validationResult(req);
	
  if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
  
  const post = {
    title: req.body.title,
    content: req.body.content
  }

	try {
		let response = await createPost(post)
		res.json(response)
	} catch (error) {
		res.status(500).json({error: error});
		console.log(error)
	}
})

router.put('/update/:id', checkSchema(postValidator), async (req, res) => {
  const errors = validationResult(req);
	
  if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
  
  try {
    const { id } = req.params 
    let post = await findBy({id: id})
    if(post) {
      let params = {
        content: req.body.content
      }
     
      if(post.title !== req.body.title) {
        let postTitle = await findBy({ title: req.body.title })
       
        if(postTitle) {
          let errors = [{
            "value": req.body.title,
            "msg": "Title is already taken!",
            "param": "title",
            "location": "body"
          }]
          
          return res.status(400).json({ errors: errors });
        }
        
        params.title = req.body.title
      }
             
      let response = await updatePost({ id: post.id, post: params })
      res.json(response);
      return;
    }
   
    res.status(404).json({error: 'Invalid params!'});
        
  } catch (error) {
    res.status(500).json({error: error, test: true});
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params   
    let post = await findBy({id: id})
    if(post) {
      let response = await deleteBy(post.id)
      res.json(response);
      return;
    }
   
    res.status(404).json({error: 'Invalid params!'});
        
  } catch (error) {
    res.status(500).json({error: error});
  }
})
module.exports = router;
