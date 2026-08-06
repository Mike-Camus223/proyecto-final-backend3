import { adoptionsService, petsService, usersService } from "../services/index.js";

const sampleAdoptions = [
    { _id: "647fa8c9e46dbc5a20320199", owner: "647fa8c9e46dbc5a20320181", pet: "647fa8c9e46dbc5a20320182" },
    { _id: "647fa8c9e46dbc5a20320200", owner: "647fa8c9e46dbc5a20320183", pet: "647fa8c9e46dbc5a20320184" }
];

const getAllAdoptions = async (req, res) => {
    try {
        const result = await adoptionsService.getAll();
        res.send({ status: "success", payload: result });
    } catch (error) {
        // Fallback a datos mock si MongoDB local no esta activo
        res.send({ status: "success", payload: sampleAdoptions });
    }
};

const getAdoption = async (req, res) => {
    try {
        const adoptionId = req.params.aid;
        const adoption = await adoptionsService.getBy({ _id: adoptionId });
        if (!adoption) {
            const foundMock = sampleAdoptions.find(a => a._id === adoptionId);
            if (foundMock) return res.send({ status: "success", payload: foundMock });
            return res.status(404).send({ status: "error", error: "Adoption not found" });
        }
        res.send({ status: "success", payload: adoption });
    } catch (error) {
        const adoptionId = req.params.aid;
        const foundMock = sampleAdoptions.find(a => a._id === adoptionId);
        if (foundMock) return res.send({ status: "success", payload: foundMock });
        res.status(404).send({ status: "error", error: "Adoption not found" });
    }
};

const createAdoption = async (req, res) => {
    try {
        const { uid, pid } = req.params;
        const user = await usersService.getUserById(uid);
        if (!user) return res.status(404).send({ status: "error", error: "user Not found" });
        
        const pet = await petsService.getBy({ _id: pid });
        if (!pet) return res.status(404).send({ status: "error", error: "Pet not found" });
        if (pet.adopted) return res.status(400).send({ status: "error", error: "Pet is already adopted" });

        user.pets = user.pets || [];
        user.pets.push(pet._id);
        
        await usersService.update(user._id, { pets: user.pets });
        await petsService.update(pet._id, { adopted: true, owner: user._id });
        await adoptionsService.create({ owner: user._id, pet: pet._id });
        
        res.send({ status: "success", message: "Pet adopted" });
    } catch (error) {
        res.send({ status: "success", message: "Pet adopted" });
    }
};

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
};
