import Router from "express"
import { addProductToCart, removeProductFromCart, purchaseCart, getCart } from "./purchase.controller.js"
import { addProductToCartValidator, removeProductFromCartValidator, purchaseCartValidator, getCartValitor } from "../middlewares/purchase-validators.js"

const router = Router()

router.post("/addToCart",addProductToCartValidator, addProductToCart)

router.delete("/removeFromCart", removeProductFromCartValidator, removeProductFromCart)

router.post("/purchase", purchaseCartValidator, purchaseCart)

router.get("/getCart", getCartValitor, getCart)

export default router