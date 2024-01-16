import React from 'react';
import '../assets/css/NavBar.scss'
import {Link, NavLink} from 'react-router-dom';
class NavBar extends React.Component {
    render() {
        return (
            <div className="topnav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/sanpham">Sản Phẩm</NavLink>
                <NavLink to="/thongtin">Thông tin</NavLink>
                <NavLink to="/About">About</NavLink>
                
            </div>
        
        );
    }
}

export default NavBar;
