import { days, loadTodosForAllDays, saveTodos } from './model.js';
import { renderTodos, updateActiveDayTab } from './view.js';

// İkon listesi - anahtar kelimelerle eşleşen iconlar
const iconKeywords = [
    { keyword: ['spor', 'koşu', 'yürüyüş', 'egzersiz', 'yoga', 'fitness'], icon: '🏃' },
    { keyword: ['öğren', 'çalış', 'oku', 'kitap', 'eğitim', 'ders', 'ödev'], icon: '📚' },
    { keyword: ['iş', 'toplantı', 'proje', 'sunum', 'mail', 'e-posta'], icon: '💼' },
    { keyword: ['temizlik', 'düzenle', 'topla', 'süpür', 'yıka'], icon: '🧹' },
    { keyword: ['alışveriş', 'market', 'mağaza', 'satın al'], icon: '🛒' },
    { keyword: ['yemek', 'pişir', 'kahvaltı', 'öğle', 'akşam', 'mutfak'], icon: '🍳' },
    { keyword: ['ara', 'telefon', 'konuş', 'görüşme'], icon: '📱' },
    { keyword: ['gez', 'seyahat', 'tatil', 'ziyaret'], icon: '✈️' },
    { keyword: ['uyku', 'dinlen', 'mola', 'uyu'], icon: '😴' },
    { keyword: ['plan', 'organize', 'liste', 'düzenle', 'hatırla'], icon: '📝' },
    { keyword: ['izle', 'film', 'dizi', 'video', 'tv', 'televizyon'], icon: '📺' },
    { keyword: ['müzik', 'dinle', 'şarkı'], icon: '🎵' },
    { keyword: ['sağlık', 'doktor', 'ilaç', 'hastane', 'randevu'], icon: '🏥' },
    { keyword: ['öde', 'fatura', 'banka', 'para', 'ödeme'], icon: '💰' },
    { keyword: ['aile', 'çocuk', 'anne', 'baba', 'eş'], icon: '👨‍👩‍👧‍👦' },
    { keyword: ['arkadaş', 'buluş', 'görüş', 'sosyal'], icon: '👥' },
    { keyword: ['evcil', 'kedi', 'köpek', 'hayvan'], icon: '🐾' },
    { keyword: ['bahçe', 'bitki', 'çiçek', 'ağaç', 'sulama'], icon: '🌱' },
    { keyword: ['tamir', 'onarım', 'fiksle'], icon: '🔧' },
    { keyword: ['yazılım', 'kod', 'program', 'bilgisayar'], icon: '💻' },
    { keyword: ['fotoğraf', 'çek', 'kamera', 'foto'], icon: '📷' },
    { keyword: ['resim', 'boya', 'çiz', 'sanat'], icon: '🎨' },
    { keyword: ['parti', 'kutlama', 'doğum günü', 'eğlence'], icon: '🥳' },
    { keyword: ['alışkanlık', 'gelişim', 'hedef', 'başarı'], icon: '🚀' },
    { keyword: ['hava', 'yağmur', 'güneş', 'kar'], icon: '☀️' },
    { keyword: ['yazı', 'makale', 'blog', 'not'], icon: '🖋️' },
    { keyword: ['moda', 'kıyafet', 'stil', 'giyim'], icon: '👗' },
    { keyword: ['aksesuar', 'takı', 'saat', 'gözlük'], icon: '💎' },
    { keyword: ['yardım', 'destek', 'yardımlaşma'], icon: '🤝' },
    { keyword: ['hobi', 'boş zaman', 'uğraş', 'zevk'], icon: '🎯' },
    { keyword: ['motivasyon', 'ilham', 'enerji', 'güç'], icon: '⚡' },
    { keyword: ['araba', 'araç', 'sürüş', 'otopark'], icon: '🚗' },
    { keyword: ['yemek siparişi', 'paket servis', 'getir', 'yemeksepeti'], icon: '🍔' },
    { keyword: ['dondurma', 'tatlı', 'pasta', 'çikolata'], icon: '🍰' },
    { keyword: ['spor salonu', 'ağırlık', 'antrenman', 'gym'], icon: '🏋️' },
    { keyword: ['okyanus', 'deniz', 'plaj', 'yüzme'], icon: '🏖️' },
    { keyword: ['müze', 'sergi', 'galeri', 'sanat etkinliği'], icon: '🏛️' },
    { keyword: ['doğa', 'kamp', 'orman', 'dağ'], icon: '🏕️' },
    { keyword: ['rüya', 'hayal', 'dilek', 'umut'], icon: '🌟' },
    { keyword: ['tatlı hayvanlar', 'minik', 'sevimli', 'pati'], icon: '🐶' }
];
const defaultIcon = '✅';

