import Router from "express"
import { addProductToCart, removeProductFromCart } from "./purchase.controller.js"
import { addProductToCartValidator, removeProductFromCartValidator } from "../middlewares/purchase-validators.js"

const router = Router()

router.post("/addToCart",addProductToCartValidator, addProductToCart)

router.delete("/removeFromCart", removeProductFromCartValidator, removeProductFromCart)

export default router