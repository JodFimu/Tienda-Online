import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "../middlewares/validate-jwt.js"
import { hasRoles } from "../middlewares/validate-roles.js"

export const addProductToCartValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE"),
    body("pid").notEmpty().withMessage("El id del producto es requerido"),
    body("pid").isMongoId().withMessage("No es un id valido"),
    body("quantity").optional().isInt().withMessage("Solo numeros enteros"),
    validarCampos,
    handleErrors
]

export const removeProductFromCartValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE"),
    body("pid").notEmpty().withMessage("El id del producto es requerido"),
    body("pid").isMongoId().withMessage("No es un id valido"),
    body("quantity").optional().isInt().withMessage("Solo numeros enteros"),
    validarCampos,
    handleErrors
]

export const purchaseCartValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE"),
    validarCampos,
    handleErrors
]

export const getCartValitor = [
    validateJWT,
    hasRoles("CLIENT_ROLE"),
    validarCampos,
    handleErrors
]