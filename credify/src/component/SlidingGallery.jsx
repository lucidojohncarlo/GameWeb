import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/slidingGallery.css'; // Custom CSS for additional styling

const SlidingGallery = () => {
  const images = [
    '/images/codm.png',
    '/images/csgo.png',
    '/images/dota.png',
    '/images/ml.jpg',
    '/images/valorant.jpg',
    '/images/lol.png',
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <img src={image} alt={`carousel-${index}`} className="w-full h-auto rounded shadow-md" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlidingGallery;