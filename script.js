var img = document.getElementById("image")
var caption = document.getElementById("caption")
var forward = document.getElementById("forward")
var backward = document.getElementById("backward")
var add = document.getElementById("add")
var loading = document.getElementById("loading")

var contentQueue = [
	{
	  "imageURL": "https://static.giga.de/wp-content/uploads/2018/03/Google-Bilderkennung-Rueckwaerts-Bildersuche-Titelbild-rcm1920x1080u.jpg",
	  "caption":	"Thats a Google Screenshot!",
	},
	{
	  "imageURL": "https://i.computer-bild.de/imgs/1/4/0/0/5/7/5/3/Google-oeffnet-nicht-fb8e25d064b356a9.jpg",
	  "caption":	"Thats a Google Smartphone Screen",
	},
	{
	  "imageURL": "https://www.tagesschau.de/multimedia/bilder/google-333~_v-mittelgross1x1.jpg",
	  "caption":	"That's the Google Headquarter!",
	}
]

var index = 0;

if(contentQueue.length)
	caption.innerHTML = contentQueue[0].caption
	img.setAttribute("src",contentQueue[0].imageURL)
	

function updateImage(){
	if(index >= contentQueue.length)
		index = 0
	
	if(index < 0)
		index = contentQueue.length - 1
	
	caption.innerHTML = contentQueue[index].caption
	img.setAttribute("src",contentQueue[index].imageURL)
	img.style.right = 0
	load = 0;
	clearInterval(timer)
	timer = setInterval(autoSwap,3000)
}	

const autoSwap = () => {
	index++;
	updateImage()
	
}

var load = 0;
const loadbar = () => {	
	load++;
	loading.style.width = load + "%";
	if(load > 99)
		load = 0
}

let timer = setInterval(autoSwap, 3000);
let loadTimer = setInterval(loadbar,30);


forward.addEventListener("click", () =>{
	index++;
	updateImage();
})

backward.addEventListener("click", () =>{
	index--
	updateImage();
})

add.addEventListener("click", () => {
	var myobj = {"imageURL": "https://www.tagesschau.de/multimedia/bilder/google-333~_v-mittelgross1x1.jpg","caption":	"Einfach wunderbar diese Suchmaschine" + parseInt(contentQueue.length+1)}
	contentQueue.push(myobj)
})

img.addEventListener("mousedown", (f) => {
	img.onmousemove = (e) => {
		var movement = f.clientX - e.clientX
		console.log(f.clientX - e.clientX)
		img.style.right = movement
		console.log(movement)
		if(movement < -200){
			index++
			img.onmousemove = null
			updateImage()
		}
		if(movement > 200){
			index--
			img.onmousemove = null
			updateImage()
		}
	}
})

document.body.addEventListener("mouseup", () => {
    img.onmousemove = null
	img.style.right = 0;
});