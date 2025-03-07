import Router from "express"
import { updateBill } from "./bill.controller.js"
import { updateBillValidator } from "../middlewares/bill-validators.js"

const router = Router ()

/**
 * @swagger
 * /updateBill/{bip}:
 *   put:
 *     summary: Actualiza una factura existente
 *     tags: [Bill]
 *     parameters:
 *       - in: path
 *         name: bip
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la factura
 *       - in: body
 *         name: body
 *         description: Datos para actualizar la factura
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             quantity:
 *               type: integer
 *               description: Cantidad del producto
 *             pid:
 *               type: string
 *               description: ID del producto
 *     responses:
 *       200:
 *         description: Factura actualizada exitosamente
 *       404:
 *         description: Producto no encontrado en el carrito
 *       500:
 *         description: Error al actualizar la factura
 */
router.put("/updateBill/:bip", updateBillValidator, updateBill)

export default router