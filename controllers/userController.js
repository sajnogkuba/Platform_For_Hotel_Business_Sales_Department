const userServices = require('../services/userServices');
const joi = require('joi');

const userSchema = joi.object({
    name: joi.string().max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    role_id: joi.number().integer().required(),
    phone: joi.string().pattern(/^\+?[0-9]{9,15}$/).required()
});

const validateUser = (data) => {
    const { error, value } = userSchema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
    return value;
};

exports.getAllUsers = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const users = await userServices.getAllUsers(parseInt(page), parseInt(limit));
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userServices.getUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found', id: id });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = validateUser(req.body);
        const createdUserId = await userServices.createUser(user);
        res.status(201).json({ id: createdUserId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = validateUser(req.body);
        const updated = await userServices.updateUser(id, user);
        if (updated) {
            res.status(200).json({ message: 'User updated successfully', id: id });
        } else {
            res.status(404).json({ error: 'User not found', id: id });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await userServices.deleteUser(id);
        if (deleted) {
            res.status(200).json({ message: 'User deleted successfully', id: id });
        } else {
            res.status(404).json({ error: 'User not found', id: id });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};