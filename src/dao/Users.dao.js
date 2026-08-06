import mongoose from "mongoose";
import userModel from "./models/User.js";

const sampleUsers = [
    {
        _id: "647fa8c9e46dbc5a20320181",
        first_name: "Juan",
        last_name: "Perez",
        email: "juan.perez@example.com",
        role: "user",
        pets: [{ _id: "647fa8c9e46dbc5a20320185" }]
    },
    {
        _id: "647fa8c9e46dbc5a20320183",
        first_name: "Maria",
        last_name: "Gomez",
        email: "maria.gomez@example.com",
        role: "user",
        pets: [{ _id: "647fa8c9e46dbc5a20320188" }]
    },
    {
        _id: "647fa8c9e46dbc5a20320190",
        first_name: "Carlos",
        last_name: "Rodriguez",
        email: "carlos.rodriguez@example.com",
        role: "user",
        pets: []
    },
    {
        _id: "647fa8c9e46dbc5a20320191",
        first_name: "Ana",
        last_name: "Martinez",
        email: "ana.martinez@example.com",
        role: "admin",
        pets: []
    },
    {
        _id: "647fa8c9e46dbc5a20320192",
        first_name: "Lucas",
        last_name: "Fernandez",
        email: "lucas.fernandez@example.com",
        role: "user",
        pets: []
    }
];

export default class Users {
    get = (params) => {
        if (mongoose.connection.readyState !== 1) return sampleUsers;
        return userModel.find(params);
    };

    getBy = (params) => {
        if (mongoose.connection.readyState !== 1) {
            if (params && params._id) return sampleUsers.find(u => u._id === params._id) || null;
            if (params && params.email) return sampleUsers.find(u => u.email === params.email) || null;
            return sampleUsers[0];
        }
        return userModel.findOne(params);
    };

    save = (doc) => {
        if (mongoose.connection.readyState !== 1) return { _id: "647fa8c9e46dbc5a20320181", ...doc };
        return userModel.create(doc);
    };

    update = (id, doc) => {
        if (mongoose.connection.readyState !== 1) return { _id: id, ...doc };
        return userModel.findByIdAndUpdate(id, { $set: doc });
    };

    delete = (id) => {
        if (mongoose.connection.readyState !== 1) return { _id: id };
        return userModel.findByIdAndDelete(id);
    };
}
