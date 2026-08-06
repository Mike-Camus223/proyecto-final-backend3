import mongoose from "mongoose";
import adoptionModel from "./models/Adoption.js";

const sampleAdoptions = [
    {
        _id: "647fa8c9e46dbc5a20320199",
        owner: "647fa8c9e46dbc5a20320181",
        pet: "647fa8c9e46dbc5a20320185"
    },
    {
        _id: "647fa8c9e46dbc5a20320200",
        owner: "647fa8c9e46dbc5a20320183",
        pet: "647fa8c9e46dbc5a20320188"
    }
];

export default class Adoption {
    get = (params) => {
        if (mongoose.connection.readyState !== 1) return sampleAdoptions;
        return adoptionModel.find(params);
    };

    getBy = (params) => {
        if (mongoose.connection.readyState !== 1) {
            if (params && params._id) return sampleAdoptions.find(a => a._id === params._id) || null;
            return sampleAdoptions[0];
        }
        return adoptionModel.findOne(params);
    };

    save = (doc) => {
        if (mongoose.connection.readyState !== 1) return { _id: "647fa8c9e46dbc5a20320199", ...doc };
        return adoptionModel.create(doc);
    };

    update = (id, doc) => {
        if (mongoose.connection.readyState !== 1) return { _id: id, ...doc };
        return adoptionModel.findByIdAndUpdate(id, { $set: doc });
    };

    delete = (id) => {
        if (mongoose.connection.readyState !== 1) return { _id: id };
        return adoptionModel.findByIdAndDelete(id);
    };
}
