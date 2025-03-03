import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { deleteFileOnError } from "./delete-file-on-error.js"
import { validateJWT } from "../middlewares/validate-jwt.js"
import { hasRoles } from "../middlewares/validate-roles.js"

export const createProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("price").notEmpty().withMessage("El precio es requerido"),
    body("price").isFloat().withMessage("se requiere un numero"),
    body("description").notEmpty().withMessage("Se requiere una descripcion"),
    body("quantity").notEmpty().withMessage("Se requiere la cantidad de productos"),
    body("quantity").isInt().withMessage("Solo numeros enteros"),
    body("category").isMongoId().withMessage("No es un id valido"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]