import React from 'react'
//import { useEffect } from 'react';
import { useState } from 'react'

const Carousel = ({images=[],imageLimit=50,imagePerSlide=2, isLoading=false}) => {
  
  const [currentIndex, setCurrentIndex]=useState(0);

  
  const prevSlide=()=>{

    setCurrentIndex((prevIndex)=> prevIndex===0? images.length-imagePerSlide : prevIndex-imagePerSlide);
  }

  const nextSlide=()=>{
    setCurrentIndex((nextIndex)=> nextIndex===images.length-1? 0 : nextIndex+imagePerSlide);
  }

//   useEffect(()=>{

//     const interval=setInterval(()=>{
//        nextSlide();
//     }, 3000);

//     return ()=> clearInterval(interval);
//   },[]);




  //console.log(currentIndex);

  

  if (isLoading || images.length===0) return <div>Loading...</div>



  
    return (
        <div className='image-container'>
            <button className='btn left-btn' onClick={prevSlide}>{'<'}</button> 
            {
                  Array.from({ length: imagePerSlide }, (_, i) => images[(currentIndex + i) % images.length]).map((image, index)=>{
                        
                    //console.log(image.id);
                        return  <img
                        src={image.download_url}
                        key={image.id}
                        alt={image.author}
                        className='image'
                        style={{width:`calc(100/${imagePerSlide})%`}}
                    />})}
       
         
        <button className='btn right-btn' onClick={nextSlide}>{'>'}</button> 
          
        </div>


        
    )
}

export default Carousel;