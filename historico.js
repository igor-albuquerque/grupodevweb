document.addEventListener("DOMContentLoaded", function() {
    const historico = JSON.parse(localStorage.getItem('historico')) || [];

    exibirHistorico(historico);
});

function exibirHistorico(historico) {
    const container = document.getElementById("container");
    const spinner = document.getElementById("spinner");
    spinner.style.display = "block"; 

    container.innerHTML = "";

    if (historico.length === 0) {
        container.textContent = "Nenhuma comparação encontrada.";
        spinner.style.display = "none"; 
        return;
    }

    historico.forEach(comparacao => {
        criaCardComparacaohistorico(comparacao.dadosPiloto1, comparacao.dadosPiloto2);
    });

    spinner.style.display = "none"; 
}

function criaCardComparacaohistorico(dados1, dados2) {
    const container = document.getElementById("container");

    const cardPiloto1 = criarCardPiloto(dados1);
    const cardPiloto2 = criarCardPiloto(dados2);

    container.appendChild(cardPiloto1);
    container.appendChild(cardPiloto2);

    const vencedor = (dados1.vitorias > dados2.vitorias) ? dados1 : 
                     (dados2.vitorias > dados1.vitorias) ? dados2 : null;

    if (vencedor) {
        const cardVencedor = document.createElement("div");
        cardVencedor.classList.add("card", "vencedor");
        
        const fotoVencedor = document.createElement("img");
        fotoVencedor.src = vencedor.imageSrc;
        cardVencedor.appendChild(fotoVencedor);
        
        const nomeVencedor = document.createElement("p");
        nomeVencedor.textContent = `Vencedor: ${vencedor.nome}`;
        cardVencedor.appendChild(nomeVencedor);

        const fraseVencedor = document.createElement("p");
        fraseVencedor.textContent = `Parabéns! ${vencedor.nome} venceu com ${vencedor.vitorias} vitórias.`;
        cardVencedor.appendChild(fraseVencedor);

        container.appendChild(cardVencedor);
    } else {
        const empate = document.createElement("div");
        empate.classList.add("card", "empate");
        empate.textContent = "Empate! Ambos os pilotos têm o mesmo número de vitórias.";
        container.appendChild(empate);
    }
}

function criarCardPiloto(dados) {
    const card = document.createElement("div");
    card.classList.add("card");

    const foto = document.createElement("img");
    foto.src = dados.imageSrc;
    card.appendChild(foto);

    const nome = document.createElement("p");
    nome.textContent = `${dados.nome}`;
    card.appendChild(nome);
    
    const vitorias = document.createElement("p");
    vitorias.textContent = `Vitórias: ${dados.vitorias}`;
    card.appendChild(vitorias);
    
    const corridas = document.createElement("p");
    corridas.textContent = `Campeonatos: ${dados.corridas}`;
    card.appendChild(corridas);
    
    const carreira = document.createElement("p");
    carreira.textContent = `Pontos de carreira: ${dados.carreira}`;
    card.appendChild(carreira);
    
    const idade = document.createElement("p");
    idade.textContent = `Idade: ${dados.idade}`;
    card.appendChild(idade);

    return card;
}

function limparHistorico() {
    localStorage.removeItem('historico');
    document.getElementById("container").innerHTML = ""; 
    alert("Histórico limpo com sucesso!"); 
}


function filtrarVencedor() {
    const filtroInput = document.getElementById("filtro-input").value.toLowerCase();
    const historico = JSON.parse(localStorage.getItem('historico')) || [];

   const historicoFiltrado = historico.filter(comparacao => {
        const vencedor = comparacao.vencedor;
        return vencedor && vencedor.nome.toLowerCase().includes(filtroInput);
    });

    exibirHistorico(historicoFiltrado); 
}


document.getElementById("filtro-btn").addEventListener("click", filtrarVencedor);


function ordenarPorVitorias() {
    const historico = JSON.parse(localStorage.getItem('historico')) || [];


    historico.sort((a, b) => {
        const vitoriasA = a.vencedor ? a.vencedor.vitorias : 0;
        const vitoriasB = b.vencedor ? b.vencedor.vitorias : 0;
        return vitoriasB - vitoriasA;
    });

    exibirHistorico(historico); 
}


document.getElementById("ordenar-vitorias-btn").addEventListener("click", ordenarPorVitorias);

