const formUser = document.getElementById("FormUser");
const txtUsername = document.getElementById("txtUsername");
const txtNombre = document.getElementById("txtNombre");
const urlImagen = document.getElementById("urlImagen");
const txtNombreMascota = document.getElementById("txtNombreMascota");
const listaUsuarios = [];

function Usuario(username, nombre, urlImagen, nombreMascota) {
  this.username = username;
  this.nombre = nombre;
  this.urlImagen = urlImagen;
  this.listaMascotas = [];
  this.listaMascotas.push(nombreMascota);
}
const validarUserName = (userName) => {
  if (userName.indexOf(".") === -1) {
    return false;
  }
  return true;
};

// Function to update the table with the data from listaUsuarios
const actualizarTabla = () => {
  const tabla = document.getElementById("tablaAmigos");
  while (tabla.rows.length > 1) {
    tabla.deleteRow(1);
  }
  // Create table headers
  // const headerRow = tabla.insertRow();
  // headerRow.insertCell().textContent = "Username";
  // headerRow.insertCell().textContent = "Nombre";
  // headerRow.insertCell().textContent = "Imagen";
  // headerRow.insertCell().textContent = "Nombre Mascota";

  // Populate the table with data from listaUsuarios
  listaUsuarios.forEach((usuario) => {
    const row = tabla.insertRow();
    row.insertCell().textContent = usuario.username;
    row.insertCell().textContent = usuario.nombre;
    // const imgCell = row.insertCell();
    // const img = document.createElement("img");
    row.insertCell().textContent = usuario.urlImagen;
    // img.src = usuario.urlImagen;
    // img.alt = usuario.nombre;
    // img.width = 50; // Set a width for the image
    // imgCell.appendChild(img);
    // row.insertCell().textContent = usuario.nombreMascota;
    const buttonCell = row.insertCell();
    const button = document.createElement("button");
    button.textContent = "Mostrar Mascotas"; // Set the button text
    button.onclick = () => {
      const listaMascotasDiv = document.getElementById("ListaMascotas");
      const ul = document.createElement("ul");

      // Clear any existing list
      listaMascotasDiv.innerHTML = "<h3>Mascotas</h3>";

      // Populate the unordered list with pets
      usuario.listaMascotas.forEach((mascota) => {
        const li = document.createElement("li");
        li.textContent = mascota;
        ul.appendChild(li);
      });

      listaMascotasDiv.appendChild(ul);
    };
    buttonCell.appendChild(button);
  });
};

const limpiarCamposInput = () => {
  document.getElementById("txtUsername").value = "";
  document.getElementById("txtNombre").value = "";
  document.getElementById("urlImagen").value = "";
  document.getElementById("txtNombreMascota").value = "";
};

const userRegistrado = (username) => {
  return listaUsuarios.some((usuario) => usuario.username === username);
};

const mascotaRegistrada = (nombreMascota) => {
  return listaUsuarios.some((usuario) =>
    usuario.listaMascotas.includes(nombreMascota)
  );
};
formUser.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    txtUsername.value === "" ||
    txtNombre.value === "" ||
    urlImagen.value === "" ||
    txtNombreMascota.value === ""
  ) {
    alert("Todos los campos son obligatorios");
    e.preventDefault();
  } else if (!validarUserName(txtUsername.value)) {
    alert("El username debe contener un punto.");
    e.preventDefault();
  } else {
    let usuario = new Usuario(
      txtUsername.value,
      txtNombre.value,
      urlImagen.value,
      txtNombreMascota.value
    );
    if (!userRegistrado(txtUsername.value)) {
      listaUsuarios.push(usuario);
      alert("Usuario creado correctamente");
    } else if (
      userRegistrado(txtUsername.value) &&
      !mascotaRegistrada(txtNombreMascota.value)
    ) {
      alert(
        "Se añadió la mascota correctamente al usuario " +
          txtUsername.value +
          "."
      );
      listaUsuarios.forEach((usuario) => {
        if (usuario.username === txtUsername.value) {
          usuario.listaMascotas.push(txtNombreMascota.value);
        }
      });
      e.preventDefault();
    } else {
      alert("El usuario no existe o la mascota ya está registrada.");
    }

    actualizarTabla();
    limpiarCamposInput();
  }
});

actualizarTabla();
