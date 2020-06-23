function revisar(input) {
    if (input.value == "") {
        input.className = "form-control is-invalid"
        return false;
    } else {
        input.className = "form-control is-valid"
        return true;
    }
}

function revisarMail(input) {
    // Variable que contendra el formato a validar
    let expresion = /\w+@\w+\.[a-z]/;

    if (input.value != "") {
        //Aqui voy a validar el formato de ese mail
        if (expresion.test(input.value)) {
            input.className = "form-control is-valid"
            return true;
        } else {
            input.className = "form-control is-invalid"
            return false;
        }
    } else {
        input.className = "form-control is-invalid"
        return false;
    }
}

function revisarNumeros(input) {
    if (isNaN(input.value) || input.value == "") {
        input.className = "form-control is-invalid"
        return false;
    } else {
        input.className = "form-control is-valid"
        return true;
    }
}

function revisarLongitud(input) {
    if (input.value != "" && input.value.length >= 10) {
        input.className = "form-control is-valid"
        return true;
    } else {
        input.className = "form-control is-invalid"
        return false;
    }
}

function validar() {
    event.preventDefault();//Previene su comportamiento por defecto
    console.log("dentro de la funcion validar")

    if (revisar(document.getElementById('nombre')) && revisarMail(document.getElementById('email')) && revisarNumeros(document.getElementById('telefono')) && revisarLongitud(document.getElementById('consulta'))) {
        enviarMail();
    } else {
        alert("Envio fallido o ocurrio un error")
    }
}

function enviarMail() {
    console.log("Enviar mail");
    let template_params = {
        "from_name": document.getElementById('nombre').value,
        "to_name": "Administrador",
        "message_html": `${document.getElementById('consulta').value} - Mail: ${document.getElementById('email').value}`
    }

    let service_id = "default_service";
    let template_id = "template_zFG2LALr";
    emailjs.send(service_id, template_id, template_params).then(
        function (response) {
            console.log("Si todo esta bien", response)
            document.getElementById('success').className = "alert alert-primary mt-4";
            document.getElementById('success').innerText = "Consulta enviada correctamente"
        }, 
        function (error) {
            console.log("Esta todo mal", error)
            document.getElementById('success').className = "alert alert-danger mt-4";
            document.getElementById('success').innerText = "Algo salio mal :c"
        }
    )
}