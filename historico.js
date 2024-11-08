document.getElementById("filtro-btn").addEventListener("click", function () {
    const filtroTexto = document.getElementById("filtro-input").value.toLowerCase();
    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    
    const resultados = historico.filter(comparacao => {
        return comparacao.dadosPiloto1.nome.toLowerCase().includes(filtroTexto) ||
               comparacao.dadosPiloto2.nome.toLowerCase().includes(filtroTexto) ||
               (comparacao.vencedor ? comparacao.vencedor.nome.toLowerCase().includes(filtroTexto) : false);
    });
    
    exibirHistorico(resultados);
});






function exibirHistorico(resultados) {
    const container = document.getElementById("container");
    container.innerHTML = ""; 
    if (resultados.length === 0) {
        container.textContent = "Nenhuma comparação encontrada.";
        return;
    }
    
    
    resultados.forEach(comparacao => {
        criaCardComparacao(comparacao.dadosPiloto1, comparacao.dadosPiloto2);
    });
}

