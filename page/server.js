// Servidor
const express = require('express') // criar e chamar o servidor express como função, trazendo uma dependência para esse arquivo JS
const server = express()

const {pageLanding, pageStudy, pageGiveClasses} = require('./pages')

// Configuração do nunjucks (template engine)
const nunjucks = require('nunjucks') // importando o nunjucks
nunjucks.configure('page', { // qual pasta está os arquivos HTML, segundo argumento é enviar o objeto com as opções
    express: server, // precisa saber qual o servidor que estamos usando, então passamos o server (que devolve um objeto) para dentro da chave
    noCache: true, // desativa a guarda de memória de uma base predeterminada de dados da página    
})

// Início e configuração do servidor
server
// configurando arquivos estáticos (styles, scripts, images)
.use(express.static('public')) // adicionar a pasta public para que o servidor considere os estilos e imagens
// rotas de aplicação
.get("/", pageLanding) // inserir a barra para definir as rotas pra encontrar a funcionalidade get que pertence ao express, depois da vírgula o que será retornado quando express rodar: requisição e resposta
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.listen(5500)  // a função listen está retornando a porta 5500