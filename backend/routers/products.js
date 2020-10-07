const express = require('express');
const { model } = require('../models/user');
const router = express.Router();
const Products = require('../models/products');
const auth = require('../middleware/auth');
const User = require('../models/user');
const products = require('../models/products');
const multer = require('multer');

const mime_type_map = {
  'image/png' : 'png',
  'image/jpeg': 'jpg',
  'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = mime_type_map[file.mimetype];
    let error = new Error('Invalid mimye type');
    if(isValid){
      error = null;
    }
    cb(error, 'images')
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = mime_type_map[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post("/products", auth, multer({storage: storage}).single('image'), async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  console.log(url);
  const product = new Products({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    owner: req.user._id,
    image: url + '/images/' + req.file.filename
  });

  await product.save();

  res.status(201).json({
    message: 'Product added sucsessfully'
  });
});

// async function asyncForEach(array, callback) {
//     for(let index = 0; index < array.length; index++){
//       console.log(array[index]);
//       await callback(array[index]);
//     }
// }

router.get('/allProducts', auth, async (req, res) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  let products;
    try{
      var allProducts = [];
      if(pageSize && currentPage){
        return await Products.find({}, async (err, products) => {
          for(let index = 0; index < products.length ; index++){
           await products[index].populate('owner').execPopulate().then((data) => {
            allProducts.push(data);
            }
          )}
          console.log(allProducts);
           res.status(200).send({
            products: allProducts
          });
        }).skip(pageSize * (currentPage - 1))
        .limit(pageSize);;
      }
      await Products.find({}, async (err, products) => {
        for(let index = 0; index < products.length ; index++){
         await products[index].populate('owner').execPopulate().then((data) => {
          allProducts.push(data);
          }
        )}
        console.log(allProducts);
        res.status(200).send({
          products: allProducts
        });
      });
    } catch (e) {
      res.status(500).send();
    }
});



router.get('/myProducts', auth, async (req, res, next) => {
  try {
    const products = await Products.find({
      owner: req.user._id
    });
    res.status(200).send({
      message: 'My products fetched succesfully!',
      products: products
    });
  } catch (e) {
    res.status(500).send();
  }

});

router.get('/products/:id', auth, async(req, res) => {
  const _id = req.params.id;
    try {
      const product = await Products.findOne({
        _id, owner: req.user._id
      });

      if(!product){
        res.status(404).send();
      }
      res.send(product);
    } catch (e) {
        res.status(500).send();
    }
});

router.delete('/products/:id', auth, async(req, res) => {
    const _id = req.params.id;
    try {
      const product = await Products.findOneAndDelete({
        _id, owner: req.user._id
      });

      if(!product) {
        res.status(404).send();
      }

      res.send(product);
    } catch (e) {
      res.status(500).send();
    };
});

router.patch('/products/:id', auth, async (req, res) => {
    const allowedUpdates = ['name', 'price', 'description'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => {
      return allowedUpdates.includes(update)
    });

    if(!isValidOperation){
      return res.status(400).send({ error : 'Invalid updates '});
    }

    const _id = req.params.id;
    try {
      const product = await Products.findOne({
        _id, owner: req.user._id
      });

      if(!product) {
        res.status(404).send();
      }

      updates.forEach((update) => {
        return product[update] = req.body[update];
      });
      console.log(product);
      await product.save();
      res.send(product);
    } catch (e) {
        res.status(500).send();
    }
});


// router.post('/users/me/image', auth, upload.single('image'), async (req, res) => {
//   const productImage = req.file.buffer;
//   await req.user.save();
//   res.send();
// }, (error, req, res, next) => {
//   res.status(400).send({error : error.message});
// });


module.exports = router;
