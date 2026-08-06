import mongoose from "mongoose";
import petModel from "./models/Pet.js";

const samplePets = [
    {
        _id: "647fa8c9e46dbc5a20320182",
        name: "Firulais",
        specie: "Perro",
        adopted: false,
        birthDate: "2022-01-15T00:00:00.000Z"
    },
    {
        _id: "647fa8c9e46dbc5a20320184",
        name: "Michi",
        specie: "Gato",
        adopted: false,
        birthDate: "2023-03-10T00:00:00.000Z"
    },
    {
        _id: "647fa8c9e46dbc5a20320185",
        name: "Luna",
        specie: "Gato",
        adopted: true,
        owner: "647fa8c9e46dbc5a20320181",
        birthDate: "2021-06-20T00:00:00.000Z"
    },
    {
        _id: "647fa8c9e46dbc5a20320186",
        name: "Rocky",
        specie: "Perro",
        adopted: false,
        birthDate: "2020-11-05T00:00:00.000Z"
    },
    {
        _id: "647fa8c9e46dbc5a20320187",
        name: "Mia",
        specie: "Gato",
        adopted: false,
        birthDate: "2022-08-14T00:00:00.000Z"
    },
    {
        _id: "647fa8c9e46dbc5a20320188",
        name: "Toby",
        specie: "Perro",
        adopted: true,
        owner: "647fa8c9e46dbc5a20320183",
        birthDate: "2019-04-30T00:00:00.000Z"
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
