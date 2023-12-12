import React from "react";
import axios from "axios";
import '../assets/css/ListProduct.css';
import { withRouter } from "react-router-dom";


class ListProduct extends React.Component{
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
        let {ListProduct} = this.state;
        return(
            <div className="List-product">
            <div className="title">
                    <h3>TẤT CẢ SẢN PHẨM </h3>

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
                                <span className="sanpham-gia">Giá: {item.Gia} </span>
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