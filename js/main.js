let precioContadoInput = document.getElementById("precioContado");
let precioCuotasInput = document.getElementById("precioCuotas");
let inflacionEstimadaInput = document.getElementById("inflacionEstimada");
let cantidadCuotasInput = document.getElementById("cantidadCuotas");

const valoresFormulario = JSON.parse(
  localStorage.getItem("valores-formulario")
);

precioContadoInput.value = valoresFormulario.precioContado;
precioCuotasInput.value = valoresFormulario.precioCuotas;
inflacionEstimadaInput.value = valoresFormulario.inflacion;
cantidadCuotasInput.value = valoresFormulario.cantidadCuotas;

const calcular = () => {
  const entradas = {
    precioContado: parseFloat(prompt("Ingresar el precio de contado")),
    precioCuotas: parseFloat(prompt("Ingresar el precio en cuotas")),
    inflacionEstimada: parseFloat(
      prompt("Ingresar la inflación estimada mensual")
    ),
    cantidadCuotas: parseInt(prompt("Ingresar la cantidad de cuotas")),
  };

  const montoCuotas = entradas.precioCuotas / entradas.cantidadCuotas;
  const resultadoCuotas = [];

  let cuotaActual = montoCuotas;

  for (let i = 0; i < entradas.cantidadCuotas; i++) {
    const montoDeLaCuota = Math.round(
      cuotaActual * (1 - entradas.inflacionEstimada / 100)
    );
    resultadoCuotas.push(montoDeLaCuota);
    cuotaActual = montoDeLaCuota;
  }

  console.log("precio contado: ", entradas.precioContado);
  console.log("precio cuotas: ", entradas.precioCuotas);
  console.log("inflacion estimada: ", entradas.inflacionEstimada);
  console.log("cantidad cuotas: ", entradas.cantidadCuotas);

  console.log("las cuotas son: ", resultadoCuotas);

  let sumaCuotasAjustadas = 0;
  resultadoCuotas.forEach((monto) => {
    sumaCuotasAjustadas = sumaCuotasAjustadas + monto;
  });

  console.log(
    "monto total en cuotas ajustado por inflacion: ",
    sumaCuotasAjustadas
  );

  if (sumaCuotasAjustadas > entradas.precioContado) {
    console.log(
      "La mejor opcion es pagar de contado, te ahorras:",
      sumaCuotasAjustadas - entradas.precioContado,
      "🚀"
    );
  } else {
    console.log(
      "La mejor opcion es pagar en cuotas, te ahorras:",
      entradas.precioContado - sumaCuotasAjustadas,
      "🚀"
    );
  }
};

let miFormulario = document.getElementById("formulario");
miFormulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
  e.preventDefault();
  mostrarCargando();

  setTimeout(() => {
    let formulario = e.target;
    const errores = [];

    const valoresFormulario = {
      precioContado: precioContadoInput.value,
      precioCuotas: precioCuotasInput.value,
      inflacion: inflacionEstimadaInput.value,
      cantidadCuotas: cantidadCuotasInput.value,
    };

    localStorage.setItem(
      "valores-formulario",
      JSON.stringify(valoresFormulario)
    );

    let erroresDiv = document.getElementById("errores");
    erroresDiv.innerHTML = "";

    if (precioContadoInput.value === "") {
      errores.push("El precio contado es un valor obligatorio");
    }

    if (precioCuotasInput.value === "") {
      errores.push("El precio cuotas es un valor obligatorio");
    }

    errores.forEach((error) => {
      const errorDiv = document.createElement("p");
      errorDiv.innerHTML = error;
      erroresDiv.appendChild(errorDiv);
    });

    mostrarBotonNormal();
  }, 2000);
}

let btnVerMejorOpcion = document.getElementById("btnVerMejorOpcion");
btnVerMejorOpcion.addEventListener("click", mostrarCargando);

function mostrarCargando() {
  const botonCargando = document.getElementById("btnVerMejorOpcion");
  botonCargando.innerHTML = "Calculando mejor opción...";
}

function mostrarBotonNormal() {
  const botonCargando = document.getElementById("btnVerMejorOpcion");
  botonCargando.innerHTML = "Ver mejor opción";
}
