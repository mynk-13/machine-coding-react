import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Carousel = ({
  images = [],
  imageLimit = 50,
  imagePerSlide = 2,
  isLoading = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState("");

  const prevSlide = () => {
    // setCurrentIndex((prevIndex)=> prevIndex===0? images.length-imagePerSlide : prevIndex-imagePerSlide);

    if (isMoving) return;
    setIsMoving(true);
    setDirection("prev");

   
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - imagePerSlide + images.length) % images.length);
      setIsMoving(false);
    }, 500);
  };

  const nextSlide = () => {
    // setCurrentIndex((nextIndex)=> nextIndex===images.length-1? 0 : nextIndex+imagePerSlide);
    if (isMoving) return;
    setIsMoving(true);
    setDirection("next");

    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + imagePerSlide) % images.length);
      setIsMoving(false);
    }, 500);
  };

  //   useEffect(()=>{

  //     const interval=setInterval(()=>{
  //        nextSlide();
  //     }, 3000);

  //     return ()=> clearInterval(interval);
  //   },[]);

  //console.log(currentIndex);

  if (isLoading || images.length === 0) return <div>Loading...</div>;

  const itemWidth = 100 / imagePerSlide;

  return (
    <div className="carousel">
      <button className="btn left-btn" onClick={prevSlide}>
        {"<"}
      </button>
      <div className="image-container">
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            transition: isMoving ? "transform 0.5s ease-in-out" : "none",
            transform: isMoving ? (direction === 'next' ? `translateX(-${itemWidth*imagePerSlide}%)` : `translateX(${itemWidth*imagePerSlide}%)`): `translateX(0)`,
          }}
        >
          {Array.from(
            {length: imagePerSlide },
            (_, i) => images[(currentIndex + i) % images.length],
          ).map((image, index) => {
            console.log(image.id);
            return (
              <img
                src={image.download_url}
                key={image.id}
                alt={image.author}
                className="image"
                style={{
                  width: `calc(${itemWidth}% - 2rem)`, // Subtracted margin from your CSS
                  flexShrink: 0,
                }}
              />
            );
          })}
        </div>
      </div>

      <button className="btn right-btn" onClick={nextSlide}>
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
