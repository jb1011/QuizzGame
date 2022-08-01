const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql');
const cors = require('cors')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'123456',
    database: 'scoreboard'
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM scores"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

app.post('/api/insert', (req, res) => {
    const name = req.body.name
    const score = req.body.score
    const sqlInsert = "INSERT INTO scoreboard (name, score) VALUES (?,?)"

    db.query(sqlInsert, [name, score], (err, result) => {
        console.log(err)
    })
})

app.listen(3001, () => {
    console.log("running on port 3001")
})