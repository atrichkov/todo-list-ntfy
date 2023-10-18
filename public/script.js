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

document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    addTaskButton.addEventListener('click', function (e) {
        e.preventDefault();

        const form = document.querySelector('#subscription');
        const formData = new FormData(form);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        const { title, priority, emoji } = data;
        if (title !== '') {
            const taskItem = document.createElement('li');
            taskItem.setAttribute('style', `border-bottom: 5px solid ${priorities[priority]}`);
            taskItem.innerHTML = `
                <span>${emojis[emoji]} ${title}</span>
                <div>
                    <button id="delete" class="nb-button orange">Delete</button>
                    <button id="complete" class="nb-button green">Complete</button>
                </div>
            `;

            taskList.appendChild(taskItem);

            const deleteButton = taskItem.querySelector('#delete');
            const completeButton = taskItem.querySelector('#complete');

            deleteButton.addEventListener('click', function () {
                taskItem.remove();
            });

            completeButton.addEventListener('click', function () {
                taskItem.classList.toggle('completed');

                fetch('complete', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            });

            fetch('create', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            addTaskButton.click();
        }
    });
});
