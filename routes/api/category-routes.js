const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({include:Product}).then(data=>{
    if(!data){
      console.log("category not found")
      res.status(404).json({message:'category not found'})
    }res.json(data)
  }).catch(err =>{
    console.log(err)
    res.status(500).json(err)
  })
  
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({where:{id:req.params.id},include:Product}).then(data=>{
    if(!data){
      console.log('Category not found')
      res.status(404).json({message:'Category not found'})
    }else{

      res.json(data)
    }
  }).catch(err=>{
    res.status(500).json({message:'sever error'})
  })
});

router.post('/', (req, res) => {
  // create a new category
  console.log(req.body)
  Category.create(req.body).then(data=>{
    if(!data){
      console.log('Category not found')
      res.status(404).json({message:'Category not found'})
    }
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,{where:{
    id:req.params.id
  }}).then(data=>{
    if(!data){
      res.status(404).json({message:'Catagory not found'})
    }
  }).catch(err=>{
    console.log(err)
    res.status(500).json({messae: err})
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy(
    {
      where:{
        id:req.params.id
      }
    }
  ).then(data=>{
    if(!data){
      console.log('Catagory not found')
      res.status(404).json({message:'Catagory not found'})
    }
    res.json(data)
  }).catch(err=>{
    console.log(err)
    res.status(505).json({messae:'Catagory not found'})
  })
});

module.exports = router;
