let cantidad = [];
let total = 0;
let descuento = 0;

function Cart() {
    let carrito = document.getElementById("compras");
    
    if (carrito.style.display === "none" ) 
    {
        carrito.style.display = "block"; 
    } 
    else
    {
        carrito.style.display = "none";  
    }
    
    if(total === 0)
    {
        carrito.innerHTML = `
        <li>
        <strong>Aún no has agregado productos al carrito.</strong>
        </li>
        `;
    }
}

function compra(boton) 
{
    let tarjeta = boton.closest('.tarjeta');
    let titulo = tarjeta.querySelector(".titulo").textContent;
    let precio = parseFloat(tarjeta.querySelector(".precio").textContent.replace("Q", ""));
    let imagen = tarjeta.querySelector('.imagen-disco img') ? tarjeta.querySelector('.imagen-disco img').src : '';
    let precioviejo = parseFloat(tarjeta.querySelector(".precio-viejo").textContent.replace("Q", ""));

    let existencia = cantidad.find(producto => producto.nombre === titulo);

    if(existencia) 
    {
        existencia.cantidad++;
    }
    else
    {
        cantidad.push({ nombre: titulo, precio: precio, imagen: imagen, cantidad: 1, precioviejo: precioviejo });
    }

    total += precioviejo;
    descuento += (precioviejo - precio);

    actualizarCarrito();
}

function actualizarCarrito() 
{
    let carrito = document.getElementById("compras");
    carrito.innerHTML = "";

    cantidad.forEach(producto => 
        {
        let subtotalProducto = producto.precioviejo * producto.cantidad;

            carrito.innerHTML += `
            <li>
                <img src="${producto.imagen}" alt="Disco">
                <div class="detalles-producto">
                    <strong>${producto.nombre}</strong> <br>
                    <b> Precio: </b> Q${producto.precioviejo.toFixed(2)} <br>
                    <b>Cantidad: </b> 
                    <input type="number" id="cantidad" name="cantidad" class="cantidad" value="${producto.cantidad}" onchange="actualizarCarrito()"> <br>
                    <b>Subtotal: </b> Q${subtotalProducto.toFixed(2)}<br>

                </div>
            </li>
        `;
        }); 

    carrito.innerHTML += `
        <ul>
            <li style="justify-content: flex-end; border-bottom: none; font-size: 18px; align-items: center; display: flex; text-decoration: line-through;">
            SubTotal: Q${(total).toFixed(2)}
            </li>

            <li style="justify-content: flex-end; border-bottom: none; font-size: 18px; align-items: center; display: flex;">
            Descuento: Q${(descuento).toFixed(2)}
            </li>    
        
            <li style="justify-content: flex-end; border-bottom: none; font-size: 18px; align-items: center; display: flex;">
            <strong>Total: Q${(total - descuento).toFixed(2)}</strong>
            </li> 
        </ul>         

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