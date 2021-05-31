const mongoose=require('mongoose')
const validator=require('validator')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    price: {
        type: Number,
        required: true
    }
});

const Product =mongoose.model('product', ProductSchema)
module.exports =Product;