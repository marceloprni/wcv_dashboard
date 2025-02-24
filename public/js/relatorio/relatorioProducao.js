
import { criarTabela, 
        gerarPdf, 
        gerarCSV,
        fazerDownloadCSV,
        tableGeraisProducao,
        tableGeraisReceita,
        dataHoraPdfCsv,
        gerarExcel
 } from './functionGeraTable.js';


var numBerProduction = document.getElementById("text_producao");

// GERA O RELATORIO
jQuery('#gerarRelatorio').on("click", function criarUsuarios(e){
    e.preventDefault();
    let numberPrincipal = numBerProduction.value;
    criarTabela(numberPrincipal)    
});

// GERA O PDF
jQuery('#geraRelatorioPdf').on('click', function(e) {
    e.preventDefault();
    gerarPdf()
});


// GERA O CSV
jQuery('#gerarRelatorioCsv').on('click', function(e) {
    e.preventDefault();
    // Combinar as tabelas
    const tabelaCombinada = gerarCSV(tableGeraisProducao, tableGeraisReceita);

    // Converter para CSV usando PapaParse
    const csv = Papa.unparse(tabelaCombinada);

    // Fazer o download do CSV
    fazerDownloadCSV(csv, `tabelas_csv_${dataHoraPdfCsv(Date.now())}.csv`);
});

// GERA O EXCEL
jQuery('#gerarRelatorioExcel').on('click', function(e) {
    e.preventDefault();
    gerarExcel()
});