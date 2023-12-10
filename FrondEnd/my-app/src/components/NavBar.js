import React from 'react';
import '../assets/css/NavBar.scss'
import {Link} from 'react-router-dom';
class NavBar extends React.Component {
    render() {
        return (
            <div className="topnav">
                <Link to="/">Home</Link>
                <Link to="/sanpham">Sản Phẩm</Link>
                <Link to="/about">About</Link>
            
            </div>
        
        );
    }
}

export default NavBar;
