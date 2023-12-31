import React from "react";
import '../assets/css/Footer.css';

class Footer extends React.Component {
    render() {
        return (
            <>
                <hr></hr>
                <div className="container-footer">
                    <div className="footer-logo">
                        <p className="logo">PlayStation Shop</p>
                    </div>

                    <div className="footer-hr"></div>
                    <div className="foolter">
                        <div className="footer-thongtinlienhe">
                            <p className="footer-thongtin2">Thông Tin Liên Hệ</p>
                            <p className="footer-thongtinlienhe_diachi">
                                Địa chỉ: Tỉnh Trà Vinh
                            </p>
                            <p>Email: nhathuy23122003@gmail.com</p>
                            <p>Hotline: 0363507787</p>
                        </div>
                        <div className="footer-hr"></div>
                        <div className="footer-chinhsach">
                            <p className="footer-thongtin2">Chính Sách </p>
                            <p className="footer-chinhsach_baohanh">Bảo hành 12 tháng</p>
                            <p>Đổi trả sau 3 ngày </p>
                            <p>Miễn ship cho lần đầu mua hàng</p>
                        </div>
                        <div className="footer-hr"></div>
                        <div className="footer-hotro">
                            <p className="footer-thongtin2">Hỗ Trợ </p>
                            <p>
                                <a href="/" className="thea footer-hotro_tuyendung">
                                    Tuyển dụng
                                </a>
                            </p>{" "}
                        </div>
                        <div className="footer-hr"></div>
                        <div className="footer-mangxahoi">
                            <p className="footer-thongtin2"> Mạng xã hội</p>
                            <p>
                                <a href="/" className="thea footer-facebook">
                                    Facebook
                                </a>
                            </p>
                            <p>
                                <a href="/https://www.facebook.com/stark.harry.39/?locale=vi_VN" className="thea">
                                    Instagram
                                </a>
                            </p>
                            <p>
                                <a href="/" className="thea">
                                    Tiktok
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


export default Footer;

