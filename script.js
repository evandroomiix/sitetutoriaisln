// script.js

// Banco de dados de tutoriais (FÁCIL DE EDITAR!)
const tutorials = [
  {
    title: "Lançamento de Nota de Compra",
    description: "Como lançar uma nota fiscal de compra de produtos",
    link: "https://drive.google.com/file/d/1qaMBbhn5aHflo7ALPWyjfUWhe0EmrC2c/view?usp=drive_link",
    categories: ["relatorios", "icompany", "nota", "compra"]
  },
  {
    title: "Emitir nota de compra (DANFE) em PDF",
    description: "Passo a passo para gerar um um DANFE (Documento Auxiliar da Nota Fiscal Eletrônica",
    link: "https://drive.google.com/file/d/1CArsVNh4P4z1gGM4EgxEEiYfgRX3xaWR/view?usp=drive_link",
    categories: ["nota", "icompany", "compra", "danfe"]
  },
  {
    title: "Como emitir nota fiscal no ICompany",
    description: "Tutorial completo sobre emissão de NF-e no sistema ICompany.",
    link: "https://exemplo.com/nf-icompany",
    categories: ["icompany", "relatorios"]
  },
  {
    title: "Erro de conexão com o banco de dados",
    description: "Solução para problemas de conexão entre sistemas e banco de dados.",
    link: "https://exemplo.com/erro-banco",
    categories: ["erros", "wcompany", "icompany"]
  },
  {
    title: "Relatório de Estoque Mensal",
    description: "Como exportar o relatório de estoque completo no WCompany.",
    link: "https://exemplo.com/relatorio-estoque",
    categories: ["relatorios", "wcompany"]
  },
  {
    title: "Atualização de cadastro de fornecedores",
    description: "Como cadastrar e atualizar fornecedores no ICompany.",
    link: "https://exemplo.com/fornecedor",
    categories: ["icompany"]
  },
  {
    title: "Registro de Inventário (Relatório de Estoque)",
    description: "Passo a passo para gerar o relatório de estoque com os filtros corretos no sistema.",
    link: "assets/ROTINA-REGISTRODEINVENTÁRIO.pdf", // opcional: link para baixar
    categories: ["relatorios", "estoque", "icompany"]
  }
];

// Função que escolhe o ícone com base no título ou categoria
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
  if (title.includes("danfe")) return "fas fa-wallet";
  
  // Ícone padrão, se não encontrar nenhuma palavra
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
        icompany: "ICompany"
      }[cat] || cat;
      return `<span class="tutorial-tag">${label}</span>`;
    }).join("");

// Verifica se tem imagem válida
const hasImage = tutorial.image && tutorial.image.trim() !== "";
const iconClass = getIconClass(tutorial.title, tutorial.categories);

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
// Função de busca por palavra-chave
function filterTutorials() {
  const input = document.getElementById("searchInput").value.toLowerCase().trim();
  const cards = document.querySelectorAll(".tutorial-card");

  if (input === "") {
    // Se o campo estiver vazio, mostrar todos os cards da categoria atual
    const activeCategory = document.querySelector(".category.active")?.dataset.filter || "all";
    filterByCategory(activeCategory);
    return;
  }

  cards.forEach(card => {
    const title = card.querySelector(".tutorial-title").textContent.toLowerCase();
    const desc = card.querySelector(".tutorial-description").textContent.toLowerCase();
    const tags = card.dataset.categories.toLowerCase();

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
