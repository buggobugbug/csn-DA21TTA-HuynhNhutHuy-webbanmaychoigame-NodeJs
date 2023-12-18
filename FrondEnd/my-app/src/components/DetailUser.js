import React from "react";
import { withRouter,Link } from 'react-router-dom';
import axios from "axios";
import '../assets/css/Detail.css';


class DetailUser extends React.Component {
    state = {
        user: {}

        
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let MaSanPham = this.props.match.params.MaSanPham

            let res = await axios.get(`http://localhost:8081/api/v1/sanpham/${MaSanPham}`)
            console.log('>>>>>> check res user : ', res)
            this.setState({
                user: res && res.data && res.data.data ? res.data.data : {}
            })
           
        }
    }

    handleViewMuahang = (product) => {
        this.props.history.push(`/muahang/${product.MaSanPham}`);
    };


    render() {
        let { user } = this.state;
        let isEmtyObj = Object.keys(user).length===0;
        return (
            <>

                {isEmtyObj === false &&
                <>
                
                
                    <div className="product-detail">
                        <div className="product-image">
                            <img src={user.imageUrl} alt=""/>
                        </div>
                        <div className="product-details">
                            <h2 className="product-title">{user.TenSanPham}</h2>
                            <p className="product-description">Việc sở hữu một chiếc máy PlayStation 5 sẽ không còn khó khăn nữa khi bạn lựa chọn đến với nShop.
                            Sản phẩm PlayStation 5 Standard Edition chính hãng Sony Việt Nam có bán tại nShop là phiên bản mới máy chơi game mới nhất của Sony với hàng loạt công nghệ hiện đại được tích hơp bên trong.
                            Chắc chắn nó sẽ mang lại cho bạn một trải nghiệm game đỉnh cao. Bên cạnh đó nShop cũng có đầy đủ dịch vụ liên quan đến PS5 để bạn có thể tận hưởng trọn vẹn nhất.</p>
                            <div className="additional-info">
                                <p><strong>Thương Hiệu:</strong> {user.TenNXS}</p>
                            </div>
                            <span className="product-price">{user.Gia.toLocaleString() } đ </span>
                            {/* <div className="input">Số lượng: <input type="number" value={user.Soluong}/> </div> */}
                            <Link
                                to={`/muahang/${user.MaSanPham}`}
                                // className="btn btn-primary"
                            >
                                Đặt Hàng
                            </Link>
                        </div>
                    </div>
                
                
                </>
                }
            </>
        )
    }
}


export default withRouter(DetailUser);