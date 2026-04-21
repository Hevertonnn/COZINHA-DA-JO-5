const produtos = [
  { nome: "Polenta", preco: 15, foto: "images/polenta.png" },
  { nome: "Feijoada", preco: 30, foto: "images/feijoada.png" },
  { nome: "Refrigerante", preco: 5, foto: "images/refrigerante.jpg" }
];

let carrinho = [];

function carregarMenu() {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  produtos.forEach((produto, index) => {
    const div = document.createElement("div");
    div.classList.add("item");

    div.innerHTML = `
      <img src="${produto.foto}" width="50">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco}</p>
      <button onclick="adicionar(${index})">Adicionar</button>
    `;

    menu.appendChild(div);
  });
}

function adicionar(index) {
  const item = produtos[index];
  const existente = carrinho.find(p => p.nome === item.nome);

  if (existente) {
    existente.qtd++;
  } else {
    carrinho.push({ ...item, qtd: 1 });
  }

  atualizarCarrinho();
}

function atualizarCarrinho() {
  const cart = document.getElementById("cart-items");
  cart.innerHTML = "";

  let total = 0;

  carrinho.forEach(item => {
    total += item.preco * item.qtd;

    const div = document.createElement("div");

    div.innerHTML = `
      ${item.nome} x${item.qtd} - R$ ${item.preco * item.qtd}
      <button onclick="remover('${item.nome}')">❌</button>
    `;

    cart.appendChild(div);
  });

  document.getElementById("total").innerText = total;
}

function remover(nome) {
  carrinho = carrinho.filter(item => item.nome !== nome);
  atualizarCarrinho();
}

function finalizarPedido() {
  const nome = document.getElementById("nomeCliente").value;
  const endereco = document.getElementById("endereco").value;
  const pagamento = document.getElementById("pagamento").value;

  if (!nome || !endereco || !pagamento) {
    alert("Preencha todos os campos!");
    return;
  }

  let mensagem = "🛒 Pedido:%0A";
  mensagem += `👤 Nome: ${nome}%0A`;
  mensagem += `📍 Endereço: ${endereco}%0A`;
  mensagem += `💳 Pagamento: ${pagamento}%0A%0A`;

  carrinho.forEach(item => {
    mensagem += `${item.nome} x${item.qtd}%0A`;
  });

  const total = document.getElementById("total").innerText;
  mensagem += `%0ATotal: R$ ${total}`;

  const telefone = "27999802794";

  window.open(`https://wa.me/${telefone}?text=${mensagem}`);
}

// 🔥 RODA TUDO QUANDO A PÁGINA CARREGAR
window.onload = function () {
  carregarMenu();

  document.getElementById("pagamento").addEventListener("change", function () {
    const pixArea = document.getElementById("pix-area");

    if (this.value === "Pix") {
      pixArea.style.display = "block";
    } else {
      pixArea.style.display = "none";
    }
  });
};