document.addEventListener("DOMContentLoaded", function(){


    const app= document.querySelector(".app");
    let products=[];
    let page=1; let pageSize=10;


    const fetchProducts=async ()=>{

        try{
            const res= await fetch('https://dummyjson.com/products?limit=100');
            const data= await res.json();

            if(data && data.products){
                products=data.products;
                console.log(products);
                render();
            }
        }catch(error){
            console.error("Error fetching products :", error);      
        }

    }

    const render=()=>{
        const productsContainer=document.createElement("div");
        productsContainer.classList.add("products");
        const pagination=document.createElement("div");
        pagination.classList.add("pagination");

        if(products.length>0){

            products.slice(page*pageSize-pageSize,page*pageSize).forEach((prod)=>{
                const productElement = document.createElement("div");
                productElement.classList.add("products__single");

                productElement.innerHTML=`
                <img src="${prod.thumbnail}" alt="${prod.title}" />
                <span>${prod.title}</span>
                `;

                productsContainer.appendChild(productElement);
            })

          
            if(page>1){
                const prevButton=createPaginationButton('◀', ()=>{
                    selectPageHandler(page-1);
                });

                pagination.appendChild(prevButton);
            }



            //display number buttons
            for(let i=0; i<products.length/pageSize ; i++){

                const pageButton=createPaginationButton(i+1, ()=>{
                    selectPageHandler(i+1)
                }, page===i+1);

                pagination.appendChild(pageButton);
            }


            
             if(page<products.length/pageSize){
                const nextButton=createPaginationButton('▶', ()=>{
                    selectPageHandler(page+1);
                });

                pagination.appendChild(nextButton);
            }
             
        }
        app.appendChild(productsContainer);
        app.appendChild(pagination);
    }


     const createPaginationButton=(text, clickHandler ,isSelected=false)=>{

            const button = document.createElement("button");
            button.textContent=text;
            button.addEventListener("click", clickHandler);

            if(isSelected) {
                button.classList.add("pagination_selected");
            }

            return button;
        }


         const selectPageHandler=(selectedPage)=>{

            if(selectedPage!== page){
                page=selectedPage;
                app.innerHTML="";
                render();
            }
        }


  
    fetchProducts();

     

})