const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const download = document.getElementById("download");

let images = [];
let index = 0;

fetch("images.json")
.then(res=>res.json())
.then(data=>{

images = data;

data.forEach((file,i)=>{

let card = document.createElement("div");
card.className="card";

let img = document.createElement("img");
img.src="wallpaper/"+file;
img.loading="lazy";

let tag=document.createElement("div");
tag.className="tag";
tag.innerText="daily";

let overlay=document.createElement("div");
overlay.className="overlay";
overlay.innerText=file;

card.appendChild(img);
card.appendChild(tag);
card.appendChild(overlay);

gallery.appendChild(card);

card.onclick=()=>{
index=i;
openImage();
}

});

});

function openImage(){

lightbox.style.display="flex";

lightboxImg.src="wallpaper/"+images[index];

download.href="wallpaper/"+images[index];

}

prev.onclick=()=>{

index--;

if(index<0) index=images.length-1;

openImage();

}

next.onclick=()=>{

index++;

if(index>=images.length) index=0;

openImage();

}

lightbox.onclick=(e)=>{

if(e.target===lightbox){

lightbox.style.display="none";

}

}

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape") lightbox.style.display="none";

if(e.key==="ArrowRight") next.click();

if(e.key==="ArrowLeft") prev.click();

});