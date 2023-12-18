import React from "react";
import axios from "axios";
import '../assets/css/ListProduct.css';
import { withRouter } from "react-router-dom";


class ListProduct extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            loading: true,
            error: null,
            searchTerm: "",
            priceFilter: "", // Thêm state để lưu trữ giá trị của nút radio
        };
    }

    handleSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handlePriceFilterChange = (value) => {
        this.setState({ priceFilter: value });
    };








    // code thêm để giá


    state = {
        ListProduct: []
    }
    async componentDidMount() {
        let res = await axios.get('http://localhost:8081/api/v1/sanpham');
        this.setState({
            ListProduct: res && res.data && res.data.data ? res.data.data:[]
        })
    }

    handleViewDetailUser = (user) => {
        this.props.history.push(`/sanpham/${user.MaSanPham}`);
    }


    render() {
        let { ListProduct, data, loading, error, searchTerm, priceFilter } = this.state;

        //code thêm vào
       

        const filteredData =
            data &&
            data.length > 0 &&
            data
                .filter((item) =>
                    item.TenSanPham.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .filter((item) =>
                    priceFilter === "200000"
                        ? item.Gia < 200000
                        : priceFilter === "300000"
                            ? item.Gia < 300000 && item.Gia >= 200000
                            : priceFilter === "500000"
                                ? item.Gia < 500000 && item.Gia >= 300000
                                : true
                );



        return(
            <div className="List-product">
            <div className="title">
                    <h3>TẤT CẢ SẢN PHẨM </h3>

            </div>

            {/* nút search */}
            

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
                            <a>Dưới 5 triệu</a>
                        </label>
                        <label>
                            <input
                                hidden type="radio"
                                name="priceFilter"
                                value="10000000"
                                checked={priceFilter === "10000000"}
                                onChange={() => this.handlePriceFilterChange("10000000")}
                            />
                            <a className="price">5 - 10 triệu</a>
                        </label>
                        <label>
                            <input
                                hidden type="radio"
                                name="priceFilter"
                                value="15000000"
                                checked={priceFilter === "15000000"}
                                onChange={() => this.handlePriceFilterChange("15000000")}
                            />
                            <a className="price">10 - 15 triệu</a>
                        </label>
                    </div>
                </div>




            <div className="list-user-content">
                {ListProduct && ListProduct.length > 0 &&
                ListProduct.map((item, index) => {
                    return(
                        <div className="child" key={item.MaSanPham}
                        onClick={() => this.handleViewDetailUser(item) }
                        >
                            <div className="container-sanpham">
                                <div className="hinhanh"><img src={item.imageUrl} /></div>
                                <h2 className="sanpham-title">{item.TenSanPham}</h2>
                                <span className="sanpham-gia">Giá: {item.Gia.toLocaleString()} đ </span>
                                <button className="Add-to-card">Mua Hàng</button>    
                            </div>
                        </div>
                    )
                })
                }
            </div>
            </div>
        )
    }
}


export default withRouter(ListProduct);


