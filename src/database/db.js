// importing sqlite dependencies
const sqlite3 = require("sqlite3").verbose()

// creating the object that will execute operations in the database
const db = new sqlite3.Database("./src/database/database.db")

// exporting this file
module.exports = db

// using the new database object for the operations
/* db.serialize(function () {
    // usign SQL commands:
    // 1. create a table with the name "places"
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // 2. insert data in the table
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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Nº 250",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    function afterInsertData(err) {
        if (err) { // if an error occurs, show error on the console
            return console.log(err)
        }
        console.log("Registration successful")
        console.log(this) // this = run result
    }

    db.run(query, values, afterInsertData) // command to insert values to the database

    // 3. consult data of the table
    db.all(`SELECT * FROM places`, function (err, rows) { // "*" means all. Could be other fields, like "name", or "address"
        if (err) { // if an error occurs, show error on the console
            return console.log(err)
        }
        console.log("Here are your data: ")
        console.log(rows)
    })

    // 4. delete dada of the table
    db.run(`DELETE FROM places WHERE id = ?`, [3], function (err) { // the number inside the box is the data id. In this case, we're deleting all data with id = 1
        if (err) { // if an error occurs, show error on the console
            return console.log(err)
        }
        console.log("Data deleted successfully")
    })

}) */