import Product from "./product.model.js"
import Category from "../category/category.model.js"
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
        const query = { status: true}
    
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

export const editProduct = async (req, res) => {
    try {
        const {pid} = req.params
        
        const data = req.body

        const product = await Product.findByIdAndUpdate(pid, data, {new: true})
        
        return res.status(200).json({
            succes: true,
            message: "Producto actualizado",
            product
        });
    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error al actualizar el producto"
        })
    }
}

export const getProductsById = async (req,res) => {
    try{
        const {pid} = req.params

        const product = await Product.findById(pid).populate("category", "name")

        if(!product){
            return res.status(400).json({
                succes: false,
                message: "El producto no existe"
            })
        }

        return res.status(200).json({
            succes: true,
            message: "Producto encontrado",
            product
        })
    }catch(err){
        return res.status(500).json({
            succes: false,
            message: "Error al encontrar el producto",
            error: err
        })
    }
}



export const inventory = async (req,res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }
    
        const [total, products ] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .select('name quantity _id')
        ])
    
        return res.status(200).json({
            succes: true,
            message: "productos encontrados",
            total,
            products
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            msg: 'Error al mostrar el inventario',
            error: err.message
        });
    }
}

export const soldOutProducts = async (req,res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { quantity: 0 }
    
        const [total, products ] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .select('name quantity _id')
        ])
    
        return res.status(200).json({
            succes: true,
            message: "productos agotados",
            total,
            products
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            msg: 'Error al listar los productos agotados',
            error: err.message
        });
    }
}

export const mostSoldProducts = async (req,res) => {
    try{
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }
    
        const [total, products ] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .sort({sold: -1})
                .skip(Number(desde))
                .limit(Number(limite))
                .select('name sold _id')
        ])
    
        return res.status(200).json({
            succes: true,
            message: "productos mas vendidos",
            total,
            products
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            msg: 'Error al listar los productos mas vendidos',
            error: err.message
        });
    }
}

export const deleteProduct = async (req,res) => {
    try{
        const {pid} = req.params

        const product = await Product.findByIdAndUpdate(pid, {status: false}, { new: true })

        if(!product){
            return res.status(400).json({
                succes: false,
                message: "El producto no existe"
            })
        }

        return res.status(200).json({
            succes: true,
            message: "Producto eliminado",
            product
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            msg: 'Error al eliminar el producto', 
            error: err
        });
    }
}


export const filterProducts = async (req,res) => {
    try{
        const { category, sort, keyWords } = req.body;
        const filter = {};

        if (keyWords) {
            filter.name = { $regex: keyWords, $options: 'i' };
        }
 
        if (category) {
            filter.category = category;
        }
 
        const sortOption = {};

        if (sort === 'az') {
            sortOption.name = 1;
        } else if (sort === 'za') {
            sortOption.name = -1;
        } else if (sort === 'mostSold') {
            sortOption.price = 1;
        }

        const products = await Product.find(filter)
            .sort(sortOption)
            .populate("category", "name");

        return res.status(200).json({
            success: true,
            message: 'Productos filtrados',
            products
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            msg: 'Error al filtrar los productos',
            error: err.message
        });
    }
}

export const updateProductImg = async (req, res) => {
    try {
        const {pid} = req.params
        const newProductImg = req.file ? req.file.filename : null

        if(!newProductImg){
            return res.status(400).json({
                success: false,
                msg: 'No se proporciono ningun archivo'
            });
        }

        const product = await Product.findById(pid)

        if(product.productImg){
            const oldProductImg = join(__dirname, "../../public/uploads/products-img", product.productImg)
            await fs.unlink(oldProductImg)
        }

        product.productImg = newProductImg
        await product.save()

        return res.status(200).json({
            success: true,
            msg: 'Imagen actualizada',
            product
        });
    }catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error al actualizar la imagen",
            error: err
        })
    }
}