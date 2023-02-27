const datos = data.events;
let container = document.getElementById("container-cards");
// container.classList.add("container","d-flex", "flex-wrap", "gap-5","my-5");
container.classList.add("row","row-cols-sm-1","row-cols-md-2" , "row-cols-lg-3","row-cols-xl-4");



for (const item of datos) {
	let div = document.createElement('div');
	div.innerHTML = `<a href="../details.html"  style="text-decoration:none; onclick="mostrar"><div class="card m-auto col-6 shadowCard mt-3" style="width: 18rem;">
  <img src="${item.image}" class="card-img-top my-3 px-2" alt="...">
  <div class="card-body">
    <h5 class="card-title">${item.name}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div></a>`
	container.appendChild(div);
}





	