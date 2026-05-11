let cantidad = [];
let total = 0;
let descuento = 0;

cargarCarritoDeMemoria();

function Cart() {
    let carrito = document.getElementById("compras");
    
    if (carrito.style.display === "none" || carrito.style.display === "") {
        carrito.style.display = "block"; 
    } else {
        carrito.style.display = "none";  
    }
    
    if(cantidad.length === 0) {
        carrito.innerHTML = `
        <li style="list-style: none; padding: 10px; text-align: center;">
            <strong>Aún no has agregado productos al carrito.</strong>
        </li>
        `;
    }
}

function guardarCarritoEnMemoria() {
    localStorage.setItem('miCarritoDino', JSON.stringify(cantidad));
}

function cargarCarritoDeMemoria() {
    let carritoGuardado = localStorage.getItem('miCarritoDino');
    
    if (carritoGuardado) {
        cantidad = JSON.parse(carritoGuardado);

        total = 0;
        cantidad.forEach(prod => {
            total += prod.precio * prod.cantidad;
        });


        actualizarCarrito();
    }
}

function compra(boton) {
    let tarjeta = boton.closest('.productos');
    let titulo = tarjeta.querySelector(".titulo").textContent;
    let precio = parseFloat(tarjeta.querySelector(".precio").textContent.replace("Q", ""));
    
    let imagen = tarjeta.querySelector('.imagen-productos img') ? tarjeta.querySelector('.imagen-productos img').src : '';

    let existencia = cantidad.find(producto => producto.nombre === titulo);

    if(existencia) {
        existencia.cantidad++;
    } else {
        cantidad.push({ nombre: titulo, precio: precio, imagen: imagen, cantidad: 1});
    }

    total += precio;
    actualizarCarrito();

    guardarCarritoEnMemoria();
    
    let carrito = document.getElementById("compras");
    carrito.style.display = "block"; 

}

function actualizarCarrito() {
    let carrito = document.getElementById("compras");

    if (!carrito) return;  carrito.innerHTML = "";

    if (cantidad.length === 0) {
        carrito.innerHTML = `<li style="list-style: none; padding: 10px; text-align: center;"><strong>Aún no has agregado productos al carrito.</strong></li>`;
        return;
    }

    cantidad.forEach((producto, index) => {
        let subtotalProducto = producto.precio * producto.cantidad;

        carrito.innerHTML += `
        <li style="display: flex; gap: 15px; margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 10px; list-style: none;">
            <img src="${producto.imagen}" style="width: 70px; height: 70px; border-radius: 8px; object-fit: cover;">
            <div class="detalles-producto">
                <strong>${producto.nombre}</strong> <br>
                <b>Precio: </b> Q${producto.precio.toFixed(2)} <br>
                
                <b>Cantidad: </b> 
                <input type="number" min="1" class="cantidad" value="${producto.cantidad}" onchange="cambiarCantidad(${index}, this.value)" style="width: 50px;"> <br>
                
                <b>Subtotal: </b> Q${subtotalProducto.toFixed(2)}<br>
            </div>
        </li>
        `;
    }); 

    carrito.innerHTML += `
    <button class="boton-comprar" style="margin-top: 10px; display: block; margin-left: auto;" onclick="finalizarCompra()">Finalizar Compra</button>`; 
}

function cambiarCantidad(index, nuevoValor) {
    let nuevaCant = parseInt(nuevoValor);
    
    if(nuevaCant >= 1) 
        {
        cantidad[index].cantidad = nuevaCant;
        actualizarCarrito(); 

        guardarCarritoEnMemoria();
        }
}

function finalizarCompra()
{
    alert("¡Gracias por tu compra! Tu pedido ha sido procesado.");

    cantidad = [];
    total = 0;

    localStorage.removeItem('miCarritoDino');

    actualizarCarrito();

    let carrito = document.getElementById("compras");
    if(carrito) {
        carrito.style.display = "none";
    }

}   

function button_menu()
{
    let menuPrincipal = document.getElementById('menu-principal');
    
    let principal = document.querySelector('.principal');

    if(menuPrincipal)
    {
        menuPrincipal.classList.toggle('abierto');

        if (principal) {
            principal.classList.toggle('abierto');
        }
    }   
}