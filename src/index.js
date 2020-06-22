const express = require("express")
const server = express()
//pegar db
const db = require("./database/db")

//configurar pasta public

server.use(express.static('public'));

server.use(express.urlencoded({ extended: true }))


//template engine

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhos no meu app
//página incial

server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-donation", (req, res) => {
    console.log(req.query)

    return res.render("create-donation.html")

})

server.post("/savedonation", (req, res) => {
    //Inserir dados
    const query = `INSERT INTO places(
    name,
    email,
    cep,
    address,
    number,
    city,
    uf,
    neighborhood,
    phone,
    subject,
    image,
    image2,
    description 
    ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?);  
    `
    const value = [
        req.body.name,
        req.body.email,
        req.body.cep,
        req.body.address,
        req.body.number,
        req.body.city,
        req.body.uf,
        req.body.neighborhood,
        req.body.phone,
        req.body.subject,
        req.body.image,
        req.body.image2,
        req.body.description
    ]

    function aftreInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro")
        }
        console.log("cadastrado")
        console.log(this)

        return res.render("create-donation.html", { saved: true })
    }

    db.run(query, value, aftreInsertData)

})

server.get("/search", (req, res) => {
    const search = req.query.search
    if (search == "") {
        return res.render("search.html", { total: 0 })
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            console.log(err)
        }
        const total = rows.length


        return res.render("search.html", { places: rows, total })
    })



})



//Ligar o servidor
server.listen(process.env.PORT || 3000)