const gallery=document.getElementById("gallery")
const lightbox=document.getElementById("lightbox")
const lightboxImg=document.getElementById("lightbox-img")
const prev=document.getElementById("prev")
const next=document.getElementById("next")
const download=document.getElementById("download")

const topBtn=document.getElementById("topBtn")
const themeBtn=document.getElementById("themeBtn")

let images=[]
let index=0

/* load images */

fetch("images.json")
.then(res=>res.json())
.then(data=>{

images=data

data.forEach((file,i)=>{

const card=document.createElement("div")
card.className="card"

const img=document.createElement("img")
img.loading="lazy"
img.decoding="async"
img.src="wallpaper/"+file

img.onload=()=>{
img.classList.add("loaded")
}

img.onerror=()=>card.remove()

const tag=document.createElement("div")
tag.className="tag"
tag.innerText="daily"

const overlay=document.createElement("div")
overlay.className="overlay"
overlay.innerText=file

card.append(img,tag,overlay)
gallery.appendChild(card)

card.onclick=()=>{
index=i
openImage()
}

})

})

/* lightbox */

function openImage(){

lightbox.style.display="flex"

lightboxImg.src="wallpaper/"+images[index]

download.href="wallpaper/"+images[index]

}

prev.onclick=()=>{

index--

if(index<0) index=images.length-1

openImage()

}

next.onclick=()=>{

index++

if(index>=images.length) index=0

openImage()

}

lightbox.onclick=e=>{

if(e.target===lightbox)

lightbox.style.display="none"

}

/* keyboard */

document.addEventListener("keydown",e=>{

if(e.key==="Escape")
lightbox.style.display="none"

if(e.key==="ArrowRight")
next.click()

if(e.key==="ArrowLeft")
prev.click()

})

/* scroll top */

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.display="flex"

}else{

topBtn.style.display="none"

}

})

topBtn.onclick=()=>{

window.scrollTo({

top:0,
behavior:"smooth"

})

}

/* theme */

if(localStorage.theme==="light"){
document.body.classList.add("light")
themeBtn.innerText="☀️"
}

themeBtn.onclick=()=>{

document.body.classList.toggle("light")

if(document.body.classList.contains("light")){

themeBtn.innerText="☀️"
localStorage.theme="light"

}else{

themeBtn.innerText="🌙"
localStorage.theme="dark"

}

}