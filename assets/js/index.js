
const datos = data.events;
let container = document.getElementById("container-cards");
container.classList.add("row","row-cols-sm-1","row-cols-md-2" , "row-cols-lg-3","row-cols-xl-4");
let ul = document.getElementById("ul_nav");

function cargarHtml(data, html)
{

	for (const item of data) {
		let div = document.createElement('div');
		div.innerHTML = `<a href="../details.html"  style="text-decoration:none; onclick="mostrar"><div class="card m-auto col-6 shadowCard mt-3" style="width: 18rem;">
		<img src="${item.image}" class="card-img-top my-3 px-2" alt="...">
		<div class="card-body">
    <h5 class="card-title">${item.name}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
		</div>
    </div></a>`
    html.appendChild(div);
  }
  return html;
}
cargarHtml(datos, container)

// fn que elimina duplicados
const eliminaDuplicados = (arr)=>{
  const unicos =[];
  
  arr.forEach(e => {
    if (!unicos.includes(e.category)) {
      unicos.push(e.category);
    }
  });
  
  return unicos;
}
const array  = eliminaDuplicados(datos);

// fin de fn que elimina duplicados


// carga los checkbox en el html
function cargarCheckbox(array, html)
{
  let fragCheck = document.createDocumentFragment();
  for (const item of array) {
    let li = document.createElement("li");
    li.classList.add("mx-3")
    li.innerHTML = `<label for=${item}.split(" ").join("_")>${item}</label>
    <input type="checkbox" name="category" id=${item}.split(" ").join("_")>`
    fragCheck.appendChild(li);
  }
   html.appendChild(fragCheck);
   return html;
}

// cargarCheckbox(array,ul);
console.log(cargarCheckbox(array,ul));;
//  fin carga checkbox en el html











	