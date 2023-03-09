
const datos = data.events;
let selectChecked = [];

let container = document.getElementById("container-cards");
container.classList.add("row","--bs-gutter-x:1.8em","row-cols-sm-1","row-cols-md-2" , "row-cols-lg-3","row-cols-xl-4");
let ul = document.getElementById("ul_nav");


function cargarHtml(data, html)
{
  container.innerHTML = "";
  if (data.length != 0) {
    for (const item of data) {
      let div = document.createElement('div');
      div.classList.add("eventos", "gap-3", "p-5" );
      div.style.width="20rem";
    	div.innerHTML = `<a href="details.html?id=${item._id}"  style="text-decoration:none; onclick="mostrar"><div class="card m-auto col-6 shadowCard mt-3 mx-5" style="width: 18rem;">
    	<img src="${item.image}" class="card-img-top my-3 mx-auto  px-4" alt="cards_events">
    	<div class="card-body d-flex flex-column">
      <h5 class="card-title">${item.name}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    	</div>
      </div></a>`
      html.appendChild(div);
    }
    return html;
  }else{
    container.innerHTML = "<h1>no se encontraron elementos </h1>"
  }
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
    li.innerHTML = `<label for=${item.replace(" ","_" )}>${item}</label>
    <input type="checkbox" name="category" id=${item.replace(" ","_" )} 
    class="checks"
    value=${item.replace(" ","_" )}>`
    fragCheck.appendChild(li);
  }
  html.appendChild(fragCheck);
  return html;
}

// cargarCheckbox(array,ul);
cargarCheckbox(array,ul);
//  fin carga checkbox en el html



//Filtros con checkBox
let checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(e => e.addEventListener('change',()=>{  
  let selectChecked = [...checkboxes].filter(check => check.checked).map(el => el.value);
 // console.log(filterArrays(selectChecked, datos));
  let cardsCheked =filterArrays(selectChecked, datos);
  cargarHtml(cardsCheked,container);
  filterAll(cardsCheked);
}))

function filterArrays(valores, data)
{
  if (valores.length == 0) {
    return data;
  } 
  let nuevoArrays = data.filter(ele => valores.includes(ele.category.replace(" ", "_")));
  return nuevoArrays;
  
}

//fin filtros con checkbox


//Search input

let searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup",()=>{
  //  
  let nuevo = filterValueArray(searchInput.value, datos);
  cargarHtml(nuevo, container);
  filterAll(datos)
})
function filterValueArray(valor, array)
{
  if (valor == "") {
    return array;
  }
  let nuevoArray = array.filter(el => el.category.toLowerCase().includes(valor.toLowerCase().trim()))
  return nuevoArray;
}

//final filter

function filterAll(data)
{
  let cardCheckedFilter = filterArrays(selectChecked, data);
  let checkFilter = filterValueArray(searchInput.value,cardCheckedFilter)
  console.log(checkFilter);
}











