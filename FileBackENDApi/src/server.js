import express from "express"
import configViewEngine from "./configs/viewEngine.js"
import initWebRoute from "./route/web.js"
import initAPIRoute from './route/api.js'
import path from 'path';




require('dotenv').config();

const app = express()
const port = process.env.PORT || 8081;

const cors = require("cors");
app.use("/public", express.static(path.join(__dirname, "public")));

// const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup view engine
configViewEngine(app);

//initWebRouter
initWebRoute(app);

//init api router
initAPIRoute(app);

app.use(express.urlencoded({ extended: true }));

// Route xử lý tìm kiếm theo MaSanPham
app.post('/search-by-ma-san-pham', async (req, res) => {
    const { MaSanPham } = req.body;

    try {
        const searchResult = await homeController.searchProductByMaSanPham(MaSanPham);
        res.render('search', { searchResult });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


