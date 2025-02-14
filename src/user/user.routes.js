import { Router } from "express";
import { getUserById,getUsers,deleteUser, updatePassword,updateUserUser, updateUserAdmin} from "./user.controller.js";
import { getUserByIdValidator,deleteUserValidator, updatePasswordValidator, updateUserValidatorAdmin, createUserValidation} from "../middlewares/user-validators.js";
import { register } from "../user/auth.controller.js"

const router = Router();

router.get("/findUser/:uid", getUserByIdValidator, getUserById);

router.get("/", getUsers);

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser);

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);

router.put("/updateUser", updateUserValidatorClient, updateUserUser);
router.put("/updateUserAdmin/:uid", updateUserValidatorAdmin, updateUserAdmin)

router.post("/createUser",createUserValidation,register)