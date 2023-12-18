import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import '../assets/css/thongtindathang.css'

class Thongtintdathang extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            counterValue: 1,
            selectedSize: null,
            product: {},
            errorMessages: {
                selectedSize: "",
                counterValue: "",
                ten: "",
                sdt: "",
                diachi: "",
            },
            isOrderSuccess: false,
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let MaSanPham = this.props.match.params.MaSanPham;
            console.log("check params: ", this.props.match.params)
            try {
                const response = await axios.get(
                    `http://localhost:8081/api/v1/sanpham/${MaSanPham}`
                );
                const productData = response.data.data ? response.data.data : {};
                this.setState({
                    product: productData,
                });

                console.log("check res: ", productData);

            } catch (error) {
                console.error("Error fetching product data: ", error);
            }
        }
        const urlParams = new URLSearchParams(window.location.search);
        const successMessage = urlParams.get("successMessage");

        if (successMessage && !this.state.isOrderSuccess) {
            this.setState({ isOrderSuccess: true });
            alert(successMessage);

            setTimeout(() => {
                this.setState({ isOrderSuccess: false });
            }, 3000);
        }
    }



    // hàm thêm vào:

    increment = () => {
        this.setState((prevState) => ({
            counterValue: prevState.counterValue + 1,
        }));
        if (this.state.counterValue >= this.state.product.SoLuong) {
            alert("hết hàng rồi bạn ơi, hôm khác đến nhé =)))");
            this.setState((prevState) => ({
                counterValue: this.state.product.SoLuong,
            }));
            return;
        }
    };

    decrement = () => {
        const { counterValue } = this.state;
        if (counterValue > 1) {
            this.setState({ counterValue: counterValue - 1 });
        }
    };


    handleSoluong = (event) => {
        console.log("check value: ", this.state.counterValue);
        console.log("check soluong: ", this.state.product.SoLuong);
        if (this.state.counterValue > this.state.product.SoLuong) {
        }
    };


    //code chat viết để truyền axios

    handleOrder = async () => {
        const { product, counterValue } = this.state;

        // Chuẩn bị dữ liệu để gửi lên server
        const dataToSend = {
            MaSanPham: product.MaSanPham,
            TenSanPham: product.TenSanPham,
            soluong: counterValue,
            // ... thêm các trường khác tùy thuộc vào cần thiết
        };

        try {
            // Sử dụng axios.post để gửi dữ liệu lên server
            const response = await axios.post('http://localhost:8081/update-user', dataToSend);

            // Xử lý response từ server nếu cần
            console.log('Server response:', response.data);

            // Chuyển hướng hoặc thực hiện các bước tiếp theo tùy ý
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Error sending data to server:', error);
        }
    };
    //End.



    render() {
        const { product, counterValue, selectedSize, errorMessages } = this.state;
        let isEmptyObj = Object.keys(product).length === 0;
        console.log("cehck product: ", product)
        return (
            <>

                {isEmptyObj === false && (
                    <div className="muahang-container">
                        <a href="/some-valid-link" className="logo-muahang">
                            <p>ĐẶT HÀNG</p>
                        </a>
                        <form method="POST" action="http://localhost:8081/update-user">
                            <div className="container-setup">
                                <div className="muahang-form">
                                    <h5 className="thongtinh-muahang">Thông tin giao hàng</h5>
                                    <input name="MaSanPham" hidden value={product.MaSanPham} />
                                    <input name="TenSanPham" hidden value={product.TenSanPham} />

                                    <div className="buttonSoluong">
                                        <div className="span1" onClick={this.decrement}>
                                            -
                                        </div>
                                        <input
                                            name="soluong"
                                            type="text"
                                            id="counter"
                                            value={counterValue}
                                            min={1}
                                            max={5000}
                                            // readOnly
                                            onChange={(event) => this.handleSoluong(event)}
                                        />
                                        <div className="span2" onClick={this.increment}>
                                            +
                                        </div>
                                    </div>

                                    <label className="muahang-label">
                                        <input
                                            type="text"
                                            name="ten"
                                            className="muahang-input hoten"
                                            placeholder="Họ và tên"
                                        />
                                    </label>

                                    <br />
                                    <label className="muahang-label">
                                        <input
                                            type="text"
                                            name="sdt"
                                            className="muahang-input muahang-sdt"
                                            placeholder="Số điện thoại "
                                        />
                                        {errorMessages.sdt && (
                                            <p className="error-message">{errorMessages.sdt}</p>
                                        )}

                                    </label>

                                    <label className="muahang-label">
                                        <input
                                            type="text"
                                            name="diachi"
                                            className="muahang-input muahang-sonha"
                                            placeholder="Địa chỉ chi tiết"
                                        />
                                    </label>

                                    <br />
                                    <label className="muahang-label">
                                        <input
                                            type="text"
                                            name="ghichu"
                                            className="muahang-input"
                                            placeholder="Ghi chú"
                                        />
                                    </label>
                                    <p className="thanhtoan">Hình thức thanh toán tại nhà</p>
                                </div>

                                <div className="hr-xoaydoc"></div>
                                <div className="thongtin-sanpham">
                                    <div className="thongtin-sanpham_2">
                                        <span className="discount-bannerr">{counterValue}</span> <br />
                                        <img
                                            src={`http://localhost:8081/public/images/${product.Mota}`}
                                            className="sanpham-img"
                                            alt="Product"
                                        /> <br/>

                                        <span className="sanpham-name">{product.TenSanPham} </span> <br/>
                                        
                                        <span className="sanpham-price">
                                            {product.Gia.toLocaleString()} VND
                                        </span>
                                    </div>

                                    <hr></hr>
                                    <label className="muahang-magiamgia1">
                                        <input
                                            type="text"
                                            name=""
                                            className="muahang-magiamhgia"
                                            placeholder="Mã giảm giá (nếu có)"
                                        />
                                        <button className="muahang-xacnhan">Sử Dụng</button>
                                    </label>
                                    <hr></hr>
                                    <div className="muahang-tamtinh">
                                        {" "}
                                        <span className="muahang-tamtinh1">Tạm tính</span>
                                        <span className="muahang-tamtinh3">
                                            {(product.Gia * counterValue).toLocaleString()} VND
                                        </span>{" "}
                                    </div>
                                    <div className="muahang-phivanchuyen">
                                        <span>Phí vận chuyển</span>
                                        <span className="muahang-phivanchuyen1">30,000 VND</span>
                                    </div>
                                    <hr></hr>
                                    <div className="muahang-tongcong">
                                        <span>Tổng cộng</span>
                                        <span className="muahang-tongcong1">
                                            {(
                                                product.Gia * counterValue +
                                                30000
                                            ).toLocaleString()}{" "}
                                        </span>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={this.handleOrder}
                                    >
                                        Xác Nhận
                                    </button>
                                </div>

                            </div>
                        </form>
                    </div>
                )}

            </>
        );
    }
}

export default withRouter(Thongtintdathang);

