const connection = require('../config/database');
const getALLusers  = async() =>{

    let [result, fields] = await connection.query('select * from Users')
    return result;
}

const getUserById = async(userid) => {
    let [result, fields] = await connection.query('select * from Users where id = ?', [userid])

    let user = result && result.length > 0 ? result[0] : {};

    return user;
}


const updateuserbyID = async (email, city, name, userid) => {
    let [results, fields] = await connection.query(
        'UPDATE Users SET email = ?, City= ?, Name= ? WHERE id = ?', [email, city, name, userid]);
}

const deleteuserbyID = async (id) => {
    let [results, fields] = await connection.query(
        'DELETE FROM Users WHERE id =?', [id]);
}

module.exports = {
    getALLusers , getUserById , updateuserbyID, deleteuserbyID
}


// chịu trách nhiệm lấy data