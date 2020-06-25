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

server.post("/profile", (req, res) => { 

    const auth = req.body.code

    if(auth == "") {
        return res.render("authorization.html", {msg: false})
    }else{
  
        db.all(`SELECT * FROM places WHERE cadCode == ${auth}`, function(err, rowss){
            if(err){
                console.log(err)
                return res.render("authorization.html", {autenticad: false})
            }else{  
          
            return res.render("authorization.html", {codigo:rowss, autenticad: true})
            }
            
        })
    }
  
    })

server.get("/create-donation", (req, res) => {
   
    db.all(`SELECT cadCode FROM places`, function(err, rowss){
        if(err){
            console.log(err)
            return res.render("authorization.html")
        }else{  
      
        return res.render("create-donation.html", {codigo:rowss})
        }
        
    })

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
    description,
    cadCode
    ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?);  
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
        req.body.description,
        req.body.cadCode
    ]

    function aftreInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro")
        }
        console.log("cadastrado")
        console.log(this)   
    }
  
   
  
    
    function Inserted(){
    const auth = req.body.cadCode

    db.all(`SELECT * FROM places WHERE cadCode = ${auth}`, function(err, rowss){
        if(err){
            console.log(err)
            return res.render("create-donation.html")
        }else{  
      
        return res.render("create-donation.html", {codigo:rowss, saved:true})
        }
        
    })
}
    db.run(query, value, aftreInsertData, Inserted)

})

server.get("/search", (req, res) => {
    const search = req.query.search

    console.log(search)
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
server.listen(process.env.PORT || 3001)