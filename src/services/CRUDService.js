const connection = require('../config/database');
const getALLusers  = async() =>{

    let [result, fields] = await connection.query('select * from sanpham')
    return result;
}

const getUserById = async(userid) => {
    let [result, fields] = await connection.query('select * from sanpham where Masanpham = ?', [userid])

    let user = result && result.length > 0 ? result[0] : {};

    return user;
}


const updateuserbyID = async (Masanpham, Tensanpham, Mota, Gia, Soluong) => {
    let [results, fields] = await connection.query(
        'UPDATE sanpham SET Masanpham = ?, Tensanpham = ?, Mota = ?, Gia = ?, Soluong=?  WHERE Masanpham = ?', [Masanpham, Tensanpham, Mota, Gia, Soluong]);
}

const deleteuserbyID = async (Masanpham) => {
    let [results, fields] = await connection.query(
        'DELETE FROM sanpham WHERE Masanpham =?', [Masanpham]);
}

module.exports = {
    getALLusers , getUserById , updateuserbyID, deleteuserbyID
}


// chịu trách nhiệm lấy data