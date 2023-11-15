const connection = require("../config/database");


const { getALLusers, getUserById, updateuserbyID, deleteuserbyID } = require('../services/CRUDService');
// Gửi yêu cầu trả về 1 phản hồi cho người dùng
const getHomepage = async(req , res) => {
    let result = await getALLusers(); // chờ hàm này chạy xong thì mới có dữ liệu
   return res.render('homepage.ejs', {listusers : result}); // thêm một biến để truyền dữ liệu từ homcontroller sang View lấy giá trị listuser gán cho result
   
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
    const userid = req.params.id;
    
    let user = await getUserById(userid);

    res.render('edit.ejs', { userEdit : user })  ; // x <- y 

}

const postCreatuser = async(req, res) => {
    
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;

    // lấy data từ trên ứng dụng xuống

    console.log('>>>>email= ', email, 'Name = ', name, 'city =', city )
    // res.send('creat a new user')

    // connection.query(
    //     'INSERT INTO Users (email, name, city) VALUES (?, ?, ?)',
    //     [email, name, city],
    //     function (err, results) {
    //         console.log(results);
    //         res.send('Create user succeed, OK') // dùng coreback function
    //     }
    // );


    let [results, fields] = await connection.query(
        'INSERT INTO Users (email, name, city) VALUES (?, ?, ?)',[email, name, city]);

    console.log(">>>>>>check result", results)
    res.send('Create user succeed, OK')

    // simple query
    // connection.query(
    //     `select * from Users u`,
    //     function (err, results, fields) {
    //         console.log(">>>>results= ", results); // results contains rows returned by server
    //     }
    
    
    // );

// const [results, fields] = await connection.query('select * from Users u');    
// console.log(">>>>>>>>>>>>>check result", results)



}

const postUpdateuser = async (req, res) => {

    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userid = req.body.userid;

   
    await updateuserbyID(email, city, name, userid)
    // res.send('update, OK')
    res.redirect('/');


}

const postDeleteUser = async (req, res) => {
    const userid = req.params.id;

    let user = await getUserById(userid);
    res.render('delete.ejs', { userEdit : user });
}

const postHandleRemoveuser = async(req, res ) => {
    const id =req.body.userid;
    await deleteuserbyID(id)

    res.redirect('/');
}


module.exports= {
    getHomepage, getABC, gethoidanit, postCreatuser, getCreatePage, getALLusers, getUpdateUser, updateuserbyID
    , postUpdateuser, postDeleteUser, postHandleRemoveuser
}