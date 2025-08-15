// script.js

// Banco de dados de tutoriais (FÁCIL DE EDITAR!)
const tutorials = [
  {
    title: "Relatório de Vendas Diário",
    description: "Como gerar o relatório de vendas diário no sistema WCompany.",
    image: "assets/relatorio-vendas.jpg",
    link: "https://exemplo.com/relatorio-vendas",
    categories: ["relatorios", "wcompany"]
  },
  {
    title: "Erro 404 - Usuário não encontrado",
    description: "Passo a passo para resolver o erro 404 ao acessar perfis de usuário.",
    image: "assets/erro-404.jpg",
    link: "https://exemplo.com/erro-404",
    categories: ["erros", "wcompany"]
  },
  {
    title: "Como emitir nota fiscal no ICompany",
    description: "Tutorial completo sobre emissão de NF-e no sistema ICompany.",
    image: "assets/nf-icompany.jpg",
    link: "https://exemplo.com/nf-icompany",
    categories: ["icompany", "relatorios"]
  },
  {
    title: "Erro de conexão com o banco de dados",
    description: "Solução para problemas de conexão entre sistemas e banco de dados.",
    image: "assets/erro-banco.jpg",
    link: "https://exemplo.com/erro-banco",
    categories: ["erros", "wcompany", "icompany"]
  },
  {
    title: "Relatório de Estoque Mensal",
    description: "Como exportar o relatório de estoque completo no WCompany.",
    image: "assets/estoque.jpg",
    link: "https://exemplo.com/relatorio-estoque",
    categories: ["relatorios", "wcompany"]
  },
  {
    title: "Atualização de cadastro de fornecedores",
    description: "Como cadastrar e atualizar fornecedores no ICompany.",
    image: "assets/fornecedor.jpg",
    link: "https://exemplo.com/fornecedor",
    categories: ["icompany"]
  }
];

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
        icompany: "ICompany"
      }[cat] || cat;
      return `<span class="tutorial-tag">${label}</span>`;
    }).join("");

    card.innerHTML = `
      <img src="${tutorial.image}" alt="${tutorial.title}">
      <div class="tutorial-content">
        <h3 class="tutorial-title">${tutorial.title}</h3>
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

// Filtro por categoria
function filterByCategory(category) {
  const cards = document.querySelectorAll(".tutorial-card");
  const buttons = document.querySelectorAll(".category");

  buttons.forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.filter === category) {
      btn.classList.add("active");
    }
  });

  cards.forEach(card => {
    const cats = card.dataset.categories.split(" ");
    if (category === "all" || cats.includes(category)) {
      card.classList.add("visible");
    } else {
      card.classList.remove("visible");
    }
  });
}

// Busca por texto
function filterTutorials() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".tutorial-card");

  cards.forEach(card => {
    const title = card.querySelector(".tutorial-title").textContent.toLowerCase();
    const desc = card.querySelector(".tutorial-description").textContent.toLowerCase();
    const tags = card.dataset.categories.replace(/relatorios|erros|wcompany|icompany/g, m => {
      return { relatorios: "relatório", erros: "erro", wcompany: "wcompany", icompany: "icompany" }[m];
    }).toLowerCase();

    if (title.includes(input) || desc.includes(input) || tags.includes(input)) {
      card.classList.add("visible");
    } else {
      card.classList.remove("visible");
    }
  });
}

// Modo escuro
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const icon = document.querySelector("#themeToggle i");
  if (document.body.classList.contains("dark-mode")) {
    icon.className = "fas fa-sun";
  } else {
    icon.className = "fas fa-moon";
  }
});

// Eventos de clique nas categorias
document.querySelectorAll(".category").forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    filterByCategory(filter);
  });
});

// Carregar tudo ao iniciar
window.onload = loadTutorials;