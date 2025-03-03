import Product from "./product.model.js"
import Category from "../category/category.model.js"

export const createProduct = async (req, res) => {
    try {
        let productImg = req.file ? req.file.filename : null;
        const data = req.body

        data.productImg= productImg

        const category = await Category.findById(data.category)

        if(!category){
            return res.status(401).json({
                succes: false,
                message: "No existe la categoria"
            })
        }

        const product = await Product.create(data)

        return res.status(200).json({
            succes: true,
            message: "Producto creado",
            product: product
        }) 

    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error al crear los productos"
        })
    }
}

export const getProducts = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }
    
        const [total, products ] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('category', 'name')
        ])
    
        res.status(200).json({
            succes: true,
            message: "productos encontrados",
            total,
            products
        });
    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error al listar los productos"
        })
    }
}