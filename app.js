const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql2')

const app = express()
const cors = require('cors')
app.use(bodyParser.text());
app.use(cors())

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Abhi",
    database: 'todolist'
});

app.get('/load', (req, res) =>{
    con.query("SELECT * FROM tasks", function(err, result) {
        if (err) throw err;
        console.log(result)
        res.send(result)
    })
})

app.post('/data', (req, res) => {
    const data = req.body;
    con.connect(function(err) {
        if (err) throw err;
        console.log("connected")
        con.query("INSERT INTO tasks (tasklist) VALUES(?)",[data], function(err) {
            if (err) throw err;
        })
        con.query("SELECT * FROM tasks", function(err, result) {
            if (err) throw err;
            console.log(result)
        })
    })
    
});

app.post('/del', (req, res) => {
    const data = req.body;
    con.connect(function(err) {
        if (err) throw err;
        console.log("connected")
        con.query("DELETE FROM tasks WHERE tasklist=?",[data], function(err) {
            if (err) throw err;
        })
        con.query("SELECT * FROM tasks", function(err, result) {
            if (err) throw err;
            console.log(result)
        })
    })
    
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});



