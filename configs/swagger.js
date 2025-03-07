import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Tienda Online API",
            version: "1.0.0",
            description: "API para un sistema de tienda online",
            contact:{
                name: "José Figueroa",
                email: "jfigueroa-2023015@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/kinalShop/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/category/category.routes.js",
        "./src/product/product.routes.js",
        "./src/purchase/purchase.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}