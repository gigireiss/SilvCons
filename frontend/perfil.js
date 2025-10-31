document.addEventListener('DOMContentLoaded', () => {
  const API_URL = 'http://localhost:3001';

  // Elementos do Perfil
  const perfilConteudo = document.getElementById('perfilConteudo');
  const notLoggedIn = document.getElementById('notLoggedIn');
  const nomeUsuario = document.getElementById('nomeUsuario');
  const bioUsuario = document.getElementById('bioUsuario');
  const emailUsuario = document.getElementById('emailUsuario');
  const localUsuario = document.getElementById('localUsuario');

  // Botões Principais
  const editarBtn = document.getElementById('editarBtn');
  const deletarBtn = document.getElementById('deletarBtn');

  // Modal de Edição
  const editModal = document.getElementById('editModal');
  const editForm = document.getElementById('editForm');
  const cancelEditBtn = document.getElementById('cancelEditBtn');
  const editNome = document.getElementById('editNome');
  const editBio = document.getElementById('editBio');
  const editLocal = document.getElementById('editLocal');

  // Modal de Exclusão
  const deleteModal = document.getElementById('deleteModal');
  const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

  // Toast
  const toast = document.getElementById('toast');

  let currentUser = null;

  // --- Funções Auxiliares ---

  // Mostra o modal
  function showModal(modal) {
    modal.classList.remove('modal-hidden');
    modal.classList.add('modal-visible');
  }

  // Esconde o modal
  function hideModal(modal) {
    modal.classList.add('modal-hidden');
    modal.classList.remove('modal-visible');
  }

  // Mostra o toast de notificação
  function showToast(message, isError = false) {
    toast.textContent = message;
    toast.classList.remove('bg-green-500', 'bg-red-500');
    toast.classList.add(isError ? 'bg-red-500' : 'bg-green-500');
    toast.classList.remove('modal-hidden');
    toast.classList.add('modal-visible');

    setTimeout(() => {
      toast.classList.add('modal-hidden');
      toast.classList.remove('modal-visible');
    }, 3000);
  }

  // Salva o usuário no localStorage (simulando uma sessão)
  function saveUserSession(user) {
    // Usando a chave 'informacoes' conforme solicitado
    localStorage.setItem('informacoes', JSON.stringify(user));
    currentUser = user;
  }

  // Carrega o usuário do localStorage
  function loadUserSession() {
    // Lendo da chave 'informacoes'
    const user = localStorage.getItem('informacoes');
    if (user) {
      currentUser = JSON.parse(user);
      console.log(currentUser);

      // O objeto 'currentUser' DEVE conter o 'id' para as requisições
      if (currentUser && currentUser.id) {
        return true;
      }
    }
    return false;
  }

  // Limpa a sessão
  function clearUserSession() {
    localStorage.removeItem('informacoes');
    currentUser = null;
    // Esconde o perfil e mostra a mensagem de "não logado"
    perfilConteudo.classList.add('hidden');
    notLoggedIn.classList.remove('hidden');
  }

  // Atualiza a UI com os dados do usuário
  function populateProfileData() {
    if (currentUser) {
      nomeUsuario.textContent = currentUser.name || 'Nome não definido';
      emailUsuario.textContent = currentUser.email || 'Email não definido';
    }
  }

  // --- Lógica Principal ---

  // 1. Abrir Modal de Edição
  editarBtn.addEventListener('click', () => {
    if (!currentUser) return;

    // Preenche o formulário com dados atuais
    editNome.value = currentUser.name || '';

    showModal(editModal);
  });

  // 2. Submeter Edição
  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const updatedData = {
      name: editNome.value
    };

    try {
      const response = await fetch(`${API_URL}/usuario/editar/${currentUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      const result = await response.json();

      if (result.success) {
        // Atualiza o objeto local e o localStorage
        // Importante: O backend NÃO retorna o usuário atualizado,
        // então mesclamos o que enviamos com o usuário local.
        currentUser = { ...currentUser, ...updatedData };
        saveUserSession(currentUser);

        populateProfileData();
        hideModal(editModal);
        showToast('Perfil atualizado com sucesso!');
      } else {
        showToast(result.message || 'Erro ao atualizar.', true);
      }
    } catch (err) {
      console.error('Erro ao editar perfil:', err);
      showToast('Erro de conexão com o servidor.', true);
    }
  });

  // 3. Abrir Modal de Exclusão
  deletarBtn.addEventListener('click', () => {
    showModal(deleteModal);
  });

  // 4. Confirmar Exclusão
  confirmDeleteBtn.addEventListener('click', async () => {
    if (!currentUser) return;

    try {
      const response = await fetch(`${API_URL}/usuario/deletar/${currentUser.id}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      console.log(result);


      if (result.success) {
        // clearUserSession vai limpar o localStorage e atualizar a UI
        clearUserSession();
        showToast('Perfil deletado com sucesso.');
        hideModal(deleteModal);
      } else {
        showToast(result.message || 'Erro ao deletar.', true);
      }
    } catch (err) {
      console.error('Erro ao deletar perfil:', err);
      showToast('Erro de conexão com o servidor.', true);
    }
    window.location.href = './index.html'; // Redireciona para a página inicial
  });

  // 5. Botões de Cancelar
  cancelEditBtn.addEventListener('click', () => hideModal(editModal));
  cancelDeleteBtn.addEventListener('click', () => hideModal(deleteModal));

  // --- Inicialização ---
  // Tenta carregar um usuário da "sessão" ao carregar a página
  if (loadUserSession()) {
    // Se logado, preenche os dados e mostra o perfil
    populateProfileData();
    perfilConteudo.classList.remove('hidden');
    notLoggedIn.classList.add('hidden');
  } else {
    // Se não logado, mostra a mensagem de "não logado"
    perfilConteudo.classList.add('hidden');
    notLoggedIn.classList.remove('hidden');
  }

});