const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required:true,
        minlength:3,
        maxlength:15
    },
    phone:{
        type:Number,
        required: true,
        maxlength:10
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function ValidateCustomer (customer) 
{
    const schema = {
        name: Joi.string().min(5).required(),
        phone: Joi.number().required()
    };

    return Joi.validate(customer,schema);
}

 exports.Customer = Customer;
 exports.validate = ValidateCustomer;