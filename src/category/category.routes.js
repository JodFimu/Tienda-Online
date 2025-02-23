import { Router } from "express";
import { createCategory, getCategory, updateCategory, deleteCategory } from "./category.controller.js";
import { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

/**
 * @swagger
 * /createCategory:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *     responses:
 *       201:
 *         description: Categoria creada exitosamente
 *       400:
 *         description: Error al crear categoria
 *     roles:
 *       - ADMIN_ROLE
 */
router.post("/createCategory", createCategoryValidator, createCategory);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene una lista de categorías
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Número de categorías a obtener
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Número de categorías a saltar
 *     responses:
 *       200:
 *         description: Categorias encontradas
 *       400:
 *         description: Error al obtener categorias
 */
router.get("/", getCategory);

/**
 * @swagger
 * /updateCategory/{cid}:
 *   patch:
 *     summary: Actualiza una categoría existente
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *     responses:
 *       200:
 *         description: Categoria actualizada
 *       500:
 *         description: Error al actualizar la categoria
 *     roles:
 *       - ADMIN_ROLE
 */
router.patch("/updateCategory/:cid", updateCategoryValidator, updateCategory)

/**
 * @swagger
 * /deleteCategory/{cid}:
 *   delete:
 *     summary: Elimina una categoría existente
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoria eliminada
 *       500:
 *         description: Error al eliminar la categoria
 *     roles:
 *       - ADMIN_ROLE
 */
router.delete("/deleteCategory/:cid", deleteCategoryValidator, deleteCategory)

export default router;