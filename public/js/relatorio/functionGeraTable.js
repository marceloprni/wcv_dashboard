
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
let usuarioCriacao = document.getElementById('usuarioCriacao');
let usuarioExecucao = document.getElementById('usuarioExecucao');
let dataCriacao = document.getElementById('dataCriacao');
let linha = document.getElementById('linhaNome'); 
let lote = document.getElementById('lote');

var tableGeraisProducao = [];
var tableGeraisReceita = []; 


var somarTudo = (valor, valueeArray ) => {
    const total = valor.reduce((acumulador, valorAtual) => acumulador + valorAtual[valueeArray], 0);
    return total
}

var dataHora = (valor) => {
    // Criar um objeto Date a partir da string
    const date = new Date(valor);

    // Exibindo a data
    let ano = date.getFullYear(); // Ano: 2024
    let mes = date.getMonth() + 1; // Mês: 9 (Meses começam do zero)
    let dia = date.getDate(); // Dia: 30
    let hora =  date.getUTCHours(); // Hora em UTC: 14
    let minutos = date.getUTCMinutes(); // Minutos em UTC: 3
    let segundo = date.getUTCSeconds(); // Segundos em UTC: 38
    let dataTotal = `${Inserir0Date(hora)}:${Inserir0Date(minutos)}:${Inserir0Date(segundo)} ${Inserir0Date(dia)}/${Inserir0Date(mes)}/${Inserir0Date(ano)}`
    return dataTotal
}

var dataHoraPdfCsv = (valor) => {
    // Criar um objeto Date a partir da string
    const date = new Date(valor);

    // Exibindo a data
    let ano = date.getFullYear(); // Ano: 2024
    let mes = date.getMonth() + 1; // Mês: 9 (Meses começam do zero)
    let dia = date.getDate(); // Dia: 30
    let hora =  date.getUTCHours(); // Hora em UTC: 14
    let minutos = date.getUTCMinutes(); // Minutos em UTC: 3
    let segundo = date.getUTCSeconds(); // Segundos em UTC: 38
    let dataTotal = `${Inserir0Date(hora)}${Inserir0Date(minutos)}${Inserir0Date(segundo)}_${Inserir0Date(dia)}${Inserir0Date(mes)}${Inserir0Date(ano)}`
    return dataTotal
}

function criarTabela(value1) {
    axios.get(`/relatorio/${value1}`).then(response => {

        let usuarioDados = response.data.dadosUsuarios[0];   

        console.log(response.data);
        for(let a of response.data.producaoGerais) {
            tableGeraisProducao.push([a.Batch, a.Insumo, a.Local, a.Desejado, a.Real, a.Erro_Kg, a.Erro_Permitido, a.Tempo_de_Dosagem]);
            
        }

        let valorParametros = response.data.parametroGerais.slice(0, tableGeraisProducao.length)

        for(let a of valorParametros) {
            tableGeraisReceita.push([a.Descricao, a.Valor]);
        }


        console.log(tableGeraisReceita)
        desejado.textContent = somarTudo(tableGeraisProducao, 3)
        real.textContent = somarTudo(tableGeraisProducao, 4)
        erro.textContent = somarTudo(tableGeraisProducao, 5)
        erroPermitido.textContent = somarTudo(tableGeraisProducao,6)
        tempo.textContent = somarTudo(tableGeraisProducao,7)
        
        ordemProducao.textContent = usuarioDados.Codigo
        usuarioCriacao.textContent = usuarioDados.UserA
        usuarioExecucao.textContent = usuarioDados.UserC
        dataCriacao.textContent = dataHora(usuarioDados.DataCriacao)
        linha.textContent =  usuarioDados.Nome_Linha 
        lote.textContent =  usuarioDados.Lote

        table = jQuery('#tabela-relatorio').DataTable(
            {
                language: DatatbleJson,
                pageLength: 100,
                bLengthChange: false,
                bFilter: true,
                data: tableGeraisProducao,
                autoWidth: false,
                info: false,
                ordering: false,
                paging: false,
                columns: [
                    {title: "Batch"}, 
                    {title: "Insumo"},
                    {title: "Local"},
                    {title: "Desejado Kg"}, 
                    {title: "Real Kg"},
                    {title: "Erro Kg"}, 
                    {title: "Erro Permitido %"}, 
                    {title: "Tempo (s)"}, 
                ],
                rowCallback: function(row, data, index) {
                    // Aplicar cor de fundo com base no índice da linha
                    if (index % 2 === 0) {
                        $(row).css('background-color', '#D9D9D9'); // Linhas pares
                    } else {
                        $(row).css('background-color', '#F2F2F2'); // Linhas ímpares
                    }
                }
        });

        
        table1 = jQuery('#tabela-parametros').DataTable(
            {
                language: DatatbleJson,
                pageLength: 100,
                bLengthChange: false,
                bFilter: true,
                data: tableGeraisReceita,
                autoWidth: false,
                info: false,
                ordering: false,
                paging: false,
                columns: [
                    {title: "Descrição"}, 
                    {title: "Tempo (s)"} 
                ],
                rowCallback: function(row, data, index) {
                    // Aplicar cor de fundo com base no índice da linha
                    if (index % 2 === 0) {
                        $(row).css('background-color', '#D9D9D9'); // Linhas pares
                    } else {
                        $(row).css('background-color', '#F2F2F2'); // Linhas ímpares
                    }
                }
        }); 
        
    
    }).catch(error => {
        console.log(error);
    });    
}

