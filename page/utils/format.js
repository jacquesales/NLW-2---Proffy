// Dados
const subjects = [    
    "Artes",
    "Matemática",
    "Ciências",
    "Educação Física",
    "Geografia",
    "História",
    "Física",
    "Química",
    "Biologia",
    "Português"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]


//Funcionalidade
function getSubject(subjectNumber) { // captando a posição da semana
    const position = +subjectNumber - 1 // se tornou uma expressão numérica, onde vamos subtrair sempre 1 para que alcance o index correto
    return subjects[position] // pois o index inicia em 0
}

function convertHoursToMinutes(time) {
    const [hour, minutes] = time.split(":") // separa o valor que captou na página em duas posições: hour e minutes, mas serão duas strings
    return Number((hour * 60) + minutes) // transforma tudo em número retornando a hora convertida em min + o valor de minutos
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}