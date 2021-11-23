const bodyp = require('body-parser')
const express = require('express')
const app = express()

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'dbuser',
        password: 's3kree7',
        database: 'db'
    }
})

app.use(bodyp.urlencoded({ extended: false }))

app.use(bodyp.json())


app.post('/create', (req, res)=> {
    req.body.name
    req.body.code
    req.body.districs
    req.body.population
    console.log(req.body.name,req.body.code,req.body.districs,req.body.population)

    knex('city').insert({Name: req.body.name, CountryCode: req.body.code, District: req.body.districs, Population: req.body.population}).then(answ=>{
        res.send(answ)
    })
})


app.post('/read', (req, res)=> {
    req.body.name
    console.log(req.body.name)
    knex('city').where({Name: req.body.name}).then(answ=>{
        res.send(answ)
    })
})


app.post('/update', (req, res)=> {
    req.body.name
    req.body.population
    console.log(req.body.name, req.body.population)
    knex('city').where({Name: req.body.name}).update({ Population: req.body.population}).then(()=> {
        knex('city').where({Name: req.body.name}).then(answ=>{
            res.send(answ)
        })
    })
})

app.post('/delete', (req, res)=> {
    req.body.name
    console.log(req.body.name)
    knex('city').where({Name: req.body.name}).del().then(answ=> {
        res.json(!!answ)
    })
})

app.listen(3000, ()=>{
    console.log('Ready!')
})