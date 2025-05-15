
import { graphlBarra, drawRing, graphLine } from "./graphInformation.js";
import { updateClock } from '../timeTratado/timer.js'


const clockElement = document.getElementById('time');

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

const maquinas = [
  { linha: 1 },
  { linha: 2 },
  { linha: 3 },
  { linha: 4 }
];
var letDescricaoReceita1 = [];
var somaQuantidadeTeoricaArray1 = [];
var somaQuantidadeRealArray1 = [];
var letDescricaoReceita2 = [];
var somaQuantidadeTeoricaArray2 = [];
var somaQuantidadeRealArray2= [];
var letDescricaoReceita3 = [];
var somaQuantidadeTeoricaArray3 = [];
var somaQuantidadeRealArray3 = [];
var letDescricaoReceita4 = [];
var somaQuantidadeTeoricaArray4 = [];
var somaQuantidadeRealArray4 = [];

//graphLine(ctx1)
//graphLine(ctx2)

function getDadoGraph() {
        axios.get(`/monitoramento/dados`).then(response => {
        const dados = response.data;

            // ARRAY PARA GRAFICOS 1
            letDescricaoReceita1 = [];
            somaQuantidadeTeoricaArray1 = [];
            somaQuantidadeRealArray1 = [];

            // ARRAY PARA GRAFICOS 2
            letDescricaoReceita2 = [];
            somaQuantidadeTeoricaArray2 = [];
            somaQuantidadeRealArray2 = [];

            // ARRAY PARA GRAFICOS 3
            letDescricaoReceita3 = [];
            somaQuantidadeTeoricaArray3 = [];
            somaQuantidadeRealArray3 = [];
            
            // ARRAY PARA GRAFICOS 4
            letDescricaoReceita4 = [];
            somaQuantidadeTeoricaArray4 = [];
            somaQuantidadeRealArray4 = [];
        
            console.log(dados)

            /*#################################### SETA AS MAQUINAS ON #################################*/

            maquinas.forEach(maquina => {
                $(`#linha${maquina.linha}Operation`).css('background-color', '#e6626f');
                $(`#linha${maquina.linha}Operation`).css('background-color', '#e6626f');
                $(document.getElementById(`value-${maquina.linha}`)).css('border-color', '#e6626f').text('0 Kg');
                $(document.getElementById(`value-${maquina.linha}a`)).css('border-color', '#e6626f').text('0 Kg');
                //drawRing(document.getElementById(`value-${maquina.linha}`), "#e6626f", '');
                //drawRing(document.getElementById(`value-${maquina.linha}a`), "#e6626f", '');
            });

            
            dados.operationOn.forEach(item => {
                const maquinaOperando = maquinas.find(m => m.linha === item.Linha);
                    console.log(maquinaOperando);
                    if (maquinaOperando) {
                        $(`#linha${maquinaOperando.linha}Operation`).css('background-color', '#66af91');
                         $(document.getElementById(`value-${maquinaOperando.linha}`)).css('border-color', '#66af91').text('');
                         $(document.getElementById(`value-${maquinaOperando.linha}a`)).css('border-color', '#66af91').text('');
                        //drawRing(document.getElementById(`value-${maquinaOperando.linha}`), '#66af91', '');
                        //drawRing(document.getElementById(`value-${maquinaOperando.linha}a`), '#66af91','');
                    } 
            });


             /*#################################### LINHA 1 #################################*/
            const linha1 = dados.dados.filter(item => item.Linha === 1);

            console.log('linha 1')
            console.log(linha1)
            // Agrupa os itens por OrdemProducao
            const agrupadoPorProducao1 = linha1.reduce((acc, item) => {
                    if (!acc[item.OrdemProducao]) {
                            acc[item.OrdemProducao] = [];
                        }
                            acc[item.OrdemProducao].push(item);
                            return acc;
            }, {});

            for (const key in agrupadoPorProducao1) {
                  const grupo = agrupadoPorProducao1[key];

                  // Soma de Soma_QuantidadeTeorica
                  const somaTeorica = grupo.reduce(
                    (acc, item) => acc + item.Soma_QuantidadeTeorica,
                    0
                  );
                  // Soma de Soma_QuantidadeReal
                  const somaReal = grupo.reduce((acc, item) => acc + item.Soma_QuantidadeReal, 0);

                  // Adiciona aos arrays
                  somaQuantidadeTeoricaArray1.push(somaTeorica.toFixed(1));
                  somaQuantidadeRealArray1.push(somaReal.toFixed(1));
            }


            for (let value of dados.receitaOn) {
                    if(value.Linha === 1) {
                        letDescricaoReceita1.push(value.Descricao);
                    }
            }

            const somatotalTeorica1 = somaQuantidadeTeoricaArray1.reduce((acc, val) => acc + parseFloat(val), 0);
            const somatotalReal1 = somaQuantidadeRealArray1.reduce((acc, val) => acc + parseFloat(val), 0);
            
            const dadosoperation1 =dados.operationOn.find(item => item.Linha === 1);

            if (linha1.length > 0 && dadosoperation1) {
              graphlBarra(
                ctx1,
                letDescricaoReceita1,
                somaQuantidadeTeoricaArray1,
                somaQuantidadeRealArray1
              );

              $(canvas1).css('border-color', '#66af91').text(`${somatotalTeorica1.toFixed(1)} Kg`);
              $(canvas2).css('border-color', '#66af91').text(`${somatotalReal1.toFixed(1)} Kg`);
              
              //drawRing(canvas1, "#66af91", `${somatotalTeorica1} Kg`);
              //drawRing(canvas2, "#66af91", `${somatotalReal1} Kg`);
            } else {
                graphlBarra(
                ctx1,
                letDescricaoReceita1,
                somaQuantidadeTeoricaArray1,
                somaQuantidadeRealArray1
              );

              $(canvas1).css('border-color', '#e6626f').text(`${somatotalTeorica1.toFixed(1)} Kg`);
              $(canvas2).css('border-color', '#e6626f').text(`${somatotalReal1.toFixed(1)} Kg`);

              //drawRing(canvas1, "#e6626f", `${somatotalTeorica1} Kg`);
              //drawRing(canvas2, "#e6626f", `${somatotalReal1} Kg`);
            }

            /*#################################### LINHA 2 #################################*/
            const linha2 = dados.dados.filter(item => item.Linha === 2);

            console.log('linha 2')
            console.log(linha2)
            const agrupadoPorProducao2 = linha2.reduce((acc, item) => {
                    if (!acc[item.OrdemProducao]) {
                            acc[item.OrdemProducao] = [];
                        }
                            acc[item.OrdemProducao].push(item);
                            return acc;
            }, {});

            for (const key in agrupadoPorProducao2) {
                  const grupo = agrupadoPorProducao2[key];

                  // Soma de Soma_QuantidadeTeorica
                  const somaTeorica = grupo.reduce(
                    (acc, item) => acc + item.Soma_QuantidadeTeorica,
                    0
                  );
                  // Soma de Soma_QuantidadeReal
                  const somaReal = grupo.reduce((acc, item) => acc + item.Soma_QuantidadeReal, 0);

                  // Adiciona aos arrays
                  somaQuantidadeTeoricaArray2.push(somaTeorica.toFixed(1));
                  somaQuantidadeRealArray2.push(somaReal.toFixed(1));
            }


            for (let value of dados.receitaOn) {
                    if(value.Linha === 2) {
                        letDescricaoReceita2.push(value.Descricao);
                    }
            }

            const somatotalTeorica2 = somaQuantidadeTeoricaArray2.reduce((acc, val) => acc + parseFloat(val), 0);
            const somatotalReal2 = somaQuantidadeRealArray2.reduce((acc, val) => acc + parseFloat(val), 0);
            
            const dadosoperation2 =dados.operationOn.find(item => item.Linha === 2);

            if (linha2.length > 0 && dadosoperation2) {
              graphlBarra(
                ctx2,
                letDescricaoReceita2,
                somaQuantidadeTeoricaArray2,
                somaQuantidadeRealArray2
              );

              $(canvas3).css('border-color', '#66af91').text(`${somatotalTeorica2.toFixed(1)} Kg`);
              $(canvas4).css('border-color', '#66af91').text(`${somatotalReal2.toFixed(1)} Kg`);
              
              //drawRing(canvas3, "#66af91", `${somatotalTeorica2} Kg`);
              //drawRing(canvas4, "#66af91", `${somatotalReal2} Kg`);
            } else {
                graphlBarra(
                ctx2,
                letDescricaoReceita2,
                somaQuantidadeTeoricaArray2,
                somaQuantidadeRealArray2
              );

              $(canvas3).css('border-color', '#e6626f').text(`${somatotalTeorica2.toFixed(1)} Kg`);
              $(canvas4).css('border-color', '#e6626f').text(`${somatotalReal2.toFixed(1)} Kg`);

              //drawRing(canvas3, "#e6626f", `${somatotalTeorica2} Kg`);
              //drawRing(canvas4, "#e6626f", `${somatotalReal2} Kg`);
            }

            
            /*#################################### LINHA 3 #################################*/
            const linha3 = dados.dados.filter(item => item.Linha === 3);

            const agrupadoPorProducao3 = linha3.reduce((acc, item) => {
                    if (!acc[item.OrdemProducao]) {
                            acc[item.OrdemProducao] = [];
                        }
                            acc[item.OrdemProducao].push(item);
                            return acc;
                }, {});

            console.log(agrupadoPorProducao3);

            for (const key in agrupadoPorProducao3) {
                  const grupo = agrupadoPorProducao3[key];

                  // Soma de Soma_QuantidadeTeorica
                  const somaTeorica = grupo.reduce(
                    (acc, item) => acc + item.Soma_QuantidadeTeorica,
                    0
                  );
                  // Soma de Soma_QuantidadeReal
                  const somaReal = grupo.reduce((acc, item) => acc + item.Soma_QuantidadeReal, 0);

                  // Adiciona aos arrays
                  somaQuantidadeTeoricaArray3.push(somaTeorica.toFixed(1));
                  somaQuantidadeRealArray3.push(somaReal.toFixed(1));
            }

            for (let value of dados.receitaOn) {
                    if(value.Linha === 3) {
                        letDescricaoReceita3.push(value.Descricao);
                    }
            }

            const somatotalTeorica3 = somaQuantidadeTeoricaArray3.reduce((acc, val) => acc + parseFloat(val), 0);
            const somatotalReal3 = somaQuantidadeRealArray3.reduce((acc, val) => acc + parseFloat(val), 0);
            
            const dadosoperation3 = dados.operationOn.find(item => item.Linha === 3);

            console.log(letDescricaoReceita3);
            console.log(somaQuantidadeTeoricaArray3);
            console.log(somaQuantidadeRealArray3);

            if (linha3.length > 0 && dadosoperation3) {
              graphlBarra(
                ctx3,
                letDescricaoReceita3,
                somaQuantidadeTeoricaArray3,
                somaQuantidadeRealArray3
              );

              $(canvas5).css('border-color', '#66af91').text(`${somatotalTeorica3.toFixed(1)} Kg`);
              $(canvas6).css('border-color', '#66af91').text(`${somatotalReal3.toFixed(1)} Kg`);


              //drawRing(canvas5, "#66af91", `${somatotalTeorica3} Kg`);
              //drawRing(canvas6, "#66af91", `${somatotalReal3} Kg`);
            } else {
                graphlBarra(
                ctx3,
                letDescricaoReceita3,
                somaQuantidadeTeoricaArray3,
                somaQuantidadeRealArray3
              );

              $(canvas5).css('border-color', '#e6626f').text(`${somatotalTeorica3.toFixed(1)} Kg`);
              $(canvas6).css('border-color', '#e6626f').text(`${somatotalReal3.toFixed(1)} Kg`);

              //drawRing(canvas5, "#e6626f", `${somatotalTeorica3} Kg`);
              //drawRing(canvas6, "#e6626f", `${somatotalReal3} Kg`);
            }
            
            /*#################################### LINHA 4 #################################*/
            const linha4 = dados.dados.filter(item => item.Linha === 4);

            const agrupadoPorProducao4 = linha4.reduce((acc, item) => {
                    if (!acc[item.OrdemProducao]) {
                            acc[item.OrdemProducao] = [];
                        }
                            acc[item.OrdemProducao].push(item);
                            return acc;
            }, {});

            console.log(agrupadoPorProducao4);  

            for (const key in agrupadoPorProducao4) {
                  const grupo = agrupadoPorProducao4[key];

                  // Soma de Soma_QuantidadeTeorica
                  const somaTeorica = grupo.reduce(
                    (acc, item) => acc + item.Soma_QuantidadeTeorica,
                    0
                  );
                  // Soma de Soma_QuantidadeReal
                  const somaReal = grupo.reduce((acc, item) => acc + item.Soma_QuantidadeReal, 0);

                  // Adiciona aos arrays
                  somaQuantidadeTeoricaArray4.push(somaTeorica.toFixed(1));
                  somaQuantidadeRealArray4.push(somaReal.toFixed(1));
            }


            for (let value of dados.receitaOn) {
                    if(value.Linha === 4) {
                        letDescricaoReceita4.push(value.Descricao);
                    }
            }

            const somatotalTeorica4 = somaQuantidadeTeoricaArray4.reduce((acc, val) => acc + parseFloat(val), 0);
            const somatotalReal4 = somaQuantidadeRealArray4.reduce((acc, val) => acc + parseFloat(val), 0);
            
            const dadosoperation4 =dados.operationOn.find(item => item.Linha === 4);

            if (linha4.length > 0 && dadosoperation4) {
              graphlBarra(
                ctx4,
                letDescricaoReceita4,
                somaQuantidadeTeoricaArray4,
                somaQuantidadeRealArray4
              );

              $(canvas7).css('border-color', '#66af91').text(`${somatotalTeorica4.toFixed(1)} Kg`);
              $(canvas8).css('border-color', '#66af91').text(`${somatotalReal4.toFixed(1)} Kg`);

              //drawRing(canvas7, "#66af91", `${somatotalTeorica4} Kg`);
              //drawRing(canvas8, "#66af91", `${somatotalReal4} Kg`);
            } else {
                graphlBarra(
                ctx4,
                letDescricaoReceita4,
                somaQuantidadeTeoricaArray4,
                somaQuantidadeRealArray4
              );

              $(canvas7).css('border-color', '#e6626f').text(`${somatotalTeorica4.toFixed(1)} Kg`);
              $(canvas8).css('border-color', '#e6626f').text(`${somatotalReal4.toFixed(1)} Kg`);

              //drawRing(canvas7, "#e6626f", `${somatotalTeorica4} Kg`);
              //drawRing(canvas8, "#e6626f", `${somatotalReal4} Kg`);
            }
    })
}


setInterval( () => {
  getDadoGraph();
}, 300000)


setInterval(() => {
    clockElement.textContent = `DATA: ${updateClock()}`;
}, 1000);

// CHAMA O PRIMEIRO GET PARA ALIMENTAR OS GRAFICOS
getDadoGraph();