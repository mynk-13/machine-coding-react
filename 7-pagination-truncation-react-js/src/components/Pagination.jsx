import React from 'react'

const Pagination = ({page, setPage, totalPages, maxVisiblePages=10}) => {

    
     const selectPageHandler=(selectedPage)=>{

        if(selectedPage >=1  && selectedPage <= totalPages && selectedPage !== page)
            setPage(selectedPage);
  }

  const renderPageKey=(currPage, key)=>{

     return <span 
              className={page===currPage ? "pagination__selected" : ""}
              onClick={()=> selectPageHandler(currPage)} 
              key={key}>{currPage}</span>
  }
  

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageKey(i,i));
      }
    }else{
        //truncation logic
        const startPage=Math.max(1,page- Math.floor(maxVisiblePages/2));
        const endPage=Math.min(totalPages, startPage+maxVisiblePages-1);

        if(startPage>1){    

            if(startPage>2){
                pageNumbers.push(renderPageKey(1,1));
            }
            pageNumbers.push(renderPageKey("...", "ellispsis-start"))
        }

        for(let i=startPage; i<=endPage;i++){
            pageNumbers.push(renderPageKey(i,i));
        }

        if(endPage<totalPages){

            
             pageNumbers.push(renderPageKey("...", "ellispsis-end"));

             if(endPage<totalPages-1){
                 pageNumbers.push(renderPageKey(totalPages,totalPages));
            }
        };

    }
    return pageNumbers;
  };


  return (
    <div className='pagination'>
            <span 
              style={page===1 ? {"display":'none'} : {"display":'block'}}
              onClick={()=> selectPageHandler(page-1)}>◀</span>
            {renderPageNumbers()}
            <span 
            style={page=== totalPages ? {"display":'none'} : {"display":'block'}}
            onClick={()=>selectPageHandler(page+1)}>▶</span>
          </div>
  )
}

export default Pagination