const url = "http://localhost:3000/juegos/";
const d = document;
const $contenedorCards = d.getElementById("contenedorcards");
let resultado = "";
const modalDetalleJuego = new bootstrap.Modal(
  document.getElementById("modaldetallejuego")
);
const $tituloJuegoModal = document.getElementById("modaltitulo");
const $imagenJuegoModal = document.getElementById("modalimagen");
const $descripcionjuegoModal = document.getElementById("descripcionjuego");
const $requisitosJuegoModal = document.getElementById("requisitosjuego");
const $userLogin = document.getElementById("userlogin");

let usuarioLogueado = localStorage.getItem("userLog");
//CODIGO PARA QUE UNA VEZ QUE SE LOGUEE UN USUARIO, EN EL NAVBAR APAREZCA SU NOMBRE DE USUARIO Y PUEDA VER SU PERFIL Y CERRAR SESION
if (localStorage.getItem("userLog")) {
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
                ${usuarioLogueado}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Ver Perfil</a></li>
                <li><a class="dropdown-item" href="#" id="cerrarsesion" onclick="cerrarSesion();">Cerrar Sesión</a></li>
              </ul>`;
}

function cerrarSesion() {
  localStorage.removeItem("userLog");
  location.reload();
}
//FUNCION COPIADA DE INTERNET PARA GENERAR SWIPERS (CARRUSELES) DE MANERA DINAMICA, CREO QUE CONVIENE CAMBIAR Y HACERLO DE MANERA FIJA
// Function that actually builds the swiper
const buildSwiperSlider = (sliderElm) => {
  const sliderIdentifier = sliderElm.dataset.id;
  return new Swiper(`#${sliderElm.id}`, {
    navigation: {
      nextEl: `.swiper-button-next-${sliderIdentifier}`,
      prevEl: `.swiper-button-prev-${sliderIdentifier}`,
    },
    pagination: {
      el: `.swiper-pagination-${sliderIdentifier}`,
      type: "fraction",
      clickable: true,
    },
    breakpoints: {
      620: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      680: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      920: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1240: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
  });
};

// Get all of the swipers on the page
const allSliders = document.querySelectorAll(".swiper");

// Loop over all of the fetched sliders and apply Swiper on each one.
allSliders.forEach((slider) => buildSwiperSlider(slider));

const $swiperWrapper = document.querySelector(".swiper-wrapper");
//const $detalles = document.querySelector(".detalles");
const $imgJuegoDestacado = document.getElementById("imgjuegodestacado");
const $tituloJuegoDestacado = document.getElementById("titulojuegodestacado");
const $descripcionJuegoDestacado = document.getElementById(
  "descripcionjuegodestacado"
);

//FUNCION PARA MOSTRAR LOS JUEGOS, ACA SE CREAN LAS CARDS DE MANERA DINAMICA Y SE AGREGAN AL CARRUSEL, POR AHORA SOLO EL PRIMERO ES DINAMICO, EL SEGUNDO TIENE LAS IMAGENES FIJAS
function mostrar(juegos) {
  juegos.forEach((juego) => {
    if (juego.destacado && juego.publicado) {
      $imgJuegoDestacado.src = juego.imagen;
      $tituloJuegoDestacado.textContent = juego.nombre;
      $descripcionJuegoDestacado.textContent = juego.descripcion;
    }
    if (juego.publicado) {
      const boton = document.createElement("button");
      boton.textContent = "Detalles";
      boton.classList.add("btn");
      boton.classList.add("btn-primary");
      boton.classList.add("d-block");
      const swiperSlide = document.createElement("div");
      swiperSlide.classList.add("swiper-slide");
      const card = document.createElement("div");
      card.classList.add("card");
      const imgSwiperSlide = document.createElement("img");
      imgSwiperSlide.setAttribute("width", "250px");
      imgSwiperSlide.setAttribute("height", "250px");
      imgSwiperSlide.src = juego.imagen;
      card.appendChild(imgSwiperSlide);
      card.appendChild(boton);
      swiperSlide.appendChild(card);
      $swiperWrapper.appendChild(swiperSlide);
      boton.addEventListener("click", (e) => {
        console.log(e);
        $tituloJuegoModal.innerHTML = juego.nombre;
        $imagenJuegoModal.src = juego.imagen;
        $descripcionjuegoModal.innerHTML = juego.descripcion;
        $requisitosJuegoModal.innerHTML = juego.requisitos;
        modalDetalleJuego.show();
      });
    }
  });
}

//CONSUTAL A LA BASE DE DATOS PARA LEER LOS JUEGOS CARGADOS
fetch(url)
  .then((resp) => resp.json())
  .then((data) => mostrar(data))
  .catch((err) => console.log(err));
