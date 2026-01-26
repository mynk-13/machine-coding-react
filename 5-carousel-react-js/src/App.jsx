/*
  Build a "Highly Scalable" Carousel Component in ReactJS

  Requirements:
  - Create a carousel component that takes an array of images as input.
  - The component should efficiently handle a large no of images while maintaining 
    scalability, performace optimizations, and extensibility.
  - Provide callback functions for events like image click, enabling users to define custom
    behaviour.
  - Focus on Accessibility.

*/

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Carousel from "./components/Carousel";
import "./App.css";

const App = () => {
  let imageLimit=100, imagePerSlide=3;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const URL = `https://picsum.photos/v2/list`;

  useEffect(() => {
    setLoading(true);

    fetchImages(imageLimit);
  }, [imageLimit]);

  const fetchImages = async (imageLimit) => {
    try {
      const response = await fetch(`${URL}?limit=${imageLimit}`);
      const data = await response.json();
      setImages(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return <div className="carousel-container">
    <Carousel
        images={images}
        imageLimit={imageLimit}
        imagePerSlide={imagePerSlide}
        isLoading={loading}
         />
        {/* {images.map((img, index)=><div>{img.id}</div>)}          */}
  </div>;
};

export default App;
