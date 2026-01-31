
import { useEffect, useState } from 'react';
import './App.css'

function App() {

  let pageSize=10;
  const [products,setProducts]=useState([]);
  const [page, setPage]=useState(1);

  const fetchProducts=async ()=>{

    const res= await fetch('https://dummyjson.com/products?limit=100');
    const data= await res.json();

    //console.log(data);

    if(data && data.products){
      console.log(data);
      setProducts(data.products);
    }
    

  }

  const selectPageHandler=(selectedPage)=>{
    setPage(selectedPage);
  }
  


  useEffect(()=>{
    fetchProducts();
  },[])

  return (
    <div className='app'>
      {products.length >0  && <div className='products'>
            {products.slice(page*pageSize-pageSize,page*pageSize).map((prod)=> {    
              return <span key={prod.id} className='products__single'>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            }
          )}
        </div>}

        {products.length >0 &&  <div className='pagination'>
            <span 
              style={page===1 ? {"display":'none'} : {"display":'block'}}
              onClick={()=> selectPageHandler(prev=>prev-1)}>◀</span>
            {[...Array(products.length/pageSize)].map((_,i)=>{
              return <span 
              className={page===i+1 ? "pagination__selected" : ""}
              onClick={()=> selectPageHandler(i+1)} 
              key={i+1}>{i+1}</span>
            })}
            <span 
            style={page=== (products.length/pageSize) ? {"display":'none'} : {"display":'block'}}
            onClick={()=>selectPageHandler(next=>next+1)}>▶</span>
          </div>}
    </div>
  )
}

export default App
