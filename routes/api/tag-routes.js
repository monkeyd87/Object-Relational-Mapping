const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({include:Product}).then(data=>{
    if(!data){
      console.log('tag no found')
      res.status(404).json({message:'Tag not found'})
    }else{
      res.json(data)
    }
  }).catch(err=>{
    console.log(err)
    res.status(500).json({message:'Server error'})
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne(
    {
      where:{
        id:req.params.id
      },
      include: Product
    }
  ).then(data=>{
    if(!data){
      res.status(404).json({Message:"Tag not found"})
    }
    res.json(data)
  }).catch(err=>{
    console.log(err)
    res.status(500).json({message:'Server error'})
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      where:{
        id:req.params.id
      }
    }
  ).then(data=>{
    if(!data){
      console.log('Tag not found')
      res.status(404).json({message:'Tag not found'})
    }else{
      res.json(data)
    }
  }).catch(err=>{
    console.log(err)
    res.status(500).json({message:'Server error'})
  })
 
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(
    {
      where:{
        id:req.params.id
      }
    }
  ).then(data=>{
    if(!data){
      res.status(404).json({messae:'Tag not Found'})
    }
    res.json(data)
  }).catch(err=>{
    console.log(err)
    res.status(500).json({message:'Server Error'})
  })
});

module.exports = router;
