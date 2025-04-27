// View: Sadece DOM işlemleri

export function renderTodos(todos, activeDay, currentFilter, iconKeywords, defaultIcon) {
    const todoList = document.getElementById('todo-list');
    const todoCount = document.getElementById('todo-count');
    // Aktif günün todolarını al
    const todosForActiveDay = todos[activeDay];
    // Filtrelemeyi uygula
    let filteredTodos = todosForActiveDay;
    if (currentFilter === 'active') {
        filteredTodos = todosForActiveDay.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todosForActiveDay.filter(todo => todo.completed);
    }
    // Listede todoları göster
    todoList.innerHTML = '';
    if (filteredTodos.length === 0) {
        todoList.innerHTML = `<li class="empty-message">Bu gün için görev yok</li>`;
    } else {
        filteredTodos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.classList.add('todo-item');
            todoItem.dataset.id = todo.id;
            if (todo.completed) {
                todoItem.classList.add('completed');
            }
            // Todo metnini ve zamanlayıcı bilgisi oluştur
            let todoContent = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-icon">${todo.icon || defaultIcon}</span>
                <span class="todo-text">${todo.text}`;
            // Eğer zamanlayıcı varsa ekle
            if (todo.timeRange) {
                todoContent += `<span class="time-tag">${todo.timeRange.startTime} - ${todo.timeRange.endTime}</span>`;
            }
            todoContent += `</span>
                <button class="delete-btn">❌</button>
            `;
            todoItem.innerHTML = todoContent;
            todoList.appendChild(todoItem);
        });
    }
    // Kalan aktif todo sayısını güncelle
    const activeTodoCount = todosForActiveDay.filter(todo => !todo.completed).length;
    todoCount.textContent = `${activeTodoCount} görev kaldı`;
}

export function updateActiveDayTab(dayTabs, activeDay) {
    dayTabs.forEach(tab => {
        if (tab.dataset.day === activeDay) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
} 