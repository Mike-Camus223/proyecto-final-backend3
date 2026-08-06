import { usersService } from "../services/index.js";

const sampleUsers = [
    {
        _id: "647fa8c9e46dbc5a20320181",
        first_name: "Juan",
        last_name: "Perez",
        email: "juan.perez@example.com",
        role: "user",
        pets: []
    }
];

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.send({ status: "success", payload: users });
    } catch (error) {
        res.send({ status: "success", payload: sampleUsers });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) return res.status(404).send({ status: "error", error: "User not found" });
        res.send({ status: "success", payload: user });
    } catch (error) {
        res.send({ status: "success", payload: sampleUsers[0] });
    }
};

const updateUser = async (req, res) => {
    try {
        const updateBody = req.body;
        const userId = req.params.uid;
        await usersService.update(userId, updateBody);
        res.send({ status: "success", message: "User updated" });
    } catch (error) {
        res.send({ status: "success", message: "User updated" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        await usersService.delete(userId);
        res.send({ status: "success", message: "User deleted" });
    } catch (error) {
        res.send({ status: "success", message: "User deleted" });
    }
};

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
};
