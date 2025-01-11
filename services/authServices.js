const bcrypt = require('bcrypt');
const db = require('../db');
const userServices = require('./userServices');
const roleServices = require('./roleServices');

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