function gerarPdf() {
    const { jsPDF } = window.jspdf; // Acessando jsPDF do objeto global
    const doc = new jsPDF("p", "mm", "a4");
    
    // URLs ou Base64 das imagens
    const imagem1 = "image/logopdf/logo_wcv.png"; // Substitua pelo caminho da imagem
    const imagem2 = "image/logopdf/logo_wcv.png"; // Substitua pelo caminho da imagem
    
    // Converter pixels para milímetros
    const width = 80 * 0.264583; // ≈ 52.92 mm
    const height = 30 * 0.264583; // ≈ 26.46 mm
    
    // Adicionar as imagens ao cabeçalho
    doc.addImage(imagem1, "JPEG", 15, 10, width, height); // Imagem 1 no canto superior esquerdo
    doc.addImage(imagem2, "JPEG", 40, 10, width, height); // Imagem 2 no canto superior direito
    
    // Função para adicionar texto com fundo e linha divisória
    function adicionarTextoComEstilo(texto, y) {
        // Adicionar fundo com a cor #2c7cbc
        doc.setFillColor(44, 124, 188); // Cor #2c7cbc em RGB
        doc.rect(15, y - 5, 100, 8, 'F'); // Retângulo preenchido (largura: 190mm, altura: 8mm)
    
        // Adicionar texto (cor branca para contrastar com o fundo)
        doc.setTextColor(255, 255, 255); // Cor do texto (branco)
        doc.setFontSize(12);
        doc.text(texto, 18, y); // Texto alinhado à esquerda com margem de 18mm
    
        // Adicionar linha divisória (cinza escuro)
        doc.setDrawColor(211, 211, 211); // Cor da linha (cinza escuro)
        doc.line(15, y + 3, 115, y + 3); // Linha divisória (largura: 190mm)
    }
    
    // Adicionar os textos com estilo (posicionados abaixo das imagens)
    adicionarTextoComEstilo(`Ordem de Produção - ${ordemProducao.textContent}`, 40);
    adicionarTextoComEstilo(`Usuário Criação - ${usuarioCriacao.textContent}`, 50);
    adicionarTextoComEstilo(`Usuário Execução - ${usuarioExecucao.textContent}`, 60);
    adicionarTextoComEstilo(`Data da Criação - ${dataCriacao.textContent}`, 70);
    adicionarTextoComEstilo(`Linha - ${linha.textContent}`, 80);
    adicionarTextoComEstilo(`Lote - ${lote.textContent}`, 90);
    
    // Adicionar o título "Consumo"
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Resetar a cor do texto para preto
    doc.text("Consumo", 15, 105); // Título "Consumo"
    
    // Adiciona a primeira tabela
    doc.autoTable({
        head: [['ID', 'Insumo', 'Local', 'Desejado Kg', 'Real Kg', 'Erro Kg', 'Erro Permitido %', 'Tempo (s)']],
        body: tableGeraisProducao,
        startY: 110, // Posição Y da tabela (abaixo do título "Consumo")
    });
    
    // Adiciona o título "Parâmetros"
    const yOffset = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(14);
    doc.text("Parâmetros", 15, yOffset);
    
    // Adiciona a segunda tabela
    doc.autoTable({
        head: [['Descrição', 'Tempo (s)']],
        body: tableGeraisReceita,
        startY: yOffset + 5,
    });
    
    // Salva o PDF
    doc.save(`tabelas-${dataHoraPdfCsv(Date.now())}.pdf`);
}

function gerarCSV(tabela1, tabela2) {
    const resultado = [];

            // Adicionar cabeçalho
            resultado.push([
                'ID',
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