function MsjConsulta(event)
{
    event.preventDefault();

    let nombre = document.getElementById("nombreP").value;
    let consulta = document.getElementById("consultaP").value;

    let numeroClinica = "50233675879";

    let mensaje = `Hola, mi nombre es ${nombre}. Quisiera hacer la siguiente consulta médica:\n\n"${consulta}"`;
    let urlMensaje = encodeURIComponent(mensaje);

    const linkWhatsApp = `https://wa.me/${numeroClinica}?text=${urlMensaje}`;
    window.open(linkWhatsApp, "_blank");
}
