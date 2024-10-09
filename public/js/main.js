const guardarBtn = document.querySelector('.btn-guardar');
const limparBtn = document.querySelector('.btn-limpar');
const nomeInput = document.querySelector('#nome');
const valorInput = document.querySelector('#valor');
const imagemInput = document.querySelector('#imagem');
const catalogo = document.querySelector('.produtos-container');

async function carregarProdutos() {
    try {
        const resposta = await fetch('../db/produtos.json');
        const produtos = await resposta.json();
        
        produtos.forEach(produto => {
            adicionarProduto(produto.nome, produto.valor, produto.imagem);
        });
    } catch (erro) {
        console.error("Erro ao carregar os produtos:", erro);
    }
}

function adicionarProduto(nome, valor, imagem) {
    const div = document.createElement('div');
    div.classList.add('produto');

    div.innerHTML = `
    <div class="produto">
        <img class='produto-img' src="${imagem}" alt="${nome}">
        <h3>${nome}</h3>
        <div class="produto-descricao">
            <h4>R$ ${valor.toFixed(2)}</h4>
            <i class="fa-solid fa-trash-can"></i>
        </div>
    </div>
    `;

    catalogo.appendChild(div);

    const deleteBtn = div.querySelector('.fa-trash-can');
    deleteBtn.addEventListener('click', () => {
        div.remove(); 
    });
}

guardarBtn.addEventListener('click', () => {
    const nome = nomeInput.value;
    const valor = parseFloat(valorInput.value);
    const imagem = imagemInput.value;

    if (nome && valor && imagem) {
        adicionarProduto(nome, valor, imagem);

        nomeInput.value = '';
        valorInput.value = '';
        imagemInput.value = '';
    } else {
        alert('Preencha todos os campos!');
    }
});

limparBtn.addEventListener('click', () => {
    nomeInput.value = '';
    valorInput.value = '';
    imagemInput.value = '';
});

carregarProdutos();
