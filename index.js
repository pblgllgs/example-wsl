const { response } = require('express')
const express = require('express')

const mysql = require('mysql2/promise');

const app = express()

let db

const go = async () => {
     db = await mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'example',
        database: 'pets'
    });
    app.listen(3000)
    console.log('corriendo en puerto 3000')
    console.log('DB online')
}

go();

app.get('/', async (req, res) => {
    const [users] = await db.execute('SELECT * FROM users')
    res.send(`
    <h1>Pets</h1>
    <ul>${users.map(animal => 
        `<li>${animal.name}</li>`).join('')}
    </ul>
    `)
})