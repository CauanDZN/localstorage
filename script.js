document.addEventListener("DOMContentLoaded", () => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const divCarrinho = document.getElementById("carrinho");
    const contadorDeProdutos = document.getElementById("contador-de-produtos");

    const renderizarCarrinho = () => {
        divCarrinho.innerHTML = "";
        carrinho.forEach(item => {
            const div = document.createElement("div");
            div.innerHTML = `ID: ${item.id}, Produto: ${item.produto}, Preço: ${item.preco}`;
            divCarrinho.appendChild(div);
        });
        contadorDeProdutos.innerText = `Total de produtos: ${carrinho.length}`;
    };

    const atualizarLocalStorage = () => {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    };

    document.getElementById("adicionar-produto").addEventListener("click", () => {
        const produto = document.getElementById("produto").value;
        const preco = document.getElementById("preco").value;
        
        if (produto && preco) {
            const novoItem = {
                id: carrinho.length > 0 ? carrinho[carrinho.length - 1].id + 1 : 1,
                produto,
                preco: parseFloat(preco)
            };

            carrinho.push(novoItem);
            atualizarLocalStorage();
            renderizarCarrinho();
        }
    });

    document.getElementById("remover-produto").addEventListener("click", () => {
        const produtoId = parseInt(document.getElementById("produto-id").value, 10);
        
        if (produtoId) {
            const index = carrinho.findIndex(item => item.id === produtoId);
            if (index !== -1) {
                carrinho.splice(index, 1);
                atualizarLocalStorage();
                renderizarCarrinho();
            }
        }
    });

    document.getElementById("limpar-carrinho").addEventListener("click", () => {
        carrinho.length = 0;
        atualizarLocalStorage();
        renderizarCarrinho();
    });

    renderizarCarrinho();
});
