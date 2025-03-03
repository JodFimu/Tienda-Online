import { Router } from "express"
import { createProductValidator, getProductValidator, getByIdValidator, updateProductValidator } from "../middlewares/product-validators.js"
import { createProduct, getProducts, getProductsById, editProduct } from "../product/product.controller.js"
import { uploadProductImg } from "../middlewares/multer-uploads.js"

const router = Router()

router.post("/addProduct", uploadProductImg.single("productImg"), createProductValidator, createProduct)
router.get("/getProducts", getProductValidator, getProducts)
router.get("/getById/:pid",getByIdValidator, getProductsById)
router.put("/updateProduct/:pid", updateProductValidator, editProduct)

export default router