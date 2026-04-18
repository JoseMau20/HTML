document.addEventListener('DOMContentLoaded', async () => {
    const contenedorOfertas = document.getElementById('Ofertas');
    if (contenedorOfertas) {
        try {
            const respuesta = await fetch('http://localhost:3000/api/discos');
            const discos = await respuesta.json();
            contenedorOfertas.innerHTML = '';
            
            discos.forEach(disco => {
                contenedorOfertas.innerHTML += `
                    <article class="tarjeta" id="Producto${disco.id}">
                        <div class="imagen-disco">
                            <img src="${disco.imagen}" alt="Disco" onerror="this.src='https://via.placeholder.com/150'">
                        </div>
                        <div class="info-producto">
                            <p class="titulo">${disco.titulo}</p>
                            <p class="precio-viejo">Q${parseFloat(disco.precioViejo).toFixed(2)}</p>
                            <p class="precio">Q${parseFloat(disco.precio).toFixed(2)}</p>
                            <button class="boton-comprar" onclick="compra(this)">Comprar</button>
                        </div>
                    </article>`;
            });
        } catch (error) {
            contenedorOfertas.innerHTML = '<p>Error al conectar con la base de datos.</p>';
        }
    }
});

let cantidad = [];
let total = 0;
let descuento = 0;

function Cart() {
    let carrito = document.getElementById("compras");
    carrito.style.display = (carrito.style.display === "none") ? "block" : "none";
    if(total === 0) {
        carrito.innerHTML = `<li><strong>Aún no has agregado productos al carrito.</strong></li>`;
    }
}

function compra(boton) {
    let tarjeta = boton.closest('.tarjeta');
    let titulo = tarjeta.querySelector(".titulo").textContent;
    let precio = parseFloat(tarjeta.querySelector(".precio").textContent.replace("Q", ""));
    let imagen = tarjeta.querySelector('.imagen-disco img') ? tarjeta.querySelector('.imagen-disco img').src : '';
    let precioviejo = parseFloat(tarjeta.querySelector(".precio-viejo").textContent.replace("Q", ""));
    let existencia = cantidad.find(producto => producto.nombre === titulo);

    if(existencia) existencia.cantidad++;
    else cantidad.push({ nombre: titulo, precio: precio, imagen: imagen, cantidad: 1, precioviejo: precioviejo });

    total += precioviejo;
    descuento += (precioviejo - precio);
    actualizarCarrito();
}

function actualizarCarrito() {
    let carrito = document.getElementById("compras");
    carrito.innerHTML = "";
    cantidad.forEach(producto => {
        let subtotalProducto = producto.precioviejo * producto.cantidad;
        carrito.innerHTML += `
            <li>
                <img src="${producto.imagen}" alt="Disco">
                <div class="detalles-producto">
                    <strong>${producto.nombre}</strong> <br>
                    <b> Precio: </b> Q${producto.precioviejo.toFixed(2)} <br>
                    <b>Cantidad: </b> 
                    <input type="number" class="cantidad" value="${producto.cantidad}" readonly> <br>
                    <b>Subtotal: </b> Q${subtotalProducto.toFixed(2)}<br>
                </div>
            </li>`;
    }); 

    carrito.innerHTML += `
        <ul>
            <li style="justify-content: flex-end; border-bottom: none; font-size: 18px; display: flex; text-decoration: line-through;">SubTotal: Q${total.toFixed(2)}</li>
            <li style="justify-content: flex-end; border-bottom: none; font-size: 18px; display: flex;">Descuento: Q${descuento.toFixed(2)}</li>    
            <li style="justify-content: flex-end; border-bottom: none; font-size: 18px; display: flex;"><strong>Total: Q${(total - descuento).toFixed(2)}</strong></li> 
        </ul>         
        <button class="boton-comprar" style="margin-top: 5px; display: block; margin-left: auto;" onclick="finalizarCompra()">Finalizar Compra</button>`; 
}

function finalizarCompra() {
    document.getElementById("compras").style.display = "none";  
    cantidad = [];
    total = 0;
    descuento = 0;
    actualizarCarrito();
    alert("¡Gracias por tu compra! Tu pedido ha sido procesado.");
}