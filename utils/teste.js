// console.log(dataHora.toLocaleDateString(), dataHora.toLocaleTimeString())

const { DATE } = require("sequelize");

// Função para inserir o 0 na frente se for menor que 10, isso ajuda para salvar no banco de dados.
function Inserir0Date(valor1) {
    if(valor1 < 10) {
        return "0" + valor1;
    } else {
        return valor1;
    }
}

// Converte dataTime em timestamp
function convertDatetimeOnTimesTamp(dateTme) {
    // Quebrando a string em partes
    const partes = dateTme.split(' ');
    
    // Separando a parte da data e da hora
    const dataParte = partes[0]; // '2023-10-1'
    const horaParte = partes[1]; // '7:2:31:206'
    
    // Convertendo a parte da data para um objeto Date
    const dataObjeto = new Date(dataParte);
    const ano = dataObjeto.getFullYear();
    const mes = dataObjeto.getMonth() + 1;
    const dia = dataObjeto.getDate();
    
    // Separando a parte da hora em partes menores
    const horaPartesMenores = horaParte.split(':');
    
    const horas = parseInt(horaPartesMenores[0]); // 7
    const minutos = parseInt(horaPartesMenores[1]); // 2
    const segundos = parseInt(horaPartesMenores[2]); // 31
    const milissegundos = parseInt(horaPartesMenores[3]); // 206
    
    //console.log(ano, mes, dia, horas, minutos, segundos, milissegundos)
    const dataHora = new Date(ano, mes, dia, horas, minutos, segundos, milissegundos);
    const timeStamp = dataHora.getTime();
    return timeStamp
}

/*****  Converte Datatime Mysql 2023-09-03 17:08:04 para Datatime Javascript  *****/
function convertDatetimeOnTimesTampMysql(dateTme) {
    // Quebrando a string em partes
    const partes = dateTme.split(' ');
    
    // Separando a parte da data e da hora
    const dataParte = partes[0]; // '2023-10-1'
    let ano1 = dataParte.slice(0,4);
    let mes1 = parseInt(dataParte.slice(5,7)) - 1;
    let dia1 = parseInt(dataParte.slice(8,10));
	console.log(ano1, mes1, dia1);
    const horaParte = partes[1]; // '7:2:31:206'
    
    //Convertendo a parte da data para um objeto Date
    const dataObjeto = new Date(ano1, mes1, dia1);
    const ano = dataObjeto.getFullYear();
    const mes = dataObjeto.getMonth();
    const dia = dataObjeto.getDate();
    console.log(ano, mes, dia);
    //Separando a parte da hora em partes menores
    const horaPartesMenores = horaParte.split(':');
    
    const horas = parseInt(horaPartesMenores[0]); // 7
    const minutos = parseInt(horaPartesMenores[1]); // 2
    const segundos = parseInt(horaPartesMenores[2]); // 31
	console.log(horas, minutos, segundos)
    const dataHora = new Date(ano, mes, dia, horas, minutos, segundos);
    const timeStamp = dataHora
    return timeStamp
}

// Gerario conforme 2023/10/01 10:30:40
function Datetime(time) {

    var DataHora;

    if(!time) {
        DataHora = new Date();
       
    } else {
        DataHora = new Date(time);
    }
    
    //console.log(DataHora);
    const ano1 = DataHora.getFullYear();

    const mes1 = DataHora.getMonth() + 1;
    let mesConvertido = Inserir0Date(mes1);

    const dia1 = DataHora.getDate();
    let diaConvertido = Inserir0Date(dia1)

    const hora1 = DataHora.getHours();
    let horaConvertido = Inserir0Date(hora1);

    const minuto1 = DataHora.getMinutes();
    let minutoConvertido = Inserir0Date(minuto1);

    const segundo1 = DataHora.getSeconds();
    let segundoConvertido = Inserir0Date(segundo1);

    const Dhora = `${ano1}-${mesConvertido}-${diaConvertido} ${horaConvertido}:${minutoConvertido}:${segundoConvertido}`;
    return Dhora;
}

// Converte o primeiro timestamp para o timeFinal1
function timeFinal(timeFinal) {
    const TimeF = timeFinal;
    const dataHora = new Date(TimeF);
    const ano = dataHora.getFullYear();

    const mes = dataHora.getMonth() + 1; // Os meses são indexados a partir de 0

    const dia = dataHora.getDate();

    const hora = dataHora.getHours();
    const minutos = dataHora.getMinutes();
    const segundos = dataHora.getSeconds();
    const milisegundos = dataHora.getMilliseconds();
    const timeTotal = `${ano}-${mes}-${dia} ${hora}:${minutos}:${segundos}:${milisegundos}`;
    return timeTotal;
}

// Converte os tempos para salvar no banco de dados em milisegundos
function convertDateTime(timeSensor) {
    let timeStamp = Date.now() 
    let timeFinal1 = timeFinal(timeStamp);
    let timeSubtraido = timeStamp - timeSensor;

    const dataHora = new Date(timeSubtraido);
    const ano = dataHora.getFullYear();
    const mes = dataHora.getMonth() + 1; // Os meses são indexados a partir de 0
    const dia = dataHora.getDate();
    const hora = dataHora.getHours();
    const minutos = dataHora.getMinutes();
    const segundos = dataHora.getSeconds();
    const milisegundos = dataHora.getMilliseconds();
    const timeInicial1 = `${ano}-${mes}-${dia} ${hora}:${minutos}:${segundos}:${milisegundos}`;
    return  {
        timeInicial: timeInicial1,
        timeFinal: timeFinal1
    } 
}

function timeMilisegundos() {
    const timeStamp = Date.now();
    return timeStamp;
}

function timeMilisegundosVariavel(tempo) {
    const timeStamp = new Date(tempo);
    const timeReal = Date.now() - timeStamp.getTime(); //
    return timeReal;
}

