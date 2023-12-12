import pool from "../configs/connectDB"

let getAllSanPham = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM sanpham');

    // Thêm đường dẫn đầy đủ cho mỗi sản phẩm
    const productsWithImageUrls = rows.map((SanPham) => {
        return {
            ...SanPham,
            imageUrl: `http://localhost:8081/public/images/${SanPham.Mota}`,
        };
    });

    return res.status(200).json({
        message: "ok",
        data: productsWithImageUrls
    })
}

// Thêm hàm để lấy thông tin chi tiết sản phẩm theo id
let getSanPhamById = async (req, res) => {
    let { id } = req.params;

    if (!id) {
        return res.status(400).json({
            error: "Bad Request",
            message: "Thiếu thông tin id sản phẩm",
        });
    }

    const [rows, fields] = await pool.execute('SELECT * FROM sanpham WHERE MaSanPham = ?', [id]);

    if (rows.length === 0) {
        return res.status(404).json({
            message: "Không tìm thấy sản phẩm với id đã cho",
        });
    }

    const productWithImageUrl = {
        ...rows[0],
        imageUrl: `http://localhost:8081/public/images/${rows[0].Mota}`,
    };

    return res.status(200).json({
        message: "ok",
        data: productWithImageUrl,
    });
}

let getSanPhamSlider = async (req, res) => {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM sanpham LIMIT 7');

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }

        const productsWithImageUrl = rows.map(row => ({
            ...row,
            imageUrl: `http://localhost:8081/public/images/${row.Mota}`,
        }));

        return res.status(200).json({
            message: "ok",
            data: productsWithImageUrl,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            error: "Internal Server Error",
            message: "Đã xảy ra lỗi khi lấy dữ liệu sản phẩm",
        });
    }
};


let createNewUser = async (req, res) => {
    let { MaSanPham, TenSanPham, Theloai, Gia, TenNXS, SoLuong, Mota } = req.body;

    if (!MaSanPham || !TenSanPham || !Theloai || !Gia || !TenNXS || !SoLuong || !Mota) {
        return res.status(200).json({
            message: "missing create",
        })
    }

    await pool.execute(`    
    INSERT INTO sanpham(TenSanPham, Theloai, Gia, TenNXS, SoLuong, Mota) 
    VALUES 
    (?, ?, ?, ?, ?, ?)`,
        [TenSanPham, Theloai, Gia, TenNXS, SoLuong, Mota]);
    return res.status(200).json({
        message: "ok",
    })
}

let updateSanPham = async (req, res) => {
    let { MaSanPham, TenSanPham, Theloai, Gia, TenNXS, SoLuong, Mota } = req.body;

    if (!MaSanPham || !TenSanPham || !Theloai || !Gia || !TenNXS || !SoLuong || !Mota) {
        return res.status(200).json({
            message: "missing update",
        })
    }

    await pool.execute(`
    UPDATE sanpham SET TenSanPham = ?, Theloai = ?, Gia=?, TenNXS = ?, SoLuong = ?,  Mota = ? 
    WHERE MaSanPham = ?`,
        [TenSanPham, Theloai, Gia, TenNXS, SoLuong, Mota, MaSanPham]);
    return res.status(200).json({
        message: "ok",
    })
}

let deleteUser = async (req, res) => {
    let { MaSanPham } = req.body;

    if (!MaSanPham) {
        return res.status(200).json({
            message: "missing delete",
        })
    }

    await pool.execute(`
    DELETE FROM sanpham
    WHERE MaSanPham = ?`,
        [MaSanPham]);
    return res.status(200).json({
        message: "ok",
    })
}

module.exports = {
    getAllSanPham, createNewUser, updateSanPham, deleteUser, getSanPhamById, getSanPhamSlider
}