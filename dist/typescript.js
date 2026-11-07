"use strict";
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyState = document.getElementById('todo-empty');
const counter = document.getElementById('todo-counter');
const stats = document.getElementById('todo-stats');
const clearBtn = document.getElementById('todo-clear-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
let nextId = 0;
let currentFilter = 'all';
function applyFilter() {
    const allTasks = document.querySelectorAll('.todo-item');
    allTasks.forEach((task) => {
        const isCompleted = task.classList.contains('completed');
        if (currentFilter === 'all') {
            task.style.display = 'flex';
        }
        else if (currentFilter === 'active' && !isCompleted) {
            task.style.display = 'flex';
        }
        else if (currentFilter === 'completed' && isCompleted) {
            task.style.display = 'flex';
        }
        else {
            task.style.display = 'none';
        }
    });
}
function updateStats() {
    if (!list)
        return;
    const total = document.querySelectorAll('.todo-item').length;
    const active = document.querySelectorAll('.todo-item:not(.completed)').length;
    if (counter)
        counter.textContent = `${total}`;
    if (stats)
        stats.textContent = `${active}`;
}
;
clearBtn === null || clearBtn === void 0 ? void 0 : clearBtn.addEventListener('click', () => {
    document.querySelectorAll('.todo-item.completed').forEach((item) => item.remove());
    updateStats();
});
filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        currentFilter = filter;
        applyFilter();
    });
});
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input === null || input === void 0 ? void 0 : input.value.trim();
    if (!text)
        return;
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'todo-delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.type = 'button';
    const id = nextId++;
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = id.toString();
    const label = document.createElement('label');
    label.className = 'todo-label';
    const checkbox = document.createElement('input');
    checkbox.className = 'todo-checkbox';
    checkbox.id = 'todo-checkbox-' + id;
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        const task = checkbox.closest('.todo-item');
        if (task) {
            if (checkbox.checked) {
                task.classList.add('completed');
            }
            else {
                task.classList.remove('completed');
            }
        }
        updateStats();
    });
    function updateStats() {
        if (!list)
            return;
        const total = document.querySelectorAll('.todo-item').length;
        const active = document.querySelectorAll('.todo-item:not(.completed)').length;
        if (counter)
            counter.textContent = `${total}`;
        if (stats)
            stats.textContent = `${active}`;
    }
    ;
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text;
    label.appendChild(checkbox);
    label.appendChild(span);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    list === null || list === void 0 ? void 0 : list.appendChild(li);
    deleteBtn.addEventListener('click', () => {
        li.remove();
        updateStats();
    });
    input.value = '';
    input.focus();
    updateStats();
});
