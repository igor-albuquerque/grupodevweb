function criaCardComparacao(dados1, dados2) {
    const container = document.getElementById("container");
    container.innerHTML = "";

    function criarCardPiloto(dados) {
        const card = document.createElement("div");
        card.classList.add("card");


        const fotoDiv = document.createElement('div');
        imageDiv.classList.add('card-image');
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
        
        
        const btnLimpar = document.createElement("button");
        btnLimpar.textContent = "Limpar";
        btnLimpar.onclick = () => {
            card.innerHTML = "";
        };
        
        return card;
    }
    
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


async function buscarPiloto(nome) {
    const url = `https://api-formula-1.p.rapidapi.com/drivers?search=${nome}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9bd4480d30msh303ccd63e416d40p156124jsn0edbfc0c9806',
            'x-rapidapi-host': 'api-formula-1.p.rapidapi.com'
        }
    };

    try {
        const resposta = await fetch(url, options);
        if (resposta.status === 404 || resposta.status !== 200) {
            throw new Error("Piloto não encontrado ou erro desconhecido.");
        }

        const dados = await resposta.json();
        const dataNascimento = new Date(dados.response[0]?.birthdate);
        const idade = new Date().getFullYear() - dataNascimento.getFullYear();
        return {
            imageSrc: dados.response[0]?.image,
            nome: dados.response[0]?.name,
            id: dados.response[0]?.id,
            vitorias: dados.response[0]?.podiums || 0,
            corridas: dados.response[0]?.world_championships || 0,
            carreira: dados.response[0]?.career_points || 0,
            idade: idade
        };
    } catch (error) {
        console.error("Erro ao buscar piloto:", error);
        return null;
    }
}

async function compararPilotos() {
    const nomePiloto1 = document.getElementById("piloto_nome1").value.toLowerCase();
    const nomePiloto2 = document.getElementById("piloto_nome2").value.toLowerCase();

    if (!nomePiloto1 || !nomePiloto2) {
        alert("Insira o nome de dois pilotos para comparar.");
        return;
    }

    const spinner = document.getElementById("spinner");
    spinner.style.display = "block";

    spinner.innerHTML = "Carregando..."; 
    const img_carro = document.createElement("img");
    img_carro.src = "assets/F1.png";
    img_carro.id = "F1.png";
    img_carro.style.width = "25px";
    img_carro.style.position = "absolute";
    img_carro.style.animation = "moveCar 2s linear forwards";

    spinner.appendChild(img_carro);

    const dadosPiloto1 = await buscarPiloto(nomePiloto1);
    const dadosPiloto2 = await buscarPiloto(nomePiloto2);

    if (dadosPiloto1 && dadosPiloto2) {
        criaCardComparacao(dadosPiloto1, dadosPiloto2);
    } else {
        alert("Um ou ambos os pilotos não foram encontrados.");
    }

    spinner.style.display = "none";
}

document.getElementById("comparar-pilotos").addEventListener("click", compararPilotos);
document.getElementById("limpar-tudo").addEventListener("click", () => {
    document.getElementById("container").innerHTML = "";
    document.getElementById("piloto_nome1").value = "";
    document.getElementById("piloto_nome2").value = "";
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.code === "NumpadEnter") {
        document.getElementById("comparar-pilotos").click();
    }
});
