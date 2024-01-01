fetch('http://127.0.0.1:8001/test', {
    method: 'POST', // PUT works too
    body: 'My first notification',
    headers: {
        Title: 'Notification header',
        Priority: 'urgent',
        Tags: 'warning,skull',
    },
});
