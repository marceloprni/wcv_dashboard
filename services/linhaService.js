const { Op, Sequelize, QueryTypes} = require("sequelize");
const connection = require('../database/database'); 
const { AplicacaoErro } = require("../erros/typeErros")

// COLOCAR 0 NA FRENTE DOS NUMEROS DE 0 - 9
function Inserir0Date(valor1) {
    if(valor1 < 10) {
        return "0" + valor1;
    } else {
        return valor1;
    }
}

/* TRATAMENTO DE TEMPO */
function diasPlus(input) {
    const datePart = input.slice(0,8);

    const dia = datePart.slice(0,2);
    const mes = datePart.slice(2,4);
    const ano = datePart.slice(4,8);
    const totalDias = new Date(ano, mes, 0).getDate();
    const resultado = totalDias == 28 ? 28 : 
                      totalDias == 29 ? 29 : 
                      totalDias == 30 ? 30 : 
                      totalDias == 31 ? 31 : null;
    if(resultado == dia) {
        const day = Inserir0Date(1)
        return `${ano}-${mes}-${day}`
    } else {
        const day2 = Inserir0Date(Number(dia) + 1)
        return `${ano}-${mes}-${day2}`
    }
}

/* CONVERTE O TEMPO NO FORMATO CERTO */
function formatDateTime(input) {
    const datePart = input.slice(0,8);
    const timePart = input.slice(8);

    const dia = datePart.slice(0,2);
    const mes = datePart.slice(2,4);
    const ano = datePart.slice(4,8);

    const horas = timePart.slice(0,2);
    const minutos = timePart.slice(2,4);
    const segundos = timePart.slice(4,6);

    return `${ano}-${mes}-${dia}`
}



async function criarComboBox() {
    let linhaDados;

    try {
        linhaDados = await connection.query(`
                SELECT LIN_CODIGO_LINHA, LIN_CT, LIN_MAQUINA, LIN_NOME_LINHA 
                FROM LINHA 
                WHERE LIN_STATUS = 0 ORDER BY LIN_CT, LIN_MAQUINA ASC;
            `,
            {
                type: QueryTypes.SELECT,
            })
        return linhaDados
      
    } catch (error) {
        return AplicacaoErro(500, 'Erro na query produtos ou valor invalido')
    }
}


