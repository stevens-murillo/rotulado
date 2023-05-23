
import { ingresarUsuarios } from './firebase.js';


// var db = $firestore.db;


//Genera la clave aleatoria
function generateUUID() {
  var d = new Date().getTime();
  // var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

if ($("#btnDetallesRotulo") != null) {
  $("#btnDetallesRotulo").on("click", function () {
    crearRotulo();
  })
}

if ($("#btnPrint") != null) {
  $("#btnPrint").on("click", function () {
    imprimir();
  })
}


if ($("#btnRefresh") != null) {
  $("#btnRefresh").on("click", function () {
    cleanInputForm(true);
  })
}






function crearRotulo() {

  let dataForm = {};
  var formEnvio = $("#formEnvio").val()
  $("#detFormEnvio").html(formEnvio);
  // dataForm.detFormEnvio = formEnvio;

  var formNom = $("#formNom").val();
  $("#nombre").html(formNom);
  // dataForm.nombre = formNom;

  var formCel = $("#formCel").val();
  $("#celular").html(formCel);
  // dataForm.celular = formCel;

  var formDir = $("#formDir").val();
  $("#direccion").html(formDir);
  // dataForm.direccion = formDir;

  var formBar = $("#formBar").val();
  $("#barrio").html(formBar);
  // dataForm.barrio = formBar;

  var formCiu = $("#formCiu").val();
  $("#ciudad").html(formCiu);
  // dataForm.ciudad = formCiu;

  // console.log(dataForm);

  var detallesEnvio = $("#detllesEnvio").html();

  let divNuevo = document.createElement('div');
  divNuevo.classList.add('row');
  divNuevo.innerHTML = detallesEnvio;
  document.getElementById('container').appendChild(divNuevo);

  cleanInputForm(false);
  var UUID = generateUUID();
  // ingresarUsuarios(UUID, formEnvio, formNom, formCel, formDir, formBar, formCiu) ;

}

function imprimir() {
  
  window.onbeforeprint = () => { //Antes de cargar la impresión
   display(true);
  }

  window.onafterprint = () => { //Al cancelar/guardar la impresión
    display(false);
  }

  window.print();
}


function cleanInputForm(value) {
  console.log('Limpiando...');
  $("#formEnvio").val('CONTRA ENTREGA');
  $("#formNom").val('');
  $("#formCel").val('');
  $("#formDir").val('');
  $("#formBar").val('');
  $("#formCiu").val('');
if(value){
  $("#container").html('');
}
}

function display(value) {
  if(value){
    document.getElementById("formData").style.display = "none";
    document.getElementById("btnPrint").style.display = "none";
    document.getElementById("Underline").style.display = "none";
    document.getElementById("tituloRotulo").style.display = "none";
  }else{
    document.getElementById("formData").style.display = "block";
    document.getElementById("btnPrint").style.display = "block";
    document.getElementById("Underline").style.display = "block";
    document.getElementById("tituloRotulo").style.display = "block";
  }
}