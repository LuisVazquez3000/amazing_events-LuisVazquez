let url = `https://mindhub-xj03.onrender.com/api/amazing`
const container1 = document.getElementById('table_1');
const container2 = document.getElementById('table2');
const container3 = document.getElementById('table3');

//funcion creadora
function createElement(html, id, className, href, src, content, addstyle, valueStyle) {
	const elm = document.createElement(html);
	if (id) {
		elm.id = id;
	}
	if (className) {
		elm.className = className;
	}
	if (href) {
		elm.href = href;
	}
	if (src) {
		elm.src = src;
	}
	if (content) {
		elm.innerText = content;
	}
	return elm;
}

fetch(url)
	.then(response => response.json())
	.then(data => { //console.log(data)
		const eventos = data.events;
		console.log(eventos[0]);
		loadHtml(eventos, container1);
		calcularGanancias(eventos.filter(elem => elem.assistance), "Food")
		calcularGanancias(eventos.filter(elem => elem.estimate), "Food")
		
		addTable(eventos.filter(el => el.estimate), container2)
		addTable(eventos.filter(el => el.assistance), container3)
	
	})
	.catch(err => err)


function loadHtml(array, html) {
	let highCapacity = array.reduce((ev1, ev2) => {
		if (ev1.capacity > ev2.capacity) {
			return ev1;
		} else {
			return ev2;
		}
	})
	console.log(highCapacity);
	let highAttendace = array.filter(elm => elm.assistance).reduce((ev1, ev2) => {
		if ((ev1.assistance / ev1.capacity) > (ev2.assistance / ev2.capacity)) {
			return ev1;
		} else {
			return ev2;
		}
	})
	console.log(highAttendace);
	let lowAttendace = array.filter(elm => elm.assistance).reduce((ev1, ev2) => {
		if ((ev1.assistance / ev1.capacity) < (ev2.assistance / ev2.capacity)) {
			return ev1;
		} else {
			return ev2;
		}
	})
	console.log(lowAttendace);
	let tr = createElement('tr', false, false, false, false, false, false, false)
	tr.innerHTML = `<td>${highAttendace.name}: ${highAttendace.assistance/highAttendace.capacity*100}%</td>
	<td>${lowAttendace.name}: ${lowAttendace.assistance/lowAttendace.capacity*100}%</td>
	<td>${highCapacity.name}: ${highCapacity.capacity}</td>`
	html.appendChild(tr);
}



function calcularGanancias(array, nCategoria) {
	let arrayFiltrado = array.filter(elemento => elemento.category == nCategoria).reduce((total, evento) => {
		if (evento.assistance != undefined) {
		return total += evento.price * evento.assistance	
	}else{
			return total += evento.price * evento.estimate	
		}
	}, 0)
return arrayFiltrado;
}

function addTable(array, html)
{
	let categories = [... new Set(array.map(elm => elm.category))]
	let fragment = document.createDocumentFragment();
	
	for (const category of categories) {
		let tr = createElement('tr', false, false, false, false, false, false, false);
		tr.innerHTML = `<td>${category}</td>
		<td>${calcularGanancias(array,category)}</td>
		<td>${calcularAsistencia(array,category)}</td>
		`
		fragment.appendChild(tr);
	}
		html.appendChild(fragment);
}


function calcularAsistencia(array,nbreCategories){
	let arrayFiltrado = array.filter(el=>el.category == nbreCategories).reduce((total, evento)=>{
		if (evento.assistance != undefined) {
			return total += evento.assistance / evento.capacity
		}else{
			return total += evento.estimate / evento.capacity
		}
	},0)
	return (arrayFiltrado * 100 / array.filter(el => el.category == nbreCategories).length).toFixed(2)
}
