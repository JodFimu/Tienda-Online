import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "../middlewares/validate-jwt.js"
import { hasRoles } from "../middlewares/validate-roles.js"

export const createProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name")
]