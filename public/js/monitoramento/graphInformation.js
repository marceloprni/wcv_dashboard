
const options1 = {
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
};


function drawRing(canvas, color, value){
    var ctx = canvas.getContext('2d');
    /*Draw text*/
    ctx.textAlign = 'center';
    ctx. textBaseline = 'middle';
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(String(value), (canvas.width / 2), (canvas.height / 2));
    /*Draw ring*/
    ctx.beginPath()
    ctx.arc(Math.floor(canvas.width / 2),Math.floor(canvas.height / 2),(canvas.height / 2),0,Math.PI*2, false); // outer (filled)
    ctx.arc(Math.floor(canvas.width / 2),Math.floor(canvas.height / 2),(canvas.height / 2)*0.8,0,Math.PI*2, true); // outer (unfills it)
    ctx.fillStyle = color;
    ctx.fill();
    return true;
}

function graphLine(ctx, labels, data) {
    return new Chart(ctx, {
        type: 'line', 
        data:   {
            labels: [1,2,3,4,5,6],
            datasets: [
                {
                  label: 'TaktTime 1',
                  data: [1, 2, 3, 4], // primeiros valores
                  fill: false,
                  borderColor: 'rgb(39, 61, 61)',
                  tension: 0.1
                },
                {
                  label: 'TaktTime 2',
                  data: [2, 3, 5, 3], // segundos valores
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


export {
    drawRing,
    options1,
    graphLine
}