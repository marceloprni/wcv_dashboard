
import  { padraoTable }  from '../../datatableJson/dataTableJs.js';
import { Inserir0Date } from '../timeTratado/timer.js';

const DatatbleJson = JSON.stringify(padraoTable);

var table;
var table1; 
var desejado = document.getElementById('tFootDesejado');
var real = document.getElementById('tFootReal');
var erro = document.getElementById('tFootErro');
var erroPermitido = document.getElementById('tFootPermitido');
var tempo = document.getElementById('tFootTempo');

let ordemProducao = document.getElementById('ordemProducao');
let receitaProduto = document.getElementById('receita')
let usuarioCriacao = document.getElementById('usuarioCriacao');
let usuarioExecucao = document.getElementById('usuarioExecucao');
let dataCriacao = document.getElementById('dataCriacao');
let linha = document.getElementById('linhaNome'); 
let lote = document.getElementById('lote');
let QuantidadePrevista;

/* VARIAVEIS PARA FUNÇÃO CRIAR TABELA */ 
var tableGeraisProducao = [];
var tableGeraisReceita = []; 
var gruposPorBatch = {};

var somarTudo = (valor, valueeArray ) => {
    const total = valor.reduce((acumulador, valorAtual) => acumulador + valorAtual[valueeArray], 0);
    return total
}

var dataHora = (valor) => {
    // Criar um objeto Date a partir da string
    const date = new Date(valor);

    // Exibindo a data
    let ano = date.getUTCFullYear(); // Ano: 2024
    let mes = date.getUTCMonth() + 1; // Mês: 9 (Meses começam do zero)
    let dia = date.getUTCDate(); // Dia: 30
    let hora =  date.getUTCHours(); // Hora em UTC: 14
    let minutos = date.getUTCMinutes(); // Minutos em UTC: 3
    let segundo = date.getUTCSeconds(); // Segundos em UTC: 38
    let dataTotal = `${Inserir0Date(hora)}:${Inserir0Date(minutos)}:${Inserir0Date(segundo)} ${Inserir0Date(dia)}/${Inserir0Date(mes)}/${Inserir0Date(ano)}`
    console.log(dataTotal)
    return dataTotal
}

var dataHoraPdfCsv = (valor) => {
    // Criar um objeto Date a partir da string
    const date = new Date(valor);

    // Exibindo a data
    let ano = date.getFullYear(); // Ano: 2024
    let mes = date.getMonth() + 1; // Mês: 9 (Meses começam do zero)
    let dia = date.getDate(); // Dia: 30
    let hora =  date.getHours(); // Hora em UTC: 14
    let minutos = date.getMinutes(); // Minutos em UTC: 3
    let segundo = date.getSeconds(); // Segundos em UTC: 38
    let dataTotal = `${Inserir0Date(hora)}${Inserir0Date(minutos)}${Inserir0Date(segundo)}-${Inserir0Date(dia)}${Inserir0Date(mes)}${Inserir0Date(ano)}`
    return dataTotal
}

