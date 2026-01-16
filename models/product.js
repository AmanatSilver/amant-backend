import mongoose from "mongoose";

const { Schema , model} = mongoose ;

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    
})