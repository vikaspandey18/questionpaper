import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const Carousels = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img class="w-100" src="/img/carousel-1.jpg" alt="Image" />
      </Carousel.Item>
      <Carousel.Item>
        <img class="w-100 h-50" src="/img/carousel-2.jpg" alt="Image" />
      </Carousel.Item>
    </Carousel>
  );
};
export default Carousels;
