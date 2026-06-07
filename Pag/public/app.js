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