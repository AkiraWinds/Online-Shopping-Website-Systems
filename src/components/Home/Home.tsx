import React from 'react';
import { NavLink } from "react-router-dom";

import MyCarousel from './Carousel'; 

const AboutUsSection: React.FC = () => {
    return (
        <section id="about-us">
            <h2>ABOUT US</h2>
            <p>
                Welcome to MuseMove, where passion meets practice in the world of women's yoga attire. <br />
                At MuseMove, we believe that the journey to wellness is deeply intertwined with the garments you wear. <br />
                Our brand is inspired by the muse within every woman, igniting a sense of movement, grace, and self-expression on and off the mat. <br />
                Our yoga outfits seamlessly blend style with functionality, ensuring that you feel empowered, confident, and comfortable during every asana.
            </p>
        </section>
    );
};

const Home: React.FC = () => {

    // Return JSX for rendering the components
    return (
        <div>
            <div className="d-flex">
                <div className="flex-grow-1">
                    <MyCarousel />
                </div>
                <div className="ml-auto">
                    <NavLink to="/products" className="btn btn-shopping btn-block h-100 d-flex align-items-center justify-content-center">
                        Go <br /> Shopping <br /> &rarr;
                    </NavLink>
                </div>
            </div>
            <AboutUsSection />
        </div>
    );
};

export default Home;