const { Op, Sequelize, QueryTypes} = require("sequelize");
const connection = require('../database/database'); 
const { AplicacaoErro } = require("../erros/typeErros")


async function criarDadosSelecao(value) {
    let variavelValue = value;

    try {
        
        // PRODUÇÃO GERAIS
        let dadosGeraisProducao = await connection.query(`
                SELECT OP.Id 'ID_Ordem',
	            OC.Batch 'Batch',
	            OP.Codigo 'Código_Ordem',
	            R.Descricao 'Receita',
	            OP.DataCriacao 'Criação_OP',
	            OP.DataAlteracao 'Início_Produção',
	            OP.QuantidadePrevista 'Quantidade_Prevista',
	            OP.Descricao 'Descrição_OP',
	            OP.TamanhoBatch 'Tamanho_do_batch',
	            OP.Lote 'Lote',
	            I.Descricao 'Insumo',
	            ISNULL(A.Descricao,'Manual') 'Local',
	            OC.QuantidadeTeorica 'Desejado',
	            OC.QuantidadeReal 'Real',
	            OC.QuantidadeReal - OC.QuantidadeTeorica 'Erro_Kg',
	            OC.ToleranciaPermitida 'Erro_Permitido',
	            OC.TempoDosagem 'Tempo_de_Dosagem',
                OC.DataCriacao 'Data_Dosagem',
                (SELECT SUM(OrdemDosagem) FROM ReceitaInsumos WHERE Receita = OP.Receita AND Insumo = OC.Insumo) as ordem
                FROM OrdemProducaos OP
                LEFT JOIN OrdemProducaoConsumos OC ON OC.OrdemProducao = OP.Id
                LEFT JOIN Receitas R ON R.Id = OP.Receita
                LEFT JOIN Armazenamentos A ON A.Id = OC.Armazenamento
                JOIN Insumos I ON I.Id = OC.Insumo
                WHERE OP.Codigo = '${variavelValue}'
                ORDER BY OP.ID Desc, ordem ASC;

            `,
            {
                type: QueryTypes.SELECT,
            })
        
        let usuarioDadosGerais = await connection.query(`
            
                SELECT 
                    OP.Id,
                    Codigo,
                    Receita,
                    OP.DataCriacao,
                    OP.DataAlteracao,
                    UsuarioCriacao,
                    OP.Status,
                    QuantidadePrevista,
                    OP.Descricao,
                    Linha,
                    UsuarioAlteracao,
                    BatchsProduzidos,
                    Prioridade,
                    TamanhoBatch,
                    Lote,
                    U1.Descricao 'UserC',
                    U2.Descricao 'UserA',
                    U3.Nome 'Nome_Linha'
                FROM OrdemProducaos OP
                JOIN Usuarios U1 ON U1.Id = OP.UsuarioAlteracao
                JOIN Usuarios U2 ON U2.Id = OP.UsuarioCriacao
                JOIN Linhas U3 ON U3.id = OP.Linha
                WHERE OP.Codigo = '${variavelValue}';
            
            `,
            {
                type: QueryTypes.SELECT,
            })
        
            let parametroDadosGerais = await connection.query(`
                
                SELECT TOP 20 
                OP.DataAlteracao,  
                RP.Receita,
                RP.Valor,
                P.Descricao
                FROM OrdemProducaos OP
                JOIN ReceitaParametros RP ON RP.Receita = OP.Receita
                JOIN Parametros P ON P.Id = RP.Parametro
                WHERE OP.Codigo = '${variavelValue}' and RP.Status = 'A'
                ORDER BY OP.DataAlteracao DESC;

            `,
            {
                type: QueryTypes.SELECT,
            })

        

        return {
            producaoGerais: dadosGeraisProducao,
            dadosUsuarios: usuarioDadosGerais,
            parametroGerais: parametroDadosGerais
        }
      
    } catch (error) {
        return new AplicacaoErro(500, 'Erro na query produtos ou valor invalido')
    }
    
}

module.exports = {
    criarDadosSelecao
}