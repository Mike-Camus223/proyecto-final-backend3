import mongoose from "mongoose";
import petModel from "./models/Pet.js";

const samplePets = [
    {
        _id: "647fa8c9e46dbc5a20320182",
        name: "Firma",
        specie: "Dog",
        adopted: false,
        birthDate: "2022-01-01T00:00:00.000Z"
    }
];

export default class Pet {
    get = (params) => {
        if (mongoose.connection.readyState !== 1) return samplePets;
        return petModel.find(params);
    };

    getBy = (params) => {
        if (mongoose.connection.readyState !== 1) {
            if (params && params._id) return samplePets.find(p => p._id === params._id) || null;
            return samplePets[0];
        }
        return petModel.findOne(params);
    };

    save = (doc) => {
        if (mongoose.connection.readyState !== 1) return { _id: "647fa8c9e46dbc5a20320182", ...doc };
        return petModel.create(doc);
    };

    update = (id, doc) => {
        if (mongoose.connection.readyState !== 1) return { _id: id, ...doc };
        return petModel.findByIdAndUpdate(id, { $set: doc });
    };

    delete = (id) => {
        if (mongoose.connection.readyState !== 1) return { _id: id };
        return petModel.findByIdAndDelete(id);
    };
}
