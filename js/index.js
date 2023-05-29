
import { ingresarUsuarios, leerUsuarios, borrarUsuario } from './firebase.js';

//================permisos y variables globales====================

const collection = 'rotulado';  //Base de datos 

//============================================

//================EVENTOS - EVITAR textos, numeros y ancho en form (según corresponda)====================
// $("#formNom").on("keyup", function () {
//   var regex = /[^a-zA-Z\u00f1\u00d1]/g
//   $(this).val($(this).val().replace(regex, ''));
// });

$("#formCel").on("input", function () {
  var nonNumReg = /[^0-9]/g
  $(this).val($(this).val().replace(nonNumReg, ''));
});


//============================================

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


if ($("#btnPrint") != null) {
  $("#btnPrint").on("click", function () {
    imprimir();
  })
}

if ($("#containerHistorico") != null) {
  cargarDatos();
}

$("#tbHistorico").on("click", ".btnBorrar", function () {
  borrarUsuario(collection);
});

$('#tbHistorico tbody').on('click', 'tr', function () {
  var data = $(this).html();
  var segmentData = data.replaceAll('</td>','').split("<td>");
  console.log(segmentData);


  $("#detFormEnvio").html(segmentData[1]);
  $("#nombre").html(segmentData[2]);
  $("#celular").html(segmentData[3]);
  $("#direccion").html(segmentData[4]);
  $("#barrio").html(segmentData[5]);
  $("#ciudad").html(segmentData[6]);
  

  var detallesEnvio = $("#detllesEnvio").html();

  let divNuevo = document.createElement('div');
  divNuevo.classList.add('row');
  divNuevo.innerHTML = detallesEnvio;
  document.getElementById('container').appendChild(divNuevo);
  
});


function crearRotulo() {

  $("#dataForm").validate({
    rules: {
      formNom: {
        required: true
      },
      formCel: {
        required: true,
        minlength: 5
      },
      formDir: {
        required: true
      },
      formBar: {
        required: true
      },
      formCiu: {
        required: true
      }
    },
    messages: {
      formNom: {
        required: "Ingrese nombre",
      },
      formCel: {
        required: "Ingrese celular",
      },
      formDir: {
        required: "Ingrese dirección",
      },
      formBar: {
        required: "Ingrese barrio",
      },
      formCiu: {
        required: "Ingrese ciudad",
      }
    }, submitHandler: function (form) {
      //alert("ok");
      dataformDetalesEnvio();
      cleanInputForm(false);
      return false;
    }
  });
}

function dataformDetalesEnvio() {
  let dataForm = {};
  var formEnvio = $("#formEnvio").val()
  $("#detFormEnvio").html(formEnvio);
  dataForm.detFormEnvio = formEnvio;

  var formNom = $("#formNom").val();
  $("#nombre").html(formNom);
  dataForm.nombre = formNom;

  var formCel = $("#formCel").val();
  $("#celular").html(formCel);
  dataForm.celular = formCel;

  var formDir = $("#formDir").val();
  $("#direccion").html(formDir);
  dataForm.direccion = formDir;

  var formBar = $("#formBar").val();
  $("#barrio").html(formBar);
  dataForm.barrio = formBar;

  var formCiu = $("#formCiu").val();
  $("#ciudad").html(formCiu);
  dataForm.ciudad = formCiu;


  var UUID = generateUUID();
  dataForm.UUID = UUID;
  // console.log(dataForm);

  var detallesEnvio = $("#detllesEnvio").html();

  let divNuevo = document.createElement('div');
  divNuevo.classList.add('row');
  divNuevo.innerHTML = detallesEnvio;
  document.getElementById('container').appendChild(divNuevo);
  ingresarUsuarios(dataForm,collection) ; //data,tabla

}


function imprimir() {

  window.onbeforeprint = () => { //Antes de cargar la impresión
    display(true);
  }

  window.onafterprint = () => { //Al cancelar/guardar la impresión
    display(false);
    window.navigator.vibrate([1000]);
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
  if (value) {
    $("#container").html('');
  }
}

function display(value) {
  if (value) {
    document.getElementById("formData").style.display = "none";
    document.getElementById("btnPrint").style.display = "none";
    document.getElementById("Underline").style.display = "none";
    document.getElementById("tituloRotulo").style.display = "none";
    document.getElementById("containerHistorico").style.display = "none";
  } else {
    document.getElementById("formData").style.display = "block";
    document.getElementById("btnPrint").style.display = "block";
    document.getElementById("Underline").style.display = "block";
    document.getElementById("tituloRotulo").style.display = "block";
    document.getElementById("containerHistorico").style.display = "block";
  }
}

function cargarDatos() {
  document.getElementById('tbodyHistorico').innerHTML = '';
  leerUsuarios(collection);  //Lee los datos de usuarios 

}

