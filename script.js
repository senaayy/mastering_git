// DOM elemanlarını seçme
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const todoCount = document.getElementById('todo-count');
const clearCompletedButton = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('.filter-btn');
const startTimeInput = document.getElementById('start-time');
const endTimeInput = document.getElementById('end-time');
const addTimerButton = document.getElementById('add-timer-button');
const dayTabs = document.querySelectorAll('.day-tab');

// Günleri tanımlama
const days = [
    'pazartesi', 'sali', 'carsamba', 'persembe', 
    'cuma', 'cumartesi', 'pazar'
];

// Aktif gün 
let activeDay = getInitialActiveDay();

// Todo listesi için veri yapısı (local storage'dan alınacak)
let todos = loadTodosForAllDays();
let currentFilter = 'all';
let selectedTimeRange = null;

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
    { keyword: ['yazılım', 'kod', 'program', 'bilgisayar'], icon: '💻' }
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

// Varsayılan ikon
const defaultIcon = '✅';

// Aktif günü belirle (bugün veya en son seçilen gün)
function getInitialActiveDay() {
    const savedDay = localStorage.getItem('activeDay');
    if (savedDay && days.includes(savedDay)) {
        return savedDay;
    }
    
    // Bugünün gününü bul
    const today = new Date().getDay(); // 0-6 arası (0: Pazar)
    const dayIndex = today === 0 ? 6 : today - 1; // Pazartesi 0 indeksli olacak şekilde düzenle
    return days[dayIndex];
}

// Tüm günlerin todolarını yükle
function loadTodosForAllDays() {
    const allTodos = {};
    
    days.forEach(day => {
        allTodos[day] = JSON.parse(localStorage.getItem(`todos_${day}`)) || [];
    });
    
    return allTodos;
}

// Sayfayı ilk yüklediğimizde todoları göster ve aktif günü seç
document.addEventListener('DOMContentLoaded', () => {
    // Aktif gün sekmesini vurgula
    updateActiveDayTab();
    
    // Todoları yükle
    renderTodos();
});

// Gün sekmesi değiştirme
dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        activeDay = tab.dataset.day;
        
        // Aktif günü localStorage'a kaydet
        localStorage.setItem('activeDay', activeDay);
        
        // Sekme görünümünü güncelle
        updateActiveDayTab();
        
        // Yeni günün todolarını göster
        renderTodos();
    });
});

// Aktif gün sekmesini vurgula
function updateActiveDayTab() {
    dayTabs.forEach(tab => {
        if (tab.dataset.day === activeDay) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

// Yeni todo ekleme
addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Zamanlayıcı ekleme 
addTimerButton.addEventListener('click', () => {
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;
    
    if (startTime && endTime) {
        // Zamanlayıcıyı geçici olarak sakla
        selectedTimeRange = {
            startTime: startTime,
            endTime: endTime
        };
        
        // Görsel olarak butonun seçili olduğunu göster
        addTimerButton.textContent = `${startTime} - ${endTime}`;
        addTimerButton.classList.add('active');
    } else {
        alert('Lütfen başlangıç ve bitiş saatlerini seçin.');
    }
});

// Todo silme ve işaretleme işlevleri için event delegation
todoList.addEventListener('click', (e) => {
    const todoId = e.target.closest('.todo-item')?.dataset.id;
    
    if (!todoId) return;
    
    // Silme butonuna tıklandı mı?
    if (e.target.classList.contains('delete-btn')) {
        removeTodo(todoId);
    } 
    // Checkbox'a tıklandı mı?
    else if (e.target.classList.contains('todo-checkbox')) {
        toggleTodoComplete(todoId);
    }
});

// Tamamlananları temizle
clearCompletedButton.addEventListener('click', clearCompleted);

// Filtreleme butonları
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// Metin için uygun ikon seçme
function findIconForText(text) {
    text = text.toLowerCase();
    
    for (const item of iconKeywords) {
        if (item.keyword.some(keyword => text.includes(keyword))) {
            return item.icon;
        }
    }
    
    return defaultIcon;
}

// Yeni todo ekleme fonksiyonu
function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText === '') return;
    
    // Metin için otomatik ikon seçme
    const todoIcon = findIconForText(todoText);
    
    const newTodo = {
        id: Date.now().toString(),
        text: todoText,
        completed: false,
        createdAt: new Date(),
        timeRange: selectedTimeRange,
        icon: todoIcon
    };
    
    // Aktif güne göre todoyu ekle
    todos[activeDay].push(newTodo);
    saveTodos();
    renderTodos();
    
    // Zamanlayıcıyı sıfırla
    resetTimer();
    
    todoInput.value = '';
    todoInput.focus();
}

// Zamanlayıcıyı sıfırlama
function resetTimer() {
    selectedTimeRange = null;
    startTimeInput.value = '';
    endTimeInput.value = '';
    addTimerButton.textContent = 'Zamanlayıcı Ekle';
    addTimerButton.classList.remove('active');
}

// Todo'yu tamamlandı olarak işaretleme
function toggleTodoComplete(id) {
    todos[activeDay] = todos[activeDay].map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    
    saveTodos();
    renderTodos();
}

// Todo silme
function removeTodo(id) {
    todos[activeDay] = todos[activeDay].filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Tamamlananları temizle
function clearCompleted() {
    todos[activeDay] = todos[activeDay].filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
}

// Local Storage'a kaydetme
function saveTodos() {
    // Her günün todos verisini ayrı ayrı kaydet
    days.forEach(day => {
        localStorage.setItem(`todos_${day}`, JSON.stringify(todos[day]));
    });
}

// Todo listesini ekranda gösterme (filtreleme dahil)
function renderTodos() {
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
