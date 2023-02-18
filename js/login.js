const url = "http://localhost:3000/usuarios";
const d = document;
const $btnRegistro = d.getElementById("btn-register");
const modalRegistro = new bootstrap.Modal(
  document.getElementById("modalregistro")
);
const $formularioRegistro = d.getElementById("formreg");
const $usuarioNombre = d.getElementById("nombre");
const $usuarioApellido = d.getElementById("apellido");
const $usuarioUsuario = d.getElementById("usuario");
const $usuarioEmail = d.getElementById("emailreg");
const $usuarioPassword = d.getElementById("passwordreg");
const $formulaioLogin = d.getElementById("formlogin");
const $emailLogin = d.getElementById("email");
const $passwordLogin = d.getElementById("password");
let trueUserFlag = false;
let userLog = "";

//BOTON QUE ABRE EL MODAL PARA REGISTRARSE
d.addEventListener("click", (e) => {
  if (e.target.matches("#btn-register")) {
    $formularioRegistro.reset();
    modalRegistro.show();
  }
});

//DENTRO DE ESTE EVENTO SE VA LEYENDO CADA CARACTER A MEDIDA QUE SE INGRESA EN LOS CAMPOS DE USUARIO Y MAIL, SI ENCUENTRA UNA COINCIDENCIA CON ALGUNO QUE YA EXISTA EN LA BASE DE DATOS DA UNA ALERTA Y BORRA LOS CAMPOS PARA INGRESAR OTRO
d.addEventListener("input", (e) => {
  if (e.target.matches("#usuario")) {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach((el) => {
          if (el.usuario === $usuarioUsuario.value) {
            alert("El usuario ya existe");
            $usuarioNombre.value = "";
            return;
          }
        });
      });
  }

  if (e.target.matches("#email")) {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach((el) => {
          if (el.email === $usuarioEmail.value) {
            alert("El email ya existe");
            $usuarioNombre.value = "";
            return;
          }
        });
      });
  }
});

//EN ESTE EVENTO SE VEN 2 COSAS, EN EL PRIMER IF SE CHECKEA QUE SE HAYA APRETADO EL BOTON DE REGISTRAR UN NUEVO USUARIO, EN EL CASO DE QUE SE HAYA HECHO CON EXITO DA EL MENSAJE Y REFRESCA LA PAGINA. EN EL SEGUNDO IF SE VERIFCA QUE SE HAYA APRETADO EL BOTON DE INICIAR SESION, SI COINCIDEN EL USUARIO Y CONTRASEÑA NOS MANDA AL INDEX CON EL NOMBRE DE USUARIO GUARDADO EN EL LOCALSTORAGE PARA PODER MOSTRARLO EN EL NAVBAR DEL INDEX, SI NO COINCIDEN EL MAIL O LA CONTRASEÑA DA EL MENSAJE DE ERROR.
d.addEventListener("submit", async (e) => {
  if (e.target.matches("#formreg")) {
    e.preventDefault();
    try {
      let options = {
        method: "POST",
        headers: { "Content-type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          nombre: $usuarioNombre.value,
          apellido: $usuarioApellido.value,
          usuario: $usuarioUsuario.value,
          email: $usuarioEmail.value,
          password: $usuarioPassword.value,
        }),
      };
      (res = await fetch(url, options)), (usuario = await res.json());
      const nuevoUsuario = [];
      console.log(usuario);
      nuevoUsuario.push(usuario);
      alert("Usuario registrado con éxito!!");
      location.reload();
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
    } catch (err) {
      console.log(err);
    }
  }

  if (e.target.matches("#formlogin")) {
    e.preventDefault();
    console.log(e.target);
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        data.forEach((el) => {
          if (
            $emailLogin.value === el.email &&
            $passwordLogin.value === el.password
          ) {
            trueUserFlag = true;
            userLog = el.usuario;
          } else if (
            $emailLogin.value === "admin@admin.com" &&
            $passwordLogin.value === "admin"
          ) {
            localStorage.setItem("admin", "Administrador");
            window.location = "./admin.html";
          }
        });
        if (trueUserFlag) {
          alert(`Bienvenido ${userLog}`);
          localStorage.setItem("userLog", userLog);
          window.location = `./index.html`;
        } else {
          alert("Usuario o contraseña incorrecto.");
        }
      });
  }
});
