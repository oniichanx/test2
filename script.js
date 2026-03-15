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





/* ---------------- mobile swipe ---------------- */

let startX = 0
let endX = 0

const lightbox = document.getElementById("lightbox")
const prev = document.getElementById("prev")
const next = document.getElementById("next")

lightbox.addEventListener("touchstart", e=>{
startX = e.changedTouches[0].screenX
})

lightbox.addEventListener("touchend", e=>{
endX = e.changedTouches[0].screenX
handleSwipe()
})

function handleSwipe(){

let diff = startX - endX

if(Math.abs(diff) < 50) return

if(diff > 0){
next.click()
}else{
prev.click()
}

}

/* ---------------- lock scroll when open image ---------------- */

const lightboxImg = document.getElementById("lightbox-img")
const download = document.getElementById("download")

function openImage(){
lightbox.style.display="flex"
document.body.style.overflow="hidden"
}

lightbox.onclick = e=>{
if(e.target === lightbox){
lightbox.style.display="none"
document.body.style.overflow=""
}
}