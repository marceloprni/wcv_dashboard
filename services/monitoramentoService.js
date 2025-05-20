const { Op, Sequelize, QueryTypes} = require("sequelize");
const connection = require('../database/database'); 
const { AplicacaoErro } = require("../erros/typeErros")
const { DatetimeDashboard } = require("../utils/tratarTime")

async function monitoramento() {

    try {
        const dataTime = DatetimeDashboard();
        
        //WHERE ia.DataCriacao >= '${dataTime} 06:00:00' AND ia.DataCriacao <= '${dataTime} 23:59:59' 
        // WHERE opc.DataCriacao >= '2025-05-09 00:00:01' AND opc.DataCriacao <= '2025-05-09 23:59:59'

        let dadosGeraisProducao = await connection.query(`
                SELECT 
                opc.OrdemProducao,
                ia.Linha,
                opc.Batch,
                CAST(SUM(opc.QuantidadeTeorica) AS DECIMAL(18,2)) AS Soma_QuantidadeTeorica,
                CAST(SUM(opc.QuantidadeReal) AS DECIMAL(18,2)) AS Soma_QuantidadeReal
                FROM OrdemProducaoConsumos opc
                JOIN OrdemProducaos ia ON opc.OrdemProducao = ia.ID 
                WHERE opc.DataCriacao >= '${dataTime} 00:00:10' AND opc.DataCriacao <= '${dataTime} 23:59:59' 
                GROUP BY opc.OrdemProducao, ia.Linha, opc.Batch
                ORDER BY opc.OrdemProducao, opc.Batch;
            `,
            {
                type: QueryTypes.SELECT,
            })

        let dadosOperacaoOn = await connection.query(`
                SELECT  Linha
                from OrdemProducaos
                where Status = 'A' and DataCriacao >= '${dataTime} 00:00:10' AND DataCriacao <= '${dataTime} 23:59:59' ;
            `,
            {
                type: QueryTypes.SELECT,
            })
        
        let dadosReceitaOn =  await connection.query(`
                SELECT	
	        	opc.OrdemProducao as id ,
				ia.Linha as Linha,
                ia.Descricao as Descricao
                FROM OrdemProducaoConsumos opc
                JOIN OrdemProducaos ia ON opc.OrdemProducao = ia.ID
                WHERE opc.DataCriacao >= '${dataTime} 00:00:10' AND opc.DataCriacao <= '${dataTime} 23:59:59'
                Group by opc.OrdemProducao, ia.Linha , ia.Descricao;
            `,
            {
                type: QueryTypes.SELECT,
            })
    
        return {
            dados: dadosGeraisProducao,
            operationOn: dadosOperacaoOn,
            receitaOn: dadosReceitaOn
        }
      
    } catch (error) {
        return new AplicacaoErro(500, 'Erro na query produtos ou valor invalido')
    }
    

}

module.exports = {
    monitoramento
}