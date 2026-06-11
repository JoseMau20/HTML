// 1. Declaramos las variables de la modal de forma global para que todo el archivo las vea
const modal = document.getElementById("modal-producto");
const botonesAbrir = document.querySelectorAll(".btn-abrir-modal");
const botonCerrar = document.querySelector(".btn-cerrar");

let modalImg, modalTitulo, modalDesc, modalPrecio, modalId, modalStock;

// 2. Si estamos en una página con modal (index.html), les asignamos sus elementos correspondientes
if (modal) {
  modalImg = document.getElementById("modal-img");
  modalTitulo = document.getElementById("modal-titulo");
  modalDesc = document.getElementById("modal-desc");
  modalPrecio = document.getElementById("modal-precio");
  modalId = document.getElementById("modal-id");
  modalStock = document.getElementById("modal-stock");

  botonesAbrir.forEach((boton) => {
    boton.addEventListener("click", () => {
      let tarjeta = boton.closest(".tarjeta-producto");
      modalImg.src = tarjeta.querySelector("img").src;
      modalTitulo.textContent = tarjeta.querySelector(".titulo").textContent;
      modalDesc.textContent = tarjeta.querySelector(".descripcion").textContent;
      modalPrecio.textContent = tarjeta.querySelector(".precio").textContent;
      modalId.textContent = tarjeta.querySelector(".id-producto").textContent;
      modalStock.textContent = tarjeta.querySelector(".stock").textContent;

      modal.classList.add("activa");
    });
  });

  botonCerrar.addEventListener("click", () => {
    modal.classList.remove("activa");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("activa");
    }
  });
}

// --- LÓGICA DEL CARRITO ---

let cantidad = [];
let total = 0;

document.addEventListener("DOMContentLoaded", cargarCarritoDeMemoria);

function Cart() {
  let carrito = document.getElementById("compras");
  if (!carrito) return;

  if (carrito.style.display === "none" || carrito.style.display === "") {
    carrito.style.display = "block";
  } else {
    carrito.style.display = "none";
  }

  if (cantidad.length === 0) {
    carrito.innerHTML = `
        <li style="list-style: none; padding: 10px; text-align: center;">
            <strong>Aún no has agregado productos al carrito.</strong>
        </li>`;
  }
}

function compra() {
  // Ahora 'modalTitulo' y los demás ya son accesibles aquí sin errores
  let titulo = modalTitulo.textContent;
  let precio = parseFloat(modalPrecio.textContent.replace("Q", "").trim());
  let imagen = modalImg.src;
  let idProducto = modalId.textContent;
  let stockDisponible = parseInt(modalStock.textContent);

  let existencia = cantidad.find((producto) => producto.nombre === titulo);

  if (existencia) {
    if (existencia.cantidad < stockDisponible) {
      existencia.cantidad++;
    } else {
      alert(
        "Solo hay " +
          stockDisponible +
          " unidades disponibles de este producto.",
      );
      return;
    }
  } else {
    if (stockDisponible > 0) {
      cantidad.push({
        id: idProducto,
        nombre: titulo,
        precio: precio,
        imagen: imagen,
        cantidad: 1,
        stock: stockDisponible,
      });
    } else {
      alert("Este producto está agotado.");
      return;
    }
  }

  total += precio;
  actualizarCarrito();
  guardarCarritoEnMemoria();

  modal.classList.remove("activa");
  let carrito = document.getElementById("compras");
  if (carrito) carrito.style.display = "block";
}

function actualizarCarrito() {
  let carrito = document.getElementById("compras");
  if (!carrito) return;

  carrito.innerHTML = "";

  if (cantidad.length === 0) {
    carrito.innerHTML = `<li style="list-style: none; padding: 10px; text-align: center;"><strong>Aún no has agregado productos al carrito.</strong></li>`;
    return;
  }

  total = 0;

  cantidad.forEach((producto, index) => {
    let subtotalProducto = producto.precio * producto.cantidad;
    total += subtotalProducto;

    carrito.innerHTML += `
        <li style="display: flex; gap: 15px; align-items: center;">
            <img src="${producto.imagen}" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;">
            <div class="detalles-producto" style="flex-grow: 1; text-align: left; font-size: 0.9rem;">
                <strong>${producto.nombre}</strong> <br>
                <b>Precio: </b> Q${producto.precio.toFixed(2)} <br>
                <b>Cant: </b> 
                <input type="number" min="1" value="${producto.cantidad}" onchange="cambiarCantidad(${index}, this.value)" style="width: 45px; padding: 2px;"> 
                <br><b>Subtotal: </b> Q${subtotalProducto.toFixed(2)}
            </div>
            <button onclick="eliminarProducto(${index})" style="background-color: #e74c3c; color: white; border: none; border-radius: 5px; width: 30px; height: 30px; font-weight: bold; cursor: pointer;" title="Eliminar">X</button>    
        </li>
        `;
  });

  carrito.innerHTML += `
    <li style="list-style: none; text-align: right; font-size: 1.2rem; font-weight: bold; padding-top: 10px; border-bottom: none;">
        Total: Q${total.toFixed(2)}
    </li>
    <button class="btn-principal" style="width: 100%; margin-top: 10px; padding: 10px; border-radius: 6px;" onclick="finalizarCompra()">Finalizar Compra</button>`;
}

