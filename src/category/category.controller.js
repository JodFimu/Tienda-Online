import Category from './category.model.js';

export const getCategory = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query
        const query = { status: true }

        const [total, categories ] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            succes: true,
            message: "Categorias encontradas",
            total,
            categories
        });
    } catch (err) {
        res.status(400).json({
            succes: false,
            message: "Error al obtener categorias",
            error: err.message
        });
    }
}


export const createCategory = async (req, res) => {
    try {
        const data = req.body;
        
        const category = await Category.create(data);

        res.status(201).json({
            succes: true,
            message: "Categoria creada exitosamente",
            data: category
        });
    } catch (err) {
        res.status(400).json({
            succes: false,
            message: "Error al crear categoria",
            error: err.message
        });
    }
}

export const updateCategory = async (req, res) => {
    try{
        const {name} = req.body;
        const { cid } = req.params;


        const category = await Category.findByIdAndUpdate(cid, {name: name}, {new: true})

        return res.status(200).json({
            success: true,
            message: 'Categoria actualizada',
            category
        });        
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar la categoria',
            error: err.message
        });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { cid } = req.params;

        const category = await Category.findByIdAndUpdate(cid, { status: false }, { new: true });

        //codigo para asignar los productos a la categoria por defecto

        return res.status(200).json({
            success: true,
            message: 'Categoria eliminada',
            category
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar la categoria',
            error: err.message
        });
    }
}