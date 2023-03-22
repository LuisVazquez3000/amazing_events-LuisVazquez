const url = `https://mindhub-xj03.onrender.com/api/amazing`;
const container_details = document.querySelector("#details");
const cont_img = document.getElementById("container_img");
const cont_txt = document.querySelector("#txt_detail")
//const datos_eventos = data.events;

async function load(){
	const queryString =location.search;
	const params = new URLSearchParams(queryString);
	const id = params.get("id") || 1	;
	let resp = await fetch(url);
	let data = await resp.json();
	let evento = data.events;
	const datoEvento = evento.find(e =>e._id == id);
	
	console.log(datoEvento);
	
	createCard(datoEvento)
}

load();


function createElement(html,id,className, href,src, content ) {
	const elm = document.createElement(html);
	
	if (id) {
		elm.id = id;
	}
	if(className){
		elm.className = className;
	}
	if (href) {
		elm.href = href;
	}
	if (src) {
		elm.src=src;
	}
	if(content)
	{
		elm.innerText = content;
	}
	return elm;
	
}


function createCard(object)
{

	const el = createElement("img",false,"img_detail",false,`${object.image}`, false);
	const h3 = createElement("h3",false,false,false,false,`Title: ${object.name}`);
	const p1 = createElement("p",false,false,false,false,`Desc:${object.description}`)
	const p2 = createElement("p",false,false,false,false,`Place: ${object.place}`)
	const p3 = createElement("p",false,false,false,false,`Price:$${object.price}`)
	const p4 = createElement("p",false,false,false,false,`Category:${object.category}`)
	const p5 = createElement("p",false,false,false,false,`Capacity:${object.capacity }`)
	const p6 = createElement("p",false,false,false,false,`${object.assistance == undefined?"Estimate":"Assistance"}:${object.assistance == undefined?object.estimate:object.assistance}`)

	cont_img.appendChild(el);
	cont_txt.appendChild(h3);
	cont_txt.appendChild(p1);
	cont_txt.appendChild(p2);
	cont_txt.appendChild(p3);
	cont_txt.appendChild(p4);
	cont_txt.appendChild(p5);
	cont_txt.appendChild(p6);
	
}





