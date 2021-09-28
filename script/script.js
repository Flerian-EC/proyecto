import { ventanaRecorrer } from "./funciones.js";

const $botonVentana = document.getElementById("ventana-button");
const $ventana = document.getElementById("ventana-inf");

ventanaRecorrer({boton: $botonVentana, ventana: $ventana});