const accordianData=[
    {
        id:"accordian-1",
        title:"Accordian 1",
        content:"This is the content of accordian 1"
    },
    {
        id:"accordian-2",
        title:"Accordian 2",
        content:"This is the content of accordian 2"
    },
    {
        id:"accordian-3",
        title:"Accordian 3",
        content:"This is the content of accordian 3"
    }
]

document.addEventListener("DOMContentLoaded", function(){

    const accordianContainer=document.querySelector("#accordian");

    let activeItem=accordianData[0].id;


    accordianData.forEach((accordian)=>{
    
    const accordianItem=document.createElement("div");
    accordianItem.classList.add("accordian-item");
    accordianItem.id=accordian.id;

    const accordianHeader=document.createElement("div");
    accordianHeader.innerText=`${accordian.title}🔻`;
    accordianHeader.classList.add("accordian-header");
   

    const accordianContent=document.createElement("div");
    accordianContent.innerHTML=`<p>${accordian.content}</p>`;
    accordianContent.classList.add("accordian-content");

    accordianItem.appendChild(accordianHeader);
    accordianItem.appendChild(accordianContent);

    accordianContainer.appendChild(accordianItem);

    })

    accordianContainer.addEventListener("click", function(event){

        console.log("event.target", event.target);

        if(event.target.matches(".accordian-header")){
        
            const accordianId=event.target.parentNode.id;

            if(activeItem!==accordianId){
            toggleAccordian(accordianId);
            activeItem=accordianId;
            }
           

        }

       function toggleAccordian(accordianId){

        const accordianHeader=document.querySelectorAll(".accordian-header");
        const accordianContent=document.querySelectorAll(".accordian-content");

        accordianHeader.forEach((acc)=>acc.classList.remove("active"));
        accordianContent.forEach((acc)=>acc.classList.remove("active"));

         const accordianItem=document.getElementById(accordianId);
        
         const selectedHeader=accordianItem.firstChild;
         selectedHeader.classList.add("active");

         selectedHeader.nextSibling.classList.add("active");
         
        }
    })

        const accordianItem=document.getElementById(activeItem);
        
         const selectedHeader=accordianItem.firstChild;
         selectedHeader.classList.add("active");

         selectedHeader.nextSibling.classList.add("active");  
    
    
    
})