const joi = require('joi');

exports.registerSchema = joi.object({
    name: joi.string().max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    role_id: joi.number().integer().required(),
    phone: joi.string().pattern(/^\+?[0-9]{9,15}$/).required()
});

exports.loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});