const $botonVentana = document.getElementById("ventana-button");
const $ventana = document.getElementById("ventana-inf");
const $botonCalc = document.getElementById("calc-button");
const $numeroHexa = document.getElementById("hexa-number");
const $bloqueColor = document.getElementById("principal-color");
const $colores = {
  colorR: document.getElementById("texto-R"),
  colorG: document.getElementById("texto-G"),
  colorB: document.getElementById("texto-B")
}
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
            validacion = `"${number[posicion]}", no es parte de los hexadecimales`;
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
//Esta funcion calcula el porcentaje de color de RGB y cambia el texto de un elemento con el porcentaje
const porcentajeColor = (valor) => {
  const hexa = []
  valor.forEach(element => {
    if(parseFloat(element) * 0 === 0) {
      hexa.push(parseInt(element))
    }else {
      let value;
      if(element === "A") {
        value = 10;
      }else if(element === "B") {
        value = 11;
      }else if(element === "C") {
        value = 12;
      }else if(element === "D") {
        value = 13;
      }else if(element === "E") {
        value = 14;
      }else if(element === "F") {
        value = 15;
      }
      hexa.push(value)
    }
  });
  const lista = [[hexa[0], hexa[1]], [hexa[2], hexa[3]], [hexa[4], hexa[5]]]

  const porcentaje = [];
  let valorDecimal;
  let valorPorcentaje
  lista.forEach(element => {
    valorDecimal = (element[0] * 16) + element[1];
    valorPorcentaje = (100 * valorDecimal) / 255;
    valorPorcentaje = Math.round(valorPorcentaje);
    porcentaje.push(valorPorcentaje.toString())
  })
  
  $colores.colorR.textContent = porcentaje[0]
  $colores.colorG.textContent = porcentaje[1]
  $colores.colorB.textContent = porcentaje[2]
}
//Esta funcion ejecuta "porcentajeColor()" y cambia el color del bloque principal en base a la validacion y el numero hexadecimal que llega como argumento.
const cambio = ({validacion, valor}) => {
  if(validacion === true) {
    porcentajeColor(valor)
    let value = valor.join("")
    $bloqueColor.style.backgroundColor = "#" + value;
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


//Esta es la ejecucion
$botonVentana.addEventListener("mouseup", (event) => {
  $ventana.classList.toggle("recorrer");
  $botonVentana.classList.toggle("equis")
})

$botonCalc.addEventListener("mouseup", (event) => {
  let value = obtenerNumero()
  let validar = validarHexa(value);
  cambio({validacion: validar, valor: value});
  animar(validar);
})