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

// Hàm đặt hàng 

const updateUser = async (req, res) => {
    try {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Kiểm tra dữ liệu đầu vào
        const { ten, sdt, diachi, soluong, makh, TenSanPham } = req.body;
        if (!ten || !sdt || !diachi || !soluong || !makh) {
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
        await connection.execute(
            "INSERT INTO khachhang(makh, ten, sdt, diachi) VALUES (?, ?, ?, ?)",
            [randomIntegerInRange, ten, sdt, diachi]
        );

        // Cập nhật thông tin sản phẩm
        // await connection.execute("UPDATE product SET kichco = ? WHERE id = ?", [
        //     size,
        //     id,
        // ]);

        // Insert thông tin hóa đơn
        await connection.execute(
            "INSERT INTO hoadon(mahd, makh, diachiship, thoigiandat) VALUES (?, ?, ?, ?)",
            [randomIntegerHoadon, randomIntegerInRange, diachi, formattedTime]
        );

        // Insert thông tin chi tiết hóa đơn
        await connection.execute(
            "INSERT INTO chitiethoadon(mahd, id, soluongsp) VALUES (?, ?, ?)",
            [randomIntegerHoadon, id, soluong]
        );

        await connection.execute(
            " UPDATE sanpham SET SoLuong = SoLuong - ? WHERE MaSanPham = ?",
            [soluong, id]
        );

        // Chuyển hướng về trang chủ sau khi đặt hàng thành công
        const successMessage = "Bạn đã đặt hàng thành công!";

        return res.send("cảm ơn bạn đã đặt hàng");
    } catch (error) {
        console.error("An error occurred:", error);
        return res.status(500).send(error.message || "Đã có lỗi xảy ra");
    }
};

module.exports = {
    getAllSanPham, createNewUser, updateSanPham, deleteUser, getSanPhamById, getSanPhamSlider, updateUser
}