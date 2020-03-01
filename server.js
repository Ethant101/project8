const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Client } = require('pg')
require('dotenv').config();
// console.log(process.env);

const app = express();

app.set('views', path.join(__dirname, 'views')); //put all my pug files in views folder
app.set('view engine', 'pug');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended:false }));

//adds user to postgres
app.post('/users', (req, res) => {
    const client = new Client({
        user: "postgres",
        password: "postgres",
        host: "localhost",
        port: "5432",
        database: "project8" 
    });
    client.connect()
    .then(() => {
        console.log('connection complete');
        //do query stuff
        const sql = 'insert into users (first, last, email, age) values ($1, $2, $3, $4)';
        const params = [req.body.first, req.body.last, req.body.email, req.body.age];
        return client.query(sql, params);
    })
    .then((result) => {
        console.log('result?', result);
        res.redirect('/'); //redirect to view users once you figure out how to display users
        client.end();
    })
    .catch((err) => {
        console.log('err:', err);
        res.redirect('/');
        client.end();
    })
})

// renders view users page
app.get('/users', (req, res) => {
    const client = new Client({
        user: "postgres",
        password: "postgres",
        host: "localhost",
        port: "5432",
        database: "project8" 
    });
    client.connect()
    .then(() => {
        return client.query('select * from users;');
    })
    .then((results) => {
        console.log('results?', results);
        res.render('viewUsers', { results })
    })
    .catch((err) => {
        console.log('error', err);
        res.send('error occured');
    })
})

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const client = new Client({
        user: "postgres",
        password: "postgres",
        host: "localhost",
        port: "5432",
        database: "project8" 
    });
    client.connect()
    .then(() => {
        const sql = 'select * from users where id = $1;';
        const params = [id];
        return client.query(sql, params);
    })
    .then((results) => {
        console.log('results?', results);
        res.render('edit', { results })
    })
    .catch((err) => {
        console.log('err:', err)
        res.redirect('viewUsers')

    })
})

app.post('/edit', (req, res) => {
    const client = new Client({
        user: "postgres",
        password: "postgres",
        host: "localhost",
        port: "5432",
        database: "project8" 
    });
    client.connect()
    .then(() => {
        const sql = 'update users set first = $1, last = $2, email = $3, age = $4 where id = $5'
        const params = [req.body.first, req.body.last, req.body.email, req.body.age, req.body.id];
        return client.query(sql, params);
    })
    .then((result) => {
        console.log('results:', result);
        const results = client.query('select * from users')
        res.redirect('/');
        client.end();
    })
})

// handles delete
app.post('/delete/:id', (req, res) => {
    const client = new Client({
        user: "postgres",
        password: "postgres",
        host: "localhost",
        port: "5432",
        database: "project8" 
    });
    client.connect()
    .then(() => {
        const id = req.params.id;
        const sql = 'delete from users where id = $1';
        const params = [id];
        return client.query(sql, params);
    })
    .then((results) => {
        console.log('delete results:', results)
        res.redirect('/users');
        client.end();
    })
    .catch((err) => {
        console.log('err', err);
        res.sende('error occured');
    })
    
    // repository.deleteById(id).then((ok) => {
    //     console.log(ok);
    //     console.log(`Deleted record with id${id}`)
    // })
})


// renders search page
app.get('/search', (req, res) => {
    res.render('search')
})
app.post('/search', (req, res) => {
    const client = new Client({
        user: "postgres",
        password: "postgres",
        host: "localhost",
        port: "5432",
        database: "project8" 
    });
    client.connect()
    .then(() => {
        const sql = `select * from users where lower(first) like lower(\'%${req.body.query}%\') or lower(last) like lower(\'%${req.body.query}%\') or lower(email) like lower(\'%${req.body.query}%\');`;
        return client.query(sql)
    })
    .then((results) => {
        console.log('results:', results);
        res.render('searchResults', { results })
        client.end();
    })
    .catch((err) => {
        console.log('err:', err);
        res.redirect('/');
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port:${process.env.PORT}`);
})