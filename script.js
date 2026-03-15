const gallery=document.getElementById("gallery")
const lightbox=document.getElementById("lightbox")
const lightboxImg=document.getElementById("lightbox-img")
const prev=document.getElementById("prev")
const next=document.getElementById("next")
const download=document.getElementById("download")

let images=[]
let index=0

fetch("images.json")
.then(res=>res.json())
.then(data=>{
images=data

data.forEach((file,i)=>{
const card=document.createElement("div")
card.className="card"

const img=document.createElement("img")
img.src="wallpaper/"+file
img.loading="lazy"
img.decoding="async"

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
if(e.target===lightbox) lightbox.style.display="none"
}

document.addEventListener("keydown",e=>{
if(e.key==="Escape") lightbox.style.display="none"
if(e.key==="ArrowRight") next.click()
if(e.key==="ArrowLeft") prev.click()
})



/* scroll to top */

const topBtn=document.getElementById("topBtn")

window.onscroll=()=>{
if(document.documentElement.scrollTop>400){
topBtn.style.display="block"
}else{
topBtn.style.display="none"
}
}

topBtn.onclick=()=>{
window.scrollTo({
top:0,
behavior:"smooth"
})
}

/* theme toggle */

const themeBtn=document.getElementById("themeBtn")

themeBtn.onclick=()=>{

document.body.classList.toggle("light")

if(document.body.classList.contains("light")){
themeBtn.innerText="☀️"
}else{
themeBtn.innerText="🌙"
}

}

/* masonry resize */

function resizeGrid(){
const grid=document.querySelector(".gallery")
const rowHeight=10
const rowGap=18

grid.querySelectorAll(".card").forEach(card=>{
const img=card.querySelector("img")
const height=img.getBoundingClientRect().height
const span=Math.ceil((height+rowGap)/(rowHeight+rowGap))
card.style.gridRowEnd="span "+span
})
}

window.addEventListener("load",resizeGrid)
window.addEventListener("resize",resizeGrid)

/* swipe support */

let startX=0

document.getElementById("lightbox").addEventListener("touchstart",e=>{
startX=e.touches[0].clientX
})

document.getElementById("lightbox").addEventListener("touchend",e=>{
let endX=e.changedTouches[0].clientX

if(startX-endX>50){
next.click()
}

if(endX-startX>50){
prev.click()
}
})

/* pinch zoom */

let scale=1
let startDistance=0
const img=document.querySelector("#lightbox img")

document.getElementById("lightbox").addEventListener("touchmove",e=>{

if(e.touches.length==2){

const dx=e.touches[0].clientX-e.touches[1].clientX
const dy=e.touches[0].clientY-e.touches[1].clientY

const distance=Math.sqrt(dx*dx+dy*dy)

if(!startDistance) startDistance=distance

scale=distance/startDistance

img.style.transform="scale("+scale+")"

}

})

document.getElementById("lightbox").addEventListener("touchend",()=>{
startDistance=0
})

/* lazy load images */

document.querySelectorAll("img").forEach(img=>{
img.loading="lazy"
})