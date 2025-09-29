document.addEventListener("DOMContentLoaded", () => {
  const tablaCarros = document.querySelector("#tabla-carros tbody");

  // Obtener carrito del localStorage
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Si no hay vehículos
  if (carrito.length === 0) {
    tablaCarros.innerHTML = `
      <tr>
        <td colspan="5">No hay vehículos en el carrito</td>
      </tr>
    `;
    return;
  }

  // Renderizar cada vehículo en la tabla
  carrito.forEach((vehiculo) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td><img src="${vehiculo.foto}" alt="${vehiculo.nombre}" width="80" class="rounded"></td>
      <td>${vehiculo.nombre}</td>
      <td>${vehiculo.marca}</td>
      <td>${vehiculo.modelo}</td>
      <td>$${vehiculo.precio.toLocaleString()}</td>
    `;

    tablaCarros.appendChild(fila);
  });
});
