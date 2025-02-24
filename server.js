const server = require('./app.js')
require('./socketio/socket');
// HABILITA JSON
server.app.use(server.express.json());
// HABILITA O  LEITOR DE HTML
server.app.set("view engine", "ejs");
// HABILITA ARQUIVOS ESTATISCO CSS, IMG.
server.app.use(server.express.static('public'));
// RESPONSAVEL POR TRADUZIR EM UM ESTRUTURA JAVASCRIPT, urlencoded vai decodificar a mensagem
server.app.use(server.bodyParser.urlencoded({extended: false}));
// HABILITA ENVIO JSON VIA JAVASCRIPT
server.app.use(server.bodyParser.json());
// HABILITA ROTA 
server.app.use(server.routes);

// Database 
server.connection.authenticate()
          .then( () => {
            console.log('Conexao sql ok');
          }).catch((error) => {
            console.log(error);
          });

server.http.listen(server.porta, () => {
    console.log(`Servidor on, port: ${server.porta}`);
}); 