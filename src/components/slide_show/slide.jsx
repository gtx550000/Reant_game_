import { useState } from 'react';
import PropTypes from 'prop-types';
import '../slide_show/slide.css';
import { Typography } from '@mui/material';
const Slide = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null; // or some fallback UI
  }

  return (
    <section className="slideshow">
      <button className="left-arrow" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="right-arrow" onClick={nextSlide}>
        &#10095;
      </button>
      {slides.map((slide, index) => (
        <div
          className={index === current ? 'slide active' : 'slide'}
          key={index}
        >
          {index === current && (
            <div
              style={{ backgroundImage: `url(${slide.image})` }}
              className="image"
            >
              <div className="container-content">
                <Typography variant="h3" component="h2" color="white">
                  {slide.title}
                </Typography>
                <br />
                <Typography
                  variant="h10"
                  component="h10"
                  align="left"
                  color="whitesmoke"
                  paddingRight={'10%'}
                >
                  {slide.description}
                </Typography>
                <br />
                <button>Read More</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};
Slide.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object),
};
export default Slide;
