const emojis = {
    grinning: '😃',
    ok_hand: '👌',
    plate_with_cutlery: '🍽️',
    baby_bottle: '🍼',
    world_map: '🗺️',
    guide_dog: '🦮',
    wc: '🚾',
    hankey: '💩',
};

const priorities = {
    low: '#A0D8E5',
    medium: '#27AE60',
    high: '#ff5555',
};

const vueApp = new Vue({
    el: '#vapp',
    data: {
        todosList: [],
        title: '',
        priority: 'medium',
        emoji: 'grinning',
    },
    created() {
        fetch('/list')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.todosList = data.data;
            });
    },
    methods: {
        addTodo(e) {
            if (this.title !== '') {
                const item = {
                    title: this.title,
                    priority: this.priority,
                    emoji: this.emoji,
                };

                fetch('/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(item),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.info(data);
                        this.todosList.push(item);
                    });
            }
        },
        complete(key) {
            // TODO
            this.todosList[key].completed = 'true';
            // fetch('complete', {
            //     method: 'POST',
            //     body: JSON.stringify(data),
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // });
        },
        remove(id) {
            console.log('delete', id);
            fetch('/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                // prettier-ignore
                body: JSON.stringify({
                    id: id
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    this.todosList = this.todosList.filter((item) => item.id !== id);
                    console.info(data);
                });
        },
    },
});
