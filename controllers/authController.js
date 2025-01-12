const authServices = require('../services/authServices');
const { registerSchema, loginSchema } = require('../validators/authValidator');

exports.register = async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const createdUserId = await authServices.register(value);
        res.status(201).json({ id: createdUserId });
    } catch (error) {
        if(error.message === 'User already exists' || error.message === 'Role does not exist') {
            return res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

exports.login = async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { email, password } = value;
        const { token, user } = await authServices.login(email, password);
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                role_id: user.role_id,
            }, });
    } catch (error) {
        if(error.message === 'Invalid email or password') {
            return res.status(401).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}