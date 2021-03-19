const express = require("express")
const server = express()

//import database
const db = require("./database/db")

//configure puplic folder
server.use(express.static("public"))

// enable req.body
server.use(express.urlencoded({ extended: true }))

// Using template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Configure pages urls:

//home page (req: requisition, res: response)

server.get("/", function (req, res) {
    return res.render("index.html")
})

//page create-point

server.get("/create-point", function (req, res) { // this method shows the dada in the url, unsafely
    // req.query: query strings of the url
    // console.log(req.query)
    return res.render("create-point.html")
})

server.post("/savepoint", function (req, res) { // this method sends the form data secretly, more safely
    // res.body: body of the form
    // console.log(req.body)

    // insert data in the database
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) { // if an error occurs, show error on the console
            console.log(err)
            return res.send("Registration error!")
        }
        console.log("Registration successful")
        console.log(this) // this = run result

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData) // command to insert values to the database
})

// page search-results

server.get("/search", function (req, res) {

    const search = req.query.search

    if (search == "") {
        // empty search, no results
        return res.render("search-results.html", { total: 0 })
    }

    // acess data from database
    db.all(`SELECT * FROM places WHERE city = '${search}'`, function (err, rows) { // "*" means all. Could be other fields, like "name", or "address"
        // db.all(`SELECT * FROM places WHERE city LIKE = '%${search}%'`, function (err, rows) { // with this example line, the user wouldn't have to type in the full name of the city to get results
        if (err) { // if an error occurs, show error on the console
            return console.log(err)
        }
        const total = rows.length // number of places registered in the database
        // show html page with database data
        return res.render("search-results.html", { places: rows, total: total })
    })
})

//For example, turn on the server at port 3000:
server.listen(3000)