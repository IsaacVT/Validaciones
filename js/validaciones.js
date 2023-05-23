export function valida(input) {
    const tipoDeInput = input.dataset.tipo
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid')
        input.parentElement.querySelector('.input-message-error').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalid')
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeError(tipoDeInput, input)
    }
}

const tipoErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajesDeError = {
    nombre: {
        valueMissing: 'El campo nombre no puede estar vacio'
    },
    email: {
        valueMissing: 'El campo email no puede estar vacio',
        typeMismatch: 'El correo no es valido'
    },
    password: {
        valueMissing: 'El campo contraseña no puede estar vacio',
        patternMismatch: 'Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.'
    },
    nacimiento: {
        valueMissing: 'El campo de la fecha de nacimiento no puede estar vacio',
        customError: 'Debes tener al menos 18 años de edad'
    },
    numero: {
        valueMissing: 'El campo del número telefonico no puede estar vacio',
        patternMismatch: 'El formato requerido es XXXXXXXXXX de 10 números'
    },
    direccion: {
        valueMissing: 'El campo direccion no puede estar vacio',
        patternMismatch: 'La direccion debe contener de 10 a 40 caracteres'
    },
    ciudad: {
        valueMissing: 'El campo direccion no puede estar vacio',
        patternMismatch: 'La ciudad debe contener de 5 a 30 caracteres'
    },
    estado: {
        valueMissing: 'El campo direccion no puede estar vacio',
        patternMismatch: 'El estado debe contener de 4 a 30 caracteres'
    },
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeError(tipoDeInput, input) {
    let mensaje = ''
    tipoErrores.forEach((error) => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error]
        }
    })

    return mensaje
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value)

    let mensaje = ''

    if (!mayorDeEdad(fechaCliente)) {
        mensaje = 'Debes tener al menos 18 años de edad'
    }

    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date()
    const difereniaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate(),
    )

    return difereniaFechas <= fechaActual
}