export const ventanaRecorrer = ({boton, ventana}) => {
  boton.addEventListener("mouseup", (event) => {
    ventana.classList.toggle("recorrer");
    boton.classList.toggle("equis")
  })
}