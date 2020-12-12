const imgs = document.getElementById("imgs");
const img = document.querySelectorAll("#imgs img");
let idx = 0;
function run() {
    idx++;
    if (idx > img.length - 1) {
        idx = 0;
    }
    imgs.style.transform = `translateX(${-idx * 1300}px)`;
}

setInterval(run, 5000);





let productsGallery = document.querySelector(".products-gallery")


        
async function  infinixJumia(){
   // const resp =  await  fetch("https://cors-anywhere.herokuapp.com/https://www.parsehub.com/api/v2/projects/tawzJtLPoG5Z/last_ready_run/data?api_key=t3TaKT0tiiTo&format=json")
   const resp =  await  fetch("script/jumiainfinix.json")
    const respData = await resp.json()
    const phones = respData.infinixJumia
    return phones
   }
   
   async function  samsungJumia(){
//       const resp =  await  fetch("https://cors-anywhere.herokuapp.com/https://www.parsehub.com/api/v2/projects/tzTsLhMaMvTp/last_ready_run/data?api_key=t3TaKT0tiiTo&format=json");
       const resp =  await  fetch("script/samsunginfin.json")
       const respData = await resp.json()
       const phones = respData.samsungJumia
       return phones       
      }
 
   
   
   async function allPhones(){
       const allFunctions = [
           infinixJumia(),
           samsungJumia()
       ];
       const results = await Promise.all(allFunctions);
        newArr =    results.flat()
        let productsGallery = document.querySelector(".products-gallery")
       let pageNumber = document.querySelector(".page-number")

        let currentPage = 1;
        let  rows  = 12;
       displayAllPhone(newArr, productsGallery, rows, currentPage)
      return  setPagination(newArr, pageNumber, rows)
   }
      
   allPhones()
   

function displayAllPhone(newArr, productsGallery, rows, currentPage){
    productsGallery.innerHTML = "";
    currentPage--;
    let start = rows * currentPage;
    let end = start + rows;

    let paginatedItems = newArr.slice(start, end);
  //  console.log(paginatedItems)
    for(let i = 0; i < paginatedItems.length; i++){
        
        let eachProduct = paginatedItems[i]
        let{name, img, price, old_price,url} = eachProduct;
        console.log(typeof eachProduct)

        let productPack = document.createElement("div");
        productPack.classList.add("product-pack");

        productPack.innerHTML = `<div id="inputs">
        <input type="checkbox" name="" id="compare-input">
        <input type="checkbox" id="like-input">
    </div>
    
        <img src="${img}" alt="top-product" class="product-img">
        
        <a href="${url}">  <p class="product-name">${name}</p></a>
        <p class="product-price">${price}</p>
        <p class="product-old-price">${old_price}</p>
        <p class="product-discount">discount</p>
        <img src="./img/playstore.jpg" alt="vendor-logo" class="product-logo">
        <a href='#' id=obodo><button>details<button></a>
        `
        productsGallery.appendChild(productPack)

        let allBtns = document.querySelectorAll('#obodo')
        //console.log(allBtns)
        allBtns.forEach((eachBtn)=>{
            eachBtn.addEventListener('click', ()=>{
              //  console.log()
                
            })
        })
       
   }

}

  let pageNumber = document.querySelector(".page-number")


function setPagination(newArr, pageNumber, rows){
    pageNumber.innerHTML = "";

    let page_count = Math.ceil(newArr.length/rows);
    for (let i = 1; i < page_count + 1; i++){
      let btn = PaginationButton(i, newArr);
      pageNumber.appendChild(btn)
    } 
}

function PaginationButton(i, newArr){
    let button = document.createElement('button');
    button.innerText = i;
    let currentPage = 1;
    let rows = 12 ; 

    if(currentPage == i){
        button.classList.add('active')
    }
    button.addEventListener('click', ()=>{
        currentPage = i;
        displayAllPhone(newArr, productsGallery, rows, currentPage)
        
        let currentBtn = document.querySelector('.page-number button.active')
        currentBtn.classList.remove('active')
        
        button.classList.add('active')
    })
    return button;

}

//setPagination(newArr, pageNumber, rows)

