const hallServices = require('../services/hallServices');
const joi = require('joi');

const hallSchema = joi .object({
    name: joi.string().max(100).required(),
    price_per_hour: joi.number().precision(2).required(),
    square_meters: joi.number().integer().required()
});

const validateHall = (data) => {
    const { error, value } = hallSchema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
    return value;
};

exports.getAllHalls = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const halls = await hallServices.getAllHalls(parseInt(page), parseInt(limit));
        res.status(200).json(halls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getHallById = async (req, res) => {
    const { id } = req.params;
    try {
        const hall = await hallServices.getHallById(id);
        if (hall) {
            res.status(200).json(hall);
        } else {
            res.status(404).json({ error: 'Hall not found', id: id });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createHall = async (req, res) => {
    try {
        const hall = validateHall(req.body);
        const createdHallId = await hallServices.createHall(hall);
        res.status(201).json({ id: createdHallId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateHall = async (req, res) => {
    const { id } = req.params;
    try {
        const hall = validateHall(req.body);
        const updated = await hallServices.updateHall(id, hall);
        if (updated) {
            res.status(200).json({ message: 'Hall updated successfully', id: id });
        } else {
            res.status(404).json({ error: 'Hall not found', id: id });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteHall = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await hallServices.deleteHall(id);
        if (deleted) {
            res.status(200).json({ message: 'Hall deleted successfully', id: id });
        } else {
            res.status(404).json({ error: 'Hall not found', id: id });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

