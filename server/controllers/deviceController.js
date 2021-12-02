const  {Device, DeviceInfo} = require('../models/models')
const  ApiError = require('../error/ApiError')
const  uuid = require('uuid')
const  path = require('path')

class DeviceController{
    async create(req,res){
        try{
            let {name,price,brandId,typeId,info} = req.body
            const {img} = req.files
            let fileName =uuid.v8 + ".jpg"
            img.mv(path.resolve(__dirname,'..','static',fileName))
            const  device = await  Device.create({name,price,brandId,typeId,img:fileName})

            if(info){
                info = JSON.parse(info)
                info.forEach(i=>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId:device.id
                }))
            }

            return  res.json(device)
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)

    }

    async GetAveragePrice(){
        var request = require('request');

        //http://api.currencylayer.com/historical?access_key=341983ae2176e8e0ba1c17efb71acded&date=2021-12-02&currencies=RUB&format=1
        //http://api.currencylayer.com/live?access_key=341983ae2176e8e0ba1c17efb71acded&currencies=RUB&format=1
        request({
            method: 'POST',
            url: 'http://api.currencylayer.com/live?access_key=341983ae2176e8e0ba1c17efb71acded&currencies=RUB&format=1',
            // headers: {
            //     'access_key': '341983ae2176e8e0ba1c17efb71acded'
            // },
            // body: ""
        }, function (error, response, body) {
            console.log('Status:', response.statusCode);
            // console.log('Headers:', JSON.stringify(response.headers));
            // console.log('Response:', body);
        });


    }

    async getOne(req,res){
        const {id} = req.params
        const  device = await Device.findOne(
            {
            where:{id},
            include:[{model:DeviceInfo,as:'info'}]
            },
        )
        //let request = require('request');

        // //http://api.currencylayer.com/historical?access_key=341983ae2176e8e0ba1c17efb71acded&date=2021-12-02&currencies=RUB&format=1
        // //http://api.currencylayer.com/live?access_key=341983ae2176e8e0ba1c17efb71acded&currencies=RUB&format=1
        // request({
        //     method: 'GET',
        //     url: 'http://api.currencylayer.com/live?access_key=341983ae2176e8e0ba1c17efb71acded&currencies=RUB&format=1',
        //     // headers: {
        //     //     'access_key': '341983ae2176e8e0ba1c17efb71acded'
        //     // },
        //     // body: ""
        // }, function (error, response, body) {
        //     console.log('Status:', response.statusCode);
        //     device.price = 150;
        //     // console.log('Headers:', JSON.stringify(response.headers));
        //     // console.log('Response:', body);
        // });
        //
        //
        const request = require('request');

        var fetch = require('node-fetch');

        // fetch('http://api.currencylayer.com/live?access_key=341983ae2176e8e0ba1c17efb71acded&currencies=RUB&format=1')
        //     .then(data =>{
        //         data.json().then(out => {
        //             console.log(out);
        //         })
        //     })

        let response = await fetch('http://api.currencylayer.com/live?access_key=341983ae2176e8e0ba1c17efb71acded&currencies=RUB&format=1');

        if (response.ok) { // если HTTP-статус в диапазоне 200-299
                           // получаем тело ответа (см. про этот метод ниже
            let json = await response.json();
            device.id_api = (device.price / Number(json.quotes.USDRUB)).toFixed(2)
        } else {
            device.price =  response.status
        }

        return  res.json(device)
    }


}

module.exports = new DeviceController()