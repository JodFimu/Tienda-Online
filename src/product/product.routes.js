import { Router } from "express"
import { createProductValidator } from "../middlewares/product-validators.js"
import { createProduct, getProducts } from "../product/product.controller.js"
import { uploadProductImg } from "../middlewares/multer-uploads.js"

const router = Router()

router.post("/addProduct", uploadProductImg.single("productImg"), createProductValidator, createProduct)
router.get("/getProducts", getProducts)

export default router