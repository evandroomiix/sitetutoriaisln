// Banco de dados de tutoriais
const tutorials = [
  {
    title: "Registro de Inventário (Relatório de Estoque)",
    description: "Passo a passo para gerar o relatório de inventário com filtros corretos: loja, preço, situação do estoque e impressão.",
    link: "https://drive.google.com/file/d/1example/view", // Link para PDF ou vídeo
    categories: ["relatorios", "estoque"]
  },
  {
    title: "Como emitir nota fiscal no ICompany",
    description: "Tutorial completo sobre emissão de NF-e no sistema ICompany.",
    link: "https://drive.google.com/file/d/2example/view",
    categories: ["icompany", "relatorios"]
  },
  {
    title: "Erro 404 - Usuário não encontrado",
    description: "Passo a passo para resolver o erro 404 ao acessar perfis de usuário.",
    link: "https://drive.google.com/file/d/3example/view",
    categories: ["erros", "wcompany"]
  }
  // Adicione mais tutoriais aqui conforme necessário
];

// Função para obter ícone baseado no título/categoria
function getIconClass(title, categories) {
  title = title.toLowerCase();
  const cat = categories;

  if (cat.includes("relatorios") || title.includes("relatório") || title.includes("relatorio")) return "fas fa-chart-line";
  if (cat.includes("erros") || title.includes("erro") || title.includes("problema")) return "fas fa-exclamation-triangle";
  if (cat.includes("wcompany") || title.includes("wcompany")) return "fas fa-building";
  if (cat.includes("icompany") || title.includes("icompany")) return "fas fa-laptop-code";
  if (title.includes("estoque") || title.includes("inventário") || title.includes("inventario")) return "fas fa-boxes";
  if (title.includes("venda") || title.includes("faturamento")) return "fas fa-cash-register";
  if (title.includes("nota") || title.includes("nf")) return "fas fa-file-invoice";
  if (title.includes("cadastro") || title.includes("usuário") || title.includes("usuario")) return "fas fa-user-plus";
  if (title.includes("atendimento")) return "fas fa-headset";
  if (title.includes("financeiro")) return "fas fa-wallet";
  
  return "fas fa-book";
}

// Carregar tutoriais na página
function loadTutorials() {
  const grid = document.getElementById("tutorialGrid");
  grid.innerHTML = "";

  tutorials.forEach(tutorial => {
    const card = document.createElement("div");
    card.className = "tutorial-card";
    card.setAttribute("data-categories", tutorial.categories.join(" "));

    // Tags
    const tagsHTML = tutorial.categories.map(cat => {
      const label = {
        relatorios: "Relatórios",
        erros: "Erros",
        wcompany: "WCompany",
        icompany: "ICompany",
        estoque: "Estoque"
      }[cat] || cat;
      return `<span class="tutorial-tag">${label}</span>`;
    }).join("");

    card.innerHTML = `
      <div class="tutorial-header">
        <h3 class="tutorial-title">${tutorial.title}</h3>
      </div>
      <div class="tutorial-content">
        <p class="tutorial-description">${tutorial.description}</p>
        <div class="tutorial-tags">${tagsHTML}</div>
        <a href="${tutorial.link}" class="tutorial-link" target="_blank">Acessar Tutorial</a>
      </div>
    `;

    grid.appendChild(card);
  });

  // Mostrar todos por padrão
  filterByCategory("all");
}

// Filtrar por categoria
function filterByCategory(category) {
  const cards = document.querySelectorAll(".tutorial-card");
  const buttons = document.querySelectorAll(".category");

  // Atualizar botão ativo
  buttons.forEach(btn => {
    btn.classList.remove("active");
  });
  document.querySelector(`.category[data-filter="${category}"]`)?.classList.add("active");

  // Filtrar cards
  cards.forEach(card => {
    if (category === "all") {
      card.classList.add("visible");
    } else {
      const categories = card.dataset.categories.split(" ");
      if (categories.includes(category)) {
        card.classList.add("visible");
      } else {
        card.classList.remove("visible");
      }
    }
  });
}

// Buscar tutoriais por palavra-chave
function filterTutorials() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
  const cards = document.querySelectorAll(".tutorial-card");

  if (searchTerm === "") {
    // Se não tem busca, mostrar categoria ativa
    const activeCategory = document.querySelector(".category.active")?.dataset.filter || "all";
    filterByCategory(activeCategory);
    return;
  }

  cards.forEach(card => {
    const title = card.querySelector(".tutorial-title").textContent.toLowerCase();
    const description = card.querySelector(".tutorial-description").textContent.toLowerCase();
    const categories = card.dataset.categories.toLowerCase();

    if (title.includes(searchTerm) || 
        description.includes(searchTerm) || 
        categories.includes(searchTerm)) {
      card.classList.add("visible");
    } else {
      card.classList.remove("visible");
    }
  });
}

// Função para lidar com Enter na busca
function handleSearchEnter(event) {
  if (event.key === "Enter") {
    filterTutorials();
  }
}

// Inicializar quando a página carregar
document.addEventListener("DOMContentLoaded", function() {
  loadTutorials();

  // Adicionar eventos de clique às categorias
  document.querySelectorAll(".category").forEach(button => {
    button.addEventListener("click", function() {
      const filter = this.dataset.filter;
      filterByCategory(filter);
    });
  });

  // Adicionar evento de Enter no campo de busca
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keypress", handleSearchEnter);
  }

  // Adicionar evento de clique no botão de busca
  const searchButton = document.querySelector(".search-box button");
  if (searchButton) {
    searchButton.addEventListener("click", filterTutorials);
  }

  // Modo escuro
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function() {
      document.body.classList.toggle("dark-mode");
      const icon = this.querySelector("i");
      if (document.body.classList.contains("dark-mode")) {
        icon.className = "fas fa-sun";
      } else {
        icon.className = "fas fa-moon";
      }
    });
  }
});
