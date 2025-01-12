const bcrypt = require('bcrypt');
const userServices = require('./userServices');
const roleServices = require('./roleServices');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

exports.register = async (user) => {
    const { name, email, password, role_id, phone } = user;
    const userExists = await userServices.checkIfUserExists(email);
    if (userExists) {
        throw new Error('User already exists');
    }
    const roleExists = await roleServices.checkIfRoleExists(role_id);
    if (!roleExists) {
        throw new Error('Role does not exist');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        name,
        email,
        password: hashedPassword,
        role_id,
        phone
    };
    return userServices.createUser(newUser);
};

exports.login = async (email, password) => {
    const user = await userServices.getUserByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, role_id: user.Role_id }, jwtSecret, { expiresIn: '1h' });
    return { token, user: { id: user.id, email: user.email, role_id: user.Role_id } };
};