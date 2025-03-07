import { ca } from "date-fns/locale"
import Product from "../product/product.model.js"
import User from "../user/user.model.js"

export const addProductToCart = async (req, res) => {
    try {
        const {pid} = req.body
        const {usuario} = req
        const quantity = req.body.quantity || 1

        const product = await Product
            .findById(pid)
            .populate("category", "name")

        if(!product){
            return res.status(404).json({
                message: "Producto no encontrado"
            })
        }

        const user = await User.findById(usuario._id)

        if(!user){
            return res.status(404).json({
                message: "Usuario no encontrado"
            })
        }

        const productInCart = user.cart.find(product => product.pid.toString() === pid)

        if(productInCart){
            const newQuantity = Number(quantity) + productInCart.quantity

            if (newQuantity > product.quantity) {
                return res.status(400).json({
                    message: "No hay suficiente stock disponible"
                });
            }

            productInCart.quantity = newQuantity
        }else{
            user.cart.push({
                pid: pid,
                quantity: quantity
            })
        }

        await user.calculateCartTotal();

        await user.save()

        return res.status(200).json({
            success: true,
            message: "Producto añadido al carrito",
            data: user.cart,
            total: user.cartTotal
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al añadir producto al carrito",
            error: err.message
        })
    }
}


export const removeProductFromCart = async (req, res) => {
    try {
        const {pid} = req.body
        const {usuario} = req
        const quantity = req.body.quantity || 1

        const user = await User.findById(usuario._id)

        if(!user){
            return res.status(404).json({
                message: "Usuario no encontrado"
            })
        }

        const productInCart = user.cart.find(product => product.pid.toString() === pid);

        if (!productInCart) {
            return res.status(404).json({
                message: "Producto no encontrado en el carrito"
            });
        }

        productInCart.quantity -= quantity;

        if (productInCart.quantity <= 0) {
            user.cart = user.cart.filter(product => product.pid.toString() !== pid);
        } 

        await user.calculateCartTotal();

        await user.save()

        return res.status(200).json({
            success: true,
            message: "Producto eliminado del carrito",
            data: user.cart,
            total: user.cartTotal
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar producto del carrito",
            error: err.message
        })
    }
}

export const purchaseCart = async (req, res) => {
    try {
        const {usuario} = req

        const user = await User.findById(usuario._id)

        if(!user){
            return res.status(404).json({
                message: "Usuario no encontrado"
            })
        }

        if(user.cart.length === 0){
            return res.status(400).json({
                message: "El carrito esta vacio"
            })
        }

        user.cart = []
        user.cartTotal = 0

        await user.save()

        return res.status(200).json({
            success: true,
            message: "Compra realizada"
        })
    }catch(err){    
        return res.status(500).json({
            success: false,
            message: "Error al realizar compra",
            error: err.message
        })
    }
}

export const getCart = async (req, res) => {
    try {
        const {usuario} = req

        const user = await User.findById(usuario._id)
            .populate("cart.pid", "name price productImg")

        if(!user){
            return res.status(404).json({
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            data: user.cart,
            total: user.cartTotal
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener carrito",
            error: err.message
        })
    }
}