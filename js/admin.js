if (!localStorage.getItem("admin")) {
  window.location = "./index.html";
}
const $userLogin = document.getElementById("userlogin");
if (localStorage.getItem("admin")) {
  console.log(localStorage.getItem("userLog"));
  $userLogin.classList.add("dropdown");
  $userLogin.innerHTML = `<a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Administrador
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Ver Perfil</a></li>
                <li><a class="dropdown-item" href="#" id="cerrarsesion" onclick="cerrarSesion();">Cerrar Sesión</a></li>
              </ul>`;
}

function cerrarSesion() {
  localStorage.removeItem("admin");
  location.reload();
}

const url = "http://localhost:3000/juegos/";
const d = document;
const $tabla = d.querySelector("tbody");
const $form = d.querySelector("form");
const $nombre = d.getElementById("nombrejuego");
const $descripcion = d.getElementById("descripcionjuego");
const $requisitos = d.getElementById("requisitosjuego");
const $publicado = d.getElementById("publicado");
const modaljuegos = new bootstrap.Modal(document.getElementById("modaljuegos"));

const $btnAgregar = d.getElementById("btn-agregar");
const $btnGuardar = d.getElementById("btn-guardar");
const $imagenJuego = d.getElementById("imagenjuego");
const $previewImagen = d.getElementById("imgpreview");
const $btnCheckDestacado = d.getElementById("checkdestacado");
const $btnDestacarJuego = d.getElementById("btn-destacar");
let imagenSeleccionada = $imagenJuego[0];
let resultados = "";
let operacion = "";
$previewImagen.src = "";
let imagepath;
let contenidoBotonDestacar;
let deshabBtnDestacar = "disabled";
let flagParaDestacar = null;
let isDestacado = false;
let primerJuego = true;
let iddestacadoviejo = null;
let flag = true;
let iddestacado;

$btnAgregar.addEventListener("click", () => {
  $form.reset();
  modaljuegos.show();

  operacion = "crear";
});

d.addEventListener("click", async (e) => {
  // if (e.target.matches("#btn-destacar") && flagParaDestacar) {
  //   console.log("hola desde destacar");
  //   deshabBtnDestacar = "";
  //   flagParaDestacar = false;
  // } else if (e.target.matches("#btn-destacar") && !flagParaDestacar) {
  //   console.log("chau desde destacar");
  //   deshabBtnDestacar = "disabled";
  //   flagParaDestacar = true;
  // }
  if (e.target.matches("#checkdestacado")) {
    // iddestacadoviejo = iddestacado;
    // let fila = e.target.parentNode.parentNode;
    // iddestacado = fila.firstElementChild.innerHTML;
    // if (flag) {
    //   flag = false;
    //   iddestacadoviejo = iddestacado;
    // }
    // if (iddestacado != iddestacadoviejo) {
    //   if (confirm("los id son distintos")) e.preventDefault();
    // }
    // if (e.target.checked) {
    //   console.log("hola desde destacar");
    //   flagParaDestacar = true;
    // } else if (!e.target.checked) {
    //   console.log("chau desde destacar");
    //   flagParaDestacar = false;
    // }
    // console.log(e.target);
    // console.log(iddestacado);
    let fila = e.target.parentNode.parentNode;
    iddestacado = fila.firstElementChild.innerHTML;
    console.log(e.target.checked);
    if (e.target.checked && flag) {
      console.log("hola desde destacar");
      flagParaDestacar = true;
      flag = false;
    } else if (e.target.checked && !flag) {
      // flagParaDestacar = true;
      // flag = false;
      flagParaDestacar = false;
      if (confirm("los id son distintos")) e.preventDefault();
    } else if (!e.target.checked) {
      flagParaDestacar = false;
      flag = true;
    }
    console.log(flag);

    try {
      let options = {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          destacado: flagParaDestacar,
        }),
      };
      res = await fetch(url + iddestacado, options);
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
    } catch (err) {
      console.log(err);
    }
  }
});

