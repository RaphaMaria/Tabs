// =======================
// CONTROLE DAS ABAS
// =======================
const btns = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");

about.addEventListener("click", function (e) {
  const tab = e.target.closest(".tab-btn");
  if (!tab) return;

  const id = tab.dataset.id;
  if (id) {
    btns.forEach((btn) => btn.classList.remove("active"));
    tab.classList.add("active");

    articles.forEach((article) => article.classList.remove("active"));
    const element = document.getElementById(id);
    if (element) element.classList.add("active");
  }
});

// =======================
// COMPARADOR ANTES/DEPOIS
// =======================
document.querySelectorAll(".comparador").forEach((comparador) => {
  const imgDepois = comparador.querySelector(".imgDepois");
  const slider = comparador.querySelector(".slider");

  let arrastando = false;

  // Desktop
  slider.addEventListener("mousedown", () => arrastando = true);
  window.addEventListener("mouseup", () => arrastando = false);
  window.addEventListener("mousemove", (e) => moverSlider(e));

  // Mobile
  slider.addEventListener("touchstart", () => arrastando = true);
  window.addEventListener("touchend", () => arrastando = false);
  window.addEventListener("touchmove", (e) => {
    if (!arrastando) return;
    let touch = e.touches[0];
    moverSlider(touch);
  });

  function moverSlider(e) {
    if (!arrastando) return;

    let clientX = e.clientX ?? e.pageX;
    let rect = comparador.getBoundingClientRect();
    let pos = clientX - rect.left;

    if (pos < 0) pos = 0;
    if (pos > rect.width) pos = rect.width;

    let percentual = (pos / rect.width) * 100;
    imgDepois.style.clipPath = `inset(0 ${100 - percentual}% 0 0)`;
    slider.style.left = `${percentual}%`;
  }
});
