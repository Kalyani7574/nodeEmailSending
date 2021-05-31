const express = require('express')
const Product = require('../models/products')
const mail = require('../services/mail');
const validator=require('validator')
const router = new express.Router()

router.post('/products', async(req, res) => {      
    const product =new Product(req.body)    //displying body of postman in console and creating instance of user and req.body to grab content of body from postman to here req.body is used for change content from postman
    
    try{
         await product.save()
          
         res.status(201).send({ product})

     }catch(e){
         res.status(400).send(e)

     }
                       
})

router.get('/products/mail', async function(req, res, next) {
  var tomail = 'kalyaniarbune@gmail.com';
  var msg = 'Test Mail';

  result = mail.sendmail(tomail, msg);
  var response = {
      'message': 'Email Sent',
      'error': 'false',
      'data': result
  };
  res.status(200);
  res.setHeader('Content-Type', 'application/json');
  res.json(response);
});


router.get('/products/update/:id', async(req, res) => {
    try{
        //const product =await Product.find({}, {__v: 0})
        const product = await Product.findByIdAndUpdate(req.param.id, req.body, {new:true, runValidators:true})
        res.send(product)

    } catch(error){
        console.log(error.message)
    }
})

router.get('/products/search',(req, res, next) => {
    const serachedFeild = req.query.name;
    Product.find({name: {$regex: serachedFeild, $options: '$i'}})
    .then(data => {
        res.send(data)
    })
    

})



router.get('/products/all/:id', async (req ,res ) => {
    const id = req.params.id   

    try {
        const product = await Product.findById(id)
        if(!product){
            return res.status(404).send
        }
         res.send(product)

    }catch(e){

        res.status(500).send()
    }
})

  



router.delete('/products/delete/:id', async (req, res) => {
    try{
    const product = await Product.findByIdAndDelete(req.params.id)
    if(!product){
        return res.status(400).send()
    }
    console.log('deleted successfully')
    res.send(product)
} catch(e){

    res.status(500).send()

}

})


router.get('/products/find', (req, res,) => {
    const pageSize = 20
    const escpQuery = Object.assign({}, ...Object.keys(req.query).map(obKey => {
      return {[obKey]: validator.escape(req.query[obKey])}
    }))
    const currentPage = escpQuery.page > 0 ? escpQuery.page - 1 : 0
    const filter = escpQuery.filter || ''
    const filterOn = escpQuery.filterOn || ''
    const sortBy = escpQuery.sortBy || 'createdAt'
    const orderBy = escpQuery.orderBy || 'asc'
    const sortQuery = {
      [sortBy]: orderBy
    }
    let filterQuery = {}
    if (filter.length > 0) {
      const regx = new RegExp(filter, 'i')
      if (filterOn.length > 0) {
        filterQuery = {
          [filterOn]: regx
        }
      } else {
        filterQuery = {
          content: regx
        }
      }
    } 
  
    Product.countDocuments(filterQuery)
    .then(productCount => {
      if (currentPage * pageSize > productCount) {
        return res.status(400).json([])
      }
      Product.find(filterQuery)
      .limit(pageSize)
      .skip(currentPage * pageSize)
      .sort(sortQuery)
      .then(product => {
        return res.status(200).json({
          product,
          page: req.query.page || 1,
          total: productCount,
          pageSize: pageSize
        })
      })
    })
    .catch(err => {
      console.log('Error finding item:', err)
      return res.status(500).json({msg: 'no item found'})
    })
  })
  

 







module.exports= router