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

    //console.log(">>> Check:", TenSP, MaTL, DonGiaSP, TonKhoSP, Chip, Main, VGA, NhanSanXuat, RAM, req.file.filename)
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

module.exports = {
    getHomePage, getThemSanPhamPage, themSanPham, getEditPage, postUpdateSanPham, deleteSanPham
}