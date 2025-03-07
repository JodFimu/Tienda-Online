import { Schema, model } from "mongoose"

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



billSchema.methods.toJSON = function () {
    const { _id, ...bill } = this.toObject()
    bill.bil = _id
    return bill
}

export default model("Bill", billSchema)