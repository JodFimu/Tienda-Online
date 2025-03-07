import { Schema, model } from "mongoose"
import Product from "../product/product.model.js"

const billSchema = Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        pid: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    subTotal: {
        type: Number,
        default: 0
    }
},
    {
        versionKey: false,
        timeStamps: true
    })

billSchema.methods.calculateTotal = async function() {
    let total = 0;
    for (const item of this.products) {
        const product = await Product.findById(item.pid);
        if (product) {
            total += product.price * item.quantity;
        }
    }
    this.subTotal = total;
};

billSchema.methods.toJSON = function () {
    const { _id, ...bill } = this.toObject()
    bill.bil = _id
    return bill
}

export default model("Bill", billSchema)