function calculoMilisegundos(tempoInicio, tempoFim) {
    const timeStamp1 = new Date(tempoInicio).getTime();
    const timeStamp2 = new Date(tempoFim).getTime();
    const timeReal = timeStamp2 - timeStamp1 //

    const dataHora = new Date(timeReal);
    const ano = dataHora.getFullYear();
    const mes = dataHora.getMonth() + 1; // Os meses são indexados a partir de 0
    const dia = dataHora.getDate();
    const hora = dataHora.getHours();
    const minutos = dataHora.getMinutes();
    const segundos = dataHora.getSeconds();
    //const milisegundos = dataHora.getMilliseconds();
    const timeInicial1 = `${ano}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
    return timeInicial1;
}

function timeMilisegundosVariavel(tempo, final) {
    const timeStamp = new Date(tempo);
    const timeStamp2 = new Date(final);
    console.log(timeStamp.getHours(), timeStamp2.getHours())
    console.log(timeStamp.getMinutes(), timeStamp2.getMinutes())
    console.log(timeStamp.getSeconds(), timeStamp2.getSeconds())
    let ano = timeStamp2.getFullYear() - timeStamp.getFullYear();
    let mes = timeStamp2.getMonth() -  timeStamp.getMonth();
    let dia = timeStamp2.getDate() - timeStamp.getDate();
    
    if(ano < 0) {
        ano = '0000'
    } else if(ano < 10) {
        ano = '000' + ano
    } else if(ano < 100) {
        ano = '00' + ano
    } else if (ano < 1000) {
        ano = '0' + ano
    }

    if(mes < 0) {
        mes = '00'
    } else if (mes < 10) {
        mes = '0' + mes
    } else if (mes < 12) {
        mes = mes
    }

    if(dia < 0) {
        dia = '00'
    } else if (dia < 10) {
        dia = '0' + dia
    } else if (dia < 31) {
        dia = dia
    }
    
    var hora;
    var hora1;
    if(timeStamp2.getHours() < timeStamp.getHours()) {
         hora = timeStamp.getHours() - timeStamp2.getHours()
         
         if(hora < 10) {
            hora1 = "0" + hora;
        } else {
            hora1 = hora;
        }
    } else {
         hora = timeStamp2.getHours() - timeStamp.getHours() 
         
         if(hora < 10) {
            hora1 =  "0" + hora;
        } else {
            hora1 =  hora;
        }
    }

    var minuto;
    var minuto1;
    if(timeStamp2.getMinutes() < timeStamp.getMinutes()) {
        minuto = timeStamp.getMinutes() - timeStamp2.getMinutes();
        
        if(minuto < 10) {
            minuto1 =  "0" + minuto;
        } else {
            minuto1 = minuto;
        }
        
   } else {
        minuto = timeStamp2.getMinutes() - timeStamp.getMinutes();
        
        if(minuto < 10) {
            minuto1 = "0" + minuto;
        } else {
            minuto1 = minuto;
        }
   }

   var segundos;
   var segundos1;
   if(timeStamp2.getSeconds() < timeStamp.getSeconds()) {
        segundos = timeStamp.getSeconds() - timeStamp2.getSeconds();
        
        if(segundos < 10) {
         segundos1 = "0" + segundos;
        } else {
         segundos1 = segundos;
        }
    } else {
        segundos = timeStamp2.getSeconds() - timeStamp.getSeconds();
        
        if(segundos < 10) {
            segundos1 = "0" + segundos;
        } else {
            segundos1 = segundos;
        }
    }
    const dataFinal = `${ano}-${mes}-${dia} ${hora1}:${minuto1}:${segundos1}`;
    return dataFinal;
}

const dateFinal = []
const dat =  {
    1: '0000-00-00 03:21:45',
    2: '0000-00-00 00:01:04',
    3: '0000-00-00 00:01:15',
    4: '0000-00-00 00:01:30'
}

for (let i in dat) {
    dateFinal.push(dat[i]);
}


function calculoHorasParada(dataCalc) {
    const partes = dataCalc.split(' ');
    
    // Separando a parte da data e da hora
   const dataParte = partes[0]; // '2023-10-01'
   const ano = dataParte.slice(0,4);
   const mes = dataParte.slice(5,7);
   const dia = dataParte.slice(8,10);

   const horaParte = partes[1]; // '7:2:31:206'
   const horas = horaParte.slice(0,2);
   const minutos = horaParte.slice(3,5);
   const segundos = horaParte.slice(6,8);
   
   const dateNow = new Date(ano, mes, dia, horas, minutos, segundos)
   return dateNow.getTime();
}


const data = [
	{
		"id": 5,
		"qtdecoletada": null,
		"qtdedigitada": 130,
		"dtinicio": "2023-12-20T15:15:00.000Z",
		"dtfim": null,
		"estado": true,
		"op": 987654,
		"prodpadrao": 1500,
		"cavativ": 15,
		"cav": 1,
		"criadoEm": "2023-12-15T18:29:49.000Z",
		"atualizadoEm": "2024-01-02T16:34:27.000Z",
		"idprodutos": 7,
		"idmolde": 1,
		"idusuario": 1,
		"idmaquina": 1,
		"Refugos": [
			{
				"id": 12,
				"data": "2023-12-15T18:48:55.000Z",
				"quantidade": 10,
				"opproducao": 987654,
				"justificativa": "peça ruim",
				"criadoEm": "2023-12-15T18:48:55.000Z",
				"atualizadoEm": "2023-12-15T18:48:55.000Z",
				"idproducao": 5,
				"idmotivo": 4,
				"idcomponente": 2,
				"idmaquina": 1,
				"idusuario": 1
			}
		],
		"Paradas": [
			{
				"id": 44,
				"dataInicio": "2023-12-15T18:43:03.000Z",
				"dataFim": "2023-12-15T18:44:43.000Z",
				"opproducao": 987654,
				"tempoFimProducao": "0000-00-00 00:01:40",
				"estado": false,
				"justificativa": "Parada retomou automático",
				"criadoEm": "2023-12-15T18:43:03.000Z",
				"atualizadoEm": "2023-12-15T18:44:43.000Z",
				"idproducao": 5,
				"idusuario": 1,
				"idmaquina": 1,
				"idmotivo": 1
			},
			{
				"id": 45,
				"dataInicio": "2023-12-15T18:46:01.000Z",
				"dataFim": "2023-12-15T18:47:44.000Z",
				"opproducao": 987654,
				"tempoFimProducao": "0000-00-00 00:01:43",
				"estado": false,
				"justificativa": "finalizado parada maquina quebrada",
				"criadoEm": "2023-12-15T18:46:01.000Z",
				"atualizadoEm": "2023-12-15T18:47:44.000Z",
				"idproducao": 5,
				"idusuario": 1,
				"idmaquina": 1,
				"idmotivo": 2
			}
		],
		"Pecas": [
			{
				"id": 704,
				"data_inicio": "2023-12-15 15:34:3:678",
				"data_fim": "2023-12-15 15:34:13:88",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:34:13.000Z",
				"atualizadoEm": "2023-12-15T18:34:13.000Z",
				"idproducao": 5
			},
			{
				"id": 705,
				"data_inicio": "2023-12-15 15:34:23:246",
				"data_fim": "2023-12-15 15:34:32:656",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:34:32.000Z",
				"atualizadoEm": "2023-12-15T18:34:32.000Z",
				"idproducao": 5
			},
			{
				"id": 706,
				"data_inicio": "2023-12-15 15:34:31:374",
				"data_fim": "2023-12-15 15:34:40:784",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:34:40.000Z",
				"atualizadoEm": "2023-12-15T18:34:40.000Z",
				"idproducao": 5
			},
			{
				"id": 707,
				"data_inicio": "2023-12-15 15:34:33:112",
				"data_fim": "2023-12-15 15:34:42:522",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:34:42.000Z",
				"atualizadoEm": "2023-12-15T18:34:42.000Z",
				"idproducao": 5
			},
			{
				"id": 708,
				"data_inicio": "2023-12-15 15:34:34:632",
				"data_fim": "2023-12-15 15:34:44:42",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:34:44.000Z",
				"atualizadoEm": "2023-12-15T18:34:44.000Z",
				"idproducao": 5
			},
			{
				"id": 709,
				"data_inicio": "2023-12-15 15:35:5:789",
				"data_fim": "2023-12-15 15:35:15:199",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:35:15.000Z",
				"atualizadoEm": "2023-12-15T18:35:15.000Z",
				"idproducao": 5
			},
			{
				"id": 710,
				"data_inicio": "2023-12-15 15:35:8:469",
				"data_fim": "2023-12-15 15:35:17:879",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:35:17.000Z",
				"atualizadoEm": "2023-12-15T18:35:17.000Z",
				"idproducao": 5
			},
			{
				"id": 711,
				"data_inicio": "2023-12-15 15:35:25:193",
				"data_fim": "2023-12-15 15:35:34:603",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:35:34.000Z",
				"atualizadoEm": "2023-12-15T18:35:34.000Z",
				"idproducao": 5
			},
			{
				"id": 712,
				"data_inicio": "2023-12-15 15:35:28:468",
				"data_fim": "2023-12-15 15:35:37:878",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:35:37.000Z",
				"atualizadoEm": "2023-12-15T18:35:37.000Z",
				"idproducao": 5
			},
			{
				"id": 713,
				"data_inicio": "2023-12-15 15:36:13:425",
				"data_fim": "2023-12-15 15:36:14:835",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:36:14.000Z",
				"atualizadoEm": "2023-12-15T18:36:14.000Z",
				"idproducao": 5
			},
			{
				"id": 714,
				"data_inicio": "2023-12-15 15:36:22:881",
				"data_fim": "2023-12-15 15:36:24:291",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:36:24.000Z",
				"atualizadoEm": "2023-12-15T18:36:24.000Z",
				"idproducao": 5
			},
			{
				"id": 715,
				"data_inicio": "2023-12-15 15:37:12:868",
				"data_fim": "2023-12-15 15:37:14:278",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:37:14.000Z",
				"atualizadoEm": "2023-12-15T18:37:14.000Z",
				"idproducao": 5
			},
			{
				"id": 716,
				"data_inicio": "2023-12-15 15:37:55:459",
				"data_fim": "2023-12-15 15:37:56:269",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:37:56.000Z",
				"atualizadoEm": "2023-12-15T18:37:56.000Z",
				"idproducao": 5
			},
			{
				"id": 717,
				"data_inicio": "2023-12-15 15:38:7:792",
				"data_fim": "2023-12-15 15:38:8:202",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:38:08.000Z",
				"atualizadoEm": "2023-12-15T18:38:08.000Z",
				"idproducao": 5
			},
			{
				"id": 718,
				"data_inicio": "2023-12-15 15:38:18:996",
				"data_fim": "2023-12-15 15:38:19:406",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:38:19.000Z",
				"atualizadoEm": "2023-12-15T18:38:19.000Z",
				"idproducao": 5
			},
			{
				"id": 719,
				"data_inicio": "2023-12-15 15:38:34:872",
				"data_fim": "2023-12-15 15:38:35:282",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:38:35.000Z",
				"atualizadoEm": "2023-12-15T18:38:35.000Z",
				"idproducao": 5
			},
			{
				"id": 720,
				"data_inicio": "2023-12-15 15:38:34:927",
				"data_fim": "2023-12-15 15:38:35:337",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:38:35.000Z",
				"atualizadoEm": "2023-12-15T18:38:35.000Z",
				"idproducao": 5
			},
			{
				"id": 721,
				"data_inicio": "2023-12-15 15:38:44:440",
				"data_fim": "2023-12-15 15:38:44:850",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:38:44.000Z",
				"atualizadoEm": "2023-12-15T18:38:44.000Z",
				"idproducao": 5
			},
			{
				"id": 722,
				"data_inicio": "2023-12-15 15:39:0:242",
				"data_fim": "2023-12-15 15:39:0:652",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:39:00.000Z",
				"atualizadoEm": "2023-12-15T18:39:00.000Z",
				"idproducao": 5
			},
			{
				"id": 723,
				"data_inicio": "2023-12-15 15:39:0:251",
				"data_fim": "2023-12-15 15:39:0:661",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:39:00.000Z",
				"atualizadoEm": "2023-12-15T18:39:00.000Z",
				"idproducao": 5
			},
			{
				"id": 724,
				"data_inicio": "2023-12-15 15:39:5:38",
				"data_fim": "2023-12-15 15:39:5:748",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:39:05.000Z",
				"atualizadoEm": "2023-12-15T18:39:05.000Z",
				"idproducao": 5
			},
			{
				"id": 725,
				"data_inicio": "2023-12-15 15:39:43:205",
				"data_fim": "2023-12-15 15:39:44:15",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:39:44.000Z",
				"atualizadoEm": "2023-12-15T18:39:44.000Z",
				"idproducao": 5
			},
			{
				"id": 726,
				"data_inicio": "2023-12-15 15:40:24:82",
				"data_fim": "2023-12-15 15:40:24:892",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:40:24.000Z",
				"atualizadoEm": "2023-12-15T18:40:24.000Z",
				"idproducao": 5
			},
			{
				"id": 727,
				"data_inicio": "2023-12-15 15:40:28:777",
				"data_fim": "2023-12-15 15:40:29:587",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:40:29.000Z",
				"atualizadoEm": "2023-12-15T18:40:29.000Z",
				"idproducao": 5
			},
			{
				"id": 728,
				"data_inicio": "2023-12-15 15:40:35:484",
				"data_fim": "2023-12-15 15:40:36:94",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:40:36.000Z",
				"atualizadoEm": "2023-12-15T18:40:36.000Z",
				"idproducao": 5
			},
			{
				"id": 729,
				"data_inicio": "2023-12-15 15:40:39:306",
				"data_fim": "2023-12-15 15:40:39:916",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:40:39.000Z",
				"atualizadoEm": "2023-12-15T18:40:39.000Z",
				"idproducao": 5
			},
			{
				"id": 730,
				"data_inicio": "2023-12-15 15:40:40:768",
				"data_fim": "2023-12-15 15:40:41:378",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:40:41.000Z",
				"atualizadoEm": "2023-12-15T18:40:41.000Z",
				"idproducao": 5
			},
			{
				"id": 731,
				"data_inicio": "2023-12-15 15:40:46:744",
				"data_fim": "2023-12-15 15:40:47:754",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:40:47.000Z",
				"atualizadoEm": "2023-12-15T18:40:47.000Z",
				"idproducao": 5
			},
			{
				"id": 732,
				"data_inicio": "2023-12-15 15:40:54:375",
				"data_fim": "2023-12-15 15:40:56:385",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:40:56.000Z",
				"atualizadoEm": "2023-12-15T18:40:56.000Z",
				"idproducao": 5
			},
			{
				"id": 733,
				"data_inicio": "2023-12-15 15:40:57:35",
				"data_fim": "2023-12-15 15:40:59:45",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:40:59.000Z",
				"atualizadoEm": "2023-12-15T18:40:59.000Z",
				"idproducao": 5
			},
			{
				"id": 734,
				"data_inicio": "2023-12-15 15:41:10:97",
				"data_fim": "2023-12-15 15:41:11:597",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:41:11.000Z",
				"atualizadoEm": "2023-12-15T18:41:11.000Z",
				"idproducao": 5
			},
			{
				"id": 735,
				"data_inicio": "2023-12-15 15:41:17:851",
				"data_fim": "2023-12-15 15:41:19:351",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:41:19.000Z",
				"atualizadoEm": "2023-12-15T18:41:19.000Z",
				"idproducao": 5
			},
			{
				"id": 736,
				"data_inicio": "2023-12-15 15:41:27:949",
				"data_fim": "2023-12-15 15:41:29:449",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:41:29.000Z",
				"atualizadoEm": "2023-12-15T18:41:29.000Z",
				"idproducao": 5
			},
			{
				"id": 737,
				"data_inicio": "2023-12-15 15:41:36:734",
				"data_fim": "2023-12-15 15:41:37:634",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:41:37.000Z",
				"atualizadoEm": "2023-12-15T18:41:37.000Z",
				"idproducao": 5
			},
			{
				"id": 738,
				"data_inicio": "2023-12-15 15:42:19:376",
				"data_fim": "2023-12-15 15:42:20:276",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:42:20.000Z",
				"atualizadoEm": "2023-12-15T18:42:20.000Z",
				"idproducao": 5
			},
			{
				"id": 739,
				"data_inicio": "2023-12-15 15:42:22:831",
				"data_fim": "2023-12-15 15:42:23:731",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:42:23.000Z",
				"atualizadoEm": "2023-12-15T18:42:23.000Z",
				"idproducao": 5
			},
			{
				"id": 740,
				"data_inicio": "2023-12-15 15:44:44:692",
				"data_fim": "2023-12-15 15:44:45:592",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:44:45.000Z",
				"atualizadoEm": "2023-12-15T18:44:45.000Z",
				"idproducao": 5
			},
			{
				"id": 741,
				"data_inicio": "2023-12-15 15:44:58:482",
				"data_fim": "2023-12-15 15:44:59:382",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:44:59.000Z",
				"atualizadoEm": "2023-12-15T18:44:59.000Z",
				"idproducao": 5
			},
			{
				"id": 742,
				"data_inicio": "2023-12-15 15:45:43:414",
				"data_fim": "2023-12-15 15:45:44:314",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:45:44.000Z",
				"atualizadoEm": "2023-12-15T18:45:44.000Z",
				"idproducao": 5
			},
			{
				"id": 743,
				"data_inicio": "2023-12-15 15:50:42:290",
				"data_fim": "2023-12-15 15:50:43:190",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:50:43.000Z",
				"atualizadoEm": "2023-12-15T18:50:43.000Z",
				"idproducao": 5
			},
			{
				"id": 744,
				"data_inicio": "2023-12-15 15:50:44:201",
				"data_fim": "2023-12-15 15:50:45:101",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:50:45.000Z",
				"atualizadoEm": "2023-12-15T18:50:45.000Z",
				"idproducao": 5
			},
			{
				"id": 745,
				"data_inicio": "2023-12-15 15:50:45:536",
				"data_fim": "2023-12-15 15:50:46:436",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:50:46.000Z",
				"atualizadoEm": "2023-12-15T18:50:46.000Z",
				"idproducao": 5
			},
			{
				"id": 746,
				"data_inicio": "2023-12-15 15:50:46:575",
				"data_fim": "2023-12-15 15:50:47:475",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:50:47.000Z",
				"atualizadoEm": "2023-12-15T18:50:47.000Z",
				"idproducao": 5
			},
			{
				"id": 747,
				"data_inicio": "2023-12-15 15:50:47:931",
				"data_fim": "2023-12-15 15:50:48:831",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:50:48.000Z",
				"atualizadoEm": "2023-12-15T18:50:48.000Z",
				"idproducao": 5
			},
			{
				"id": 748,
				"data_inicio": "2023-12-15 15:50:52:362",
				"data_fim": "2023-12-15 15:50:53:262",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:50:53.000Z",
				"atualizadoEm": "2023-12-15T18:50:53.000Z",
				"idproducao": 5
			},
			{
				"id": 749,
				"data_inicio": "2023-12-15 15:50:57:598",
				"data_fim": "2023-12-15 15:50:58:498",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:50:58.000Z",
				"atualizadoEm": "2023-12-15T18:50:58.000Z",
				"idproducao": 5
			},
			{
				"id": 750,
				"data_inicio": "2023-12-15 15:50:58:987",
				"data_fim": "2023-12-15 15:50:59:887",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:50:59.000Z",
				"atualizadoEm": "2023-12-15T18:50:59.000Z",
				"idproducao": 5
			},
			{
				"id": 751,
				"data_inicio": "2023-12-15 15:51:0:472",
				"data_fim": "2023-12-15 15:51:1:372",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:51:01.000Z",
				"atualizadoEm": "2023-12-15T18:51:01.000Z",
				"idproducao": 5
			},
			{
				"id": 752,
				"data_inicio": "2023-12-15 15:51:1:711",
				"data_fim": "2023-12-15 15:51:2:611",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:51:02.000Z",
				"atualizadoEm": "2023-12-15T18:51:02.000Z",
				"idproducao": 5
			},
			{
				"id": 753,
				"data_inicio": "2023-12-15 15:51:3:173",
				"data_fim": "2023-12-15 15:51:4:73",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:51:04.000Z",
				"atualizadoEm": "2023-12-15T18:51:04.000Z",
				"idproducao": 5
			},
			{
				"id": 754,
				"data_inicio": "2023-12-15 15:51:4:364",
				"data_fim": "2023-12-15 15:51:5:264",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:51:05.000Z",
				"atualizadoEm": "2023-12-15T18:51:05.000Z",
				"idproducao": 5
			},
			{
				"id": 755,
				"data_inicio": "2023-12-15 15:51:5:778",
				"data_fim": "2023-12-15 15:51:6:678",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:51:06.000Z",
				"atualizadoEm": "2023-12-15T18:51:06.000Z",
				"idproducao": 5
			},
			{
				"id": 756,
				"data_inicio": "2023-12-15 15:51:7:371",
				"data_fim": "2023-12-15 15:51:8:271",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:51:08.000Z",
				"atualizadoEm": "2023-12-15T18:51:08.000Z",
				"idproducao": 5
			},
			{
				"id": 757,
				"data_inicio": "2023-12-15 15:51:8:495",
				"data_fim": "2023-12-15 15:51:9:395",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:51:09.000Z",
				"atualizadoEm": "2023-12-15T18:51:09.000Z",
				"idproducao": 5
			},
			{
				"id": 758,
				"data_inicio": "2023-12-15 15:51:9:953",
				"data_fim": "2023-12-15 15:51:10:853",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:51:10.000Z",
				"atualizadoEm": "2023-12-15T18:51:10.000Z",
				"idproducao": 5
			},
			{
				"id": 759,
				"data_inicio": "2023-12-15 15:51:9:989",
				"data_fim": "2023-12-15 15:51:10:889",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T18:51:10.000Z",
				"atualizadoEm": "2023-12-15T18:51:10.000Z",
				"idproducao": 5
			},
			{
				"id": 760,
				"data_inicio": "2023-12-15 16:2:20:520",
				"data_fim": "2023-12-15 16:2:21:420",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:21.000Z",
				"atualizadoEm": "2023-12-15T19:02:21.000Z",
				"idproducao": 5
			},
			{
				"id": 761,
				"data_inicio": "2023-12-15 16:2:21:789",
				"data_fim": "2023-12-15 16:2:22:689",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:22.000Z",
				"atualizadoEm": "2023-12-15T19:02:22.000Z",
				"idproducao": 5
			},
			{
				"id": 762,
				"data_inicio": "2023-12-15 16:2:22:687",
				"data_fim": "2023-12-15 16:2:23:587",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:23.000Z",
				"atualizadoEm": "2023-12-15T19:02:23.000Z",
				"idproducao": 5
			},
			{
				"id": 763,
				"data_inicio": "2023-12-15 16:2:23:459",
				"data_fim": "2023-12-15 16:2:24:359",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:24.000Z",
				"atualizadoEm": "2023-12-15T19:02:24.000Z",
				"idproducao": 5
			},
			{
				"id": 764,
				"data_inicio": "2023-12-15 16:2:24:287",
				"data_fim": "2023-12-15 16:2:25:187",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:25.000Z",
				"atualizadoEm": "2023-12-15T19:02:25.000Z",
				"idproducao": 5
			},
			{
				"id": 765,
				"data_inicio": "2023-12-15 16:2:25:103",
				"data_fim": "2023-12-15 16:2:26:3",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:26.000Z",
				"atualizadoEm": "2023-12-15T19:02:26.000Z",
				"idproducao": 5
			},
			{
				"id": 766,
				"data_inicio": "2023-12-15 16:2:25:838",
				"data_fim": "2023-12-15 16:2:26:738",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:26.000Z",
				"atualizadoEm": "2023-12-15T19:02:26.000Z",
				"idproducao": 5
			},
			{
				"id": 767,
				"data_inicio": "2023-12-15 16:2:27:346",
				"data_fim": "2023-12-15 16:2:28:246",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:28.000Z",
				"atualizadoEm": "2023-12-15T19:02:28.000Z",
				"idproducao": 5
			},
			{
				"id": 768,
				"data_inicio": "2023-12-15 16:2:28:188",
				"data_fim": "2023-12-15 16:2:29:88",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:29.000Z",
				"atualizadoEm": "2023-12-15T19:02:29.000Z",
				"idproducao": 5
			},
			{
				"id": 769,
				"data_inicio": "2023-12-15 16:2:28:965",
				"data_fim": "2023-12-15 16:2:29:865",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:29.000Z",
				"atualizadoEm": "2023-12-15T19:02:29.000Z",
				"idproducao": 5
			},
			{
				"id": 770,
				"data_inicio": "2023-12-15 16:2:29:826",
				"data_fim": "2023-12-15 16:2:30:726",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:30.000Z",
				"atualizadoEm": "2023-12-15T19:02:30.000Z",
				"idproducao": 5
			},
			{
				"id": 771,
				"data_inicio": "2023-12-15 16:2:30:562",
				"data_fim": "2023-12-15 16:2:31:462",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:31.000Z",
				"atualizadoEm": "2023-12-15T19:02:31.000Z",
				"idproducao": 5
			},
			{
				"id": 772,
				"data_inicio": "2023-12-15 16:2:31:229",
				"data_fim": "2023-12-15 16:2:32:129",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:32.000Z",
				"atualizadoEm": "2023-12-15T19:02:32.000Z",
				"idproducao": 5
			},
			{
				"id": 773,
				"data_inicio": "2023-12-15 16:2:32:41",
				"data_fim": "2023-12-15 16:2:32:941",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:32.000Z",
				"atualizadoEm": "2023-12-15T19:02:32.000Z",
				"idproducao": 5
			},
			{
				"id": 774,
				"data_inicio": "2023-12-15 16:2:32:739",
				"data_fim": "2023-12-15 16:2:33:639",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:33.000Z",
				"atualizadoEm": "2023-12-15T19:02:33.000Z",
				"idproducao": 5
			},
			{
				"id": 775,
				"data_inicio": "2023-12-15 16:2:33:434",
				"data_fim": "2023-12-15 16:2:34:334",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:34.000Z",
				"atualizadoEm": "2023-12-15T19:02:34.000Z",
				"idproducao": 5
			},
			{
				"id": 776,
				"data_inicio": "2023-12-15 16:2:34:152",
				"data_fim": "2023-12-15 16:2:35:52",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:35.000Z",
				"atualizadoEm": "2023-12-15T19:02:35.000Z",
				"idproducao": 5
			},
			{
				"id": 777,
				"data_inicio": "2023-12-15 16:2:34:794",
				"data_fim": "2023-12-15 16:2:35:694",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:35.000Z",
				"atualizadoEm": "2023-12-15T19:02:35.000Z",
				"idproducao": 5
			},
			{
				"id": 778,
				"data_inicio": "2023-12-15 16:2:35:484",
				"data_fim": "2023-12-15 16:2:36:384",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:36.000Z",
				"atualizadoEm": "2023-12-15T19:02:36.000Z",
				"idproducao": 5
			},
			{
				"id": 779,
				"data_inicio": "2023-12-15 16:2:36:104",
				"data_fim": "2023-12-15 16:2:37:4",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:37.000Z",
				"atualizadoEm": "2023-12-15T19:02:37.000Z",
				"idproducao": 5
			},
			{
				"id": 780,
				"data_inicio": "2023-12-15 16:2:36:923",
				"data_fim": "2023-12-15 16:2:37:823",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:37.000Z",
				"atualizadoEm": "2023-12-15T19:02:37.000Z",
				"idproducao": 5
			},
			{
				"id": 781,
				"data_inicio": "2023-12-15 16:2:37:575",
				"data_fim": "2023-12-15 16:2:38:475",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:38.000Z",
				"atualizadoEm": "2023-12-15T19:02:38.000Z",
				"idproducao": 5
			},
			{
				"id": 782,
				"data_inicio": "2023-12-15 16:2:38:279",
				"data_fim": "2023-12-15 16:2:39:179",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:39.000Z",
				"atualizadoEm": "2023-12-15T19:02:39.000Z",
				"idproducao": 5
			},
			{
				"id": 783,
				"data_inicio": "2023-12-15 16:2:38:987",
				"data_fim": "2023-12-15 16:2:39:887",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:39.000Z",
				"atualizadoEm": "2023-12-15T19:02:39.000Z",
				"idproducao": 5
			},
			{
				"id": 784,
				"data_inicio": "2023-12-15 16:2:39:543",
				"data_fim": "2023-12-15 16:2:40:443",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:40.000Z",
				"atualizadoEm": "2023-12-15T19:02:40.000Z",
				"idproducao": 5
			},
			{
				"id": 785,
				"data_inicio": "2023-12-15 16:2:40:282",
				"data_fim": "2023-12-15 16:2:41:182",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:41.000Z",
				"atualizadoEm": "2023-12-15T19:02:41.000Z",
				"idproducao": 5
			},
			{
				"id": 786,
				"data_inicio": "2023-12-15 16:2:40:962",
				"data_fim": "2023-12-15 16:2:41:862",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:41.000Z",
				"atualizadoEm": "2023-12-15T19:02:41.000Z",
				"idproducao": 5
			},
			{
				"id": 787,
				"data_inicio": "2023-12-15 16:2:41:590",
				"data_fim": "2023-12-15 16:2:42:490",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:42.000Z",
				"atualizadoEm": "2023-12-15T19:02:42.000Z",
				"idproducao": 5
			},
			{
				"id": 788,
				"data_inicio": "2023-12-15 16:2:42:222",
				"data_fim": "2023-12-15 16:2:43:122",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:43.000Z",
				"atualizadoEm": "2023-12-15T19:02:43.000Z",
				"idproducao": 5
			},
			{
				"id": 789,
				"data_inicio": "2023-12-15 16:2:42:843",
				"data_fim": "2023-12-15 16:2:43:743",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:02:43.000Z",
				"atualizadoEm": "2023-12-15T19:02:43.000Z",
				"idproducao": 5
			},
			{
				"id": 790,
				"data_inicio": "2023-12-15 16:4:31:136",
				"data_fim": "2023-12-15 16:4:32:36",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:32.000Z",
				"atualizadoEm": "2023-12-15T19:04:32.000Z",
				"idproducao": 5
			},
			{
				"id": 791,
				"data_inicio": "2023-12-15 16:4:32:16",
				"data_fim": "2023-12-15 16:4:32:916",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:32.000Z",
				"atualizadoEm": "2023-12-15T19:04:32.000Z",
				"idproducao": 5
			},
			{
				"id": 792,
				"data_inicio": "2023-12-15 16:4:32:770",
				"data_fim": "2023-12-15 16:4:33:670",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:33.000Z",
				"atualizadoEm": "2023-12-15T19:04:33.000Z",
				"idproducao": 5
			},
			{
				"id": 793,
				"data_inicio": "2023-12-15 16:4:33:447",
				"data_fim": "2023-12-15 16:4:34:347",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:34.000Z",
				"atualizadoEm": "2023-12-15T19:04:34.000Z",
				"idproducao": 5
			},
			{
				"id": 794,
				"data_inicio": "2023-12-15 16:4:34:139",
				"data_fim": "2023-12-15 16:4:35:39",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:35.000Z",
				"atualizadoEm": "2023-12-15T19:04:35.000Z",
				"idproducao": 5
			},
			{
				"id": 795,
				"data_inicio": "2023-12-15 16:4:34:978",
				"data_fim": "2023-12-15 16:4:35:878",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:35.000Z",
				"atualizadoEm": "2023-12-15T19:04:35.000Z",
				"idproducao": 5
			},
			{
				"id": 796,
				"data_inicio": "2023-12-15 16:4:35:669",
				"data_fim": "2023-12-15 16:4:36:569",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:36.000Z",
				"atualizadoEm": "2023-12-15T19:04:36.000Z",
				"idproducao": 5
			},
			{
				"id": 797,
				"data_inicio": "2023-12-15 16:4:36:205",
				"data_fim": "2023-12-15 16:4:37:105",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:37.000Z",
				"atualizadoEm": "2023-12-15T19:04:37.000Z",
				"idproducao": 5
			},
			{
				"id": 798,
				"data_inicio": "2023-12-15 16:4:36:754",
				"data_fim": "2023-12-15 16:4:37:654",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:37.000Z",
				"atualizadoEm": "2023-12-15T19:04:37.000Z",
				"idproducao": 5
			},
			{
				"id": 799,
				"data_inicio": "2023-12-15 16:4:37:257",
				"data_fim": "2023-12-15 16:4:38:157",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:38.000Z",
				"atualizadoEm": "2023-12-15T19:04:38.000Z",
				"idproducao": 5
			},
			{
				"id": 800,
				"data_inicio": "2023-12-15 16:4:51:352",
				"data_fim": "2023-12-15 16:4:52:252",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:52.000Z",
				"atualizadoEm": "2023-12-15T19:04:52.000Z",
				"idproducao": 5
			},
			{
				"id": 801,
				"data_inicio": "2023-12-15 16:4:52:183",
				"data_fim": "2023-12-15 16:4:53:83",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:53.000Z",
				"atualizadoEm": "2023-12-15T19:04:53.000Z",
				"idproducao": 5
			},
			{
				"id": 802,
				"data_inicio": "2023-12-15 16:4:52:925",
				"data_fim": "2023-12-15 16:4:53:825",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:53.000Z",
				"atualizadoEm": "2023-12-15T19:04:53.000Z",
				"idproducao": 5
			},
			{
				"id": 803,
				"data_inicio": "2023-12-15 16:4:53:481",
				"data_fim": "2023-12-15 16:4:54:381",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:54.000Z",
				"atualizadoEm": "2023-12-15T19:04:54.000Z",
				"idproducao": 5
			},
			{
				"id": 804,
				"data_inicio": "2023-12-15 16:4:54:204",
				"data_fim": "2023-12-15 16:4:55:104",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:55.000Z",
				"atualizadoEm": "2023-12-15T19:04:55.000Z",
				"idproducao": 5
			},
			{
				"id": 805,
				"data_inicio": "2023-12-15 16:4:54:857",
				"data_fim": "2023-12-15 16:4:55:757",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:55.000Z",
				"atualizadoEm": "2023-12-15T19:04:55.000Z",
				"idproducao": 5
			},
			{
				"id": 806,
				"data_inicio": "2023-12-15 16:4:55:934",
				"data_fim": "2023-12-15 16:4:56:834",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:56.000Z",
				"atualizadoEm": "2023-12-15T19:04:56.000Z",
				"idproducao": 5
			},
			{
				"id": 807,
				"data_inicio": "2023-12-15 16:4:56:633",
				"data_fim": "2023-12-15 16:4:57:533",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:57.000Z",
				"atualizadoEm": "2023-12-15T19:04:57.000Z",
				"idproducao": 5
			},
			{
				"id": 808,
				"data_inicio": "2023-12-15 16:4:57:268",
				"data_fim": "2023-12-15 16:4:58:168",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:58.000Z",
				"atualizadoEm": "2023-12-15T19:04:58.000Z",
				"idproducao": 5
			},
			{
				"id": 809,
				"data_inicio": "2023-12-15 16:4:57:871",
				"data_fim": "2023-12-15 16:4:58:771",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:58.000Z",
				"atualizadoEm": "2023-12-15T19:04:58.000Z",
				"idproducao": 5
			},
			{
				"id": 810,
				"data_inicio": "2023-12-15 16:4:58:435",
				"data_fim": "2023-12-15 16:4:59:335",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:59.000Z",
				"atualizadoEm": "2023-12-15T19:04:59.000Z",
				"idproducao": 5
			},
			{
				"id": 811,
				"data_inicio": "2023-12-15 16:4:59:27",
				"data_fim": "2023-12-15 16:4:59:927",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:04:59.000Z",
				"atualizadoEm": "2023-12-15T19:04:59.000Z",
				"idproducao": 5
			},
			{
				"id": 812,
				"data_inicio": "2023-12-15 16:4:59:621",
				"data_fim": "2023-12-15 16:5:0:521",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:05:00.000Z",
				"atualizadoEm": "2023-12-15T19:05:00.000Z",
				"idproducao": 5
			},
			{
				"id": 813,
				"data_inicio": "2023-12-15 16:5:0:191",
				"data_fim": "2023-12-15 16:5:1:91",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:05:01.000Z",
				"atualizadoEm": "2023-12-15T19:05:01.000Z",
				"idproducao": 5
			},
			{
				"id": 814,
				"data_inicio": "2023-12-15 16:5:0:681",
				"data_fim": "2023-12-15 16:5:1:581",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:05:01.000Z",
				"atualizadoEm": "2023-12-15T19:05:01.000Z",
				"idproducao": 5
			},
			{
				"id": 815,
				"data_inicio": "2023-12-15 16:5:1:415",
				"data_fim": "2023-12-15 16:5:2:315",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:05:02.000Z",
				"atualizadoEm": "2023-12-15T19:05:02.000Z",
				"idproducao": 5
			},
			{
				"id": 816,
				"data_inicio": "2023-12-15 16:5:2:181",
				"data_fim": "2023-12-15 16:5:3:81",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:05:03.000Z",
				"atualizadoEm": "2023-12-15T19:05:03.000Z",
				"idproducao": 5
			},
			{
				"id": 817,
				"data_inicio": "2023-12-15 16:5:2:941",
				"data_fim": "2023-12-15 16:5:3:841",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:05:03.000Z",
				"atualizadoEm": "2023-12-15T19:05:03.000Z",
				"idproducao": 5
			},
			{
				"id": 818,
				"data_inicio": "2023-12-15 16:5:3:622",
				"data_fim": "2023-12-15 16:5:4:522",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:05:04.000Z",
				"atualizadoEm": "2023-12-15T19:05:04.000Z",
				"idproducao": 5
			},
			{
				"id": 819,
				"data_inicio": "2023-12-15 16:5:4:291",
				"data_fim": "2023-12-15 16:5:5:191",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:05:05.000Z",
				"atualizadoEm": "2023-12-15T19:05:05.000Z",
				"idproducao": 5
			},
			{
				"id": 820,
				"data_inicio": "2023-12-15 16:5:5:96",
				"data_fim": "2023-12-15 16:5:5:996",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:05:05.000Z",
				"atualizadoEm": "2023-12-15T19:05:05.000Z",
				"idproducao": 5
			},
			{
				"id": 821,
				"data_inicio": "2023-12-15 16:5:5:986",
				"data_fim": "2023-12-15 16:5:6:886",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:05:06.000Z",
				"atualizadoEm": "2023-12-15T19:05:06.000Z",
				"idproducao": 5
			},
			{
				"id": 822,
				"data_inicio": "2023-12-15 16:5:6:742",
				"data_fim": "2023-12-15 16:5:7:642",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:05:07.000Z",
				"atualizadoEm": "2023-12-15T19:05:07.000Z",
				"idproducao": 5
			},
			{
				"id": 823,
				"data_inicio": "2023-12-15 16:5:7:589",
				"data_fim": "2023-12-15 16:5:8:489",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:05:08.000Z",
				"atualizadoEm": "2023-12-15T19:05:08.000Z",
				"idproducao": 5
			},
			{
				"id": 824,
				"data_inicio": "2023-12-15 16:5:8:408",
				"data_fim": "2023-12-15 16:5:9:308",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:05:09.000Z",
				"atualizadoEm": "2023-12-15T19:05:09.000Z",
				"idproducao": 5
			},
			{
				"id": 825,
				"data_inicio": "2023-12-15 16:5:9:232",
				"data_fim": "2023-12-15 16:5:10:132",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:05:10.000Z",
				"atualizadoEm": "2023-12-15T19:05:10.000Z",
				"idproducao": 5
			},
			{
				"id": 826,
				"data_inicio": "2023-12-15 16:5:9:961",
				"data_fim": "2023-12-15 16:5:10:861",
				"idmaquina": 1,
				"criadoEm": "2023-12-15T19:05:10.000Z",
				"atualizadoEm": "2023-12-15T19:05:10.000Z",
				"idproducao": 5
			}
		],
		"Produto": {
			"id": 7,
			"nome": "teste2",
			"pecas_ciclos": 15,
			"t_padrao": 1500,
			"criadoEm": "2023-09-28T18:36:32.000Z",
			"atualizadoEm": "2023-09-28T18:36:32.000Z"
		}
	}
]

var totalPecas = data[0].Pecas.length
var timeTotalParada = []

for (var i in data[0].Paradas) {
    let timeParada = calculoHorasParada(data[0].Paradas[i].tempoFimProducao)
    timeTotalParada.push(timeParada);
}

console.log(timeTotalParada);

// Criando dois timestamps
//var timestamp1 = 2209062212000; // Timestamp correspondente a uma data específica
//var timestamp2 = 2209062212000; // Outro timestamp correspondente a uma data posterior

// Calculando a diferença em milissegundos
//var diferencaEmMilissegundos = timestamp2;

// Convertendo a diferença para outras unidades de tempo, se necessário
//var diferencaEmSegundos = diferencaEmMilissegundos / 1000;
//var diferencaEmMinutos = diferencaEmMilissegundos / (1000 * 60);
//var diferencaEmHoras = diferencaEmMilissegundos / (1000 * 60 * 60);
//var diferencaEmDias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);

//var datalimte = new Date(-2209062212000);
//console.log(datalimte.getMinutes());


// Função de dois elementos
function somarTempoTimestamp(data, data2) {
    var novaData = new Date(data);
    var novaData2 = new Date(data2);
	
	novaData.setMonth(novaData.getMonth() + novaData2.getMonth())
    //Somando dias
    novaData.setDate(novaData.getDate() + novaData2.getDate());
     //Somando horas
    novaData.setHours(novaData.getHours() + novaData2.getHours());
     //Somando minutos
    novaData.setMinutes(novaData.getMinutes() + novaData2.getMinutes());
     //Somando segundos
    novaData.setSeconds(novaData.getSeconds() + novaData2.getSeconds());

    return novaData;
}

function subTempoTimestamp(data, data2) {
    var novaData = new Date(data);
    var novaData2 = new Date(data2)
    console.log(novaData)
    console.log(novaData2)
    if( (novaData.getFullYear == 1899 && novaData.getMonth == 12 && novaData.getDate() == 31) ) {
        novaData.getFullYear = 1970
        novaData.getMonth = 0
        novaData.getDate() = 0

    }

    if ( (novaData2.getFullYear == 1899 && novaData2.getMonth == 12 && novaData2.getDate() == 31)) {
        novaData2.getFullYear = 1970
        novaData2.getMonth = 0
        novaData2.getDate() = 0
    }
    // Somando dias
    novaData.setDate(novaData2.getDate() - novaData.getDate());
    
    // Somando horas
    novaData.setHours(novaData2.getHours() - novaData.getHours());
  
    // Somando minutos
    novaData.setMinutes(novaData2.getMinutes() - novaData.getMinutes());
  
    // Somando segundos
    novaData.setSeconds(novaData2.getSeconds() - novaData.getSeconds());
  
    return novaData;
}

function horasTime(data) {
    var novaData = new Date(data);
    console.log(novaData.getDate(), novaData.getHours(), novaData.getMinutes(), novaData.getSeconds())
	var dia
    // Somando dias
	if(novaData.getDate() == 1 || novaData.getFullYear() == 1899) {
		dia	= 0
		console.log('0')
	} else {
		console.log(novaData.getDate() - 1)
		dia	= (Number(novaData.getDate()) - 1) * 24
		
	}
     
  
    // Somando horas
    var horas = Number(novaData.getHours())
  
    // Somando minutos
    var minutos = Number(novaData.getMinutes()) / 60
  
    // Somando segundos
    var segundos = Number(novaData.getSeconds()) / 3600
	console.log(dia, horas, minutos, segundos)
    let soma = dia + horas + minutos + segundos;
	console.log(soma)
    
}


  
// Exemplo de uso
//var dataInicial = new Date(-2209062212000);
//var novaData = somarTempo(dataInicial, -2209062212000);
//
//console.log("Data inicial: ", dataInicial);
//console.log("Nova data após somar: ", novaData);



const sumWithInitial = timeTotalParada.reduce(
  (accumulator, currentValue) => somarTempoTimestamp(accumulator, currentValue),
  -2209064012000
);
console.log(sumWithInitial)

//console.log(timeMilisegundosVariavel("2023-12-15T18:30:00.000Z", "2023-12-15T19:30:00.000Z"))
//console.log(calculoHorasParada("2023-12-13 17:20:00"))
//const data321 = calculoHorasParada("0000-00-01 05:20:00");
//horasTime("1900-00-00T00:00:00.000Z")
//dtop = new Date(sumWithInitial);
//console.log(dtop.getHours(), dtop.getMinutes())
//console.log(calculoHorasParada("0000-00-00 00:00:00:0000"))
//console.log(Datetime(-2209064012000))
//horasTime(Datetime("1899-12-31T04:06:28.000Z"))


let vl2 = data[0].Produto.t_padrao
console.log(vl2)

//for (let i in vl2 ) {
//	console.log(data[0].Refugos[i].quantidade)
//}

//console.log(convertDatetimeOnTimesTampMysql('2024-01-02 10:34:25'));
//console.log(Datetime('2024-01-02T13:34:25.000Z'))
//console.log(new Date().getMonth())
//console.log(data[0].idmaquina)

function convertDatetimeOnTimesMiliSegundosTampMysql(dateTme) {
    // Quebrando a string em partes
    const partes = dateTme.split(' ');
    
    // Separando a parte da data e da hora
    const dataParte = partes[0]; // '2023-10-1'
    let ano1 = dataParte.slice(0,4);
    let mes1 = parseInt(dataParte.slice(5,7)) - 1;
    let dia1 = parseInt(dataParte.slice(8,10));

    const horaParte = partes[1]; // '7:2:31:206'
    
    //Convertendo a parte da data para um objeto Date
    const dataObjeto = new Date(ano1, mes1, dia1);
    const ano = dataObjeto.getFullYear();
    const mes = dataObjeto.getMonth();
    const dia = dataObjeto.getDate();
    //
    //Separando a parte da hora em partes menores
    const horaPartesMenores = horaParte.split(':');
    
    const horas = parseInt(horaPartesMenores[0]); // 7
    const minutos = parseInt(horaPartesMenores[1]); // 2
    const segundos = parseInt(horaPartesMenores[2]);
    const milisegundos = parseInt(horaPartesMenores[3]); // 31

    const dataHora = [ano, mes, dia, horas, minutos, segundos, milisegundos];
    const timeStamp = dataHora
    return timeStamp
}
const dta = new Date()
const dt = convertDatetimeOnTimesMiliSegundosTampMysql('2023-12-15 15:34:3:678')
console.log(dt);
console.log(Datetime())