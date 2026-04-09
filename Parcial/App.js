let cantidad = [];
let total = 0;

function Cart() {
    let compras = document.getElementById("compras");
    
    if (compras.style.display === "none" ) 
    {
        compras.style.display = "block"; 
    } 
    else
    {
        compras.style.display = "none";  
    }
}

function compra(boton) 
{
    let tarjeta = boton.closest('.tarjeta');
    let titulo = tarjeta.querySelector(".titulo").textContent;
    let precio = parseFloat(tarjeta.querySelector(".precio").textContent.replace("Q", ""));
    let imagen = tarjeta.querySelector('.imagen-disco img') ? tarjeta.querySelector('.imagen-disco img').src : '';

    let existencia = cantidad.find(producto => producto.nombre === titulo);

    if(existencia) 
    {
        existencia.cantidad++;
    }
    else
    {
        cantidad.push({ nombre: titulo, precio: precio, imagen: imagen, cantidad: 1 });
    }

    total += precio;

    actualizarCarrito();
}

function actualizarCarrito() 
{
    let carrito = document.getElementById("compras");
    carrito.innerHTML = "";

    cantidad.forEach(producto => 
        {
        let subtotalProducto = producto.precio * producto.cantidad;

            carrito.innerHTML += `
            <li>
                <img src="${producto.imagen}" alt="Disco">
                <div class="detalles-producto">
                    <strong>${producto.nombre}</strong> <br> 
                    Precio viejo: Q${(producto.precio * 1.25).toFixed(2)} <br>
                    Precio: Q${producto.precio.toFixed(2)} | <b>Cantidad: ${producto.cantidad}</b> <br>
                    <i>Subtotal: Q${subtotalProducto.toFixed(2)}</i>
                </div>
            </li>
        `;
        }); 

    carrito.innerHTML += `
        <li style="justify-content: flex-end; border-bottom: none; font-size: 18px; margin-top: 10px; align-items: center; display: flex;">
            <strong>TOTAL: Q${total.toFixed(2)}</strong>
        </li>
    <button class="boton-comprar" style="margin-top: 5px; display: block; margin-left: auto;" onclick="finalizarCompra()">Finalizar Compra</button>    `; 
}

function finalizarCompra()
{
    let compras = document.getElementById("compras");
    compras.style.display = "none";  

    cantidad = [];
    total = 0;
    actualizarCarrito();

    alert("¡Gracias por tu compra! Tu pedido ha sido procesado.");
}