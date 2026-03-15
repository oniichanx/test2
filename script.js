document.addEventListener("DOMContentLoaded", () => {

const gallery = document.getElementById("gallery")
const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightbox-img")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const download = document.getElementById("download")
const topBtn = document.getElementById("topBtn")
const themeBtn = document.getElementById("themeBtn")

let images = []
let current = 0


// โหลดภาพ

fetch("images.json")
.then(res => res.json())
.then(data => {

images = data

data.forEach((src, index) => {

const card = document.createElement("div")
card.className = "card"

const img = document.createElement("img")
img.src = src
img.loading = "lazy"

card.appendChild(img)

card.onclick = () => openLightbox(index)

gallery.appendChild(card)

})

})


// เปิด lightbox

function openLightbox(i){

current = i

lightbox.style.display = "flex"

lightboxImg.src = images[i]

download.href = images[i]

}


// ปิด lightbox

lightbox.addEventListener("click", e => {

if(e.target === lightbox){
lightbox.style.display = "none"
}

})


// prev

prev.onclick = e => {

e.stopPropagation()

current--

if(current < 0){
current = images.length - 1
}

openLightbox(current)

}


// next

next.onclick = e => {

e.stopPropagation()

current++

if(current >= images.length){
current = 0
}

openLightbox(current)

}


// scroll top

window.addEventListener("scroll", () => {

if(window.scrollY > 400){
topBtn.style.display = "flex"
}else{
topBtn.style.display = "none"
}

})

topBtn.onclick = () => {

window.scrollTo({
top:0,
behavior:"smooth"
})

}


// theme

const savedTheme = localStorage.getItem("theme")

if(savedTheme === "light"){
document.body.classList.add("light")
themeBtn.textContent = "☀️"
}

themeBtn.onclick = () => {

document.body.classList.toggle("light")

if(document.body.classList.contains("light")){
themeBtn.textContent = "☀️"
localStorage.setItem("theme","light")
}else{
themeBtn.textContent = "🌙"
localStorage.setItem("theme","dark")
}

}

})