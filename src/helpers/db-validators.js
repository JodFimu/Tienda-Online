import User from "../user/user.model.js"
import Category from "../category/category.model.js"
import Product from "../product/product.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    console.log(existe)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const isClient = async (uid = " ") =>{
    const existe = await User.findById(uid)
    console.log(existe)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }

    if(existe.role !== "CLIENT_ROLE"){
        throw new Error("No es un cliente")
    }
}

export const isAdmin = async (uid = " ") =>{
    const existe = await User.findById(uid)
    console.log(existe)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }

    if(existe.role !== "ADMIN_ROLE"){
        throw new Error("No es un administrador")
    }
}

export const categoryExist = async (name = " ")=>{
    const exist = await Category.findOne({name})

    if(exist){
        throw new Error(`la categoria: ${name} ya existe`)
    }
}

export const categoryExistById = async (cid = " ")=>{
    const exist = await Category.findById(cid)

    if(!exist){
        throw new Error("La categoria no existe")
    }
}

export const productExist = async (name = " ")=>{
    const exist = await Product.findOne({name})

    if(exist){
        throw new Error(`el producto: ${name} ya existe`)
    }
}

export const productExistById = async (pid = " ")=>{
    const exist = await Product.findById(pid)

    if(!exist){
        throw new Error("El producto no existe")
    }
}
