import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "../middlewares/validate-jwt.js"
import { hasRoles } from "../middlewares/validate-roles.js"

export const updateBillValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("bip").notEmpty().withMessage("Es necesario el id"),
    param("bip").isMongoId().withMessage("No es un id valido"),
    body("quantity").notEmpty().withMessage("La cantidad es requerida"),
    body("quantity").isInt().withMessage("Solo numeros enteros"),
    body("pid").notEmpty().withMessage("El producto es requerido"),
    body("pid").isMongoId().withMessage("No es un id valido"),
    validarCampos,
    handleErrors
]