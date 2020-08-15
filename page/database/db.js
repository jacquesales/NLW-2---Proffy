const Database = require('sqlite-async') // importando o módulo que será usado

function execute(db) {
    // criando as tabelas do banco de dados (instrução SQL de criar tabelas)
    return db.exec(`  
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject TEXT,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
}

module.exports = Database.open(__dirname + '/database.sqlite') // abrir meu banco de dados; a localização dele como parâmetro concatenando com o arquivo
.then(execute) // então significa que só depois que o banco de dados abrir executará a função adiante