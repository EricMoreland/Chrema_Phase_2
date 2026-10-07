import express from 'express';
import db from './PGliteDB.mjs';

const server = express()
const port = 3001
//the async returns a promise, because the await's in the funciton waits to resolve the promise 
//therefore it is synchronous, awaits makes it synchronous.
//contente type in the response in network tab is mime type
server.get('/account', async (req, res) => {
    const ret = await db.query('SELECT * from Account');
    //res.send(`<h1>${ret.account[0].name}</h1>`)
    res.json(ret.rows)
})

server.get('/account/:id', async (req, res) => {
    const ret = await db.query('SELECT * from Account WHERE id = $1', [req.params.id]);
    //res.send(`<h1>${ret.account[0].name}</h1>`)
    res.json(ret.rows)
    //gives: {"id":":id"}
    //this is santized with the id = ? and the array of params, so it is safe from sql injection
})

server.listen(port, () => console.log("Server is listening..."))


//await db.close()
//console.log('Database closed')
