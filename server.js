'use strict';

const path = require('node:path');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const NFTY_HOST = process.env.NFTY_HOST;

app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { nftHost: process.env.NFTY_HOST });
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