import React from "react";
import axios from "axios";
import '../assets/css/ListProduct.css';
import { withRouter } from "react-router-dom";

class ListProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ListProduct: [],
            searchTerm: "",
            priceFilter: "",
        };
    }

    async componentDidMount() {
        try {
            let res = await axios.get('http://localhost:8081/api/v1/sanpham');
            this.setState({
                ListProduct: res && res.data && res.data.data ? res.data.data : []
            });
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    }

    handleViewDetailUser = (user) => {
        this.props.history.push(`/sanpham/${user.MaSanPham}`);
    }

    handleSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handlePriceFilterChange = (value) => {
        this.setState({ priceFilter: value });
    };

    render() {
        const { ListProduct, searchTerm, priceFilter } = this.state;

        const filteredData =
            ListProduct &&
            ListProduct.length > 0 &&
            ListProduct
                .filter((item) =>
                    item.TenSanPham.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .filter((item) => {
                    const gia = item.Gia || 0; // Đảm bảo giá có giá trị
                    switch (priceFilter) {
                        case "5000000":
                            return gia < 5000000;
                        case "10000000":
                            return gia >= 5000000 && gia < 10000000;
                        case "15000000":
                            return gia >= 10000000 && gia < 15000000;
                        default:
                            return true;
                    }
                });

        return (
            <div className="List-product">
                <div className="title">
                    <h3>TẤT CẢ SẢN PHẨM </h3>
                </div>

                <div className="Searchfillter">
                    <div className="editinput">
                        <input
                            placeholder="Tìm kiếm sản phẩm"
                            value={searchTerm}
                            onChange={this.handleSearchChange}
                        />
                    </div>
                    <div className="fillter">
                        <label>
                            <input
                                hidden type="radio"
                                name="priceFilter"
                                value="5000000"
                                checked={priceFilter === "5000000"}
                                onChange={() => this.handlePriceFilterChange("5000000")}
                            />
                            <p className="price">dưới 5 triệu</p>
                        </label>
                        <label>
                            <input
                                hidden type="radio"
                                name="priceFilter"
                                value="10000000"
                                checked={priceFilter === "10000000"}
                                onChange={() => this.handlePriceFilterChange("10000000")}
                            />
                            <p className="price">5 - 10 triệu</p>
                        </label>
                        <label>
                            <input
                                hidden type="radio"
                                name="priceFilter"
                                value="15000000"
                                checked={priceFilter === "15000000"}
                                onChange={() => this.handlePriceFilterChange("15000000")}
                            />
                            <p className="price">10 - 15 triệu</p>
                        </label>
                    </div>
                </div>

                <div className="list-user-content">
                    {filteredData && filteredData.length > 0 &&
                        filteredData.map((item, index) => (
                            <div
                                className="child"
                                key={item.index}
                                onClick={() => this.handleViewDetailUser(item)}
                            >
                                <div className="container-sanpham">
                                    <div className="hinhanh">
                                        <img src={item.imageUrl} alt={item.TenSanPham} />
                                    </div>
                                    <h2 className="sanpham-title">{item.TenSanPham}</h2>
                                    <span className="sanpham-gia">
                                        Giá: {item.Gia.toLocaleString()} đ
                                    </span>
                                    <button className="Add-to-card">Mua Hàng</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(ListProduct);
