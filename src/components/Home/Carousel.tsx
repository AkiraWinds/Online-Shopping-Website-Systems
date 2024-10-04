import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { NavLink } from 'react-router-dom';

const MyCarousel: React.FC = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <NavLink to='/products/top02'>
                    <img className="img-fluid d-block w-100" src='image/top/home-slide-1.jpg' alt='New Product' />
                </NavLink>
                <Carousel.Caption>
                    <div className="text-floating">
                        <div className="text-floating-product-name">
                            Short Sleeve Sports Top
                        </div>
                        <div className="text-floating-description">
                            Elevate Your Practice with our new top! <br />
                            Discover the perfect harmony of comfort and style
                            in our Slimming Short Sleeve Sports Top.
                        </div>
                        <div className="text-floating-price">
                            249 kr
                        </div>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <NavLink to='/products/top05'>
                    <img className="img-fluid d-block w-100" src='image/top/5/home-slide-2.jpeg' alt='Discount Product' />
                </NavLink>
                <Carousel.Caption>
                    <NavLink to="/products/top05" className="btn btn-floating">Our discount product</NavLink>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default MyCarousel;



