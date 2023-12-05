const connection = require('../config/database');
const getALLusers  = async() =>{

    let [result, fields] = await connection.query('select * from sanpham')
    return result;
}

const getUserById = async(userid) => {
    let [result, fields] = await connection.query('select * from sanpham where MaSanPham = ?', [userid])

    let user = result && result.length > 0 ? result[0] : {};

    return user;
}


const updateuserbyID = async (TenSanPham, Mota, Gia, SoLuong, TenNXS, Theloai, userid) => {
    let [results, fields] = await connection.query(
        'UPDATE sanpham SET TenSanPham = ? , Mota = ?, Gia = ?, Soluong= ?, TenNXS = ?, Theloai =? WHERE MaSanPham = ?', [TenSanPham, Mota, Gia, SoLuong, TenNXS, Theloai, userid]);
}

const deleteuserbyID = async (MaSanPham) => {
    let [results, fields] = await connection.query(
        'DELETE FROM sanpham WHERE MaSanPham =?', [MaSanPham]);
}

module.exports = {
    getALLusers , getUserById , updateuserbyID, deleteuserbyID
}


// chịu trách nhiệm lấy data