function criarTabela(value1) {
    axios.get(`/relatorio/${value1}`).then(response => {
        console.log(response.data)
        let usuarioDados = response.data.dadosUsuarios[0];   
        // Limpa o container antes de criar novas tabelas
        $('#container-tabelas-relatorio').empty();
        tableGeraisProducao = [];
        tableGeraisReceita = []; 
        gruposPorBatch = {};    
        
        
        for (let a of response.data.producaoGerais) {
            if (!gruposPorBatch[a.Batch]) gruposPorBatch[a.Batch] = [];
            gruposPorBatch[a.Batch].push(a);
        }
        
        console.log(gruposPorBatch)

        for(let a of response.data.producaoGerais) {
            tableGeraisProducao.push([a.Batch, a.Insumo, a.Local, a.Desejado, a.Real, a.Erro_Kg, a.Erro_Permitido, a.Tempo_de_Dosagem]);
        }

        let valorParametros = response.data.parametroGerais.slice(0, tableGeraisProducao.length);
        for(let a of valorParametros) {
            tableGeraisReceita.push([a.Descricao, a.Valor]);
        }

        // Atualiza informações do usuário
        ordemProducao.textContent = usuarioDados.Codigo;
        receitaProduto.textContent = response.data.producaoGerais[0].Receita ?? '';
        usuarioCriacao.textContent = usuarioDados.UserA;
        usuarioExecucao.textContent = usuarioDados.UserC;
        dataCriacao.textContent = dataHora(usuarioDados.DataCriacao);
        linha.textContent = usuarioDados.Nome_Linha;
        lote.textContent = usuarioDados.Lote;
        QuantidadePrevista = usuarioDados.QuantidadePrevista

        // Para cada batch, cria as tabelas
        Object.keys(gruposPorBatch).forEach(batch => {
            let dadosBatch = gruposPorBatch[batch];
            let datadosagem1;
            // Calcula os totais
            let totalDesejado = 0, totalReal = 0, totalErro = 0, totalPermitido = 0, totalTempo = 0;
            let dataTableArray = [];
            for (let a of dadosBatch) {
                dataTableArray.push([
                    a.Batch, a.Insumo, a.Local, a.Desejado, a.Real, a.Erro_Kg, a.Erro_Permitido, a.Tempo_de_Dosagem
                ]);
                totalDesejado += parseFloat(a.Desejado) || 0;
                totalReal += parseFloat(a.Real) || 0;
                totalErro += parseFloat(a.Erro_Kg) || 0;
                totalPermitido += parseFloat(a.Erro_Permitido) || 0;
                totalTempo += parseFloat(a.Tempo_de_Dosagem) || 0;
                datadosagem1 = a.Data_Dosagem;
            }

            // Gera IDs únicos por classe
            const tabelaRelatorioClass = 'classe-relatorio';
            const tabelaParametrosClass = 'classe-parametro';

            // Cria o HTML da tabela com classes específicas
            let tabelaHtml = `
                <div class="table-responsive" id="batchId${batch}">
                    <div class="table_principal1">
                        <h2 class="table">Batch ${batch} - Data ${dataHora(datadosagem1)}</h2>
                        <table class="table text-black ${tabelaRelatorioClass}"  id="tabela-relatorio">
                            <thead>
                                <tr>
                                    <th>Batch</th>
                                    <th>Insumo</th>
                                    <th>Local</th>
                                    <th>Desejado Kg</th>
                                    <th>Real Kg</th>
                                    <th>Erro Kg</th>
                                    <th>Erro Permitido %</th>
                                    <th>Tempo (s)</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${dataTableArray.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Total</th>
                                    <th></th>
                                    <th></th>
                                    <th>${totalDesejado.toFixed(2)}</th>
                                    <th>${totalReal.toFixed(2)}</th>
                                    <th>${totalErro.toFixed(2)}</th>
                                    <th>${totalPermitido.toFixed(2)}</th>
                                    <th>${totalTempo.toFixed(2)}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div class="table_principal2">
                        <h2 class="table">Parâmetros</h2>
                        <table class="table text-black ${tabelaParametrosClass}"  id="tabela-parametros">
                            <thead>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Tempo (s)</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tableGeraisReceita.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            // Insere as tabelas no container
            $('#container-tabelas-relatorio').append(tabelaHtml);

            // Aplica estilos às tabelas de consumo
            $(`.${tabelaRelatorioClass}`).each(function() {
                $(this).find('tbody tr').each(function(index, row) {
                    // Cor de fundo alternada
                    if (index % 2 === 0) {
                        $(row).css('background-color', '#D9D9D9');
                    } else {
                        $(row).css('background-color', '#F2F2F2');
                    }
                    // Destaca "Erro Kg" se diferente de zero
                    const erroKgCell = $('td:eq(5)', row);
                    if (parseFloat(erroKgCell.text()) !== 0) {
                        erroKgCell.css('color', 'red');
                    } else {
                        erroKgCell.css('color', '');
                    }
                });
            });

            // Aplica estilos às tabelas de parâmetros
            $(`.${tabelaParametrosClass}`).each(function() {
                $(this).find('tbody tr').each(function(index, row) {
                    if (index % 2 === 0) {
                        $(row).css('background-color', '#D9D9D9');
                    } else {
                        $(row).css('background-color', '#F2F2F2');
                    }
                });
            });
        });
    }).catch(error => {
        console.log(error);
    });
}


async function gerarPdf() {
    const { jsPDF } = window.jspdf; // Acessando jsPDF do objeto global
    const doc = new jsPDF("p", "mm", "a4");
    
    // URLs ou Base64 das imagens
    const imagem1 = "image/logopdf/logo_wcv.png"; // Substitua pelo caminho da imagem
    const imagem2 = "image/logopdf/logocliente.png"; // Substitua pelo caminho da imagem
    
    // Converter pixels para milímetros
    const width = 80 * 0.264583; // ≈ 52.92 mm
    const height = 35 * 0.264583; // ≈ 26.46 mm
    
    // Adicionar as imagens ao cabeçalho
    doc.addImage(imagem1, "JPEG", 15, 10, width, height); // Imagem 1 no canto superior esquerdo
    doc.addImage(imagem2, "JPEG", 40, 10, width, height); // Imagem 2 no canto superior direito
    
    // Função para adicionar texto com fundo e linha divisória
    function adicionarTextoComEstilo(texto, y) {
        // Adicionar fundo com a cor #2c7cbc
        doc.setFillColor(44, 124, 188); // Cor #2c7cbc em RGB
        doc.rect(15, y - 5, 150, 8, 'F'); // Retângulo preenchido (largura: 190mm, altura: 8mm)
    
        // Adicionar texto (cor branca para contrastar com o fundo)
        doc.setTextColor(255, 255, 255); // Cor do texto (branco)
        doc.setFontSize(9);
        doc.text(texto, 18, y); // Texto alinhado à esquerda com margem de 18mm
    
        // Adicionar linha divisória (cinza escuro)
        doc.setDrawColor(211, 211, 211); // Cor da linha (cinza escuro)
        doc.line(15, y + 3, 165, y + 3); // Linha divisória (largura: 190mm)
    }
    
    // Adicionar os textos com estilo (posicionados abaixo das imagens)
    adicionarTextoComEstilo(`Ordem de Produção - ${ordemProducao.textContent}`, 30);
    adicionarTextoComEstilo(`Receita  - ${receitaProduto.textContent}`, 40);
    adicionarTextoComEstilo(`Usuário Criação - ${usuarioCriacao.textContent}`, 50);
    adicionarTextoComEstilo(`Usuário Execução - ${usuarioExecucao.textContent}`, 60);
    adicionarTextoComEstilo(`Quantidade Prevista - ${QuantidadePrevista}`, 70);
    adicionarTextoComEstilo(`Linha - ${linha.textContent}`, 80);
    adicionarTextoComEstilo(`Lote - ${lote.textContent}`, 90);
    
    // Adicionar o título "Consumo"
    
    
    // Adiciona a primeira tabela
    let currentY = 110; // Posição inicial para a primeira tabela
    let currentBatch = null;
    let arrayGeral = [];
    let totalDesejado;
    let idBatch;
    let dataDosagem;
    let totalReal;
    let totalErro;
    let totalPermitido;
    let totalTempo;

    // Ordena os batches para garantir a sequência correta (se necessário)
    const batches = Object.keys(gruposPorBatch); 

    batches.forEach(batch => {
        const dadosBatch = gruposPorBatch[batch];
        
        
        // Reinicia o arrayGeral se o batch atual for diferente do anterior
        if (batch !== currentBatch) {
            arrayGeral = [];
            currentBatch = batch;
            totalDesejado = 0, totalReal = 0, totalErro = 0, totalPermitido = 0, totalTempo = 0;
        }

        // Preenche o arrayGeral com os dados do batch atual
        for (const a of dadosBatch) {
            arrayGeral.push([
                a.Batch, a.Insumo, a.Local, a.Desejado, a.Real, a.Erro_Kg, a.Erro_Permitido, a.Tempo_de_Dosagem
            ]);
            totalDesejado += parseFloat(a.Desejado) || 0;
            totalReal += parseFloat(a.Real) || 0;
            totalErro += parseFloat(a.Erro_Kg) || 0;
            totalPermitido += parseFloat(a.Erro_Permitido) || 0;
            totalTempo += parseFloat(a.Tempo_de_Dosagem) || 0;
            dataDosagem = a.Data_Dosagem;
            idBatch = a.Batch;
        }
    
        // --- Adiciona o título "Consumo" dinamicamente ---
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        
        // Verifica espaço para o título + tabela
        if (currentY + 30 > 280) { // 30 é espaço estimado para título + margem
            doc.addPage();
            currentY = 20;
        }
        
        // Posiciona o título "Consumo" ANTES da tabela
        doc.text(`Batch ${idBatch} - Data ${dataHora(dataDosagem)}` , 15, currentY);
        currentY += 10; // Aumenta a posição Y para a tabela começar abaixo
    
        // Verifica espaço para a tabela
        if (currentY + 60 > 280) {
            doc.addPage();
            currentY = 20
        }

        // Cria a tabela apenas para o batch atual
        doc.autoTable({
            head: [['Batch', 'Insumo', 'Local', 'Desejado Kg', 'Real Kg', 'Erro Kg', 'Erro Permitido %', 'Tempo (s)']],
            body: arrayGeral,
            foot: [["TOTAL","","",totalDesejado.toFixed(2),totalReal.toFixed(2),totalErro.toFixed(2),totalPermitido.toFixed(2),totalTempo.toFixed(2)]],
            startY: currentY,
            theme: 'striped',
            styles: { fontSize: 8 }
        });
    
        currentY = doc.lastAutoTable.finalY + 10;

         // Adiciona o título "Parâmetros" APENAS SE HOUVER ESPAÇO
        if (currentY + 40 > 280) { 
            doc.addPage();
            currentY = 20;
        }
    
        doc.setFontSize(14);
        doc.text("Parâmetros", 15, currentY);
        currentY += 10; // Espaço após o título
    
        doc.autoTable({
            head: [['Descrição', 'Tempo (s)']],
            body: tableGeraisReceita,
            startY: currentY,
            theme: 'striped'
        });
    
        // Atualiza a posição Y após a segunda tabela
        currentY = doc.lastAutoTable.finalY + 10;
    });
    
    
    // Salva o PDF
    doc.save(`tabelas-${dataHoraPdfCsv(Date.now())}.pdf`);
}

function gerarCSV(tabela1, tabela2) {
    const resultado = [];

            // Adicionar cabeçalho
            resultado.push([
                'Batch',
                'Insumo',
                'Local',
                'Desejado Kg',
                'Real Kg',
                'Erro Kg',
                'Erro Permitido %',
                'Tempo (s)',
                'Descricao',
                'Tempo (s)'
            ]);

            // Combinar as tabelas linha por linha
            for (let i = 0; i < Math.max(tabela1.length, tabela2.length); i++) {
                const linhaTabela1 = tabela1[i] || ['', '', '', '', '', '', '', '']; // Preencher com valores vazios se não houver dados
                const linhaTabela2 = tabela2[i] || ['', '']; // Preencher com valores vazios se não houver dados

                // Combinar as linhas das duas tabelas
                const linhaCombinada = [...linhaTabela1, ...linhaTabela2];
                resultado.push(linhaCombinada);
            }

            return resultado;
}


function fazerDownloadCSV(csv, nomeArquivo) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;
    link.click();
}

function criarTabelaAdicional() {
    return [
        ["Ordem de Produção", ordemProducao.textContent],
        ["Usuário Criação", usuarioCriacao.textContent],
        ["Usuário Execução", usuarioExecucao.textContent],
        ["Data de Criação", dataCriacao.textContent],
        ["Linha", linha.textContent],
        ["Lote", lote.textContent]
    ];
}

function gerarExcel() {
    // Criar a tabela adicional
    const tabelaAdicional = criarTabelaAdicional();

    // Combinar as tabelas principais
    const tabelaCombinada = gerarCSV(tableGeraisProducao, tableGeraisReceita);

    // Adicionar a tabela adicional ao início da tabela combinada
    const dadosCompletos = [
        ...tabelaAdicional, // Adiciona a tabela adicional
        [], // Adiciona uma linha vazia para separar
        ...tabelaCombinada // Adiciona a tabela combinada
    ];

    // Criar uma planilha com os dados completos
    const ws = XLSX.utils.aoa_to_sheet(dadosCompletos);

    // Criar um workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Relatório Completo");

    // Gerar o arquivo Excel
    XLSX.writeFile(wb, `relatorio_excel_${dataHoraPdfCsv(Date.now())}.xlsx`);
}

export {
    criarTabela,
    gerarPdf,
    gerarCSV,
    fazerDownloadCSV,
    tableGeraisProducao,
    tableGeraisReceita,
    dataHoraPdfCsv,
    gerarExcel
}