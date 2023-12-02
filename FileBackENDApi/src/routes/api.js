// phục vụ chức năng render các chức năng của web
//Khai bao route
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');


const initAPIRoute = (app) => {
    router.get('/users', apiController.getAllUserss); // method GET -> READ data
    router.post('/create-user', apiController.creatNewUSER);
    router.put('/update-user', apiController.putUpdateuser)
    router.delete('/delete-user/:id', apiController.deleteUser)
    return app.use('/api/v1/', router);
    
};

module.exports = initAPIRoute;


// nói với express thằng nào chịu trách nhiệm xử lí khi user gửi yêu cầu


// router.get('/abc', getABC)
// router.get('/hoidanithuychuabietcode', gethoidanit)

// router.post('/create-user', postCreatuser)
// router.get('/create', getCreatePage)
// router.get('/update/:id', getUpdateUser) // nói cho server biết rằng đang muốn truyền động id vào
// router.post('/update-user', postUpdateuser)
// router.post('/delete-user/:id', postDeleteUser);
// router.post('/delete-user', postHandleRemoveuser);


//Phan lam them neu can cmt lai de chay.
// router.get('/detail/user/:id', getDetailPage)
// router.post('/create-new-user', postCreatuser)
// router.post('/delete-user', postDeleteUser)
// router.get('/update-user/:id', getUpdateUser)
// router.post('/update-user', postUpdateUser)



//check duonbg link vidu nhu la http/8080/abc

// router.get('/abc', (req, res) => {
//     //res.send('Check abc')

// })

// router.get('/checkthehtml', (req, res) => {
//     res.send('<h1>HTML OKE NHE</h1>')
// })







// module.exports = router;