////bloque de destacado que funciona mas o menos
// d.addEventListener("click", async (e) => {
//   if (e.target.matches(".btn-destacar")) {
//     const fila = e.target.parentNode.parentNode;
//     let iddestacado = fila.firstElementChild.innerHTML;
//     try {
//       let options = {
//         method: "PATCH",
//         headers: { "Content-type": "application/json; charset=utf-8" },
//         body: JSON.stringify({
//           destacado: "destacado",
//         }),
//       };
//       res = await fetch(url + iddestacado, options);
//       if (!res.ok) throw { status: res.status, statusText: res.statusText };
//       location.reload();
//     } catch (err) {
//       console.log(err);
//     }
//   }
// });
///fin de bloque de destacado
//d.getElementById("checkdestacado").checked = true;
const mostrar = async () => {
  try {
    let res = await fetch(url),
      juegos = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    console.log("se ejecuta la funcion mostrar");
    $imagenJuego.addEventListener("change", () => {
      let fileSelect = $imagenJuego.files;
      if (fileSelect.length > 0) {
        let fileSelected = fileSelect[0];
        let fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
          let srcData = fileLoadedEvent.target.result;
          $previewImagen.src = srcData;
          imagepath = srcData;
        };
        fileReader.readAsDataURL(fileSelected);
      }
    });
    let iconPubli = "";

    juegos.forEach((juego) => {
      console.log(juego);
      console.log(deshabBtnDestacar);
      // if (primerJuego) {
      //   juego.destacado = "destacado";
      //   primerJuego = false;
      // }
      // if (juego.destacado === "destacado" && !isDestacado) {
      //   deshabBtnDestacar = "";
      //   isDestacado = true;
      // } else deshabBtnDestacar = "disabled";

      // if (isDestacado) {
      // }
      if (juego.publicado) {
        iconPubli = `<input type="checkbox" class="form-check-input" checked disabled/>`;
      } else {
        iconPubli = `<input type="checkbox" class="form-check-input" disabled/>`;
      }
      if (juego.destacado) deshabBtnDestacar = "checked";
      else deshabBtnDestacar = "";
      resultados += `<tr>
                          <td>${juego.id}</td>
                          <td><img src="${juego.imagen}" width="30px" height="30px"/></td>
                          <td>${juego.nombre}</td>
                          <td>${juego.categoria}</td>
                          <td>${juego.descripcion}</td>
                          <td>${iconPubli}</td>
                          <td class="text-center"><button class="btn-editar btn btn-primary btn-sm">Editar</button><button class="btn-borrar btn btn-danger btn-sm">Eliminar</button><input type="checkbox"  id="checkdestacado"/></td>
                      </tr>
                    `;
    });
    $tabla.innerHTML = resultados;
  } catch (err) {
    console.log(err);
  }
};
//Procedimiento Mostrar

//d.addEventListener("DOMContentLoaded", mostrar);
mostrar();
////////////////
let idForm = 0;
d.addEventListener("click", async (e) => {
  //Inicio procedimiento borrar
  if (e.target.matches(".btn-borrar")) {
    const fila = e.target.parentNode.parentNode;
    const id = fila.firstElementChild.innerHTML;
    let isDelete = confirm(`¿Estás seguro de eliminar el id ${id}?`);
    if (isDelete) {
      try {
        let options = {
            method: "DELETE",
            headers: {
              "Content-type": "application/json; charset=utf-8",
            },
          },
          res = await fetch(url + id, options),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  }
  //Fin procedimiento borrar
  //Inicio procedimiento editar
  if (e.target.matches(".btn-editar")) {
    const fila = e.target.parentNode.parentNode;
    idForm = fila.children[0].innerHTML;
    const nombreForm = fila.children[2].innerHTML;
    const categoriaForm = fila.children[3].innerHTML;
    const descripcionForm = fila.children[4].innerHTML;
    const publicadoForm = fila.children[5].firstElementChild.checked;
    $form.nombrejuego.value = nombreForm;
    $form.categoria.checked = true;
    $form.descripcionjuego.value = descripcionForm;
    //$form.requisitosjuego.value =
    $form.publicado.checked = publicadoForm;

    let flagchecked = true;
    $form.categoria.forEach((allinputcat) => {
      flagchecked = false;
      categoriaForm.split(",").forEach((catelegida) => {
        if (catelegida === allinputcat.value) {
          console.log(`pongo en checked ${allinputcat.value}`);
          allinputcat.checked = true;
          flagchecked = true;
        } else if (catelegida !== allinputcat.value && !flagchecked) {
          console.log(`queda en false ${allinputcat.value}`);
          allinputcat.checked = false;
        }
      });
    });
    $form.imagenjuego.value = "";
    console.log($form.imagenjuego);
    operacion = "editar";
    modaljuegos.show();
  }
  //Fin procedimiento editar
});

//Inicio procedimiento cargar/edicion
d.addEventListener("submit", async (e) => {
  e.preventDefault();
  let $categorias = d.querySelectorAll('input[name="categoria"]:checked');
  let salida = [];
  $categorias.forEach((categoria) => {
    salida.push(categoria.value);
  });
  if (operacion === "crear") {
    try {
      let options = {
        method: "POST",
        headers: { "Content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          nombre: $nombre.value,
          descripcion: $descripcion.value,
          publicado: $publicado.checked,
          categoria: salida,
          imagen: imagepath,
          requisitos: $requisitos.value,
          destacado: false,
        }),
      };
      (res = await fetch(url, options)), (juego = await res.json());
      const nuevoJuego = [];
      nuevoJuego.push(juego);
      location.reload();
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
    } catch (err) {
      console.log(err);
    }
  } else if (operacion === "editar") {
    try {
      let options = {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          nombre: $nombre.value,
          descripcion: $descripcion.value,
          publicado: $publicado.checked,
          categoria: salida,
          imagen: imagepath,
          requisitos: $requisitos.value,
          //destacado: destacado,
        }),
      };
      (res = await fetch(url + idForm, options)), (juego = await res.json());
      const nuevoJuego = [];
      nuevoJuego.push(juego);

      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  modaljuegos.hide();
  return salida;
});
