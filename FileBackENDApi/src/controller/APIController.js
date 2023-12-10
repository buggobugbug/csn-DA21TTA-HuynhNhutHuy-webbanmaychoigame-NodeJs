import pool from "../configs/connectDB"

let getAllSanPham = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM SanPham');

    // Thêm đường dẫn đầy đủ cho mỗi sản phẩm
    const productsWithImageUrls = rows.map((SanPham) => {
        return {
            ...SanPham,
            imageUrl: `http://localhost:8080/public/images/${SanPham.Mota}`,
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

    const [rows, fields] = await pool.execute('SELECT * FROM SanPham WHERE MaSanPham = ?', [id]);

    if (rows.length === 0) {
        return res.status(404).json({
            message: "Không tìm thấy sản phẩm với id đã cho",
        });
    }

    const productWithImageUrl = {
        ...rows[0],
        imageUrl: `http://localhost:8080/public/images/${rows[0].Mota}`,
    };

    return res.status(200).json({
        message: "ok",
        data: productWithImageUrl,
    });
}

let getSanPhamSlider = async (req, res) => {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM SanPham LIMIT 7');

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }

        const productsWithImageUrl = rows.map(row => ({
            ...row,
            imageUrl: `http://localhost:8080/public/images/${row.Mota}`,
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
    let { MaSanPham, TenSP, MaTL, DonGiaSP, TonKhoSP, Chip, Main, VGA, NhanSanXuat, RAM, AnhSP } = req.body;

    if (!MaSanPham || !TenSP || !MaTL || !DonGiaSP || !TonKhoSP || !Chip || !Main || !VGA || !NhanSanXuat || !RAM || !AnhSP) {
        return res.status(200).json({
            message: "missing create",
        })
    }

    await pool.execute(`    
    INSERT INTO SanPham(TenSP, MaTL, DonGiaSP, TonKhoSP, Chip, Main, VGA, NhanSanXuat, RAM, AnhSP) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [TenSP, MaTL, DonGiaSP, TonKhoSP, Chip, Main, VGA, NhanSanXuat, RAM, AnhSP]);
    return res.status(200).json({
        message: "ok",
    })
}

let updateSanPham = async (req, res) => {
    let { MaSanPham, TenSP, MaTL, DonGiaSP, TonKhoSP, Chip, Main, VGA, NhanSanXuat, RAM, AnhSP } = req.body;

    if (!MaSanPham || !TenSP || !MaTL || !DonGiaSP || !TonKhoSP || !Chip || !Main || !VGA || !NhanSanXuat || !RAM || !AnhSP) {
        return res.status(200).json({
            message: "missing update",
        })
    }

    await pool.execute(`
    UPDATE SanPham SET TenSP = ?, MaTL = ?, DonGiaSP=?, TonKhoSP = ?, Chip = ?, Main = ?, VGA = ?, NhanSanXuat = ?, RAM = ?, AnhSP = ? 
    WHERE MaSanPham = ?`,
        [TenSP, MaTL, DonGiaSP, TonKhoSP, Chip, Main, VGA, NhanSanXuat, RAM, AnhSP, MaSanPham]);
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
    DELETE FROM SanPham
    WHERE MaSanPham = ?`,
        [MaSanPham]);
    return res.status(200).json({
        message: "ok",
    })
}

module.exports = {
    getAllSanPham, createNewUser, updateSanPham, deleteUser, getSanPhamById, getSanPhamSlider
}