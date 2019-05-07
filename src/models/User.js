import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema

const UserSchema = new Schema({
    first_name:{
        type: String
    },
    last_name:{
        type: String
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

export default User = model('users', UserSchema)