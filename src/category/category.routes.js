import { Router } from "express";
import { createCategory, getCategory } from "./category.controller.js";
import { createCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

router.post("/createCategory",createCategoryValidator,createCategory);
router.get("/",getCategory);

export default router;