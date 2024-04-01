import { useEffect, useState, useRef } from "react";
import "../slideshowgamedetail/slideshowgamedetail.css";

const Slideshow = (props) => {
  let items = props.items;
  const delay = 2500;

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === items.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow1">
      <div
        className="slideshowSlider1"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {items.map((it, idx) => (
          <div
            className="slide1"
            key={idx}
            style={{
              backgroundImage: `url(${it.image})`,
              backgroundSize: "900px auto ",
            }}
          ></div>
        ))}
      </div>

      <div className="slideshowDots1">
        {items.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot1${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
