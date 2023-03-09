const queryString =location.search;
const params = new URLSearchParams(queryString);
const container_details = document.querySelector("#details");
const cont_img = document.getElementById("container_img");
const cont_txt = document.querySelector("#txt_detail")
const id = params.get("id");
const datos_eventos = data.events;
const datoEvento = datos_eventos.find(e =>e._id == id);

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


const el = createElement("img",false,"img_detail",false,`${datoEvento.image}`, false);
const h3 = createElement("h3",false,false,false,false,`${datoEvento.name}`);
const p1 = createElement("p",false,false,false,false,`${datoEvento.description}`)
const p2 = createElement("p",false,false,false,false,`${datoEvento.place}`)
const p3 = createElement("p",false,false,false,false,`${datoEvento.price}`)
const p4 = createElement("p",false,false,false,false,`${datoEvento.category}`)

cont_img.appendChild(el);
cont_txt.appendChild(h3);
cont_txt.appendChild(p1);
cont_txt.appendChild(p2);
cont_txt.appendChild(p3);
cont_txt.appendChild(p4);






