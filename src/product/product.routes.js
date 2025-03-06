import { Router } from "express"
import {
    createProductValidator, getProductValidator, getByIdValidator, updateProductValidator, inventoryValidator, soldOutValidator,
    mostSoldProductsValidator, deleteProductValidator, updateProductImgValidator, filterProductsValidator
} from "../middlewares/product-validators.js"
import {
    createProduct, getProducts, getProductsById, editProduct, inventory, soldOutProducts, mostSoldProducts, deleteProduct,
    updateProductImg, filterProducts
} from "../product/product.controller.js"
import { uploadProductImg } from "../middlewares/multer-uploads.js"

const router = Router()

/**
 * @swagger
 * /addProduct:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               productImg:
 *                 type: string
 *                 format: binary
 *               description:
 *                 type: string
 *               quantity:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto creado
 *       500:
 *         description: Error al crear el producto
 */
router.post("/addProduct", uploadProductImg.single("productImg"), createProductValidator, createProduct)

/**
 * @swagger
 * /updateImg/{pid}:
 *   patch:
 *     summary: Actualizar la imagen de un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               newProductImg:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagen actualizada
 *       500:
 *         description: Error al actualizar la imagen
 */
router.patch("/updateImg/:pid", uploadProductImg.single("newProductImg"), updateProductImgValidator, updateProductImg)

/**
 * @swagger
 * /getProducts:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Número de productos a obtener
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Número de productos a saltar
 *     responses:
 *       200:
 *         description: Lista de productos
 *       500:
 *         description: Error al listar los productos
 */
router.get("/getProducts", getProductValidator, getProducts)

/**
 * @swagger
 * /getById/{pid}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       400:
 *         description: El producto no existe
 *       500:
 *         description: Error al encontrar el producto
 */
router.get("/getById/:pid", getByIdValidator, getProductsById)

/**
 * @swagger
 * /updateProduct/{pid}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               quantity:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       500:
 *         description: Error al actualizar el producto
 */
router.put("/updateProduct/:pid", updateProductValidator, editProduct)

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Obtener el inventario de productos
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Número de productos a obtener
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Número de productos a saltar
 *     responses:
 *       200:
 *         description: Lista de productos en inventario
 *       500:
 *         description: Error al mostrar el inventario
 */
router.get("/inventory", inventoryValidator, inventory)

/**
 * @swagger
 * /soldOutProducts:
 *   get:
 *     summary: Obtener productos agotados
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Número de productos a obtener
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Número de productos a saltar
 *     responses:
 *       200:
 *         description: Lista de productos agotados
 *       500:
 *         description: Error al listar los productos agotados
 */
router.get("/soldOutProducts", soldOutValidator, soldOutProducts)

/**
 * @swagger
 * /mostSoldProducts:
 *   get:
 *     summary: Obtener productos más vendidos
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Número de productos a obtener
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Número de productos a saltar
 *     responses:
 *       200:
 *         description: Lista de productos más vendidos
 *       500:
 *         description: Error al listar los productos más vendidos
 */
router.get("/mostSoldProducts", mostSoldProductsValidator, mostSoldProducts)

/**
 * @swagger
 * /deleteProduct/{pid}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       400:
 *         description: El producto no existe
 *       500:
 *         description: Error al eliminar el producto
 */
router.delete("/deleteProduct/:pid", deleteProductValidator, deleteProduct)

/**
 * @swagger
 * /filterProducts:
 *   get:
 *     summary: Filtrar productos
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               keyWords:
 *                 type: string
 *               sort:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Productos filtrados
 *       500:
 *         description: Error al filtrar los productos
 */
router.get("/filterProducts", filterProductsValidator, filterProducts)

export default router