import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"1.0.0",
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
                url: "http://127.0.0.1:3001/onlineShop/v1"
            }
        ]
    },
    apis:[
        
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}