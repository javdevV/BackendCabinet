var mongoose = require('mongoose');


// var genericModel = "";
class CrudController {
    constructor(model) {
        this.genericModel = model;
        this.find = this.find.bind(this);
        this.add = this.add.bind(this);
        this.findById = this.findById.bind(this);
        this.put = this.put.bind(this);
        this.patch = this.patch.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }

    async find(req, res) {
        console.log("find method | model : " + this.genericModel);
        const items = await mongoose.model(this.genericModel).find({});
        try {
            console.log("Requested model : " + this.genericModel + "\n" + items);
            res.send(items)
        } catch (err) {
            res.status(500).json(err);
        }
    }
    async add(req, res) {
        const item = new mongoose.model(this.genericModel)(req.body);
        try {
            await item.save();
            res.send(item);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    }
    async findById(req, res) {
        const item = await mongoose.model(this.genericModel).findById(req.params.id);
        try {
            if (item) {
                res.json(item);
            } else {
                res.status(404).json({ "_id": req.params.id, "Not Found": true });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async put(req, res) {
        let responseObject = {
            sucess: true,
            updated_element: req.body
        };
        try {
            await mongoose.model(this.genericModel).findByIdAndUpdate(req.params.id, req.body);
            res.send(responseObject);
        } catch (error) {
            res.status(500).send(error)


        }
    }
    async patch(req, res) {
        let responseObject = {
            sucess: true,
            updated_element: req.body
        };
        try {
            await mongoose.model(this.genericModel).findByIdAndUpdate(req.params.id, req.body);
            res.send(responseObject);
        } catch (error) {
            res.status(500).send(error)


        }
    }
    async delete(req, res) {
        try {
            const item = await mongoose.model(this.genericModel).findByIdAndDelete(req.params.id);
            var payload = {
                deleted: true,
                deleted_element: item
            }
            if (!item) res.status(404).send("Not Item Found");
            res.status(200).json(payload);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    async deleteAll(req, res) {
        try {
            const items = await mongoose.model(this.genericModel).deleteMany();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}
module.exports = CrudController;