function cambiarCantidad(index, nuevoValor) {
  let nuevaCant = parseInt(nuevoValor);
  let maxStock = cantidad[index].stock;

  if (nuevaCant > maxStock) {
    alert("Solo hay " + maxStock + " unidades disponibles");
    cantidad[index].cantidad = maxStock;
  } else if (nuevaCant >= 1) {
    cantidad[index].cantidad = nuevaCant;
  }
  actualizarCarrito();
  guardarCarritoEnMemoria();
}

function guardarCarritoEnMemoria() {
  let carritoJSON = JSON.stringify(cantidad);
  document.cookie =
    "miCarrito=" + encodeURIComponent(carritoJSON) + "; path=/; max-age=3600";
}

function cargarCarritoDeMemoria() {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith("miCarrito=")) {
      let carritoJSON = decodeURIComponent(
        cookie.substring("miCarrito=".length),
      );
      cantidad = JSON.parse(carritoJSON);
      actualizarCarrito();
      break;
    }
  }
}

function finalizarCompra() {
  if (cantidad.length === 0) return;
  window.location.href = "pago.html";
}

function eliminarProducto(index) {
  cantidad.splice(index, 1);
  actualizarCarrito();
  guardarCarritoEnMemoria();
}

// ==========================================
// LÓGICA DE LA PÁGINA DE PAGO (pago.html)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("lista-resumen")) {
    setTimeout(cargarResumenPago, 100);
  }
});

function toggleDireccion() {
  let metodo = document.getElementById("metodo-entrega").value;
  let divDireccion = document.getElementById("div-direccion");
  let inputDireccion = document.getElementById("direccion-cliente");

  if (metodo === "domicilio") {
    divDireccion.style.display = "block";
    inputDireccion.required = true;
  } else {
    divDireccion.style.display = "none";
    inputDireccion.required = false;
    inputDireccion.value = "";
  }
}

function cargarResumenPago() {
  let listaHTML = document.getElementById("lista-resumen");
  let totalSpan = document.getElementById("total-pago");
  let total = 0;

  if (cantidad.length === 0) {
    listaHTML.innerHTML =
      "<p style='text-align: center; color: #666; padding: 20px;'>No tienes productos en tu pedido.</p>";
    totalSpan.textContent = "Q 0.00";

    let btnPagar = document.querySelector(".btn-pagar");
    if (btnPagar) {
      btnPagar.disabled = true;
      btnPagar.style.background = "#ccc";
      btnPagar.style.cursor = "not-allowed";
    }
    return;
  }

  listaHTML.innerHTML = "";

  cantidad.forEach((producto) => {
    let subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    listaHTML.innerHTML += `
            <li class="item-resumen">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="detalles">
                    <h4>${producto.nombre}</h4>
                    <p>Cantidad: ${producto.cantidad} x Q${producto.precio.toFixed(2)}</p>
                </div>
                <div class="subtotal">
                    <strong>Q${subtotal.toFixed(2)}</strong>
                </div>
            </li>
        `;
  });

  totalSpan.textContent = `Q ${total.toFixed(2)}`;
}

function cancelarPedido() {
  let confirmacion = confirm(
    "¿Estás seguro de que deseas cancelar tu orden y vaciar el carrito de compras?",
  );

  if (confirmacion) {
    document.cookie = "miCarrito=; path=/; max-age=0";
    window.location.href = "index.html";
  }
}

function procesarPago(event) {
  event.preventDefault();

  let nombre = document.getElementById("nombre-cliente").value;
  let metodo = document.getElementById("metodo-entrega").value;

  let mensaje = `¡Orden confirmada, ${nombre}!\n\n`;
  if (metodo === "recoger") {
    mensaje +=
      "Tu pedido estará listo para que pases a recogerlo a nuestro local.";
  } else {
    mensaje += "Tu pedido será enviado a la dirección indicada en breve.";
  }

  alert(mensaje);

  document.cookie = "miCarrito=; path=/; max-age=0";
  window.location.href = "index.html";
}
