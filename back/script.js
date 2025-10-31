// Abre o modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Fecha o modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Fecha o modal ao clicar fora dele
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

async function cadastrar(event) {
  event.preventDefault();

  const name     = document.getElementById('name').value;
  const email    = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const data = {name,email,password}

  const response = await fetch('http://localhost:3001/usuario/cadastrar', {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data)
  })

  const results = await response.json();
  console.log(results)
  if(results.success) {
    alert(results.message)
    window.location.href = "../frontend/principal.html"
  } else {
    alert(alert.message)
  }
}


async function logar(event) {
    event.preventDefault();
  
    const email = document.getElementById('email_login').value;
    const password = document.getElementById('password_login').value;
  
    const data = { email, password }
  
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(data)
    })
  
    let results = await response.json();
  
    if(results.success) {
      let userData = results.data;
  
      localStorage.setItem('informacoes', JSON.stringify(userData))
  
      window.location.href = "./index.html"
  
      let html = document.getElementById('informacoes')
      let dados = JSON.parse(localStorage.getItem('informacoes'))
  
  
      alert(results.message)
      window.location.href = "./principal.html"
  
    } else {
      alert(results.message)
    }
  }

const senhaInput = document.getElementById('password_login');
const toggleBtn = document.getElementById('toggleSenha');

toggleBtn.addEventListener('click', () => {
  if (senhaInput.type === 'password') {
    senhaInput.type = 'text';
    toggleBtn.textContent = '🙈'; // muda ícone
  } else {
    senhaInput.type = 'password';
    toggleBtn.textContent = '👁'; // volta ícone
  }
});

