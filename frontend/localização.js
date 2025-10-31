 const lista = document.getElementById("listaLocalidades");
    const mapa = document.getElementById("mapFrame");

    // 🔹 Busca localidades no backend
    async function buscarLocalidades() {
      try {
        const response = await fetch('http://localhost:3001/localidades/listar');
        if (!response.ok) throw new Error("Erro ao buscar localidades");
        const json = await response.json();

        lista.innerHTML = ""; // limpa

        if (json.data && json.data.length > 0) {
          json.data.forEach(local => {
            const item = document.createElement("div");
            item.classList.add("info-item");
            item.innerHTML = `
              <div class="tag">${local.cidade} - ${local.estado}</div>
              <div class="details">
                <h3>${local.nome_entidade}</h3>
                <p>${local.descricao || "Sem descrição"}</p>
                <small>${local.endereco || ""}</small><br>
                <small>📞 ${local.contato || ""} | ✉️ ${local.email || ""}</small>
              </div>
            `;

            // 🗺️ Ao clicar, muda o mapa para a cidade
            item.addEventListener("click", () => {
              const entidade = encodeURIComponent(local.endereco + ", " + local.cidade);
              mapa.src = `https://www.google.com/maps?q=${entidade}&output=embed`;
            });

            lista.appendChild(item);
          });
        } else {
          lista.innerHTML = "<p>Nenhuma localidade encontrada.</p>";
        }
      } catch (err) {
        console.error(err);
        lista.innerHTML = "<p>Erro ao carregar localidades.</p>";
      }
    }

    // 🔍 Filtro de busca na página
    function filtrarPagina() {
      const input = document.getElementById("searchInput").value.toLowerCase();
      const items = document.querySelectorAll(".info-item");

      items.forEach(item => {
        const texto = item.innerText.toLowerCase();
        item.classList.toggle("hidden", !texto.includes(input));
      });
    }

    // 🧹 Limpa pesquisa
    function limparPesquisa() {
      document.getElementById("searchInput").value = "";
      filtrarPagina();
    }

    // 🚀 Carrega ao abrir
    window.onload = buscarLocalidades;