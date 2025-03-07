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
            productInCart.quantity = Number(quantity) + productInCart.quantity
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