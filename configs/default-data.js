import User from "../src/user/user.model.js"
import Category from "../src/category/category.model.js"
import {hash} from "argon2"

export const createAdmin = async () => {
    try {
      const aEmail = "admin@gmail.com"
      const aPassword = "Admin98!"
 
      const existingAdmin = await User.findOne({ email: aEmail })

      if (!existingAdmin) {
        const encryptedPassword = await hash(aPassword);
 
        const aUser = new User({
            name: " ",
            surname: " ",
            username: "admin",
            email: aEmail,
            password: encryptedPassword,
            role: "ADMIN_ROLE",
        });
 
        await aUser.save()
        console.log("El admin por defecto se ha creado exitosamente")
 
      } else {
        console.log("Admin ya creado")
      }
    } catch (err) {
      console.error("Error al crear el admin por defecto:", err)
    }
};

export const createDefaultCategory = async () => {
    try {
      const name = "anything"

      const existingCategory = await Category.findOne({ name })

      if (!existingCategory) {
        const newCategory = new Category({
          name
        });
 
        await newCategory.save()
        console.log("Categoria creada exitosamente")

      }else{
        console.log("Categoría ya creada")
      }
      } catch (err) {
      console.error("Error al crear las categorias:", err)
    }
}