import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { deleteFileOnError } from "./delete-file-on-error.js"
import { validateJWT } from "../middlewares/validate-jwt.js"
import { hasRoles } from "../middlewares/validate-roles.js"
import { categoryExistById, productExist, productExistById } from "../helpers/db-validators.js"

export const createProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("name").custom(productExist),
    body("price").notEmpty().withMessage("El precio es requerido"),
    body("price").isFloat().withMessage("se requiere un numero"),
    body("description").notEmpty().withMessage("Se requiere una descripcion"),
    body("quantity").notEmpty().withMessage("Se requiere la cantidad de productos"),
    body("quantity").isInt().withMessage("Solo numeros enteros"),
    body("category").isMongoId().withMessage("No es un id valido"),
    body("category").custom(categoryExistById),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const getProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const getByIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("pid").notEmpty().withMessage("Es necesario el id"),
    param("pid").isMongoId().withMessage("No es un id valido"),
    param("pid").custom(productExistById),
    validarCampos,
    handleErrors
]

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").optional().custom(productExist),
    body("price").optional().isFloat().withMessage("se requiere un numero"),
    body("quantity").optional().isInt().withMessage("Solo numeros enteros"),
    body("category").optional().isMongoId().withMessage("No es un id valido"),
    body("category").optional().custom(categoryExistById),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const inventoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const soldOutValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const mostSoldProductsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("pid").notEmpty().withMessage("Es necesario el id"),
    param("pid").isMongoId().withMessage("No es un id valido"),
    param("pid").custom(productExistById),
    validarCampos,
    handleErrors
]

export const filterProductsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    body("keyWords").optional(),
    body("sort").optional(),
    body("category").optional().isMongoId().withMessage("No es un id valido"),
    body("category").optional().custom(categoryExistById),
    validarCampos,
    handleErrors
]

export const updateProductImgValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("pid").notEmpty().withMessage("Es necesario el id"),
    param("pid").isMongoId().withMessage("No es un id valido"),
    param("pid").custom(productExistById),
    validarCampos,
    deleteFileOnError,
    handleErrors
]