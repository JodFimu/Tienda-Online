import Router from "express"
import { addProductToCart, removeProductFromCart, purchaseCart, getCart } from "./purchase.controller.js"
import { addProductToCartValidator, removeProductFromCartValidator, purchaseCartValidator, getCartValitor } from "../middlewares/purchase-validators.js"

const router = Router()

/**
 * @swagger
 * /addToCart:
 *   post:
 *     summary: Añadir producto al carrito
 *     tags: [Purchase]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pid:
 *                 type: string
 *                 description: ID del producto
 *               quantity:
 *                 type: integer
 *                 description: Cantidad del producto
 *     responses:
 *       200:
 *         description: Producto añadido al carrito
 *       400:
 *         description: No hay suficiente stock disponible
 *       404:
 *         description: Producto o usuario no encontrado
 *       500:
 *         description: Error al añadir producto al carrito
 */
router.post("/addToCart", addProductToCartValidator, addProductToCart)

/**
 * @swagger
 * /removeFromCart:
 *   delete:
 *     summary: Eliminar producto del carrito
 *     tags: [Purchase]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pid:
 *                 type: string
 *                 description: ID del producto
 *               quantity:
 *                 type: integer
 *                 description: Cantidad del producto
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito
 *       404:
 *         description: Producto no encontrado en el carrito o usuario no encontrado
 *       500:
 *         description: Error al eliminar producto del carrito
 */
router.delete("/removeFromCart", removeProductFromCartValidator, removeProductFromCart)

/**
 * @swagger
 * /purchase:
 *   post:
 *     summary: Realizar compra del carrito
 *     tags: [Purchase]
 *     responses:
 *       200:
 *         description: Compra realizada
 *       400:
 *         description: El carrito esta vacio
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al realizar compra
 */
router.post("/purchase", purchaseCartValidator, purchaseCart)

/**
 * @swagger
 * /getCart:
 *   get:
 *     summary: Obtener el carrito de compras
 *     tags: [Purchase]
 *     responses:
 *       200:
 *         description: Carrito obtenido
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener carrito
 */
router.get("/getCart", getCartValitor, getCart)

export default router