import express from "express";
import homeController from '../controller/homeController.js'

// Về ảnh sản phẩm
const multer = require("multer");
const path = require("path");
var appRoot = require("app-root-path");

let router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/images/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = "Only image files are allowed!";
        return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/Trang-them-san-pham', homeController.getThemSanPhamPage);
    router.get('/edit/:id', homeController.getEditPage);

    router.post('/Them-san-pham', upload.single("profile_pic"), homeController.themSanPham)
    router.post('/update-sanpham', upload.single("profile_pic"), homeController.postUpdateSanPham)
    router.post('/delete', homeController.deleteSanPham)
    router.post('/update-user', homeController.updateUser)
    router.get('/Trang-update-user', homeController.getupdateuser)
    router.post('/search-by-ma-san-pham', async (req, res) => {
        const { MaSanPham: searchMaSanPham } = req.body;

        try {
            const resultSanPham = await homeController.searchProductByMaSanPham(searchMaSanPham);
            res.render('search', { SanPham: resultSanPham });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    });
    router.post('/search-by-ten-san-pham', async (req, res) => {
        const { TenSanPham: searchTenSanPham } = req.body;

        try {
            const resultSanPham = await homeController.searchProductByTenSanPham(searchTenSanPham);
            res.render('search', { SanPham: resultSanPham });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    });
    router.post('/search-by-nha-san-xuat', async (req, res) => {
        const { TenNXS: searchTenNXS } = req.body;

        try {
            const resultSanPham = await homeController.searchProductNhaSanXuat(searchTenNXS);
            res.render('search', { SanPham: resultSanPham });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    });
    router.post('/search-by-the-loai', async (req, res) => {
        const { Theloai: searchTheloai } = req.body;

        try {
            const resultSanPham = await homeController.searchProductTheloai(searchTheloai);
            res.render('search', { SanPham: resultSanPham });
        } catch (error) {
            console.error('Error in search-by-the-loai controller:', error);
            res.status(500).send('Internal Server Error');
        }
    });



    // router.post('/Tim', homeController.postHomePage)


    // router.get('/detail/user/:id', homeController.getDetailPage);
    // router.get('/edit-user/:id', homeController.getEditPage);

    // router.post('/create-new-user', homeController.createNewUser)

    return app.use('/', router)
}

export default initWebRoute;