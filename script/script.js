const $botonVentana = document.getElementById("ventana-button");
const $ventana = document.getElementById("ventana-inf");
const $botonCalc = document.getElementById("calc-button");
const $numeroHexa = document.getElementById("hexa-number");
const $bloqueColor = document.getElementById("principal-color");
const hexaPermitidos = ["A","B","C","D","E","F"];

//esta funcion obtiene el numero hexadecimal del usuario combierte el texto en mayuscula y separa el numero en un array "[]", por ultimo lo retorna
const obtenerNumero = () => {
  let value = $numeroHexa.value;
  value = (value.toString()).toUpperCase();
  value = value.split("")
  return value
}
//Esta funcion recibe por argumento un array "[]", valida si es un numero hexadecimal valido y retorna un valor que depende de esta validacion. Estos son los 3 valores que puede retornar:
// 1- "true"; Este valor indica que el numero hexadecimal es valido
// 2- "Ingresa minimo 6 dígitos"; 
// 3- "X, no es parte de los hexadecimales"
const validarHexa = (number) => {
  let validacion = true;
  let posicion = 0;
  let contador = 0;
  if(number.length != 6) {
    validacion = "Ingresa minimo 6 dígitos";
  }else {
    while(validacion === true) {
      if(parseInt(number[posicion]) * 0 === 0) {
        contador += 1;
      }else {
        for(let i = 0; i < hexaPermitidos.length; i++) {
          if(number[posicion] === hexaPermitidos[i]) {
            contador += 1;
            break;
          }else if(i + 1 == hexaPermitidos.length) {
            validacion = `${number[posicion]}, no es parte de los hexadecimales`;
          }
        }
      }
      posicion += 1;
      if(posicion === number.length) {
        break
      }
    };
  }
  return validacion;
}
//Esta funcion esta incompleta. por el momento solo imprime una alerta en base a la validacion
const cambio = ({validacion, valor}) => {
  if(validacion === true) {
    let value = valor.join("")
    alert(`#${value}`)
  }else {
    alert(validacion)
  }
}
//Esta funcion recibe como parametro la validacion, y si es "true" ejecuta una animacion a un elemento
const animar = (validacion) => {
  if(validacion === true) {
    $bloqueColor.classList.add("animar-color");
    setTimeout(() => {
      $bloqueColor.classList.remove("animar-color");
    }, 1100)
  }
}



$botonVentana.addEventListener("mouseup", (event) => {
  $ventana.classList.toggle("recorrer");
  $botonVentana.classList.toggle("equis")
})

$botonCalc.addEventListener("mouseup", (event) => {
  let value = obtenerNumero()
  validar = validarHexa(value);
  cambio({validacion: validar, valor: value});
  animar(validar);
})