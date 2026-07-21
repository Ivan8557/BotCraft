// ==========================================
// BOTCRAFT JavaScript
// Version 1.0
// ==========================================

document.addEventListener("DOMContentLoaded",()=>{

// ----------------------------
// Reveal Animation
// ----------------------------

const revealItems=document.querySelectorAll(
".card,.heroCard,.aboutGrid div,.stat,.work,.review,.faqItem"
);

const revealObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.15
});

revealItems.forEach(item=>{

revealObserver.observe(item);

});

// ----------------------------
// Smooth Scroll
// ----------------------------

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",function(e){

const target=this.getAttribute("href");

if(target.length>1){

e.preventDefault();

document.querySelector(target).scrollIntoView({

behavior:"smooth"

});

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

top:0,

behavior:"smooth"

});

});

// ----------------------------
// Typing Effect
// ----------------------------

const heroTitle=document.querySelector(".hero h1");

if(heroTitle){

const text=heroTitle.innerText;

heroTitle.innerHTML="";

let i=0;

function type(){

if(i<text.length){

heroTitle.innerHTML+=text.charAt(i);

i++;

setTimeout(type,25);

}

}

type();

}

// ----------------------------
// Animated Counters
// ----------------------------

const counters=document.querySelectorAll(".counter");

counters.forEach(counter=>{

const target=Number(counter.dataset.target);

let value=0;

const speed=Math.ceil(target/100);

function update(){

if(value<target){

value+=speed;

counter.innerText=value;

requestAnimationFrame(update);

}else{

counter.innerText=target;

}

}

update();

});

// ----------------------------
// Mouse Glow
// ----------------------------

const glow=document.createElement("div");

glow.className="glow";

document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{

glow.style.left=(e.clientX-170)+"px";

glow.style.top=(e.clientY-170)+"px";

});

// ----------------------------
// Navbar Shadow
// ----------------------------

const header=document.querySelector(".header");

window.addEventListener("scroll",()=>{

if(window.scrollY>50){

header.style.boxShadow="0 10px 35px rgba(0,0,0,.35)";

}else{

header.style.boxShadow="none";

}

});

// ----------------------------
// Telegram Button Animation
// ----------------------------

const telegramButtons=document.querySelectorAll(
".telegramBtn,.mainBtn,.bigTelegram"
);

telegramButtons.forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="translateY(-5px) scale(1.03)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translateY(0) scale(1)";

});

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

	demoBtn && demoBtn.addEventListener('click', ()=>{
		orderForm.name.value = 'Іван К.';
		orderForm.contact.value = '+380501112233';
		orderForm.message.value = 'Потрібен бот для прийому заявок і оплати онлайн.';
	});

	orderForm.addEventListener('submit', async (e)=>{
		e.preventDefault();
		statusEl.textContent = 'Надсилаю...';
		const spinner = document.getElementById('orderSpinner');
		spinner.classList.add('active');
		// disable buttons while sending
		const buttons = orderForm.querySelectorAll('button');
		buttons.forEach(b=>b.disabled = true);
		const data = {
			name: orderForm.name.value,
			contact: orderForm.contact.value,
			message: orderForm.message.value
		};
			const endpoints = [
				'http://localhost:8001/order',
				'http://127.0.0.1:8001/order'
			];
			let resp = null;
			let lastError = null;
			for(const url of endpoints){
				try{
					resp = await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
					if(resp.ok) break;
					const txt = await resp.text();
					let message = 'Не вдалося надіслати замовлення.';
					try {
						const payload = JSON.parse(txt);
						message = payload.error || message;
					} catch {
						message = txt || message;
					}
					statusEl.textContent = 'Помилка: ' + message;
					return;
				}catch(err){
					lastError = err;
				}
			}
			if(resp && resp.ok){
				statusEl.textContent = 'Дякую! Замовлення надіслано.';
				orderForm.reset();
			} else {
				statusEl.textContent = 'Помилка мережі: '+(lastError ? lastError.message : 'Не вдалося зʼєднатися');
			}
		// re-enable buttons and hide spinner
		spinner.classList.remove('active');
		buttons.forEach(b=>b.disabled = false);
		});

}

// ----------------------------
// Mobile Menu

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
// Parallax Effect
// ----------------------------

const parallax=document.querySelectorAll(".parallax");

window.addEventListener("mousemove",(e)=>{

const x=e.clientX/window.innerWidth;

const y=e.clientY/window.innerHeight;

parallax.forEach(item=>{
	const speed = Number(item.dataset.speed) || 20;
	item.style.transform = `translate(${(x * speed).toFixed(2)}px, ${(y * speed).toFixed(2)}px)`;
});

});


// ----------------------------
// Card Tilt
// ----------------------------

document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=((x/rect.width)-0.5)*16;

const rotateX=((y/rect.height)-0.5)*-16;

card.style.transform=

`perspective(1000px)

rotateX(${rotateX}deg)

rotateY(${rotateY}deg)

translateY(-10px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});

// ----------------------------
// Fade Hero
// ----------------------------

const hero=document.querySelector(".hero");

window.addEventListener("scroll",()=>{

if(hero){

hero.style.opacity=

1-window.scrollY/700;

}

});

// ----------------------------
// Floating Animation
// ----------------------------

const floating=document.querySelectorAll(

".heroCard,.work,.review"

);

floating.forEach((item,index)=>{

setInterval(()=>{

item.style.transform=

"translateY(-6px)";

setTimeout(()=>{

item.style.transform=

"translateY(0px)";

},1200);

},3500+(index*300));

});

// ----------------------------
// Loader
// ----------------------------

window.addEventListener("load",()=>{

const loader=document.querySelector("#preloader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.remove();

},600);

}

});

// ----------------------------
// Random Glow
// ----------------------------

setInterval(()=>{

const glow=document.querySelector(".glow");

if(glow){

glow.style.opacity=Math.random();

}

},1200);

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
// Simple Lightbox for portfolio
// ----------------------------
const lbOverlay = document.createElement('div');
lbOverlay.className = 'lb-overlay';
lbOverlay.innerHTML = '<button class="lb-close">✕</button><img src="" alt="preview">';
document.body.appendChild(lbOverlay);
const lbImg = lbOverlay.querySelector('img');
const lbClose = lbOverlay.querySelector('.lb-close');

document.querySelectorAll('.work img').forEach(img=>{
	img.style.cursor = 'zoom-in';
	img.addEventListener('click', ()=>{
		lbImg.src = img.src;
		lbOverlay.classList.add('active');
	});
});

lbClose.addEventListener('click', ()=>{ lbOverlay.classList.remove('active'); lbImg.src=''; });
lbOverlay.addEventListener('click', (e)=>{ if(e.target === lbOverlay) { lbOverlay.classList.remove('active'); lbImg.src=''; } });

// ----------------------------
// End
// ----------------------------

});