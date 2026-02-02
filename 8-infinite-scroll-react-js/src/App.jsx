/* 
Implement Infinite Scrolling in React JS

Requirements:
 - Implement Infinite Scrolling for fetching more products when user reaches at the bottom
    of the page
 - https://dummyjson.com/products
 - Ensure that the loading indicators are displayed appropriately while fetching data
 -Implement optimizations to prevent excessive API requests during scrolling.
 */

import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [products, setProducts]=useState([]);
  const [page, setPage]=useState(1);
  const [loading, setLoading]=useState(false);


  const fetchProduct=async ()=>{
    setLoading(true);

    try{
      const res=await fetch(`https://dummyjson.com/products?limit=${page*10}`);
      const data =await res.json();
      console.log(data);
      setProducts(data);
      setPage(page+1);

    }catch(error){
      console.log("Error fetching products : ", error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchProduct();
  },[]);

  const myThrottle=(cb, d)=>{
    let last=0;

    return (...args) =>{
       let now = new Date().getTime();

       if(now - last < d) return;

       last = now;
        return cb(...args);
    }
  }

   /*
    document.documentElement.offsetHeight= actual height of whole of the html  -> total layout height of the entire document in pixels
    window.innerHeight = height of viewport
    document.documentElement.scrollTop= height from top till the point we have scrolled */

  const handleScroll = myThrottle(() =>{

    if(window.innerHeight + document.documentElement.scrollTop +500 > document.documentElement.offsetHeight 
      && !loading && products.limit < products.total){

     fetchProduct();
    }
  }, 500);



  useEffect(()=>{

    window.addEventListener("scroll", handleScroll);

    return ()=> window.removeEventListener("scroll", handleScroll);

  },[handleScroll]);
 
  //added handleScroll in our dependency array so that it runs whenever handScroll is updated
  //or whenever we scroll to the bottom of page

  const {products: allProducts}=products;

  return (
   <div>
    <h1>Infinite Scroll React JS</h1>
      {allProducts?.length > 0  && (
        <div className='products'>
          {allProducts.map((prod, index) => {
            return (
              <div className='products__single' key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </div>
            )
          })}
        </div>
      )}
      {loading  && <p>Loading....</p>}
    </div>
  )
}

export default App
