const express = require('express');
const session = require("express-session");
const router = express.Router();
const relatorioController  = require('./controller/relatorioController');
const monitoramentoController = require("./controller/monitoramentoController");

const controllerRelatorio = new relatorioController();
const monitoramentoDashboard = new monitoramentoController();

router.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: (60000 * 60) 
  }
}))

/***************** ROTA DE RELATORIO *****************/

router.get("/", (req, res) => { 
  res.render("relatorio/relatorio");
});

router.get("/relatorio/:idProducao", controllerRelatorio.criarTabelaRelatorio)

/***************** ROTA DE Monitoramento *****************/

router.get("/monitoramento", (req, res) => { 
  res.render("monitoramento/monitoramento");
});

router.get("/monitoramento/dados", monitoramentoDashboard.dadosDashboard);

module.exports = router