async function criarDadosSelecao(linha, data, turno, linhaValor) {
    let linha1 = linha.substr(0,4)
    let linha2 = linha.substr(4)
    let data1 = formatDateTime(data)
    let turno1 = turno
    let linhaValue = linhaValor
    let dadosGeraisAbsenteismo 
    let dadosGeraisCalculoSemAcidente
    let dadosGeraisCalculoDeReclamacoes
    let dadosGeraisCalculoDeFTQ
    let dadosGeraisCalculoScrap
    let dadosGeraisCalculoPecasProduzidas
    let dadosGeraisCalculoEficiencia
    let dadosGeraisCalculoProdutividade
    let dadosGeraisCalculoHoraProduzida
    let dadosGeraisParadaProgramada
    let dadosGeraisParadaNaoProgramada
    let dadosGeraisCalculoParada
    let targetGerais
    let situacaoLinha
    console.log(linha1, linha2, data1, turno1, linhaValue)

    try {
        
        // ABSENTEÍSMO
        dadosGeraisAbsenteismo = await connection.query(`
                SELECT * FROM TAB_CONTROLE_FALTA 
                WHERE DATA = '${data1}'
                AND TURNO = ${turno1};
            `,
            {
                type: QueryTypes.SELECT,
            })

        // CALCULO DOS DIAS SEM ACIDENTE
        dadosGeraisCalculoSemAcidente = await connection.query(`
            SELECT DATA, (DATEDIFF(DAY,DATA,GETDATE())) AS DIFERENCA FROM TAB_ACIDENTES WHERE TIPO = 'COM AFASTAMENTO' ORDER BY DATA DESC;
        `,
        {
            type: QueryTypes.SELECT,
        })

        // CALCULO DE RECLAMAÇÕES
        dadosGeraisCalculoDeReclamacoes = await connection.query(`
                SELECT *
                FROM TAB_RECLAMACOES 
                WHERE DATA <= '${data1}' 
                AND MONTH(DATA) = MONTH(GETDATE());
            `,
        {
            type: QueryTypes.SELECT,
        })

        // CALCULO DE FTQ
        dadosGeraisCalculoDeFTQ = await connection.query(`
            SELECT RFTQ_PART_NUMBER AS PARTNUMBER, LIN_CT AS CT, LIN_MAQUINA AS MAQUINA, RFTQ_QUANTIDADE AS QTD, RFTQ_TURNO AS TURNO, RFTQ_DATA AS DATA 
            FROM RELATORIO_FTQ INNER JOIN LINHA ON LIN_CODIGO_LINHA = RFTQ_CODIGO_LINHA LEFT JOIN MOTIVO_FTQ ON MF_CODIGO_FTQ = RFTQ_CODIGO_FTQ 
            WHERE LIN_CT = ${linha1}
            AND LIN_MAQUINA LIKE ${linha2}
            AND CONVERT(DATE, RFTQ_DATA) = '${data1}' 
            AND RFTQ_TURNO = ${turno1}
            ORDER BY RFTQ_DATA;
        `,
        {
            type: QueryTypes.SELECT,
        })

       
        
        //CALCULO DO SCRAP
        dadosGeraisCalculoScrap = await connection.query(`
            SELECT *
            FROM relatorio_scrap INNER JOIN MOTIVO_SCRAP ON RSCP_CODIGO_SCRAP = MSCR_CODIGO_SCRAP
            LEFT JOIN SCRAP_VALORES on RSCP_PART_NUMBER = SCV_PN
            AND YEAR(rscp_data) = SCV_ANO AND MONTH(rscp_data) = SCV_MES
            WHERE CONVERT(DATE, RSCP_DATA) = '${data1}'
            AND RSCP_CT = ${linha1}
            AND RSCP_CT NOT IN ('RETRABA','ENGPROD','R.DISPPI','RECEBE','SCRAPLAS')
            AND RSCP_MAQUINA = ${linha2}
            AND RSCP_TURNO = ${turno1} 
            AND RSCP_MEDIDA = 'PC';
        `,
        {
            type: QueryTypes.SELECT,
        })
        
        // Cálculo das peças produzidas
        dadosGeraisCalculoPecasProduzidas = await connection.query(`
                    SELECT ETQ_BARCODE, ETQ_PARTINUMBER, ETQ_CODIGO_ORDEM, ETQ_COD_LINHA, ETQ_CODIGO_ORDEM, LIN_CT, LIN_MAQUINA, ETQ_QUANTIDADE
                    FROM ETIQUETA inner join linha on LIN_CODIGO_LINHA = ETQ_COD_LINHA 
                    WHERE LIN_CT = ${linha1}  AND LIN_MAQUINA LIKE ${linha2} AND CONVERT(DATE, ETQ_DATA) = '${data1}'
                    AND((CONVERT(VARCHAR(8), ETQ_DATA, 114) BETWEEN '06:55:01' AND '16:43:00' AND 1 = ${turno1}) OR 
                    (CONVERT(VARCHAR(8), ETQ_DATA, 114) BETWEEN '16:43:01' AND '23:59:59' AND 2 = ${turno1}) OR 
                    (CONVERT(VARCHAR(8), ETQ_DATA, 114) BETWEEN '00:00:00' AND '01:51:00' AND 2 = ${turno1}) OR 
                    (CONVERT(VARCHAR(8), ETQ_DATA, 114) BETWEEN '01:51:01' AND '06:55:00' AND 3 = ${turno1}))
                    AND ETQ_VERIFICACAO = 0 AND ETQ_STATUS = 'OK' order by etq_data;
                `,
                {
                    type: QueryTypes.SELECT,
                })
        
        // Cálculo da eficiência
        dadosGeraisCalculoEficiencia = await connection.query(`
                                        DECLARE @DataInicio AS DATETIME = '${data1}'
                                        DECLARE @DataFim AS DATETIME = '${data1}'
                                        DECLARE @CodLinha AS INT = ${linha2}

                                        DECLARE @dias AS INT = (SELECT DATEDIFF(DAY, @DataInicio, DATEADD(day, 1 ,@DataFim)))


                                        DECLARE @tempoTotalDisponivelParaTrabalho AS INT = @dias * 24;

                                        DECLARE @horasParadasProgramadas AS DECIMAL(18,2) = (SELECT CONVERT(DECIMAL(15,2),(SUM(R.RPAR_DURACAO)))
                                        FROM RELATORIO_PARADA R
                                        INNER JOIN MOTIVO_PARADA M
                                        ON M.MP_CODIGO_PARADA = R.RPAR_CODIGO_PARADA
                                        WHERE M.MP_TIPO = 0
                                        AND R.RPAR_CODIGO_LINHA = @CodLinha
                                        AND R.RPAR_DATA_INICIO >= @DataInicio AND R.RPAR_DATA_INICIO <= DATEADD(day, 1 ,@DataFim));



                                        IF (@horasParadasProgramadas IS NULL)
                                        BEGIN
                                        	SET @horasParadasProgramadas = 0
                                        END

                                        DECLARE @tempoDeProducaoPlanejada AS DECIMAL(18,2)
                                        IF (@tempoTotalDisponivelParaTrabalho > 0)
                                        	SET @tempoDeProducaoPlanejada = @tempoTotalDisponivelParaTrabalho - @horasParadasProgramadas;
                                        ELSE
                                        	SET @tempoDeProducaoPlanejada = 0;


                                        DECLARE @horasParadasNaoProgramadas AS DECIMAL(18,2) = (SELECT CONVERT(DECIMAL(15,2),(SUM(R.RPAR_DURACAO)))
                                        FROM RELATORIO_PARADA R
                                        INNER JOIN MOTIVO_PARADA M
                                        ON M.MP_CODIGO_PARADA = R.RPAR_CODIGO_PARADA
                                        WHERE M.MP_TIPO = 1
                                        AND R.RPAR_CODIGO_LINHA = @CodLinha
                                        AND R.RPAR_DATA_INICIO >= @DataInicio AND R.RPAR_DATA_INICIO <= DATEADD(day, 1 ,@DataFim));
                                        IF (@horasParadasNaoProgramadas IS NULL)
                                        BEGIN
                                        	SET @horasParadasNaoProgramadas = 0
                                        END

                                        DECLARE @tempoRealDeProducao AS DECIMAL(18,2) = @tempoDeProducaoPlanejada - @horasParadasNaoProgramadas;		

                                        DECLARE @OEE AS DECIMAL(18,2)
                                        IF NOT (@tempoRealDeProducao <= 0)
                                        	SET @OEE = (@tempoRealDeProducao / (@tempoRealDeProducao + @horasParadasNaoProgramadas) * 100)
                                        ELSE
                                        	SET @OEE = 0

                                        SELECT @OEE AS OEE
                                        `,
                                    {
                                        type: QueryTypes.SELECT,
                                    })
         

        // Cálculo da produtividade
        dadosGeraisCalculoProdutividade = await connection.query(`
            DECLARE @CT AS INT = ${linha1};
            DECLARE @MAQUINHA AS INT = ${linha2};
            DECLARE @DATA AS DATE = '${data1}';
            DECLARE @TURNO AS INT = ${turno1};

            WITH Hours AS (
                SELECT RIGHT('0' + CAST(Hora AS VARCHAR), 2) + '-' + RIGHT('0' + CAST(Hora + 1 AS VARCHAR), 2) AS HH, Hora
                FROM (
                    SELECT Hora
                    FROM (VALUES 
                        (0),(1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),(21),(22),(23)
                    ) AS H(Hora)
                    WHERE 
                        (@TURNO = 1 AND Hora BETWEEN 7 AND 16) OR
                        (@TURNO = 2 AND (Hora BETWEEN 0 AND 1 OR Hora BETWEEN 17 AND 23) OR
                        (@TURNO = 3 AND Hora BETWEEN 2 AND 6))
                ) AS HoraPorTurno
            ),
            CTE_PRODUCAO AS (
                SELECT
                    CT,
                    MAQUINA,
                    PRO_PART_NUMBER,
                    DATA,
                    HORA,
                    QUANTIDADE,
                    PRO_OPE5
                FROM 
                    TAB_BEHOLDER_HXH
                INNER JOIN 
                    PRODUTO ON PRO_PART_NUMBER = PARTNUMBER
                WHERE 
                    DATA = @DATA
                    AND CT = @CT
                    AND MAQUINA = @MAQUINHA
            ),
            HoraPartida AS (
                SELECT 
                    DATEPART(HOUR, DATA_INICIO) AS HORA_INICIO,
                    DATEPART(HOUR, DATA_FIM) AS HORA_FIM,
                    DATA_INICIO,
                    DATA_FIM
                FROM 
                    TAB_BEHOLDER_PARADA
                	INNER JOIN LINHA ON CODIGO_LINHA = LIN_CODIGO_LINHA
            	INNER JOIN MOTIVO_PARADA ON MOTIVO = MP_CODIGO_PARADA
                WHERE 
                    LIN_CT = @CT
                    AND LIN_MAQUINA = @MAQUINHA
                    AND CONVERT(DATE, DATA_INICIO) = @DATA
            	AND CONVERT(DATE, DATA_FIM) = @DATA
            	AND MP_TIPO = 0
            ),
            Horas AS (
                SELECT 
                    HORA_INICIO AS HORA,
                    SUM(
                        CASE
                            WHEN HORA_INICIO = HORA_FIM
                            THEN DATEDIFF(MINUTE, DATA_INICIO, DATA_FIM) / 60.0
                            ELSE DATEDIFF(MINUTE, DATA_INICIO, DATEADD(HOUR, HORA_INICIO + 1, CAST(CONVERT(VARCHAR, @DATA, 112) AS DATETIME))) / 60.0
                        END
                    ) AS TOTAL_HORAS_PARADAS
                FROM 
                    HoraPartida
                GROUP BY 
                    HORA_INICIO

                UNION ALL

                SELECT 
                    HORA_FIM AS HORA,
                    SUM(
                        CASE
                            WHEN HORA_INICIO = HORA_FIM
                            THEN 0
                            ELSE DATEDIFF(MINUTE, DATEADD(HOUR, HORA_FIM, CAST(CONVERT(VARCHAR, @DATA, 112) AS DATETIME)), DATA_FIM) / 60.0
                        END
                    ) AS TOTAL_HORAS_PARADAS
                FROM 
                    HoraPartida
                WHERE 
                    HORA_INICIO <> HORA_FIM
                GROUP BY 
                    HORA_FIM
            )
            SELECT 
                ISNULL(P.CT, @CT) AS CT,
                ISNULL(P.MAQUINA, @MAQUINHA) AS MAQUINA,
                ISNULL(P.PRO_PART_NUMBER, '') AS PRO_PART_NUMBER,
                ISNULL(P.DATA, @DATA) AS DATA,
                H.HH,
                ISNULL(P.QUANTIDADE, 0) AS PRODUZIDO,
            	PA.TOTAL_HORAS_PARADAS,
            	ROUND(
                    ISNULL(
                        CASE 
                            WHEN PA.TOTAL_HORAS_PARADAS IS NOT NULL 
                            THEN ((1 - PA.TOTAL_HORAS_PARADAS) / PRO_OPE5)
                            ELSE (1 / PRO_OPE5)
                        END, 
                        0
                    ), 2
                ) AS PLANEJADO,
            	CAST(
                ISNULL(
                    CASE 
                        WHEN ISNULL(P.QUANTIDADE, 0) > 0 AND ISNULL(
                            CASE 
                                WHEN PA.TOTAL_HORAS_PARADAS IS NOT NULL 
                                THEN ((1 - PA.TOTAL_HORAS_PARADAS) / PRO_OPE5)
                                ELSE (1 / PRO_OPE5)
                            END, 0) > 0
                        THEN (P.QUANTIDADE / 
                             CASE 
                                WHEN PA.TOTAL_HORAS_PARADAS IS NOT NULL 
                                THEN ((1 - PA.TOTAL_HORAS_PARADAS) / PRO_OPE5)
                                ELSE (1 / PRO_OPE5)
                             END) * 100
                        ELSE 0
                    END, 0) AS INT) AS OEE
            FROM 
                Hours H
            LEFT JOIN 
                CTE_PRODUCAO P ON H.Hora = P.HORA
            LEFT JOIN 
                (
                    SELECT 
                        HORA,
                        SUM(TOTAL_HORAS_PARADAS) AS TOTAL_HORAS_PARADAS
                    FROM 
                        Horas
                    GROUP BY 
                        HORA
                ) PA ON H.Hora = PA.HORA
            ORDER BY 
                CASE 
                    WHEN H.HH = '00-01' THEN 24
                    WHEN H.HH = '01-02' THEN 25
                    ELSE H.Hora
                END;
        `,
        {
            type: QueryTypes.SELECT,
        })
       
        // select Horas Geradas 
        dadosGeraisCalculoHoraProduzida = await connection.query(`
                SELECT CONVERT(VARCHAR(8),LIN_CT) + CONVERT(VARCHAR(4),LIN_MAQUINA) as CT_MAQ,
                 LIN_NOME_LINHA as Nome_Linha,
                 etq_partinumber as Part_Number, 
                 etq_quantidade as Quantidade,
                 etq_barcode as Barcode, 
                 etq_status as 'Status',
                CASE WHEN ETQ_VERIFICACAO = 0 THEN 'SIM' 
                ELSE 'NÃO' END AS 'FLAG_QAD' ,CONVERT(varchar,etq_data,103) + ' ' + CONVERT(varchar,etq_data,108) as Data, 
                fun_registro as Registro,
                fun_nome as Nome, 
                etq_codigo_ordem as Codigo_Ordem, 
                EHG_HORAS_GERADAS AS 'HORAS_GERADAS_OP10', 
                EHG_HORAS_GERADAS_OPE5 as 'HORAS_GERADAS_OP_5'
                FROM ETIQUETA inner join linha on LIN_CODIGO_LINHA = ETQ_COD_LINHA 
                inner join FUNCIONARIO on FUN_REGISTRO = etq_registro 
                inner join ETIQUETA_HORAS_GERADAS on EHG_CODIGO = ETQ_CODIGO 
                WHERE CONVERT(DATE, ETQ_DATA) = '${data1}'  and ETQ_COD_LINHA = ${linhaValue} order by Data

            `,
        {
            type: QueryTypes.SELECT,
        })  


        // select parada programada 
        dadosGeraisParadaProgramada = await connection.query(`
            SELECT RPAR_DATA_INICIO, RPAR_DATA_FIM, MP_MOTIVO,
            CASE WHEN RPAR_DATA_FIM IS NULL THEN CONVERT(VARCHAR(23), GETDATE(), 121) 
            ELSE CONVERT(VARCHAR(23), RPAR_DATA_FIM, 121) END AS DATA_FIM_OU_ATUAL, 
            CASE WHEN RPAR_DATA_FIM IS NULL THEN DATEDIFF(SECOND, RPAR_DATA_INICIO, GETDATE()) / 3600.0 
            ELSE DATEDIFF(SECOND, RPAR_DATA_INICIO, RPAR_DATA_FIM) / 3600.0 END AS DURACAO FROM RELATORIO_PARADA 
            INNER JOIN MOTIVO_PARADA ON RPAR_CODIGO_PARADA = MP_CODIGO_PARADA
            WHERE RPAR_CODIGO_LINHA = ${linhaValue} AND CONVERT(DATE, RPAR_DATA_INICIO) = '${data1}' AND RPAR_TURNO = ${turno1} AND MP_TIPO = 0
            `,
        {
            type: QueryTypes.SELECT,
        })

        // select parada não programda 
        dadosGeraisParadaNaoProgramada = await connection.query(`
            SELECT RPAR_DATA_INICIO, RPAR_DATA_FIM, MP_MOTIVO,
            CASE WHEN RPAR_DATA_FIM IS NULL THEN CONVERT(VARCHAR(23), GETDATE(), 121) 
            ELSE CONVERT(VARCHAR(23), RPAR_DATA_FIM, 121) END AS DATA_FIM_OU_ATUAL, 
            CASE WHEN RPAR_DATA_FIM IS NULL THEN DATEDIFF(SECOND, RPAR_DATA_INICIO, GETDATE()) / 3600.0 
            ELSE DATEDIFF(SECOND, RPAR_DATA_INICIO, RPAR_DATA_FIM) / 3600.0 END AS DURACAO FROM RELATORIO_PARADA 
            INNER JOIN MOTIVO_PARADA ON RPAR_CODIGO_PARADA = MP_CODIGO_PARADA
            WHERE RPAR_CODIGO_LINHA = ${linhaValue} AND CONVERT(DATE, RPAR_DATA_INICIO) = '${data1}' AND RPAR_TURNO = ${turno1} AND MP_TIPO = 1
            `,
        {
            type: QueryTypes.SELECT,
        })

        // Cálculo das paradas
        dadosGeraisCalculoParada = await connection.query(`
            SELECT RPAR_DATA_INICIO, RPAR_DATA_FIM, CASE WHEN RPAR_DATA_FIM IS NULL THEN CONVERT(VARCHAR(23), GETDATE(), 121) 
            ELSE CONVERT(VARCHAR(23), RPAR_DATA_FIM, 121) END AS DATA_FIM_OU_ATUAL, CASE WHEN RPAR_DATA_FIM IS NULL THEN DATEDIFF(SECOND, RPAR_DATA_INICIO, GETDATE()) / 3600.0 
            ELSE DATEDIFF(SECOND, RPAR_DATA_INICIO, RPAR_DATA_FIM) / 3600.0 END AS DURACAO 
            FROM RELATORIO_PARADA INNER JOIN linha ON LIN_CODIGO_LINHA = RPAR_CODIGO_LINHA WHERE LIN_CT = ${linha1}
            AND LIN_MAQUINA LIKE ${linha2} AND CONVERT(DATE, RPAR_DATA_INICIO) = '${data1}' AND RPAR_TURNO = ${turno1};
            `,
        {
            type: QueryTypes.SELECT,
        })

        // Target Gerais
        targetGerais = await connection.query(`
                SELECT * FROM TAB_TARGET WHERE CODIGO_LINHA=${linhaValue};
            `,
            {
                type: QueryTypes.SELECT,
            })
        
        // Informa situação da linha
        situacaoLinha = await connection.query(`
                SELECT LIN_SITUACAO,ISNULL(MP_MOTIVO, 0) AS MOTIVO
                FROM LINHA LEFT JOIN RELATORIO_PARADA ON RPAR_CODIGO_LINHA = LIN_CODIGO_LINHA 
                AND RPAR_DATA_FIM IS NULL LEFT JOIN MOTIVO_PARADA ON MP_CODIGO_PARADA = RPAR_CODIGO_PARADA  
                WHERE LIN_CODIGO_LINHA = ${linhaValue};
            `,
            {
                type: QueryTypes.SELECT,
        })
   
        return {
            absenteismo: dadosGeraisAbsenteismo,
            calculoDosDiasSemAcidente: dadosGeraisCalculoSemAcidente,
            calculoDeReclamacoes: dadosGeraisCalculoDeReclamacoes,
            calculoDeFtq: dadosGeraisCalculoDeFTQ,
            calculoScrap: dadosGeraisCalculoScrap,
            calculoPecasProduzidas: dadosGeraisCalculoPecasProduzidas,
            calculoEficiencia: dadosGeraisCalculoEficiencia,
            calculoProdutividade: dadosGeraisCalculoProdutividade,
            calculoHoraProduzida:  dadosGeraisCalculoHoraProduzida,
            paradaProgramada: dadosGeraisParadaProgramada,
            paradaNaoProgramada: dadosGeraisParadaNaoProgramada,
            calculoParada: dadosGeraisCalculoParada,
            target: targetGerais,
            informacaoProd: situacaoLinha
        }
      
    } catch (error) {
        return AplicacaoErro(500, 'Erro na query produtos ou valor invalido')
    }
    
    // Cálculo de produtividade

}

module.exports = {
    criarComboBox,
    criarDadosSelecao
}