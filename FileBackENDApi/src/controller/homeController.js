import pool from "../configs/connectDB"

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute(`SELECT * FROM sanpham`);
    return res.render("hompage.ejs", { SanPham: rows })
}

let getThemSanPhamPage = (req, res) => {
    return res.render('edit.ejs')
}

let themSanPham = async (req, res) => {
    let { TenSanPham, Gia, SoLuong, TenNXS, Theloai } = req.body;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }

    try {
        await pool.execute(`
    INSERT INTO sanpham (TenSanPham, Gia, SoLuong, TenNXS, Theloai, Mota) 
    VALUES (?, ?, ?, ?, ?, ?)`,
            [TenSanPham, Gia, SoLuong, TenNXS, Theloai, req.file.filename]) ;
        return res.redirect('/')
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

let getEditPage = async (req, res) => {
    let id = req.params.id
    let [SanPhamUp] = await pool.execute(`
    SELECT * FROM sanpham WHERE MaSanPham = ?`,
        [id]);
    return res.render("update.ejs", { SanPham: SanPhamUp[0] })
}

let postUpdateSanPham = async (req, res) => {
    let { MaSanPham ,TenSanPham, Gia, SoLuong, TenNXS, Theloai } = req.body;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }
    //console.log(">>> check ", req.file.filename)
    try {
        await pool.execute(`
        UPDATE sanpham SET  TenSanPham=?, Gia= ?, SoLuong = ?, TenNXS = ?, Theloai = ?, Mota= ?
        WHERE MaSanPham = ?`,
            [TenSanPham, Gia, SoLuong, TenNXS, Theloai, req.file.filename, MaSanPham]);
        return res.redirect('/')
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

let deleteSanPham = async (req, res) => {
    let MaSanPham = req.body.MaSanPham
    await pool.execute(`
    DELETE FROM sanpham WHERE MaSanPham = ?`,
        [MaSanPham]);
    return res.redirect('/')
}

const updateUser = async (req, res) => {
    try {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Kiểm tra dữ liệu đầu vào
        const { ten, sdt, diachi, soluong, MaSanPham, tensp } = req.body;
        if (!ten || !sdt || !diachi  || !soluong || !MaSanPham) {
            throw new Error("Bạn chưa truyền đủ thông tin không thể đặt hàng !!!!");
        }

        // Lấy thời gian hiện tại
        const currentTime = new Date();
        const formattedTime = currentTime
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

        // Tạo các số ngẫu nhiên
        const randomIntegerInRange = getRandomInt(0, 60000);
        const randomIntegerHoadon = getRandomInt(0, 60000);

        // Insert thông tin khách hàng
        await pool.execute(
            "INSERT INTO khachhang(makh, ten, sdt, diachi) VALUES (?, ?, ?, ?)",
            [randomIntegerInRange, ten, sdt, diachi]
        );

        // Cập nhật thông tin sản phẩm
        // await pool.execute("UPDATE product SET kichco = ? WHERE id = ?", [
        //     size,
        //     id,
        // ]);

        // Insert thông tin hóa đơn
        await pool.execute(
            "INSERT INTO hoadon(mahd, makh, diachiship, thoigiandat) VALUES (?, ?, ?, ?)",
            [randomIntegerHoadon, randomIntegerInRange, diachi, formattedTime]
        );

        // Insert thông tin chi tiết hóa đơn
        await pool.execute(
            "INSERT INTO chitiethoadon(mahd, MaSanPham, soluong) VALUES (?, ?, ?)",
            [randomIntegerHoadon, MaSanPham, soluong]
        );

        await pool.execute(
            " UPDATE sanpham SET soluong = soluong - ? WHERE MaSanPham = ?",
            [soluong, MaSanPham]
        );

        // Chuyển hướng về trang chủ sau khi đặt hàng thành công
        const successMessage = "Bạn đã đặt hàng thành công!";

        return res.send("cảm ơn bạn đã đặt hàng");
    } catch (error) {
        console.error("An error occurred:", error);
        return res.status(500).send(error.message || "Đã có lỗi xảy ra");
    }
};


let getupdateuser= async (req, res) => {
    const [rows, fields] = await pool.execute(`
            SELECT sanpham.*, hoadon.*, khachhang.*
            FROM sanpham
            JOIN hoadon ON sanpham.MaSanPham = hoadon.MaSanPham
            JOIN khachhang ON hoadon.makh = khachhang.makh
        `);

    return res.render("capnhat.ejs", { SanPham: rows })
}




module.exports = {
    getHomePage, getThemSanPhamPage, themSanPham, getEditPage, postUpdateSanPham, deleteSanPham, updateUser, getupdateuser

}