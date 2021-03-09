const userDao = require('../dao/userDao');
const loginController = require('./login.controller');
const dotenv = require('dotenv');
dotenv.config();

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userDao.getAllUsers();
            res.json(users);
        } catch (err) {
            console.error(err.message);
        }
    },
    addUser: async (req, res) => {
        try {
            let usertoAdd = {
                user_email: req.body.email,
                user_password: await loginController.hashPassword(req.body.password),
                pi_firstname: req.body.firstname,
                pi_lastname: req.body.lastname
            };
            const user = await userDao.addUser(usertoAdd);
            res.json(user);
        } catch (err) {
            console.error(err.message);
        }
    },
    getUserById: async (req, res) => {
        try {
            const {id} = req.params;
            const user = await userDao.getUserById(id);
            res.json(user);
        } catch (err) {
            console.error(err.message);
        }
    },
    addUserAddressById: async (req, res) => {
        try {
            let address = {
                street: req.body.street,
                buildingNumber: req.body.buildingNumber,
                flatNumber: req.body.flatNumber,
                postalCode: req.body.postalCode,
                city: req.body.city,
                country: req.body.country
            };
            const id = req.params.id;
            const userAddress = await userDao.addUserAddressById(id, address);
            res.json(userAddress);
        } catch (err) {
            console.error(err.message);
        }
    },
    deleteUserById: async (req, res) => {
        try {
            const {id} = req.params
            await userDao.deleteUserById(id);
            res.send("User successfully deleted!")
        } catch (err) {
            console.log(err.message);
        }
    }
}

module.exports = userController;

//TODO: update user details(pass, email. name, address, phone etc.)
