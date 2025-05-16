var charts = {
  grafico1: null,
  grafico2: null,
  grafico3: null,
  grafico4: null
};


function drawRing(canvas, color, value){
    var ctx = canvas.getContext('2d');
    /*Draw text*/
    // Limpa o canvas antes de desenhar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.textAlign = 'center';
    ctx. textBaseline = 'middle';
    ctx.fillStyle = "#404040";
    ctx.font = "1.1rem Roboto";
    ctx.fillText(String(value), (canvas.width / 2), (canvas.height / 2));
    /*Draw ring*/
    ctx.beginPath()
    ctx.arc(Math.floor(canvas.width / 2),Math.floor(canvas.height / 2),(canvas.height / 2),0,Math.PI*2, false); // outer (filled)
    ctx.arc(Math.floor(canvas.width / 2),Math.floor(canvas.height / 2),(canvas.height / 2)*0.8,0,Math.PI*2, true); // outer (unfills it)
    ctx.fillStyle = color;
    ctx.fill();
    return true;
}

function graphLine(ctx, labels, data1, data2) {
    return new Chart(ctx, {
        type: 'line', 
        data:   {
            labels: [0,...labels],
            datasets: [
                {
                  label: 'Quantidade Programada',
                  data: [0,...data1], // primeiros valores
                  fill: false,
                  borderColor: 'rgb(39, 61, 61)',
                  tension: 0.1
                },
                {
                  label: 'Quantidade Produzida',
                  data: [0,...data2], // segundos valores
                  fill: false,
                  borderColor: 'rgb(72, 199, 199)',
                  tension: 0.1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            // Define o tamanho do gráfico
            layout: {
                padding: {
                    left: 50,
                    right: 50,
                    top: 0,
                    bottom: 0
                }
            },
            // Define o tamanho do canvas
            maintainAspectRatio: false,
            responsive: true,
            // Define o tamanho do canvas diretamente
            width: 400,
            height: 200
        }
    }) 
 
}

function graphlBarra(ctx, labels, data1, data2, valueMax, chartKey) {

    if (charts[chartKey]) {
    charts[chartKey].destroy();
    }

   charts[chartKey] = new Chart(ctx, {
     type: "bar",
     data: {
       labels: [...labels],
       datasets: [
         {
           label: "Quantidade Programada",
           data: [...data1],
           backgroundColor: [
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
             "rgba(109, 139, 137, 0.5)",
           ],
           borderColor: [
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
             "rgba(109, 139, 137, 1)",
           ],
           borderWidth: 1,
           maxBarThickness: 50,
           
         },
         {
           label: "Quantidade Realizada",
           data: [...data2],
           backgroundColor: [
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
             "rgba(111, 149, 255, 0.5)",
           ],
           borderColor: [
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
             "rgba(111, 149, 255, 1)",
           ],
           borderWidth: 1,
           maxBarThickness: 50,
         },
       ],
     },
     options: {
       scales: {
         y: {
           beginAtZero: true,
           min: 0,
           max: valueMax,
         },
       },
       plugins: {
         legend: {
           labels: {
             font: { size: 10 },
           },
         },
       },
       layout: {
         padding: {
           left: 5,
           right: 5,
           top: 0,
           bottom: 0,
         },
       },
       maintainAspectRatio: false,
       responsive: true,
     },
   });

    return charts[chartKey];
}


export {
    drawRing,
    graphLine,
    graphlBarra
}