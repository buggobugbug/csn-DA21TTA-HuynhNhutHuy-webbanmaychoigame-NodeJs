
import React from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/SlideCarousel.css'

const items = [
    {
        src: 'https://nghenhinvietnam.vn/uploads/global/ngochai/230123/nghe_nhin_sony_ps5_pro_lam_mat_chat_long_h2.jpeg',
        altText: 'Slide 1',
        caption: 'Slide 1 Caption'
    },
    {
        src: 'https://nghenhinvietnam.vn/uploads/global/ngochai/230123/nghe_nhin_sony_ps5_pro_lam_mat_chat_long_h2.jpeg',
        altText: 'Slide 2',
        caption: 'Slide 2 Caption'
    },
    {
        src: 'https://nghenhinvietnam.vn/uploads/global/ngochai/230123/nghe_nhin_sony_ps5_pro_lam_mat_chat_long_h2.jpeg',
        altText: 'Slide 3',
        caption: 'Slide 3 Caption'
    }
];

class CarouselSlide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
    }

    next = () => {
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous = () => {
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex = (newIndex) => {
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const slides = items.map((item, index) => (
            <CarouselItem
                onExiting={() => console.log('onExiting')}
                onExited={() => console.log('onExited')}
                key={index}
            >
                <img src={item.src} alt={item.altText} />
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
        ));

        return (
            <Carousel
                activeIndex={this.state.activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        );
    }
}

export default CarouselSlide;
