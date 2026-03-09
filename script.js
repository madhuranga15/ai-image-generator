let history = JSON.parse(localStorage.getItem("history")) || [];

function renderHistory(){

let html = "";

history.forEach(url => {

html += `
<div>
<img src="${url}" onclick="preview('${url}')" referrerpolicy="no-referrer">
<a href="${url}" download>
<button class="download">Download</button>
</a>
</div>
`;

});

document.getElementById("history").innerHTML = html;

}

renderHistory();

async function generate(){

const prompt = document.getElementById("prompt").value;

const encoded = encodeURIComponent(prompt);

document.getElementById("loading").innerText = "Generating images...";

let images = "";

for(let i=0;i<4;i++){

const url = `https://image.pollinations.ai/prompt/${encoded}?seed=${Math.random()}`;

history.unshift(url);

images += `
<div>
<img src="${url}" onclick="preview('${url}')" referrerpolicy="no-referrer">
<a href="${url}" download>
<button class="download">Download</button>
</a>
</div>
`;

}

localStorage.setItem("history", JSON.stringify(history));

document.getElementById("result").innerHTML = images;

document.getElementById("loading").innerText = "";

renderHistory();

}

function preview(url){

document.getElementById("previewImg").src = url;
document.getElementById("preview").style.display = "flex";

}

function closePreview(){

document.getElementById("preview").style.display = "none";

}

function toggleMode(){

document.body.classList.toggle("light");

}

function aiPrompt(){

const input = document.getElementById("prompt").value;

const prompts = {

dragon:"epic dragon flying over medieval castle at sunset, cinematic lighting, ultra detailed",

lion:"majestic lion wearing sunglasses in cyberpunk city, neon lights, ultra realistic",

car:"futuristic sports car in neon cyberpunk city, reflections, cinematic",

anime:"beautiful anime girl with blue hair, glowing lights, detailed art",

space:"astronaut floating in space with colorful nebula, ultra detailed"

};

if(prompts[input]){

document.getElementById("prompt").value = prompts[input];

}else{

document.getElementById("prompt").value =
`${input}, cinematic lighting, ultra detailed, 4k concept art`;

}

}
