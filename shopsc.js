const plants = document.querySelectorAll(".plantspic");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const name = document.querySelector(".name");
const price = document.querySelector(".price");
const nav = document.querySelector(".nav");
const cart = document.querySelector(".cart");
const modalcart = document.querySelector(".modalcart");
const cartMenu = document.querySelector(".cartmenu");
const btnCloseModalCart = document.querySelector(".btn--close-modalcart");
const el1 = document.querySelector(".element1");
const overlaycart = document.querySelector(".overlaycart");
const modalcartForm = document.querySelector(".modalcart__form");
const total = document.querySelector(".total");
const buy = document.querySelector(".buy");
const buyModal = document.querySelector(".buy-modal");
const overlaybuy = document.querySelector(".overlaybuy");
const btnCloseModalBuy = document.querySelector(".btn--close-modalbuy");
const btnOrder = document.querySelector(".order-product");
const orderedModal = document.querySelector(".modalOrdered");
const submit = document.querySelector(".submit");
const btnCloseModalOrdered = document.querySelector(".btn--close-modalOrdered");
const overlayordered = document.querySelector(".overlayordered");
const modalDone = document.querySelector(".modalDone");
const overlaydone = document.querySelector(".overlaydone");

let totalPrice = 0;

let cartOrders = [];

let plantsInfo = {
  peperomia: 20,
  zzplant: 30,
  begonia: 40,
  birdparadise: 25,
  asparagusfern: 15,
  stringofpearls: 20,
  orchid: 50,
  pothos: 60,
  peacelily: 70,
  dracaenamarginata: 100,
  chineseevergreen: 45,
  cacti: 10,
  aloevera: 15,
  areca: 20,
  calatea: 30,
};
let clicked = false;
let mapECoords = "";
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];
    const map = L.map("map").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.once("click", function (mapEvent) {
      clicked = true;
      console.log(mapEvent);
      mapECoords = mapEvent;
      const { lat, lng } = mapEvent.latlng;
      L.marker([lat, lng]).addTo(map).openPopup();
    });
  });
}

btnOrder.addEventListener("click", function () {
  if (clicked) {
    buyModal.classList.add("hidden");
    overlaybuy.classList.add("hidden");
    orderedModal.classList.remove("hidden");
    overlayordered.classList.remove("hidden");
  } else {
    alert("Please Insert a Pin");
  }
});

const custName = document.querySelector(".first-name-in");
const phoneN = document.querySelector(".phone-number-in");

submit.addEventListener("click", function () {
  console.log(custName.value);
  console.log(phoneN.value);
  orderedModal.classList.add("hidden");
  overlayordered.classList.add("hidden");
  modalDone.classList.remove("hidden");
  overlaydone.classList.remove("hidden");
  setTimeout(function () {
    modalDone.classList.add("hidden");
    overlaydone.classList.add("hidden");
  }, 5000);
});

let curPlant = "";
plants.forEach(function (plant) {
  const nameOfAPlant = plant.className
    .slice(plant.className.indexOf(" "))
    .replaceAll("-", "")
    .trim();

  plant.addEventListener("click", function () {
    name.textContent = `Name: ${nameOfAPlant}`;
    console.log(nameOfAPlant);
    price.textContent = `Price:  ${plantsInfo[nameOfAPlant]}₾`;
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    curPlant = nameOfAPlant;
  });
});

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnCloseModal.addEventListener("click", closeModal);

const addToCart = function () {
  cartOrders.push({ name: curPlant, price: plantsInfo[curPlant] });
  console.log(cartOrders);
};
cart.addEventListener("click", addToCart);

let htmlcode = "";
let element = "";

cartMenu.addEventListener("click", function () {
  element = document.querySelectorAll(".orders");
  for (let i = 0; i < element.length; i++) {
    element[i].remove();
  }
  totalPrice = 0;
  cartOrders.forEach(function (cartoder) {
    htmlcode = `<li class="orders" > Name : ${cartoder.name}, Price : ${cartoder.price} </li>`;
    totalPrice += cartoder.price;
    el1.insertAdjacentHTML("beforeend", htmlcode);
  });
  if (totalPrice === 0) {
    total.textContent = `You have nothing in your Cart`;
    buy.classList.add("hidden");
  } else {
    total.textContent = `Your Total Is: ${totalPrice}`;
    buy.classList.remove("hidden");
  }
  modal.classList.add("hidden");
  modalcart.classList.remove("hidden");
  overlaycart.classList.remove("hidden");
});

const closeModalCart = function () {
  modalcart.classList.add("hidden");
  overlaycart.classList.add("hidden");
  element = document.querySelectorAll(".orders");
  for (let i = 0; i < element.length; i++) {
    element[i].remove();
  }
  totalPrice = 0;
};
btnCloseModalCart.addEventListener("click", closeModalCart);

//cart.js

buy.addEventListener("click", function () {
  modalcart.classList.add("hidden");
  overlaycart.classList.add("hidden");
  buyModal.classList.remove("hidden");
  overlaybuy.classList.remove("hidden");
});

const closeModalBuy = function () {
  buyModal.classList.add("hidden");
  overlaybuy.classList.add("hidden");
};

btnCloseModalBuy.addEventListener("click", closeModalBuy);

///////////////////

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

///////////////////////////////////////
// Intersection Observer API

const header = document.querySelector("header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
