function MsjConsulta(event) {
  event.preventDefault();

  let nombre = document.getElementById("nombreP").value;
  let consulta = document.getElementById("consultaP").value;

  let numeroClinica = "50233675879";

  let mensaje = `Hola, mi nombre es ${nombre}. Quisiera hacer la siguiente consulta médica:\n\n"${consulta}"`;
  let urlMensaje = encodeURIComponent(mensaje);

  let linkWhatsApp = `https://wa.me/${numeroClinica}?text=${urlMensaje}`;
  window.open(linkWhatsApp, "_blank");
}

function AbreFacebook(event) {
  event.preventDefault;

  let link = "https://www.facebook.com/dralexisenriquezcardiologopediatra";
  window.open(link, "_blank");
}

function Menu(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  document.body.classList.toggle("menu-abierto");
}

document.addEventListener("DOMContentLoaded", () => {

  if (window.innerWidth <= 768) {
    document.body.classList.remove("menu-abierto");
  }

  if (document.getElementById("contenedor-header")) {
    fetch("../components/header.html")
      .then((response) => response.text())
      .then(
        (data) =>
          (document.getElementById("contenedor-header").innerHTML = data),
      );
  }

  if (document.getElementById("contenedor-menu")) {
    fetch("../components/menu.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("contenedor-menu").innerHTML = data;

        const path = window.location.pathname;
        const pageName = path.split("/").pop();

        const menuLinks = document.querySelectorAll(".menu_interno a");
        menuLinks.forEach((link) => {
          if (link.getAttribute("href") === pageName) {
            link.classList.add("active");
          }
        }); 
      });
  }

  if (document.getElementById("contenedor-footer")) {
    fetch("../components/footer.html")
      .then((response) => response.text())
      .then(
        (data) =>
          (document.getElementById("contenedor-footer").innerHTML = data),
      );
  }
});

document.addEventListener("click", function (event) {

  if (window.innerWidth > 768) return;

  let menu = document.getElementById("menu_interno");
  let boton = document.querySelector(".btn-toggle-menu");

  if (event.target.closest(".menu_interno a")) {
    document.body.classList.remove("menu-abierto");
    return; // Terminamos la función aquí
  }

  if (document.body.classList.contains("menu-abierto") && menu && boton) {
    if (!menu.contains(event.target) && !boton.contains(event.target)) {
      document.body.classList.remove("menu-abierto");
    }
  }
});

function Login(event) 
{
    event.preventDefault();
    window.open("Clinica/inicio.html", "_self");
}

document.addEventListener("click", function (e) {
  const btnVer = e.target.closest(".btn-ver-password");

  if (btnVer) {
    const contenedor = btnVer.parentElement;

    const inputPassword = contenedor.querySelector("input");
    const iconoOjo = btnVer.querySelector("svg");

    if (inputPassword && iconoOjo) {
      if (inputPassword.type === "password") {
        inputPassword.type = "text";
        iconoOjo.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                `;
      } else {
        inputPassword.type = "password";
        iconoOjo.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                `;
      }
    }
  }
});

function informe(event) 
{
  event.preventDefault();
  window.open("informe.html", "_self");
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-informe');
    const btnCerrar = document.getElementById('btn-cerrar');
    const btnCerrarAbajo = document.getElementById('btn-cerrar-abajo');
    
    if (!modal) return;

    const botonesVerDetalle = document.querySelectorAll('.tabla-datos .btn-editar');

    botonesVerDetalle.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que la página recargue si es un enlace
            modal.classList.add('mostrar');
        });
    });

    const cerrarModal = () => {
        modal.classList.remove('mostrar');
    };

    btnCerrar.addEventListener('click', cerrarModal);
    btnCerrarAbajo.addEventListener('click', cerrarModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const radiosTipoFamiliar = document.querySelectorAll(
    'input[name="tipo_ingreso_familiar"]',
  );

  const vistaExistente = document.getElementById("vista-familiar-existente");
  const vistaNuevo = document.getElementById("vista-familiar-nuevo");

  if (radiosTipoFamiliar.length > 0) {
    radiosTipoFamiliar.forEach((radio) => {
      radio.addEventListener("change", (e) => {

        vistaExistente.classList.remove("activa");
        vistaNuevo.classList.remove("activa");

        if (e.target.value === "existente") {
          vistaExistente.classList.add("activa");
        }
        else if (e.target.value === "nuevo") {
          vistaNuevo.classList.add("activa");
        }
      });
    });
  }
});

function nuevoinforme(event)
{
  event.preventDefault();
  window.open("nuevo-expediente.html", "_self");
}