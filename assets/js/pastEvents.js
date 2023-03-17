async function load() {
  const url = `https://mindhub-xj03.onrender.com/api/amazing`
  const pastEventCntainer = document.getElementById("pastEvents");
  pastEventCntainer.classList.add("row", "row-cols-sm-1", "row-cols-md-2", "row-cols-lg-3", "row-cols-xl-4");

  let respuesta = await fetch(url)
  let data = await respuesta.json();
  const datos = data.events;

  let ul = document.getElementById("ul_nav");
  let categories = [...new Set(datos.map(el => el.category))];

  console.log(categories);
  cargarCheckbox(categories, ul);

  let datosFiltrados = datos.filter(el => el.assistance)
  console.log(datosFiltrados);
  cargarHtml(datosFiltrados, pastEventCntainer);

  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(e => e.addEventListener('change', verifyCheck))

  function verifyCheck() {
    selectChecked = [...checkboxes].filter(check => check.checked).map(el => el.value);
    let cardsCheked = filterArrays(selectChecked, datosFiltrados);
    cargarHtml(cardsCheked, pastEventCntainer);
    filterAll(datosFiltrados, selectChecked, searchInput, pastEventCntainer)
  }

  //Search input
  let text_search = '';
  let searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("keyup", () => {
    text_search = searchInput.value;
    let nuevo = filterValueArray(text_search, datosFiltrados);
    cargarHtml(nuevo, pastEventCntainer);
    filterAll(datosFiltrados, selectChecked, searchInput, pastEventCntainer)
  })



}
load();

function filterValueArray(valor, array) {
  if (valor == "") {
    return array;
  }
  let nuevoArray = array.filter(el => el.name.toLowerCase().includes(valor.toLowerCase().trim()))
  return nuevoArray;
}

function filterArrays(arrayString, arrayObjects) {
  if (arrayString.length == 0) {
    return arrayObjects;
  } else {
    let newArrays = arrayObjects.filter(el => arrayString.includes(el.category));
    return newArrays;
  }
}

let selectChecked = []

function filterAll(array, selectChecked, searchInput, container) {
  let cardCheckedFilter = filterArrays(selectChecked, array);
  let checkFilter = filterValueArray(searchInput.value, cardCheckedFilter)
  console.log(checkFilter);
  cargarHtml(checkFilter, container)

}

function cargarHtml(data, html) {
  html.innerHTML = "";
  if (data.length != 0) {
    for (const item of data) {
      let div = document.createElement('div');
      div.classList.add("eventos", "gap-3", "p-5", "px-3");
      div.style.width = "20rem";
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
  } else {
    let frament = document.createDocumentFragment();
    let h2 = document.createElement('h2');
    h2.classList.add('d-flex', 'flex-row', 'text-center')
    h2.innerText = `no se encontraron elementos`
    frament.appendChild(h2);
    html.appendChild(frament);
  }
}

function cargarCheckbox(array, html) {
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



























// const pastEventContainer = document.getElementById("pastEvents");
// pastEventContainer.classList.add("row", "row-cols-sm-1", "row-cols-md-2", "row-cols-lg-3", "row-cols-xl-4");
// const dataEvents = data.events;
// let dateEvent = data.currentDate;
// let fechaActual = new Date(dateEvent);




// for (const item of dataEvents) {
//   let nuevaFecha = new Date(item.date)
//   if (fechaActual > nuevaFecha) {
//     let div = document.createElement('div');
//     div.classList.add("mt-3")
//     // div.classList.add("col", "d-flex", "justify-content-center", "mb-4");
//     div.innerHTML = `<a href="./details.html" style="text-decoration:none;"><div class="card m-auto col-6 shadowCard p-2" style="width: 18rem;">
//   <img src="${item.image}" class="card-img-top my-3 px-2" alt="...">
//   <div class="card-body">
//     <h5 class="card-title">${item.name}</h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//   </div>
// </div></a>`
//     pastEventContainer.appendChild(div);
//   }
// }