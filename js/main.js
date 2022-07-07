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
