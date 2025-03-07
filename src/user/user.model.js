import { Schema, model } from "mongoose";
import Product from "../product/product.model.js";

const userSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname: {
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: false
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "CLIENT_ROLE"]
    },
    status: {
        type: Boolean,
        default: true
    },
    cart: [{
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
    cartTotal: {
        type: Number,
        default: 0
    }
},
    {
        versionKey: false,
        timeStamps: true
    })

userSchema.methods.calculateCartTotal = async function() {
    let total = 0;
    for (const item of this.cart) {
        const product = await Product.findById(item.pid);
        if (product) {
            total += product.price * item.quantity;
        }
    }
    this.cartTotal = total;
};

userSchema.methods.toJSON = function () {
    const { password, _id, ...usuario } = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)