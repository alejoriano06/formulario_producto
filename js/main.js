// ==================== CONSTANTES GLOBALES ====================
// ==================== INPUTS & FORM ====================
const iFoto = document.getElementById('foto');
const iNombres = document.getElementById('nombres');
const iMarca = document.getElementById('marca');
const iModelo = document.getElementById('modelo');
const iKilometraje = document.getElementById('kilometraje');
const iPrecio = document.getElementById('precio');
const form = document.getElementById('vehiculo-form');
const card = document.getElementById('cont-cardss');

// ==================== CREAR VEHÍCULO ====================
function crearVehiculo(imagenV, titulo1, sMarca, modeloV, kVehiculo, pVehiculo) {
  const pPrincipal = document.createElement('div');
  pPrincipal.classList.add('item-vehiculo', 'col-md-6');

  const pCard = document.createElement('div');
  pCard.classList.add('card', 'h-100');

  const imagen = document.createElement('img');
  imagen.classList.add('card-img-top', 'w-100');
  imagen.setAttribute('src', imagenV);
  imagen.setAttribute('alt', 'Foto vehiculo');

  const pTercero = document.createElement('div');
  pTercero.classList.add('card-body');

  const titulo = document.createElement('h3');
  titulo.classList.add('card-title');
  titulo.textContent = titulo1;

  const marca = document.createElement('h4');
  marca.classList.add('card-subtitle', 'text-muted');
  marca.textContent = sMarca;

  const modelo = document.createElement('h4');
  modelo.classList.add('card-text');
  modelo.textContent = 'Modelo: ' + modeloV;

  const kilometraje = document.createElement('h4');
  kilometraje.classList.add('card-text');
  kilometraje.textContent = 'Kilometraje: ' + kVehiculo;

  const precio = document.createElement('h2');
  precio.classList.add('text-success');
  precio.textContent = '$' + pVehiculo;

  const pCuarto = document.createElement('div');
  pCuarto.classList.add('d-flex', 'justify-content-between', 'mt-3');

  // Botón comprar 
  const comprar = document.createElement('button');
  comprar.classList.add('btn', 'btn-success', 'btn-comprar');
  comprar.textContent = 'Agregar al carrito';

  // Botón eliminar
  const eliminar = document.createElement('button');
  eliminar.classList.add('btn', 'btn-danger');
  eliminar.textContent = 'Eliminar';

  eliminar.addEventListener('click', () => {
    pPrincipal.remove();
    eliminarVehiculoLocal(titulo1);
  });

  // Ensamblar
  pPrincipal.appendChild(pCard);
  pCard.appendChild(imagen);
  pCard.appendChild(pTercero);
  pTercero.appendChild(titulo);
  pTercero.appendChild(marca);
  pTercero.appendChild(modelo);
  pTercero.appendChild(kilometraje);
  pTercero.appendChild(precio);
  pTercero.appendChild(pCuarto);
  pCuarto.appendChild(comprar);
  pCuarto.appendChild(eliminar);

  return pPrincipal;
}

// ==================== LOCAL STORAGE ====================
const vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar en localStorage
function guardarLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Eliminar un vehículo de LocalStorage
function eliminarVehiculoLocal(nombre) {
  vehiculos = vehiculos.filter(v => v.nombre !== nombre);
  guardarLocal("vehiculos", vehiculos);
}

