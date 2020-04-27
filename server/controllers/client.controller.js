const { mongoose } = require('mongoose');
const clientController = {};

const User = require('../models/user');
const Appoiment= require('../models/appoiment');

clientController.getClients = async (req, res) => {

    try {

        const clients = await User.find({ role: 'CLIENT_ROLE' }, '_id name email description birthday premiumClient');



        res.json(clients);

    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }
}



clientController.editClient = async (req, res) => {
    try {


        const { id } = req.params;
        const clients = {
            birthday: req.body.birthday,
            premiumClient: req.body.premiumClient
        }

        await User.findByIdAndUpdate(id, { $set: clients }, { new: true });
        res.json({ 'status': 'client updated' });

    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }
}

clientController.deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({'status': 'Client '+id+' deleted'});


    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        })
    }

}

clientController.getAppoimentsClient= async(req,res)=>{
    idClient= req.params.id;
   const appoiments= await Appoiment.find({clientId:idClient},'employeeId serviceId dateTime');
   res.json(appoiments);
   

  
}


module.exports = clientController;