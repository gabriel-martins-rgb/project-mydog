const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./src/database/database.db")

db.serialize(() => {
   /* db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            cep TEXT,
            address TEXT,
            number TEXT,
            city TEXT,
            uf TEXT,
            neighborhood TEXT,
            phone TEXT,
            subject TEXT,
            image TEXT,
            image2 TEXT,
            description TEXT,
            cadCode TEXT
        );
    `)
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            console.log(err)
        }
        console.log(rows)
    })
 


    db.run("DELETE  FROM places", function(err,rows){
        if(err){
            console.log(err)
        }
        console.log(rows)
    })

    //db.run("DROP TABLE places")
*/
})


module.exports = db

