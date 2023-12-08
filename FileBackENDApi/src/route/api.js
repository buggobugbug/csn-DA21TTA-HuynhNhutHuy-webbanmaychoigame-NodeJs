import express from "express";

import APIController from '../controller/APIController.js'

let router = express.Router()

const initAPIRoute = (app) => {

    router.get('/sanpham', APIController.getAllSanPham); //method GET -> READ data
    router.get('/sanpham/:id', APIController.getSanPhamById);
    router.get('/sanpham/slider', APIController.getSanPhamSlider);

    router.post('/create-user', APIController.createNewUser); //method POST -> CREATE data
    router.put('/update-sanpham', APIController.updateSanPham); //method PUT -> UPDATE data
    router.delete('/delete-user/:id', APIController.deleteUser); //method DELETE -> DELETE data

    return app.use('/api/v1/', router)
}

export default initAPIRoute;