const texto = document.querySelector("#texto");
const entrada = document.querySelector("#entrada");
const resultado = document.querySelector("#resultado");
const reiniciar = document.querySelector("#reiniciar");
const historico = document.querySelector("#historico");
const alternarTemaBtn = document.querySelector("#alternarTema");

const textos = [
  "Exemplo de texto para digitar.",
  "Outro exemplo de texto para digitar.",
  "Mais um exemplo de texto para digitar.",
  "Você pode digitar aqui.",
  "Digite essa frase.",
];

function novoTexto() {
  const index = Math.floor(Math.random() * textos.length);
  texto.textContent = textos[index];
}

function atualizarTeste() {
  iniciar();
  if (entrada.value === texto.textContent) {
    verificar();
  }
}

function iniciar() {
  const statusDoTeste = JSON.parse(localStorage.getItem("testeEmAndamento"));

  if (!statusDoTeste) {
    localStorage.setItem("tempoInicial", new Date().getTime());
    localStorage.setItem("testeEmAndamento", true);
  }
}

function verificar() {
  const tempoInicial = parseInt(localStorage.getItem("tempoInicial"));
  const tempoFinal = new Date().getTime();
  const tempoGasto = (tempoFinal - tempoInicial) / 1000;

  resultado.textContent = `Parabéns! Você levou ${tempoGasto} segundos.`;
  adicionarAoHistorico(texto.textContent, tempoGasto);
  localStorage.setItem("testeEmAndamento", false);
  entrada.value = "";
  novoTexto();
}

function adicionarAoHistorico(textoDigitado, tempoGasto) {
  const itemHistorico = document.createElement("p");
  itemHistorico.textContent = `Texto: "${textoDigitado}" - Tempo: "${tempoGasto}" segundos.`;
  historico.appendChild(itemHistorico);
}

function reiniciarTeste() {
  novoTexto();
  entrada.value = "";
  resultado.textContent = "";
  historico.innerHTML = "";
  localStorage.setItem("testeEmAndamento", false);
}

function alternarTema() {
  const body = document.body;
  body.classList.toggle("claro");
  body.classList.toggle("escuro");
}

novoTexto();

entrada.addEventListener("keyup", atualizarTeste);
reiniciar.addEventListener("click", reiniciarTeste);
alternarTemaBtn.addEventListener("click", alternarTema);
