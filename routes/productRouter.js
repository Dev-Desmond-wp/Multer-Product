const router = require('express').Router()

const { addProduct, getAllproducts, getoneProduct, updateProduct, deleteProduct } = require('../controller/productController')

const upload = require('../middleware/multer')

router.post('/product', upload.single('productImage'), addProduct)

router.get('/allproduct', getAllproducts)

router.get('/oneproduct/:id', getoneProduct)

router.patch('/updateproduct/:id', upload.single('productImage'), updateProduct)

router.delete('/deleteproduct/:id', upload.single('productImage'), deleteProduct)


module.exports = router