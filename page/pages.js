const Database = require('./database/db') // trazendo o banco de dados aqui para dentro

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format') // retirando de dentro do objeto format o próprio objeto 

// Funcionalidades
function pageLanding(req, res) {
    return res.render("index.html") // irá retornar uma resposta com a função de reinderizar: os arquivos HTML concatenados com o __dirname
}

async function pageStudy(req, res) {
    const filters = req.query // o req contém informações adicionais (nesse caso as infos que filtrei na busca dos professores na página); recebo essas infos 

    if (!filters.subject || !filters.weekday || !filters.time) { // se não tiver filtrado subject ou weekday ou time, ou seja, qualquer um desses vazio, entrará no if
        return res.render("study.html", {proffys, filters, subjects, weekdays}) // essa função agora irá receber do nunjucks um objeto contendo as informações da variável proffys; e mando de volta as infos para a página
    }

    // converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)


    // outro tipo de where onde permite uma subseleção (registrada no selectClassesSchedules) que completa a busca 
    const query = `
        SELECT proffys.*, classes.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filter.subject}'
    `
    // caso haja erro na hora da consulta no banco de dados
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject) // Convertendo o enumerado
        })

        return res.render('study.html', { proffys, filters, subjects, weekdays})

    } catch (error) { // se der algum erro aqui dentro
        console.log ("==================")
        console.log(error) // iremos capturar
        console.log ("==================")
    }
}

function pageGiveClasses(req, res) {
    const data = req.query    

    const isNotEmpty = Object.keys(data).length > 0 // transformando o objeto data e suas chaves em um array, a função length irá contar
    if (isNotEmpty) { // verificando se dados está vazio pela variável acima

        data.subject = getSubject(data.subject) // antes mesmo de enviar os dados, vamos usar a funcionalidade de pegar a posição do array subjects como parâmetro ele mesmo

        proffys.push(data) // adicionando e enviando as infos ao objeto/coleção proffys

        return res.redirect("study")
    } // se tiver dados a função irá rodar 
    

    // caso contrário, apenas mostrar a página
    return res.render("give-classes.html", {subjects, weekdays})
}

// para utilizar as funções acima no server, basta exportá-las
module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses
}