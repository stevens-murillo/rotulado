import { notificacion } from './notificacion.js';

//================firebase====================
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
import { getDatabase, set, ref, push, child, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js';


// Add Firebase products that you want to use
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";
//============================================

//================imports====================
// default modules
// import { alert, notice, info, success, error, defaultModules } from 'https://github.com/notifyjs/notifyjs';


//============================================

//================permisos y variables globales====================
///https://www.youtube.com/watch?v=BOITPwChVP4 CRUD DATATABLE FIREBASE
const fnow = nowFecha();
var idUser = '';

//creamos constantes para los iconos editar y borrar    
const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';

//============================================






const app = initializeApp({
  apiKey: "AIzaSyAhL1tYlZTFV_3iW2IBA0-52036HuWVOpc",
  authDomain: "wr-rotulado.firebaseapp.com",
  projectId: "wr-rotulado",
  storageBucket: "wr-rotulado.appspot.com",
  messagingSenderId: "719236286506",
  appId: "1:719236286506:web:2423a38cc317b0dc09db53"
});

const db = getDatabase(app);

db ? (console.log('configuracion firebase completa..')) : (console.log('Error firebase'));




//Fecha
export function nowFecha() {
  var f = new Date();
  var dia = new Array(7);
  dia[0] = "Domingo";
  dia[1] = "Lunes";
  dia[2] = "Martes";
  dia[3] = "Miercoles";
  dia[4] = "Jueves";
  dia[5] = "Viernes";
  dia[6] = "Sabado";
  var hours = f.getHours();
  var min = f.getMinutes();
  var fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
  var ampm = hours > 12 ? "pm" : "am";

  if (String(min).length == 1) {
    var minutes = '0' + String(min);

  } else {
    var minutes = min;
  }

  // console.log('minutos:' +minutes);
  var hora = dia[f.getDay()] + ' a las ' + f.getHours() + ':' + minutes + ' ' + ampm;

  var array = [fecha, hora];
  return array;

}


//Ingresa registros a DB 
export function ingresarUsuarios(dataForm, tabla) {
  // var newKey = push(child(ref(db),tabla+'/')).key;
  var newKey = dataForm.UUID;

  set(ref(db, tabla + '/' + newKey), {
    datos: dataForm,
    fecha_creacion: fnow[0],
    hora: fnow[1],
  })
    .then(() => {
      // Data saved successfully!
      // alert('Registro exitoso');
      notificacion('Registro exitoso')
    })
    .catch((error) => {
      // The write failed...
      // alert('Error...');
      notificacion('Error al crear un nuevo usuario');
    });
}



//Leer registros de la DB 
export function leerUsuarios(tabla) {


  if ($("#tbHistorico") != null) {


    var dataSet = [];//array para guardar los valores de los campos inputs del form
    var tableResponse = $('#tbHistorico').DataTable({
      pageLength: 5,
      lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
      // data: dataSet,
      retrieve: true,
      language: {

        url: 'https://cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json',
      },
      columns: [
        { data: 'id' },
        { data: 'detFormEnvio' },
        { data: 'nombre' },
        { data: 'celular' },
        { data: 'direccion' },
        { data: 'barrio' },
        { data: 'ciudad' },
        {
          data: 'id',
          "bSortable": false,
          "mRender": function (data, type, value) {
            return "<div class='wrapper text-center' id=" + data + "><div class='btn-group'><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>" + iconoBorrar + "</button></div></div>";
            // return "<div class='wrapper text-center' id=" + data + "><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>" + iconoEditar + "</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>" + iconoBorrar + "</button></div></div>";
          }
        },

      ],
      columnDefs: [
        {
          targets: [0],
          visible: false, //ocultamos la columna de ID que es la [0]                        
        },


      ]
    });

  }



  const data = ref(db, tabla + '/');


  const taskvalue = onValue(data, (snapshot) => {

    var data = [];
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();
      //console.log(childData);
      data.push({
        
        "id": childData.datos.UUID,
        "detFormEnvio": childData.datos.detFormEnvio,
        "nombre": childData.datos.nombre,
        "celular": childData.datos.celular,
        "direccion": childData.datos.direccion,
        "barrio": childData.datos.barrio,
        "ciudad": childData.datos.ciudad,
      });
    });
    tableResponse.clear();
    tableResponse.rows.add(data);
    tableResponse.draw();
  });

  $('#tbHistorico tbody').on('click', 'tr', function () {
    var data = tableResponse.row(this).data();
    idUser = data.id;
    // console.log(data.id);
    //alert( 'You clicked on '+data[0]+'\'s row' );


  });
}

//Eliminar registros a DB 
export function borrarUsuario(tabla) {
  //  console.log('btnBorrar: '+idUser);
  Swal.fire({
    title: '¿Está seguro de eliminar el producto?',
    text: "¡Está operación no se puede revertir!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Borrar'
  }).then((result) => {
    if (result.value) {
      var eliminado = remove(ref(db, tabla + '/' + idUser))
        .then(() => {
          Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success')
        })
        .catch((error) => {
          alert(error)
        })
        ;

    }
  })

}

