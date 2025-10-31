const perguntas = [
  {
    pergunta: "O que é considerado tráfico de animais silvestres?",
    opcoes: [
      "Adoção de animais abandonados",
      "Captura e venda de animais da natureza sem autorização",
      "Criação de animais domésticos"
    ],
    correta: 1
  },
  {
    pergunta: "Qual é a principal consequência do tráfico de animais?",
    opcoes: [
      "Aumento da biodiversidade",
      "Extinção de espécies",
      "Melhora na economia"
    ],
    correta: 1
  },
  {
    pergunta: "O que você deve fazer ao ver alguém vendendo animais silvestres?",
    opcoes: [
      "Ignorar",
      "Denunciar ao IBAMA",
      "Comprar para salvar o animal"
    ],
    correta: 1
  },
  {
    pergunta: "Por que o tráfico de animais é perigoso para humanos também?",
    opcoes: [
      "Pode transmitir doenças zoonóticas",
      "Aumenta o turismo",
      "Não afeta em nada"
    ],
    correta: 0
  },
  {
    pergunta: "O que é um animal exótico?",
    opcoes: [
      "Animal que vive em cativeiro",
      "Animal que veio de outro país",
      "Animal que é domesticado"
    ],
    correta: 1
  }
];

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const proximoBtn = document.getElementById("proximo");
const resultadoBox = document.getElementById("resultado-box");
const pontuacaoEl = document.getElementById("pontuacao");
const mensagemFinal = document.getElementById("mensagem-final");
const reiniciarBtn = document.getElementById("reiniciar");

let indiceAtual = 0;
let pontuacao = 0;
let bloqueado = false;

function mostrarPergunta() {
  const atual = perguntas[indiceAtual];
  perguntaEl.textContent = atual.pergunta;
  opcoesEl.innerHTML = "";
  bloqueado = false;

  atual.opcoes.forEach((texto, i) => {
    const botao = document.createElement("button");
    botao.textContent = texto;
    botao.classList.add("opcao");
    botao.addEventListener("click", () => selecionarOpcao(i, botao));
    opcoesEl.appendChild(botao);
  });
}

function selecionarOpcao(i, botaoClicado) {
  if (bloqueado) return;
  bloqueado = true;

  const atual = perguntas[indiceAtual];
  const opcoes = document.querySelectorAll(".opcao");

  opcoes.forEach((btn, index) => {
    if (index === atual.correta) {
      btn.classList.add("correta");
    } else if (index === i) {
      btn.classList.add("errada");
    }
    btn.disabled = true;
  });

  if (i === atual.correta) pontuacao++;
  proximoBtn.classList.remove("oculto");
}

proximoBtn.addEventListener("click", () => {
  indiceAtual++;
  proximoBtn.classList.add("oculto");

  if (indiceAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
});

function mostrarResultado() {
  document.getElementById("quiz-box").classList.add("oculto");
  resultadoBox.classList.remove("oculto");

  pontuacaoEl.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;

  if (pontuacao <= 2) {
    mensagemFinal.textContent = "🐢 Você ainda tem muito a aprender! Cada animal merece viver livre.";
  } else if (pontuacao <= 4) {
    mensagemFinal.textContent = "🦉 Bom trabalho! Continue aprendendo e compartilhando o conhecimento.";
  } else {
    mensagemFinal.textContent = "🦜 Excelente! Você é um verdadeiro defensor da natureza!";
  }
}

reiniciarBtn.addEventListener("click", () => {
  indiceAtual = 0;
  pontuacao = 0;
  resultadoBox.classList.add("oculto");
  document.getElementById("quiz-box").classList.remove("oculto");
  mostrarPergunta();
});

mostrarPergunta();
