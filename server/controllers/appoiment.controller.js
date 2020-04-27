const Appoiment = require('../models/appoiment');
const Service = require('../models/service');
const User = require('../models/user');
const path = require('path');
const { mongoose } = require('mongoose');
const stripe = require('stripe')('sk_test_gnRYNEVTe3bRdSN3mOV1yPaa00gWoK7qNG');
const userCtrl = require('../controllers/user.controller');


const appoimentController = {};

appoimentController.getAppoiments = async (req, res) => {
    await Appoiment.find({}, function (err, appoiments) {
        Service.populate(appoiments, { path: "serviceId " }, function (err, appoiments) {
            res.status(200).send(appoiments);
        });

    });


}


appoimentController.createAppoiment = async (req, res) => {

    try {

        //Apppoiment
        const employeeIdDb = await Appoiment.findOne({ employeeId: req.body.employeeId });
        const dateDb = await Appoiment.findOne({ dateTime: req.body.dateTime });

        if (employeeIdDb && dateDb) {
            console.log('entro al condicional');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'appoiment its already created'
                }
            });
        }
        const appoiment = new Appoiment({

            employeeId: req.body.employeeId,
            clientId: req.body.clientId,
            serviceId: req.body.serviceId,
            dateTime: req.body.dateTime

        });

        //datos del cliente
        /*const idClient = req.body.clientId;
        console.log('client id: ' + idClient);
        const clientObject = await User.findById(idClient);
        const clientEmail = clientObject.email;
        console.log('client email: ' + clientEmail);// email del cliente dependiendo del id.

        //datos del servicio
        const idService = req.body.serviceId;
        console.log('Service id: ' + idService);
        const serviceObject = await Service.findById(idService);
        const servicePrice = serviceObject.price;
        console.log('service price: ' + servicePrice);*/



        //create customer
        /*const customer = await stripe.customers.create({
            email: req.body.clientEmail,
            card: 4242424242424242,
            dataKey:'pk_test_xl5B0rNntF6BNekMkIklXhUn00KaiVpeT8'
            //source: req.body.stripeToken
        });*/

        //function to create checkbox
       // const serviceAmount = (servicePrice) * (100);// conversion to mexican price to penny

        /*const charge = await stripe.charges.create({
            amount: serviceAmount,
            currency: 'mxn',
            description: 'some product from barber shein services',
            email:clientEmail
        });*/

        /* if (charge) {
             console.log(charge.id);
             await appoiment.save();// se guarda la cita
             res.json({
                 'status': 'upload',
 
             });
         } else {
             res.json({
                 'status': 'purchase rejected'
             });
             console.log('no cayó');
         }*/





        await appoiment.save();// se guarda la cita
        res.json({
            'status': 'upload',

        });

    } catch (err) {
        res.status(400).json({
            ok: false,
            err
        });
    }


}

appoimentController.getAppoiment = async (req, res) => {
    const appoiment = await Appoiment.findById(req.params.id);
    res.json(appoiment);
}



appoimentController.editAppoiment = async (req, res) => {
    const { id } = req.params;
    const appoiment = {

        clientId: req.body.clientId,
        serviceId: req.body.serviceId,
        date: req.body.date,

    }

    await Appoiment.findByIdAndUpdate(id, { $set: appoiment }, { new: true });

    res.json({ 'status': 'Appoiment u pdate' });
};

appoimentController.deleteAppoiment = async (req, res) => {

    const { id } = req.params;
    await Appoiment.findByIdAndDelete(id);

    res.json({
        'status': 'Appoiment ' + id + ' deleted'
    })
}






module.exports = appoimentController;