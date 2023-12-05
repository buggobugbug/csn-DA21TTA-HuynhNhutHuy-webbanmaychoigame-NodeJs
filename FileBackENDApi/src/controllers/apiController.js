const connection = require("../config/database");


let getAllUserss = async (req, res) => {
    let id = req.params.id;
    let [user] = await connection.query(
        'Select * from csdlbanmaychoigame where id = ?', [id]
    );
    res.status(200).json({
        message: 'eric',
        data: user,
    });
}

let creatNewUSER = async (req, res) => {
    let { id, email, name, city } = req.body;
    if (!id, !email || !name || !city) {
        return res.status(200).json(
            {
                message: 'missing'
            }
        )
    }
    await connection.query(
        'INSERT INTO Users (email, name, city) VALUES (?, ?, ?)', [email, name, city]);


    return res.status(200).json(
        {
            message: 'oke'
        }
    )
}


let putUpdateuser = async (req, res) => {
    let { id, email, name, city } = req.body;
    if (!id, !email || !name || !city) {
        return res.status(200).json(
            {
                message: 'missing data update'
            }
        )
    }
    await connection.query(
        'UPDATE Users SET email = ?, City= ?, Name= ? WHERE id = ?', [email, city, name, id]);
    return res.status(200).json(
        {
            message: 'oke'
        }
    )

}

let deleteUser = async (req, res) => {
    let userid = req.params.id;
    if (!userid) {
        return res.status(200).json(
            {
                message: 'missing data update'
            }
        )
    }
    await connection.query(
        'DELETE FROM Users WHERE id =?', [userid]);
    return res.status(200).json(
        {
            message: 'oke'
        }
    )
}


module.exports = {
    getAllUserss, creatNewUSER, putUpdateuser, deleteUser
}