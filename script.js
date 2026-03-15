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



let touchStartX = 0
let touchEndX = 0
let swipeLock = false

lightbox.addEventListener("touchstart", e => {
touchStartX = e.changedTouches[0].screenX
}, { passive:true })

lightbox.addEventListener("touchend", e => {
touchEndX = e.changedTouches[0].screenX
handleSwipe()
}, { passive:true })

function handleSwipe(){

if(swipeLock) return

const diff = touchEndX - touchStartX

if(Math.abs(diff) < 60) return

swipeLock = true

if(diff < 0){
next.click()
}else{
prev.click()
}

setTimeout(()=>{
swipeLock = false
},250)

}