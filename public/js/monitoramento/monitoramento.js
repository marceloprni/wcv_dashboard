
import { options1, drawRing, graphLine } from "./graphInformation.js";


var operation1 = document.getElementById("linha1Operation");
var operation2 = document.getElementById("linha2Operation");
var operation3 = document.getElementById("linha3Operation");
var operation4 = document.getElementById("linha4Operation");

var canvas1 = document.getElementById("value-1");
var canvas2 = document.getElementById("value-1a");
var canvas3 = document.getElementById("value-2");
var canvas4 = document.getElementById("value-2a");
var canvas5 = document.getElementById("value-3");
var canvas6 = document.getElementById("value-3a");
var canvas7 = document.getElementById("value-4");
var canvas8 = document.getElementById("value-4a");

var ctx1 = document.getElementById("grafico-1");
var ctx2 = document.getElementById("grafico-2");
var ctx3 = document.getElementById("grafico-3");
var ctx4 = document.getElementById("grafico-4");

var indicadores = ["Disponibilidade", "Performance", "Qualidade"];
var colouarray = ['red', 'green', 'blue'];
var color1 = [
        '#ff003c', 
        '#ff8a00',
        '#fabe28', 
        '#88c100', 
        '#00c176', 
        '#d31900', 
        '#ff6600', 
        '#fff2af', 
        '#7cb490', 
        '#000000',
        '#542638',
        '#8f244d',
        '#e7c049',
        '#c94d65'

    ];
const maquinas = [
  { linha: 1 },
  { linha: 2 },
  { linha: 3 },
  { linha: 4 }
];
const verificaOperation = [];

graphLine(ctx1)
graphLine(ctx2)
graphLine(ctx3)
graphLine(ctx4)


setTimeout( () => {
    axios.get(`/monitoramento/dados`).then(response => {
        const dados = response.data;
        
            console.log(dados)
            maquinas.forEach(maquina => {
                $(`#linha${maquina.linha}Operation`).css('background-color', '#e6626f');
                drawRing(document.getElementById(`value-${maquina.linha}`), "#e6626f", "");
                drawRing(document.getElementById(`value-${maquina.linha}a`), "#e6626f", "");
            });

            // Depois, seta só as máquinas que estão operando
            dados.operationOn.forEach(item => {
                const maquinaOperando = maquinas.find(m => m.linha === item.Linha);
                    if (maquinaOperando) {
                        $(`#linha${maquinaOperando.linha}Operation`).css('background-color', '#66af91');
                        drawRing(document.getElementById(`value-${maquinaOperando.linha}`), '#66af91', 1000000.23);
                        drawRing(document.getElementById(`value-${maquinaOperando.linha}a`), '#66af91', 1000000.23);
                    } 
            });
    })

}, 1000)


