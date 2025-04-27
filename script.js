// Günler ve ikon anahtar kelimeleri
const days = ['pazartesi', 'sali', 'carsamba', 'persembe', 'cuma', 'cumartesi', 'pazar'];
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

// Motive edici alıntılar
const motivationalQuotes = [
    "Küçük adımlar, büyük değişimlere yol açar.",
    "Bugün yapabileceğini yarına bırakma.",
    "Her başarı, küçük başlangıçlarla gelir.",
    "Planlamak, başarmanın yarısıdır.",
    "Düzenli olmak, özgür olmaktır.",
    "Her gün yeni bir başlangıçtır.",
    "Kendine inan, yapabilirsin!",
    "Bugün dünden daha iyisini yapabilirsin.",
    "Hedeflerine ulaşmak için her gün bir adım at.",
    "Başarı, hazırlık ve fırsatın buluşmasıdır."
];

// Motivasyon ikonları
const motivationIcons = [
    { icon: "💪", text: "Güçlü ol" },
    { icon: "🎯", text: "Hedefine odaklan" },
    { icon: "⚡", text: "Enerjini kullan" },
    { icon: "🌟", text: "Parlak bir gelecek için" },
    { icon: "📝", text: "Planını yap" }
];

window.addEventListener('DOMContentLoaded', () => {
    // Giriş ekranı işlevselliği
    const welcomeScreen = document.getElementById('welcome-screen');
    const appContent = document.getElementById('app-content');
    const startButton = document.getElementById('start-button');
    const welcomeQuote = document.querySelector('.welcome-quote');
    const motivationIconsContainer = document.querySelector('.motivation-icons');
    
    // Rastgele bir motive edici alıntı seç
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    welcomeQuote.textContent = `"${randomQuote}"`;
    
    // Motivasyon ikonlarını oluştur
    motivationIcons.forEach((item, index) => {
        const iconSpan = document.createElement('span');
        iconSpan.className = 'motivation-icon';
        iconSpan.textContent = item.icon;
        iconSpan.title = item.text;
        iconSpan.style.setProperty('--i', index + 1);
        motivationIconsContainer.appendChild(iconSpan);
    });
    
    // Başla butonuna tıklandığında
    startButton.addEventListener('click', () => {
        welcomeScreen.classList.add('animate__animated', 'animate__fadeOut');
        
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            appContent.style.display = 'block';
            appContent.classList.add('animate__animated', 'animate__fadeIn');
            
            // Uygulama başlatıldıktan sonra normal işlevselliği başlat
            initializeApp();
        }, 1000);
    });
    
    // LocalStorage işlemleri
    function loadTodosForAllDays() {
        const allTodos = {};
        days.forEach(day => {
            allTodos[day] = JSON.parse(localStorage.getItem(`todos_${day}`)) || [];
        });
        return allTodos;
    }
    function saveTodos(todos) {
        days.forEach(day => {
            localStorage.setItem(`todos_${day}`, JSON.stringify(todos[day]));
        });
    }

    // Değişkenler
    let todos = loadTodosForAllDays();
    let activeDay = days[0];
    let currentFilter = 'all';
    let selectedTimeRange = null;
    let weeklyStackedChart = null;
    let weeklyCompletionLineChart = null;
    let weeklyTotalBarChart = null;

    // DOM elementleri
    const dayTabs = document.querySelectorAll('.day-tab');
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clearCompletedButton = document.getElementById('clear-completed');
    const startTimeInput = document.getElementById('start-time');
    const endTimeInput = document.getElementById('end-time');
    const addTimerButton = document.getElementById('add-timer-button');
    const todoList = document.getElementById('todo-list');
    const todoCount = document.getElementById('todo-count');

    // Fonksiyonlar
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
    
    // Uygulama başlatma fonksiyonu
    function initializeApp() {
        renderTodos();
        updateActiveDayTab();
        
        // Event listeners
        dayTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                activeDay = tab.dataset.day;
                updateActiveDayTab();
                renderTodos();
            });
        });
        
        addButton.addEventListener('click', addTodo);
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTodo();
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
        
        todoList.addEventListener('click', (e) => {
            const todoItem = e.target.closest('.todo-item');
            if (!todoItem) return;
            
            const todoId = todoItem.dataset.id;
            
            if (e.target.classList.contains('delete-btn')) {
                todos[activeDay] = todos[activeDay].filter(todo => todo.id !== todoId);
                saveTodos(todos);
                renderTodos();
            } else if (e.target.classList.contains('todo-checkbox')) {
                todos[activeDay] = todos[activeDay].map(todo => {
                    if (todo.id === todoId) {
                        return { ...todo, completed: !todo.completed };
                    }
                    return todo;
                });
                saveTodos(todos);
                renderTodos();
            }
        });
        
        clearCompletedButton.addEventListener('click', () => {
            todos[activeDay] = todos[activeDay].filter(todo => !todo.completed);
            saveTodos(todos);
            renderTodos();
        });
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderTodos();
            });
        });
    }
    
    function renderTodos() {
        const todosForActiveDay = todos[activeDay];
        let filteredTodos = todosForActiveDay;
        if (currentFilter === 'active') {
            filteredTodos = todosForActiveDay.filter(todo => !todo.completed);
        } else if (currentFilter === 'completed') {
            filteredTodos = todosForActiveDay.filter(todo => todo.completed);
        }
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
                let todoContent = `
                    <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                    <span class="todo-icon">${todo.icon || defaultIcon}</span>
                    <span class="todo-text">${todo.text}`;
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
        const activeTodoCount = todosForActiveDay.filter(todo => !todo.completed).length;
        todoCount.textContent = `${activeTodoCount} görev kaldı`;
        renderWeeklyStackedChart();
        renderWeeklyCompletionLineChart();
        renderWeeklyTotalBarChart();
    }
    function updateActiveDayTab() {
        dayTabs.forEach(tab => {
            if (tab.dataset.day === activeDay) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }
    function getWeeklyStackedData() {
        const completed = [];
        const active = [];
        days.forEach(day => {
            const todosForDay = todos[day];
            completed.push(todosForDay.filter(t => t.completed).length);
            active.push(todosForDay.filter(t => !t.completed).length);
        });
        return { completed, active };
    }
    function getWeeklyCompletionData() {
        const completionRates = [];
        days.forEach(day => {
            const total = todos[day].length;
            const completed = todos[day].filter(todo => todo.completed).length;
            const rate = total === 0 ? 0 : Math.round((completed / total) * 100);
            completionRates.push(rate);
        });
        return completionRates;
    }
    function getWeeklyTotalData() {
        return days.map(day => todos[day].length);
    }
    function renderWeeklyStackedChart() {
        const ctx = document.getElementById('weekly-tasks-stacked').getContext('2d');
        const { completed, active } = getWeeklyStackedData();
        if (weeklyStackedChart) { weeklyStackedChart.destroy(); }
        weeklyStackedChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: days.map(day => day.charAt(0).toUpperCase() + day.slice(1)),
                datasets: [
                    {
                        label: 'Tamamlanan',
                        data: completed,
                        backgroundColor: 'rgba(54, 162, 235, 0.7)'
                    },
                    {
                        label: 'Aktif',
                        data: active,
                        backgroundColor: 'rgba(255, 206, 86, 0.7)'
                    }
                ]
            },
            options: {
                plugins: { },
                responsive: true,
                scales: {
                    x: { stacked: true },
                    y: { stacked: true, beginAtZero: true }
                }
            }
        });
    }
    function renderWeeklyCompletionLineChart() {
        const ctx = document.getElementById('weekly-completion-line').getContext('2d');
        const data = getWeeklyCompletionData();
        if (weeklyCompletionLineChart) { weeklyCompletionLineChart.destroy(); }
        weeklyCompletionLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: days.map(day => day.charAt(0).toUpperCase() + day.slice(1)),
                datasets: [{
                    label: 'Tamamlanma Oranı (%)',
                    data: data,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } }
                },
                plugins: { legend: { display: false } }
            }
        });
    }
    function renderWeeklyTotalBarChart() {
        const ctx = document.getElementById('weekly-total-bar').getContext('2d');
        const data = getWeeklyTotalData();
        if (weeklyTotalBarChart) { weeklyTotalBarChart.destroy(); }
        weeklyTotalBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: days.map(day => day.charAt(0).toUpperCase() + day.slice(1)),
                datasets: [{
                    label: 'Toplam Görev',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.7)'
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                },
                plugins: { legend: { display: false } }
            }
        });
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
        renderTodos();
        resetTimer();
        todoInput.value = '';
        todoInput.focus();
    }
}); 