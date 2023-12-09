import React from "react";
import axios from 'axios';

class ListProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/v1/sanpham')
            .then(response => {
                const apiData = response.data;

                console.log('Data from API:', apiData);

                if (typeof apiData === 'object') {
                    this.setState({ data: apiData });
                } else {
                    console.error('Data from API is not an object:', apiData);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    render() {
        const { data } = this.state;

        if (Object.keys(data).length === 0) {
            return <div>Loading...</div>; // Hoặc hiển thị một thông báo khác tùy thuộc vào trạng thái
        }

        return (
            <div>
                <p>ID: {data.id}</p>
                <p>Name: {data.name}</p>
                {/* Thêm các thông tin khác tùy thuộc vào cấu trúc của object */}
            </div>
        );
    }
}

export default ListProduct;
