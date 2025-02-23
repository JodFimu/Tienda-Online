import { Router } from "express";
import { getUserById, getUsers, deleteUserAdmin, updatePassword, updateUserUser, updateUserAdmin, updateRole, deleteUserClient } from "./user.controller.js";
import { getUserByIdValidator, updatePasswordValidator, deleteUserValidatorClient, deleteUserValidatorAdmin, createUserValidation, updateRoleValidator, getUserValidation } from "../middlewares/user-validators.js";
import { register } from "../auth/auth.controller.js";

const router = Router();

/**
 * @swagger
 * /findUser/{uid}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario
 *     responses:
 *       200:
 *         description: La información del usuario
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 *     security:
 *       - bearerAuth: []
 *     roles: [ADMIN_ROLE]
 */
router.get("/findUser/:uid", getUserByIdValidator, getUserById);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         required: false
 *         description: Limitar el número de usuarios devueltos
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         required: false
 *         description: Saltar los primeros N usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error del servidor
 *     security:
 *       - bearerAuth: []
 *     roles: [ADMIN_ROLE]
 */
router.get("/", getUserValidation, getUsers);

/**
 * @swagger
 * /deleteUserAdmin/{uid}:
 *   delete:
 *     summary: Eliminar usuario por administrador
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       500:
 *         description: Error del servidor
 *     security:
 *       - bearerAuth: []
 *     roles: [ADMIN_ROLE]
 */
router.delete("/deleteUserAdmin/:uid", deleteUserValidatorAdmin, deleteUserAdmin);

/**
 * @swagger
 * /deleteUserClient:
 *   delete:
 *     summary: Eliminar usuario por cliente
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       500:
 *         description: Error del servidor
 *     security:
 *       - bearerAuth: []
 *     roles: [CLIENT_ROLE]
 */
router.delete("/deleteUserClient", deleteUserValidatorClient, deleteUserClient);

/**
 * @swagger
 * /updatePassword:
 *   patch:
 *     summary: Actualizar contraseña del usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: La nueva contraseña
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *       400:
 *         description: La nueva contraseña no puede ser la misma que la antigua
 *       500:
 *         description: Error del servidor
 *     security:
 *       - bearerAuth: []
 *     roles: [ADMIN_ROLE, CLIENT_ROLE]
 */
router.patch("/updatePassword", updatePasswordValidator, updatePassword);

/**
 * @swagger
 * /updateUser:
 *   put:
 *     summary: Actualizar información del usuario por cliente
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       500:
 *         description: Error del servidor
 *     security:
 *       - bearerAuth: []
 *     roles: [CLIENT_ROLE]
 */
router.put("/updateUser", deleteUserValidatorClient, updateUserUser);

/**
 * @swagger
 * /updateUserAdmin/{uid}:
 *   put:
 *     summary: Actualizar información del usuario por administrador
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       500:
 *         description: Error del servidor
 *     security:
 *       - bearerAuth: []
 *     roles: [ADMIN_ROLE]
 */
router.put("/updateUserAdmin/:uid", deleteUserValidatorAdmin, updateUserAdmin);

/**
 * @swagger
 * /createUser:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 *       500:
 *         description: Error del servidor
 *     security:
 *       - bearerAuth: []
 *     roles: [ADMIN_ROLE]
 */
router.post("/createUser", createUserValidation, register);

/**
 * @swagger
 * /updateRole/{uid}:
 *   patch:
 *     summary: Actualizar rol del usuario
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario
 *     responses:
 *       200:
 *         description: Rol del usuario actualizado
 *       500:
 *         description: Error del servidor
 *     security:
 *       - bearerAuth: []
 *     roles: [ADMIN_ROLE]
 */
router.patch("/updateRole/:uid", updateRoleValidator, updateRole);

export default router;