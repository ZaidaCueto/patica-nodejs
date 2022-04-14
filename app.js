//incluindo u, abiblioteca
const http = require("http");
const queryString = require("query-string");
const url = require("url");
const fs = require("fs");

//defineindo um endereço
const hostname = "127.0.0.1"; //localhost
const port = 3000;

//inplemetaão da regla de negocios
const server = http.createServer((req, res) => {
  let resposta;

  const urlparse = url.parse(req.url, true);
  const params = queryString.parse(urlparse.search);
  //criar um usuario - atualizar un usuario
  if (urlparse.pathname == "/criar-atualizar-usuario") {
    //salvar informacoes
    fs.writeFile(
      "user/" + params.id + ".txt",
      JSON.stringify(params),
      function (err) {
        if (err) throw err;
        console.log("Saved!");
        resposta = "usuario criado  com sucesso";

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end(resposta);
      });
    
  }
  //seleccionar um usuario
  else if (urlparse.pathname == "/selecionar-usuario") {
    fs.readFile("user/" + params.id + ".txt", function (err, data) {
      resposta = data;

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(resposta);
    });
  }
 
 
  //rermover usuario
  else if (urlparse.pathname == '/renover-usuario') {
    fs.unlink("user/" + params.id + ".txt", function (err) {
  
    console.log('File deleted!');

    resposta = err ? 'usuario nao encontrado.' : 'usuario removido.';

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(resposta);
  });
  }

  
});
//execuão
server.listen(port, hostname, () => {
  console.log(`executando  http://${hostname}:${port}/`);
});
//http://localhost:3000/criar-atualizar-usuario?nome=ana&idade=60&id=1
//http://localhost:3000/criar-atualizar-usuario?nome=cata&idade=20&id=8
//http://localhost:3000/criar-atualizar-usuario?nome=maria&idade=50&id=6
//http://localhost:3000/selecionar-usuario?id=1
//http://localhost:3000/renover-usuario?id=1
