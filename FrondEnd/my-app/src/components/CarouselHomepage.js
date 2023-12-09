import Carousel from 'react-bootstrap/Carousel';
import slider1 from '../assets/images/slider1.jpg';
import slider2 from '../assets/images/slider2.png';
import slider3 from '../assets/images/slider3.jpg';
function CarouselHomPage() {
    return (
        <Carousel data-bs-theme="dark">
            <Carousel.Item>
                <img style={{height:'90vh'}}
                    className="d-block w-100"
                    src={slider1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h5 style={{color:'white'}}>SONY</h5>
                    <p style={{ color: 'white' }}>BE MOVED</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img style={{ height: '90vh' }}
                    className="d-block w-100"
                    src={slider3}
                    alt="Second slide"
                />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img style={{ height: '90vh' }}
                    className="d-block w-100"
                    src={slider2}
                    alt="Third slide"
                />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselHomPage;