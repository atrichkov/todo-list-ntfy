'use strict';

const path = require('node:path');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

function sendNotification(body, headers, topic = 'todo') {
    // fetch(`${process.env.NFTY_HOST}/${topic}`, {
    //     method: 'POST', // PUT works too
    //     body: body,
    //     headers: headers,
    // });
}

app.post('/create', (req, res) => {
    const { title, priority, emoji } = req.body;

    console.log(req.body);

    sendNotification(title, {
        Priority: priority,
        Tags: emoji,
    });

    res.json({ message: 'Data received successfully' });
    // res.sendStatus(200);
});

app.get('/delete', (req, res) => {
    sendNotification('Todo is removed', {
        Title: title,
        Priority: 'urgent',
        Tags: 'warning,skull',
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
