import React from "react";
import axios from "axios";
import '../assets/css/ListProduct.scss';


class ListProduct extends React.Component{
    state = {
        ListProduct: []
    }
    async componentDidMount() {
        let res = await axios.get('http://localhost:8080/api/v1/sanpham?=15');
        this.setState({
            ListProduct: res && res.data && res.data.data ? res.data.data:[]
        })
    }


    render() {
        let {ListProduct} = this.state;
        return(
            <div className="List-product">
            <div className="title">
                Fetch all list users

            </div>
            <div className="list-user-content">
                {ListProduct && ListProduct.length > 0 &&
                ListProduct.map((item, index) => {
                    return(
                        <div className="child" key={item.MaSanPham}>
                            {index + 1} - {item.TenSanPham} - {item.Gia} - {item.SoLuong} - {item.TenNXS} - {item.Theloai} - {item.Mota} -{item.imageUrl}
                        </div>
                    )
                })
                }
            </div>
            </div>
        )
    }
}


export default ListProduct;