
import { useEffect, useState } from 'react';
import './App.css'
import Pagination from './components/Pagination';

function App() {

  let pageSize=10; const maxVisiblePages=5;
  const [products,setProducts]=useState([]);
  const [page, setPage]=useState(1);
  const [totalPages, setTotalPages]=useState(0);

  const fetchProducts=async ()=>{

    const res= await fetch(`https://dummyjson.com/products?limit=${pageSize}&skip=${page*pageSize-pageSize}`);
    const data= await res.json();

    //console.log(data);

    if(data && data.products){
      console.log(data.products);
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total/pageSize));
    }
    

  }

 


  useEffect(()=>{
    fetchProducts();
  },[page]);

  return (
    <div className='app'>
      {products.length >0  && <div className='products'>
            {products.map((prod)=> {    
              return <span key={prod.id} className='products__single'>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            }
          )}
        </div>}

        {products.length >0 &&
        (<Pagination 
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          maxVisiblePages={maxVisiblePages}
        />) }
    </div>
  )
}

export default App
