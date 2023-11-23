const connection = require('../config/database');
const getALLusers  = async() =>{

    let [result, fields] = await connection.query('select * from sanpham')
    return result;
}

const getUserById = async(userid) => {
    let [result, fields] = await connection.query('select * from sanpham where id = ?', [userid])

    let user = result && result.length > 0 ? result[0] : {};

    return user;
}

const updateuserbyID = async(Tensanpham, Mota, Gia, Soluong, userId) => {
    let [results, fields] = await connection.query(
        'UPDATE sanpham SET Tensanpham = ?, Mota = ? , Gia = ?, Soluong = ? WHERE id = ?', [Tensanpham, Mota, Gia, Soluong, userId]);
}


const deleteuserbyID = async (id) => {
    let [results, fields] = await connection.query(
        'DELETE FROM sanpham WHERE id =?', [id]);
}

module.exports = {
    getALLusers , getUserById , updateuserbyID, deleteuserbyID
}


// chịu trách nhiệm lấy data