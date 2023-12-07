import React from 'react';
import '../assets/css/NavBar.scss'
import imglogo from '../assets/images/logo.jpg'

class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <ul>
                    <li><a href="/" className="navLink">Home</a></li>
                    <li><a href="/sanpham" className="navLink"> Sản Phẩm </a></li>
                    <li><a href="/about" className="navLink">About</a></li>
                    <li><a href="/contact" className="navLink">Contact</a></li>
                    <div className="logo">
                        <img src={imglogo} alt="" />
                    </div>
                </ul>
            </nav>
        );
    }
}

export default NavBar;
