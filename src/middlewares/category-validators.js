import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "../middlewares/validate-jwt.js"
import { hasRoles } from "../middlewares/validate-roles.js"
import {categoryExist} from "../helpers/db-validators.js"

export const createCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("name").custom(categoryExist),
    validarCampos,
    handleErrors
];

export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("cid").isMongoId().withMessage("no es un id valido"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("name").custom(categoryExist),
    validarCampos,
    handleErrors
]

export const deleteCategoryValidator = [
    validateJWT,
    param("cid").isMongoId().withMessage("no es un id valido"),
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]
