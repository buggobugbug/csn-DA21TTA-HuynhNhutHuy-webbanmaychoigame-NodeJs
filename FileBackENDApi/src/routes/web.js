// phục vụ chức năng render các chức năng của web
//Khai bao route
const express = require('express');
const router = express.Router();

// nói với express thằng nào chịu trách nhiệm xử lí khi user gửi yêu cầu
const { postUpdateUser,postHandleRemoveuser,postDeleteUser, getHomepage, getABC, gethoidanit, postCreatuser, getCreatePage, getUpdateUser, postUpdateuser, getDetailPage  } = require('../controllers/homeController')

router.get('/', getHomepage)


// router.post('/create-user', postCreatuser)
// router.get('/create', getCreatePage)
// router.get('/update/:id', getUpdateUser) // nói cho server biết rằng đang muốn truyền động id vào
// router.post('/update-user', postUpdateuser)
// router.post('/delete-user/:id', postDeleteUser);
// router.post('/delete-user', postHandleRemoveuser);


//Phan lam them neu can cmt lai de chay.
router.get('/detail/user/:MaSanPham', getDetailPage)
router.post('/create-new-user', postCreatuser)
router.post('/delete-user', postDeleteUser)
router.get('/update-user/:MaSanPham', getUpdateUser)
router.post('/update-user', postUpdateUser)



//check duonbg link vidu nhu la http/8080/abc

// router.get('/abc', (req, res) => {
//     //res.send('Check abc')
   
// })

// router.get('/checkthehtml', (req, res) => {
//     res.send('<h1>HTML OKE NHE</h1>')
// })







module.exports= router; // export default
