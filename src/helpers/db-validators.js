import User from "../user/user.model.js"

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

export const isHimself = async (uid = " ")=>{
    const user = await User.findById(uid)

    return (req, res, next) =>{
        if(!req.usuario){
            return res.status(500).json({
                success: false,
                message: "Se quiere verificar un role antes de validar el token"
            })
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                success: false,
                message:`El servicio requiere uno de estos roles ${roles}`
            })
        }
        next()
    }
}