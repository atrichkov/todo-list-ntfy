'use strict';
var Emojis;
(function (Emojis) {
    Emojis["grinning"] = "\uD83D\uDE03";
    Emojis["ok_hand"] = "\uD83D\uDC4C";
    Emojis["plate_with_cutlery"] = "\uD83C\uDF7D\uFE0F";
    Emojis["baby_bottle"] = "\uD83C\uDF7C";
    Emojis["world_map"] = "\uD83D\uDDFA\uFE0F";
    Emojis["guide_dog"] = "\uD83E\uDDAE";
    Emojis["wc"] = "\uD83D\uDEBE";
    Emojis["hankey"] = "\uD83D\uDCA9";
})(Emojis || (Emojis = {}));
;
var Priorities;
(function (Priorities) {
    Priorities["low"] = "#A0D8E5";
    Priorities["medium"] = "#27AE60";
    Priorities["high"] = "#ff5555";
})(Priorities || (Priorities = {}));
;
// @ts-ignore
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
            // @ts-ignore
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
