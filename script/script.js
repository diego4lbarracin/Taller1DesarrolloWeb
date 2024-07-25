console.log("Hola Mundo:D");

let persona = {
  nombre: "pedro",
  edad: 20,
  mascota: {
    nombre: "gato",
    edad: 2,
  },
};

function Persona(nombre, edad, mascota) {
  this.nombre = nombre;
  this.edad = edad;
  this.mascota = mascota;
}

let personaNueva = new Persona("Diego", 20, { nombre: "Martin", edad: 3 });
