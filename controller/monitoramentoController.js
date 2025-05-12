const {ModeloInvalidoErro, NaoAutorizadoErro } = require("../erros/typeErros");
const { monitoramento } = require("../services/monitoramentoService");


class monitoramentoController {

    async dadosDashboard(req, res) {
    
        try {
            
            const dadosGeraisConsulta = await monitoramento()

            res.status(200).json(dadosGeraisConsulta);
            
        } catch(err) {
            
            res.status(500).send({
                erro: err.message
            })
        } 
    }

    

    
}

module.exports = monitoramentoController