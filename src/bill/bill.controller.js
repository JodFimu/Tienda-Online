import Bill from "./bill.model.js"

export const updateBill = async (req,res) => {
    try {
        const {bip} = req.params
        const {quantity, pid} = req.body

        const products = await Bill.findById(bip)

        console.log(products)

        const productInBill = products.products.find(product => product.pid.toString() === pid);

        if (!productInBill) {
            return res.status(404).json({
                message: "Producto no encontrado en el carrito"
            });
        }

        productInBill.quantity = quantity;

        if (productInBill.quantity <= 0) {
            products.products = products.products.filter(product => product.pid.toString() !== pid);
        } 

        await products.calculateTotal();

        await products.save();

        return res.status(200).json({
            succes: true,
            message: "Factura actualizada exitosamente"
        })
    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error al actualizar la factura",
            error: err.message
        })
    }
}