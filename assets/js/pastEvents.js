const pastEventContainer = document.getElementById("pastEvents");
pastEventContainer.classList.add("row", "row-cols-sm-1", "row-cols-md-2", "row-cols-lg-3", "row-cols-xl-4");
const dataEvents = data.events;
let dateEvent = data.currentDate;
let fechaActual = new Date(dateEvent);




for (const item of dataEvents) {
  let nuevaFecha = new Date(item.date)
  if (fechaActual > nuevaFecha) {
    let div = document.createElement('div');
    div.classList.add("mt-3")
    // div.classList.add("col", "d-flex", "justify-content-center", "mb-4");
    div.innerHTML = `<a href="./details.html" style="text-decoration:none;"><div class="card m-auto col-6 shadowCard p-2" style="width: 18rem;">
  <img src="${item.image}" class="card-img-top my-3 px-2" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.name}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div></a>`
    pastEventContainer.appendChild(div);
  }
}