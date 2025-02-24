const timeConversao = require ("./tratarTime");

async function dadosOee(json, timefim) {
    /* JSON RECEBIDO */
    var data = json // DADOS JSON
    //console.log(data);
    data[0].dtfim = timeConversao.convertDatetimeOnTimesTampMysql(timefim);
    /* ARRAY PARADA */
    var timeTotalParada = []
    /* DISPONIBILIDADE  */
    var somaTotalTempoParada
    var subTempoProduzido
    var tempoProduzido
    var tranformaTempoParada
    var tempoProgramado
    /* PRODUTIVIDADE */
    var producaoReal
    var producaoTeorica
    /* QUALIDADE  */
    var totalPecasRuim = []
    var totalPecasArray
    var totalPecasBoas
    var totalPecasProduzidas
    /* OEE  */
    var disponibilidade 
    var produtividade 
    var qualidade 
    var oee 

    for (var i in data[0].Paradas) {
        let timeParada = timeConversao.calculoHorasParada(data[0].Paradas[i].tempoFimProducao)
        timeTotalParada.push(timeParada);
    }

    console.log(timeTotalParada);
    
    somaTotalTempoParada = timeTotalParada.reduce(
        (accumulator, currentValue) => timeConversao.somarTempoTimestamp(accumulator, currentValue),
        -2209064012000
    );
    console.log(`tempo parada ${somaTotalTempoParada}`);
    tempoProgramado =  timeConversao.transformaTimesatampToHours(
                    timeConversao.calculoMilisegundos(data[0].dtinicio, data[0].dtfim)
                );
    
    console.log(`tempo programado ${tempoProgramado}`);
    tranformaTempoParada = timeConversao.transformaTimesatampToHours(
        timeConversao.calculoHorasParada(
            timeConversao.Datetime(somaTotalTempoParada)
        )
    )
    console.log(`tempo parada ${tranformaTempoParada}`);
    tempoProduzido = tempoProgramado - tranformaTempoParada
    console.log(`tempo produzido ${tempoProduzido}`)
    disponibilidade = (tempoProduzido / tempoProgramado) * 100;
    console.log(`disponibilidade ${disponibilidade}`);
    
    producaoReal = data[0].Pecas.length
    producaoTeorica = data[0].Produto.t_padrao *  tempoProgramado  //data[0].qtdedigitada

    console.log(`producação real ${producaoReal}, produção teorica ${producaoTeorica}`)
    produtividade = (producaoReal / producaoTeorica) * 100
    console.log(`produtividade ${produtividade}`)
    
    for (let i in data[0].Refugos) {
        totalPecasRuim.push(data[0].Refugos[i].quantidade)
    }
    
    
    totalPecasArray = totalPecasRuim.reduce(
        (accumulator, currentValue) => (accumulator + currentValue), 0);

    qualidade = ((data[0].Pecas.length - totalPecasArray) / data[0].Pecas.length) * 100
    console.log(`Qualidade ${qualidade}`)

    oee = ((disponibilidade * produtividade * qualidade) / 10000)
    console.log(`OEE ${oee}`)

    return {
        Oee1: oee,
        Disponibilidade1: disponibilidade,
        Produtividade1: produtividade,
        Qualidade1 : qualidade,
        idMaquina1: data[0].idmaquina
    }
}

module.exports = {
    dadosOee
}