let todos = loadTodosForAllDays();
let activeDay = days[0];
let currentFilter = 'all';
let selectedTimeRange = null;

window.addEventListener('DOMContentLoaded', () => {
    // DOM elementlerini seç
    const dayTabs = document.querySelectorAll('.day-tab');
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clearCompletedButton = document.getElementById('clear-completed');
    const startTimeInput = document.getElementById('start-time');
    const endTimeInput = document.getElementById('end-time');
    const addTimerButton = document.getElementById('add-timer-button');

    function findIconForText(text) {
        text = text.toLowerCase();
        for (const item of iconKeywords) {
            if (item.keyword.some(keyword => text.includes(keyword))) {
                return item.icon;
            }
        }
        return defaultIcon;
    }

    function resetTimer() {
        selectedTimeRange = null;
        startTimeInput.value = '';
        endTimeInput.value = '';
        addTimerButton.textContent = 'Zamanlayıcı Ekle';
        addTimerButton.classList.remove('active');
    }

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;
        const todoIcon = findIconForText(todoText);
        const newTodo = {
            id: Date.now().toString(),
            text: todoText,
            completed: false,
            createdAt: new Date(),
            timeRange: selectedTimeRange,
            icon: todoIcon
        };
        todos[activeDay].push(newTodo);
        saveTodos(todos);
        renderTodos(todos, activeDay, currentFilter, iconKeywords, defaultIcon);
        resetTimer();
        todoInput.value = '';
        todoInput.focus();
    }

    updateActiveDayTab(dayTabs, activeDay);
    renderTodos(todos, activeDay, currentFilter, iconKeywords, defaultIcon);

    dayTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            activeDay = tab.dataset.day;
            updateActiveDayTab(dayTabs, activeDay);
            renderTodos(todos, activeDay, currentFilter, iconKeywords, defaultIcon);
        });
    });

    addButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    addTimerButton.addEventListener('click', () => {
        const startTime = startTimeInput.value;
        const endTime = endTimeInput.value;
        if (startTime && endTime) {
            selectedTimeRange = { startTime, endTime };
            addTimerButton.textContent = `${startTime} - ${endTime}`;
            addTimerButton.classList.add('active');
        } else {
            alert('Lütfen başlangıç ve bitiş saatlerini seçin.');
        }
    });

    document.getElementById('todo-list').addEventListener('click', (e) => {
        const todoId = e.target.closest('.todo-item')?.dataset.id;
        if (!todoId) return;
        if (e.target.classList.contains('delete-btn')) {
            todos[activeDay] = todos[activeDay].filter(todo => todo.id !== todoId);
            saveTodos(todos);
            renderTodos(todos, activeDay, currentFilter, iconKeywords, defaultIcon);
        } else if (e.target.classList.contains('todo-checkbox')) {
            todos[activeDay] = todos[activeDay].map(todo => {
                if (todo.id === todoId) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
            saveTodos(todos);
            renderTodos(todos, activeDay, currentFilter, iconKeywords, defaultIcon);
        }
    });

    clearCompletedButton.addEventListener('click', () => {
        todos[activeDay] = todos[activeDay].filter(todo => !todo.completed);
        saveTodos(todos);
        renderTodos(todos, activeDay, currentFilter, iconKeywords, defaultIcon);
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTodos(todos, activeDay, currentFilter, iconKeywords, defaultIcon);
        });
    });
}); 