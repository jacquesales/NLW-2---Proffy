// Fonte para guardar inserção de dados
module.exports = async function (db, {proffyValue, classValue, classScheduleValues}) { // palavra async para habilitar o await
   
    // organizando os dados para inserir na tabela proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"

        );
    `) // await irá aguardar antes de prosseguir para a proxima linha, guardando a informação numa variável pois iremos capturar o id que será gerado

    const proffy_id = insertedProffy.lastID

    // inserindo dados na tabela classes
    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
               "${proffy_id}"

            );
    `)

    const class_id = insertedClass.lastID
    
    // inserindo dados na tabela class_schedule
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => { // iteirando dado a dado; apenas guardando numa variável para pegar o retorno e posteriormente executar a função
        // quando faz o retorno, o map agrupa um novo array com um objeto
        return db.run(` 
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `) // cada vez que essa função for rodada ela irá se referir a um objeto que está contido no array classScheduleValues

    }) // cada função leva seu próprio tempo para ser executada para criar/guardar os dados; não posso rodar tudo de uma vez.
    await Promise.all(insertedAllClassScheduleValues) // Como preciso aguardar cada uma, nesse caso chamo um objeto de promessa executando um array de muitas promessas 
}



