const tatubola = document.getElementById("tatubola");

tatubola.addEventListener("mouseenter", () => {
 tatubola.src = "./frontend/img/tatu-bola-real.png";
 tatubola.classList.add("imagemtatu");
});

tatubola.addEventListener("mouseleave", () => {
  tatubola.src = "./frontend/img/tatubola.png";
});

const tamanduaBandeira = document.getElementById("tamanduaBandeira");

tamanduaBandeira.addEventListener("mouseenter", () => {
 tamanduaBandeira.src = "./frontend/img/Tamanduá-bandeira-verdadeiro.png";
});

tamanduaBandeira.addEventListener("mouseleave", () => {
  tamanduaBandeira.src = "./frontend/img/Tamanduá-bandeira.png";
});

const macacoPrego = document.getElementById("macacoPrego");

macacoPrego.addEventListener("mouseenter", () => {
 macacoPrego.src = "./frontend/img/macaco-prego-real.png";
});

macacoPrego.addEventListener("mouseleave", () => {
  macacoPrego.src = "./frontend/img/macaco-prego.png";
});

const onçaPintada = document.getElementById("onçaPintada");

onçaPintada.addEventListener("mouseenter", () => {
 onçaPintada.src = "./frontend/img/onça-pintada-real.png";
});

onçaPintada.addEventListener("mouseleave", () => {
  onçaPintada.src = "./frontend/img/onça pintada.png";
});