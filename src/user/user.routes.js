import { Router } from "express";
import { getUserById,getUsers,deleteUserAdmin, updatePassword,updateUserUser, updateUserAdmin, updateRole, deleteUserClient} from "./user.controller.js";
import { getUserByIdValidator, updatePasswordValidator, deleteUserValidatorClient, deleteUserValidatorAdmin, createUserValidation,
    updateRoleValidator, getUserValidation
} from "../middlewares/user-validators.js";
import { register } from "../auth/auth.controller.js"

const router = Router();

router.get("/findUser/:uid", getUserByIdValidator, getUserById);

router.get("/", getUserValidation, getUsers);

router.delete("/deleteUserAdmin/:uid", deleteUserValidatorAdmin, deleteUserAdmin);
router.delete("/deleteUserClient", deleteUserValidatorClient, deleteUserClient);

router.patch("/updatePassword", updatePasswordValidator, updatePassword);

router.put("/updateUser", deleteUserValidatorClient, updateUserUser);
router.put("/updateUserAdmin/:uid", deleteUserValidatorAdmin, updateUserAdmin)

router.post("/createUser",createUserValidation,register)

router.patch("/updateRole/:uid", updateRoleValidator,updateRole)

export default router;