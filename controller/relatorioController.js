const {ModeloInvalidoErro, NaoAutorizadoErro } = require("../erros/typeErros");
const relatorioServiceGeral = require("../services/relatorioService");

class relatorioController {

    async criarTabelaRelatorio(req, res) {
        const  numeroProducao = req.params.idProducao;
        
        try {
            
            if(!numeroProducao) {
                throw new ModeloInvalidoErro(400, "Por favor preencher o campo.");
            }

            const dadosGeraisConsulta = await relatorioServiceGeral.criarDadosSelecao(numeroProducao);

            res.status(200).json(dadosGeraisConsulta);
            
        } catch(err) {
            res.status(500).send({
                erro: err.message, priveligo1: req.session.user
            })
        } 
    }

    

    
}

module.exports = relatorioController