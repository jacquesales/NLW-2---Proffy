const Database = require('./db') // importando o Database
const createProffy = require('./createProffy') // chamando a função createProffy

Database.then(async (db) => {
    // Inserir dados:
    proffyValue = { // estratégias para manipular dados, criando um atalho para receber um objeto
        name: 'Christina Morillo',
        avatar: '/public/images/person/pexels-christina-morillo-1181519.jpg',
        whatsapp: '11999999999',
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonada por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões."
        
    }

    classValue = {
        subject: "Química", 
        cost: "70,00"
    }

    classScheduleValues = [
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]
    // os id's serão gerados pelo banco de dados assim que usuário se cadastrar

    await createProffy(db, {proffyValue, classValue, classScheduleValues}) // aqui também tenho que aguardar a função inteira ser executada, inserindo o then ou o await + async na função


    // Consultar dados:

    const selectedProffys = await db.all("SELECT * FROM proffys") // selecionando e exibindo toda a classe proffyValue
    //console.log(selectedProffys)

    // consultando as classes de um determinado professor o id 2 e trazendo os seus dados. Usando crase pois utilizarei mais de uma linha; puxando dados de duas tabelas e as unindo pelo id
    const selectClassesAndProffys = await db.all(`
        SELECT proffys.*, classes.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 2;
    `) 
    //console.log(selectClassesAndProffys)

    // horário solicitado precisa ser antes ou igual ao time_from cadastrado; e o time_to precisa ser depois; são convertidos em minutos no servidor 
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `)
})