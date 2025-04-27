// Günler
export const days = ['pazartesi', 'sali', 'carsamba', 'persembe', 'cuma', 'cumartesi', 'pazar'];

// Tüm günlerin todolarını yükle
export function loadTodosForAllDays() {
    const allTodos = {};
    days.forEach(day => {
        allTodos[day] = JSON.parse(localStorage.getItem(`todos_${day}`)) || [];
    });
    return allTodos;
}

// Todoları kaydet
export function saveTodos(todos) {
    days.forEach(day => {
        localStorage.setItem(`todos_${day}`, JSON.stringify(todos[day]));
    });
} 