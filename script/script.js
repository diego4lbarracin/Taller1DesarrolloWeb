// Obtener referencias a los elementos del formulario y campos de entrada
const formUser = document.getElementById("FormUser");
const txtUsername = document.getElementById("txtUsername");
const txtNombre = document.getElementById("txtNombre");
const urlImagen = document.getElementById("urlImagen");
const txtNombreMascota = document.getElementById("txtNombreMascota");

// Inicializar una lista vacía para almacenar los usuarios
const listaUsuarios = [];

// Constructor para crear un nuevo usuario
function Usuario(username, nombre, urlImagen, nombreMascota) {
  this.username = username; // Asignar el nombre de usuario
  this.nombre = nombre; // Asignar el nombre
  this.urlImagen = urlImagen; // Asignar la URL de la imagen
  this.listaMascotas = []; // Inicializar la lista de mascotas como un array vacío
  this.listaMascotas.push(nombreMascota); // Añadir la primera mascota a la lista
}

// Función para validar el nombre de usuario
const validarUserName = (userName) => {
  // Verificar si el nombre de usuario contiene un punto
  if (userName.indexOf(".") === -1) {
    return false; // Si no contiene un punto, retornar false
  }
  return true; // Si contiene un punto, retornar true
};

// Función para actualizar la tabla de usuarios
const actualizarTabla = () => {
  const tabla = document.getElementById("tablaAmigos"); // Obtener referencia a la tabla
  // Eliminar todas las filas de la tabla excepto la primera (encabezado)
  while (tabla.rows.length > 1) {
    tabla.deleteRow(1);
  }

  // Recorrer la lista de usuarios y añadir una fila por cada usuario
  listaUsuarios.forEach((usuario) => {
    const row = tabla.insertRow(); // Insertar una nueva fila
    row.insertCell().textContent = usuario.username; // Añadir celda con el nombre de usuario
    row.insertCell().textContent = usuario.nombre; // Añadir celda con el nombre
    row.insertCell().textContent = usuario.urlImagen; // Añadir celda con la URL de la imagen

    // Crear una celda con un botón para mostrar las mascotas
    const buttonCell = row.insertCell();
    const button = document.createElement("button");
    button.textContent = "Mostrar Mascotas"; // Texto del botón
    button.onclick = () => {
      const listaMascotasDiv = document.getElementById("ListaMascotas"); // Obtener referencia al div de la lista de mascotas
      const ul = document.createElement("ul"); // Crear una lista desordenada

      listaMascotasDiv.innerHTML = "<h3>Mascotas</h3>"; // Añadir un encabezado

      // Recorrer la lista de mascotas del usuario y añadir cada una como un elemento de la lista
      usuario.listaMascotas.forEach((mascota) => {
        const li = document.createElement("li");
        li.textContent = mascota; // Texto del elemento de la lista
        ul.appendChild(li); // Añadir el elemento a la lista
      });

      listaMascotasDiv.appendChild(ul); // Añadir la lista al div
    };
    buttonCell.appendChild(button); // Añadir el botón a la celda
  });
};

// Función para limpiar los campos de entrada del formulario
const limpiarCamposInput = () => {
  document.getElementById("txtUsername").value = ""; // Limpiar el campo de nombre de usuario
  document.getElementById("txtNombre").value = ""; // Limpiar el campo de nombre
  document.getElementById("urlImagen").value = ""; // Limpiar el campo de URL de la imagen
  document.getElementById("txtNombreMascota").value = ""; // Limpiar el campo de nombre de la mascota
};

// Función para verificar si un usuario ya está registrado
const userRegistrado = (username) => {
  // Verificar si algún usuario en la lista tiene el mismo nombre de usuario
  return listaUsuarios.some((usuario) => usuario.username === username);
};

// Función para verificar si una mascota ya está registrada
const mascotaRegistrada = (nombreMascota) => {
  // Verificar si alguna mascota en la lista de usuarios tiene el mismo nombre
  return listaUsuarios.some((usuario) =>
    usuario.listaMascotas.includes(nombreMascota)
  );
};

// Evento para manejar el envío del formulario
formUser.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  // Verificar si algún campo está vacío
  if (
    txtUsername.value === "" ||
    txtNombre.value === "" ||
    urlImagen.value === "" ||
    txtNombreMascota.value === ""
  ) {
    alert("Todos los campos son obligatorios"); // Mostrar alerta si algún campo está vacío
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  } else if (!validarUserName(txtUsername.value)) {
    alert("El username debe contener un punto."); // Mostrar alerta si el nombre de usuario no es válido
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
  } else {
    // Crear un nuevo usuario con los valores del formulario
    let usuario = new Usuario(
      txtUsername.value,
      txtNombre.value,
      urlImagen.value,
      txtNombreMascota.value
    );
    // Verificar si el usuario no está registrado
    if (!userRegistrado(txtUsername.value)) {
      listaUsuarios.push(usuario); // Añadir el usuario a la lista
      alert("Usuario creado correctamente"); // Mostrar alerta de éxito
    } else if (
      userRegistrado(txtUsername.value) &&
      !mascotaRegistrada(txtNombreMascota.value)
    ) {
      alert(
        "Se añadió la mascota correctamente al usuario " +
          txtUsername.value +
          "."
      ); // Mostrar alerta de éxito al añadir la mascota
      // Añadir la mascota a la lista de mascotas del usuario
      listaUsuarios.forEach((usuario) => {
        if (usuario.username === txtUsername.value) {
          usuario.listaMascotas.push(txtNombreMascota.value);
        }
      });
      e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    } else {
      alert("El usuario no existe o la mascota ya está registrada."); // Mostrar alerta de error
    }

    actualizarTabla(); // Actualizar la tabla de usuarios
    limpiarCamposInput(); // Limpiar los campos de entrada del formulario
  }
});

// Inicializar la tabla de usuarios
actualizarTabla();