// ==================== SUBMIT FORM ====================
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let imagenV = iFoto.value.trim();
  const titulo1 = iNombres.value.trim();
  const sMarca = iMarca.value.trim();
  const modeloV = iModelo.value.trim();
  const kVehiculo = iKilometraje.value.trim();
  const pVehiculo = iPrecio.value.trim();

  if (imagenV == '') {
    imagenV = 'https://img.freepik.com/vector-gratis/pagina-error-404-distorsion_23-2148105404.jpg';
  }

  if (titulo1 == '' || sMarca == '' || modeloV == '' || kVehiculo == '' || pVehiculo == '') {
    alert('Registre todos los campos');
  } else {
    const newVehiculo = {
      foto: imagenV,
      nombre: titulo1,
      marca: sMarca,
      modelo: modeloV,
      kilometraje: kVehiculo,
      precio: parseInt(pVehiculo)
    };

    // Guardar en localStorage
    vehiculos.push(newVehiculo);
    guardarLocal("vehiculos", vehiculos);

    // Pintar tarjeta
    const newCard = crearVehiculo(imagenV, titulo1, sMarca, modeloV, kVehiculo, pVehiculo);
    card.appendChild(newCard);

    // Reset inputs
    form.reset();
  }
});

// ==================== PANEL CARRITO ====================
const btnCarro = document.getElementById("carro");
const carritoPanel = document.getElementById("carrito-panel");
const cerrarCarrito = document.getElementById("cerrar-carrito");

btnCarro.addEventListener("click", () => {
  carritoPanel.classList.add("abierto");
});
cerrarCarrito.addEventListener("click", () => {
  carritoPanel.classList.remove("abierto");
});

// ==================== LÓGICA DEL CARRITO ====================
const contenedorVehiculos = document.getElementById("cont-cardss");
const carritoLista = document.getElementById("carrito-lista");
const contador = document.getElementById("contador");

// Contenedor para total
const totalDiv = document.createElement("div");
totalDiv.classList.add("p-3", "border-top", "fw-bold");
carritoLista.insertAdjacentElement("afterend", totalDiv);

// Renderizar carrito
function renderizarCarrito() {
  carritoLista.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("carrito-item", "d-flex", "align-items-center", "mb-3");

    itemDiv.innerHTML = `
      <img src="${item.foto}" alt="${item.nombre}" width="70" class="me-2 rounded">
      <div class="detalles flex-grow-1">
        <h5 class="mb-0">${item.nombre}</h5>
        <small>Marca: ${item.marca}</small><br>
        <small>Modelo: ${item.modelo}</small><br>
        <span class="text-success">$${item.precio.toLocaleString()}</span>
      </div>
      <button class="btn btn-sm btn-outline-danger btn-eliminar">❌</button>
    `;

    // Eliminar producto del carrito
    itemDiv.querySelector(".btn-eliminar").addEventListener("click", () => {
      carrito.splice(index, 1);
      guardarLocal("carrito", carrito);
      actualizarContador();
      renderizarCarrito();
    });

    carritoLista.appendChild(itemDiv);
  });

  totalDiv.textContent = `Total: $${total.toLocaleString()}`;
}

// Actualizar contador
function actualizarContador() {
  contador.textContent = carrito.length;
}

// Delegación de eventos para botón "Comprar"
contenedorVehiculos.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-comprar")) {
    const card = e.target.closest(".card");
    const foto = card.querySelector("img").src;
    const nombre = card.querySelector(".card-title").textContent;
    const marca = card.querySelector(".card-subtitle").textContent;
    const modelo = card.querySelectorAll(".card-text")[0].textContent.split(": ")[1];
    const precioTexto = card.querySelector(".text-success").textContent.replace(/[^\d]/g, "");
    const precio = parseInt(precioTexto);

    const vehiculo = { foto, nombre, marca, modelo, precio };

    carrito.push(vehiculo);
    guardarLocal("carrito", carrito);
    actualizarContador();
    renderizarCarrito();
  }
});

// ==================== INIT ====================
window.addEventListener("DOMContentLoaded", () => {
  // Pintar tarjetas guardadas
  vehiculos.forEach(v => {
    const newCard = crearVehiculo(v.foto, v.nombre, v.marca, v.modelo, v.kilometraje, v.precio);
    card.appendChild(newCard);
  });

  // Renderizar carrito si ya existía
  actualizarContador();
  renderizarCarrito();
});
