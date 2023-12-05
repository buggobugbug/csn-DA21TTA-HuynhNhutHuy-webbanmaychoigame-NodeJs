const connection = require("../config/database");



const { getALLusers, getUserById, updateuserbyID, deleteuserbyID } = require('../services/CRUDService');
const getHomepage = async(req , res) => {
    let result = await getALLusers(); 
   return res.render('homepage.ejs', {listusers : result});
   
}
const getABC = (req, res) => {
    res.send('check ABC')
}
const gethoidanit = (req, res) => {
    res.render('sample.ejs')
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getUpdateUser = async(req, res) => {
    let MaSanPham = req.params.MaSanPham;
    let [user] = await connection.query(
        'Select * from sanpham  where MaSanPham = ?', [MaSanPham]
    );
    res.render('edit.ejs', { userEdit: user[0] ,  listusers: user })
}

const postCreatuser = async(req, res) => {
    
    let TenSanPham = req.body.TenSanPham;
    let Mota = req.body.Mota;
    let Gia = req.body.Gia;
    let SoLuong = req.body.SoLuong;
    let TenNXS = req.body.TenNXS;
    let Theloai = req.body.Theloai;


    let [results, fields] = await connection.query(
        'INSERT INTO sanpham (TenSanPham, Mota, Gia, Soluong, TenNXS, Theloai) VALUES (?, ?, ?, ? , ?, ?)', [TenSanPham, Mota, Gia, SoLuong, TenNXS, Theloai]);

    console.log(">>>>>>check result", results)
    res.redirect('/')



}

const postUpdateuser = async (req, res) => {

    let TenSanPham = req.body.TenSanPham;
    let Mota = req.body.Mota;
    let Gia = req.body.Gia;
    let SoLuong = req.body.SoLuong;
    let TenNXS = req.body.TenNXS;
    let Theloai = req.body.Theloai;
    let userid = req.body.userid;

   
    await updateuserbyID(TenSanPham, Mota, Gia, SoLuong, TenNXS, Theloai, userid)
    res.redirect('/');


}

const postDeleteUser = async (req, res) => {
    let userid = req.body.userid;
    await deleteuserbyID(userid);
    res.redirect('/');

}

const postHandleRemoveuser = async(req, res ) => {
    const MaSanPham =req.body.userid;
    await deleteuserbyID(MaSanPham)

    res.redirect('/');
}

const getDetailPage= async(req, res) => {
    let MaSanPham = req.params.MaSanPham;
    let user = await connection.query(
        'select * from sanpham where MaSanPham = ? ', [MaSanPham]  );
    console.log('check req = ', user);
    res.send(JSON.stringify(user[0]))
}


const postUpdateUser  = async(req, res) => {

    let { MaSanPham, TenSanPham, Mota, Gia, SoLuong, TenNXS, Theloai }= req.body;

    await connection.query(
        'update sanpham set MaSanPham=?, TenSanPham = ? , Mota = ?, Gia = ?, Soluong= ?, TenNXS = ?, Theloai = ?', [MaSanPham, TenSanPham, Mota, Gia, SoLuong, TenNXS, Theloai ]
    );
    console.log('Check request', req.body);
    res.redirect('/')
}


module.exports= {
    postUpdateUser,getHomepage, getABC, gethoidanit, postCreatuser, getCreatePage, getALLusers, getUpdateUser, updateuserbyID
    , postUpdateuser, postDeleteUser, postHandleRemoveuser, getDetailPage
}