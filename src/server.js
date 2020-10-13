//Dados
const proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "116989898",
        bio: "Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já    passaram por uma das minhas explosões",
        subject: "Química",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    }
]

const subjects = [

    "Arte",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]
//Funcionalidades
function getSubject(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req, res) {
    return res.render("index.html")
}
function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}
function pageGiveClasses(req, res) {
    const data = req.query

    const isNoEmpty = Object.keys(data).lenght > 0

    //adicionar dados a lista dos profffys
    if (isNoEmpty) {
        data.subject = getSubject()

        proffys.push(data)
        return res.redirect("/study")

    }

    return res.render("give-classes.html", { subjects, weekdays })
}

const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

//Configurar nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})
//Início da configuração do servidor
server
    //Configurar arquivos estáticos (css, script, imagens)
    .use(express.static("public"))
    //Rotas da aplicação
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)

    //Start do servidor
    .listen(5500)
