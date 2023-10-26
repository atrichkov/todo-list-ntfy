'use strict';

const path = require('node:path');
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('todos.db');
const app = express();
const port = process.env.PORT || 3000;
const NFTY_HOST = process.env.NFTY_HOST;

app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const results = await new Promise((resolve, reject) => {
        db.all('SELECT id, title, priority, tags FROM todos', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });

    res.render('index', { nftHost: process.env.NFTY_HOST, todos: results });
});

function sendNotification(body, headers, topic = 'todo') {
    fetch(`${NFTY_HOST}/${topic}`, {
        method: 'POST', // PUT works too
        body: body,
        headers: headers,
    });
}

app.post('/create', (req, res) => {
    const { title, priority, emoji } = req.body;

    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, priority TEXT, tags TEXT)');
        const stmt = db.prepare('INSERT INTO todos (title, priority, tags) VALUES (?, ?, ?)');

        stmt.run(title, priority, emoji);

        stmt.finalize();
    });

    sendNotification('created', {
        Title: title,
        Priority: priority,
        Tags: emoji,
    });

    res.json({ message: 'Task created successfully' });
    // res.sendStatus(200);
});

app.post('/complete', (req, res) => {
    const { title } = req.body;

    sendNotification('completed', {
        Title: title,
        Priority: 'urgent',
        Tags: 'warning,skull',
    });

    res.json({ message: 'Task completed successfully' });
});

app.get('/delete', (req, res) => {
    sendNotification('removed', {
        Title: title,
        Priority: 'urgent',
        Tags: 'warning,skull',
    });

    res.json({ message: 'Task deleted successfully' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
