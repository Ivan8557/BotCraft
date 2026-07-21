// ==========================================
// BOTCRAFT JavaScript
// Version 1.0
// ==========================================

document.addEventListener("DOMContentLoaded",()=>{

// ----------------------------
// Smooth Scroll
// ----------------------------

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",function(e){

const target=this.getAttribute("href");

if(target.length>1){

e.preventDefault();

document.querySelector(target).scrollIntoView();

}

});

});


// ----------------------------
// Scroll Button
// ----------------------------

const topButton=document.createElement("button");

topButton.innerHTML="↑";

topButton.className="topButton";

document.body.appendChild(topButton);


window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topButton.style.opacity="1";

topButton.style.pointerEvents="auto";

}else{

topButton.style.opacity="0";

topButton.style.pointerEvents="none";

}

});


topButton.addEventListener("click",()=>{

window.scrollTo({

top:0

});

});


// ----------------------------
// Animated Counters
// ----------------------------

const counters=document.querySelectorAll(".counter");

counters.forEach(counter=>{

counter.innerText=counter.dataset.target || counter.innerText;

});


// ----------------------------
// Navbar Shadow
// ----------------------------

// ----------------------------
// Navbar Shadow
// ----------------------------

const header=document.querySelector(".header");

window.addEventListener("scroll",()=>{

if(header){

if(window.scrollY>50){

header.style.boxShadow="0 10px 35px rgba(0,0,0,.35)";

}else{

header.style.boxShadow="none";

}

}

});


// ----------------------------
// Footer Year
// ----------------------------

const footer=document.querySelector("footer p");

if(footer){

footer.innerHTML="© "+new Date().getFullYear()+" BOTCRAFT";

}


// ----------------------------
// Order Form Submission
// ----------------------------

const orderForm = document.getElementById('orderForm');

if(orderForm){

const statusEl = document.getElementById('orderStatus');
const demoBtn = document.getElementById('demoFill');


if(demoBtn){

demoBtn.addEventListener('click',()=>{

orderForm.name.value='Іван К.';
orderForm.contact.value='+380501112233';
orderForm.message.value='Потрібен бот для прийому заявок і оплати онлайн.';

});

}


orderForm.addEventListener('submit', async (e)=>{

e.preventDefault();


statusEl.textContent='Надсилаю...';


const spinner=document.getElementById('orderSpinner');

if(spinner){

spinner.classList.add('active');

}


const buttons=orderForm.querySelectorAll('button');

buttons.forEach(b=>b.disabled=true);


const data={

name:orderForm.name.value,

contact:orderForm.contact.value,

message:orderForm.message.value

};


try{


const resp=await fetch(
'https://botcraft-88co.onrender.com/order',
{

method:'POST',

headers:{

'Content-Type':'application/json'

},

body:JSON.stringify(data)

});


const result=await resp.json();


if(resp.ok){

statusEl.textContent='Дякую! Замовлення надіслано.';

orderForm.reset();

}else{

statusEl.textContent='Помилка: '+(result.error || 'Невідома помилка');

}


}catch(err){

statusEl.textContent='Помилка мережі: '+err.message;

}


if(spinner){

spinner.classList.remove('active');

}


buttons.forEach(b=>b.disabled=false);


});

}


// ----------------------------
// Mobile Menu
// ----------------------------

const menuButton=document.querySelector(".menuToggle");

const mobileMenu=document.querySelector("#mobileMenu");


if(menuButton && mobileMenu){


menuButton.addEventListener("click",()=>{

mobileMenu.classList.toggle("active");

});


document.querySelectorAll("#mobileMenu a").forEach(link=>{


link.addEventListener("click",()=>{

mobileMenu.classList.remove("active");

});


});


}


// ----------------------------
// Card Hover Interaction
// ----------------------------

document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("mouseenter",()=>{
    card.style.transform="translateY(-6px)";
});

card.addEventListener("mouseleave",()=>{
    card.style.transform="";
});

});


// ----------------------------
// Fade Hero
// ----------------------------

// ----------------------------
// Floating Animation
// ----------------------------

// ----------------------------
// Loader
// ----------------------------

window.addEventListener("load",()=>{


const loader=document.querySelector("#preloader");


if(loader){

loader.remove();

}


});


// ----------------------------
// ----------------------------
// Console Message
// ----------------------------

console.log(
"%cBOTCRAFT",
"font-size:28px;color:#29bfff;font-weight:bold;"
);


console.log(
"Website created with HTML CSS JS"
);


// ----------------------------
// Simple Lightbox
// ----------------------------

const lbOverlay=document.createElement('div');

lbOverlay.className='lb-overlay';

lbOverlay.innerHTML=
'<button class="lb-close">✕</button><img src="" alt="preview">';


document.body.appendChild(lbOverlay);


const lbImg=lbOverlay.querySelector('img');

const lbClose=lbOverlay.querySelector('.lb-close');


document.querySelectorAll('.work img').forEach(img=>{


img.style.cursor='zoom-in';


img.addEventListener('click',()=>{


lbImg.src=img.src;

lbOverlay.classList.add('active');


});


});


lbClose.addEventListener('click',()=>{


lbOverlay.classList.remove('active');

lbImg.src='';


});


lbOverlay.addEventListener('click',(e)=>{


if(e.target===lbOverlay){


lbOverlay.classList.remove('active');

lbImg.src='';


}


});


});
// ----------------------------
// End
// ----------------------------