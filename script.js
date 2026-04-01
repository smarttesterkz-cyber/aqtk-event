// ============================================================================
// 1. НАШ ЕДИНСТВЕННЫЙ ИСТОЧНИК ИСТИНЫ
// ============================================================================
let eventsData = JSON.parse(localStorage.getItem('allEvents')) || [
    // --- АКТ ЗАЛЫ ---
    { id: 1, date: "2026-03-13", title: "Көрісу күні", time: "11:00", location: "Акт залы", category: "festival", photos: ["Photos/1_photo.jfif"] },
    { id: 2, date: "2026-03-20", title: "Наурыз Мерекесі", time: "12:30", location: "Акт залы", category: "festival", photos: ["Photos/2_photo.jpeg"] },
    { id: 3, date: "2026-10-30", title: "Күзгі балл", time: "18:00", location: "Акт залы", category: "festival", photos: ["Photos/3_photo.jfif"] },
    { id: 4, date: "2026-03-06", title: "Халықаралық әйелдер күні", time: "14:00", location: "Акт залы", category: "concert", photos: ["Photos/4_photo.png"] },
    { id: 5, date: "2026-04-29", title: "Ахмет Жұбанов 120 жыл", time: "15:00", location: "Акт залы", category: "concert", photos: ["Photos/5_photo.jpg"] },
    { id: 6, date: "2026-05-01", title: "Бірлік күні", time: "11:00", location: "Акт залы", category: "concert", photos: ["Photos/6_photo.jpeg"] },
    { id: 7, date: "2026-05-05", title: "Фатима Балғаеваның туған күні", time: "16:30", location: "Акт залы", category: "concert", photos: ["Photos/7_photo.jpg"] },
    { id: 8, date: "2026-05-07", title: "Отан қорғаушылар күні", time: "12:00", location: "Акт залы", category: "concert", photos: ["Photos/8_photo.jpg"] },
    { id: 9, date: "2026-10-05", title: "Ұстаздар күні", time: "15:00", location: "Акт залы", category: "concert", photos: ["Photos/9_photo.jpg"] },
    { id: 10, date: "2026-11-17", title: "Студенттер күні", time: "17:00", location: "Акт залы", category: "concert", photos: ["Photos/10_photo.jpg"] },
    { id: 11, date: "2026-02-16", title: "ЖББП АПТАЛЫҒЫ", time: "09:00", location: "Акт залы", category: "exhibition", photos: ["Photos/11_photo.png"] },
    { id: 12, date: "2026-03-02", title: "Электрмен қамтамасыз ету және IT бөлімі АПТАЛЫҒЫ", time: "10:00", location: "Акт залы", category: "exhibition", photos: ["Photos/12_photo.png"] },

    // --- СПОРТ ЗАЛЫ ---
    { id: 13, date: "2026-02-02", title: "“Мерген Сарбаз” пневматикалық винтовка сайысы", time: "10:30", location: "Спорт залы", category: "sport", photos: ["Photos/13_photo.jpeg"] },
    { id: 14, date: "2026-10-28", title: "Рухты жастар-салауатты қоғам сайысы", time: "14:00", location: "Спорт залы", category: "sport", photos: ["Photos/14_photo.png"] },

    // --- 2-КОРПУС ---
    { id: 15, date: "2026-01-16", title: "Құқықтық мәдениет және қоғамдық тәртіп", time: "10:00", location: "2-корпус", category: "exhibition", photos: ["Photos/15_photo.jfif"] },
    { id: 16, date: "2026-01-23", title: "Зиянды әдеттер және оның құқықтық салдары", time: "11:00", location: "2-корпус", category: "exhibition", photos: ["Photos/16_photo.jpeg"] },
    { id: 17, date: "2026-02-10", title: "Мұқағали Мақатаев 95 жылдығы", time: "12:00", location: "2-корпус", category: "exhibition", photos: ["Photos/17_photo.jpeg"] },
    { id: 18, date: "2026-10-23", title: "Республика күні", time: "13:00", location: "2-корпус", category: "exhibition", photos: ["Photos/18_photo.jpeg"] },
    { id: 19, date: "2026-11-02", title: "Ыбырай Алтынсарин 185 жыл", time: "11:30", location: "2-корпус", category: "exhibition", photos: ["Photos/19_photo.jpeg"] }
];

// ============================================================================
// 2. СИНХРОНИЗАЦИЯ ДАННЫХ
// ============================================================================
function syncData() {
    localStorage.setItem('allEvents', JSON.stringify(eventsData));
    if (isCalendarInitialized && pageAttr === 'main') {
        renderMiniCalendar();
    }
    renderEvents();
}


// ============================================================================
// 4. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
// ============================================================================
let currentWeekStart = null;  // Начало текущей недели (timestamp)
let isCalendarInitialized = false;
let pageAttr;
const todayStart = new Date().setHours(0, 0, 0, 0);
let currentSelectedFileBase64 = null;

// ============================================================================
// 5. ЕДИНСТВЕННЫЙ DOMContentLoaded
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Инициализация началась');

    // 2. Определяем текущую страницу
    pageAttr = document.body.getAttribute('data-page') || 'main';
    if (!currentWeekStart) {
        currentWeekStart = getWeekStart();
    }
    if (pageAttr === 'main') {
        renderMiniCalendar();
        isCalendarInitialized = true;
    }

    // 3. Делаем функции глобальными
    window.openRegModal = openRegModal;
    window.confirmBooking = confirmBooking;
    window.renderMyBookings = renderMyBookings;
    window.cancelBooking = cancelBooking;
    window.editEvent = editEvent;
    window.deleteEvent = deleteEvent;
    window.toggleAdminRole = toggleAdminRole;
    window.openAddEventModal = openAddEventModal;
    window.searchUser = searchUser;
    window.openFullScreen = openFullScreen;
    window.removePhoto = removePhoto;
    window.addPhotoToEvent = addPhotoToEvent;
    window.goToEventsPage = goToEventsPage;
    window.clearFilters = clearFilters;
    window.applyFilters = applyFilters;

    // 4. Инициализируем UI
    updateProfileUI();

    // 5. Рендерим нужную страницу
    if (pageAttr === 'main' || pageAttr === 'events') {
        renderEvents();
    } else if (pageAttr === 'bookings') {
        renderMyBookings();
    } else if (pageAttr === 'profile') {
        renderPhotoGrid();
    }

    // 6. Настраиваем обработчики событий
    setupEventHandlers();
});

// ============================================================================
// 6. НАСТРОЙКА ОБРАБОТЧИКОВ СОБЫТИЙ
// ============================================================================
// 🗓️ Получить начало текущей недели (понедельник)
function getWeekStart(date = new Date()) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDay() === 0 ? -6 : day - 1; // Понедельник = 0
    d.setDate(d.getDate() - diff);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
}

// ➡️ Следующая неделя
function nextWeek() {
    currentWeekStart += 7 * 24 * 60 * 60 * 1000;
    renderMiniCalendar();
}

// ⬅️ Предыдущая неделя  
function prevWeek() {
    currentWeekStart -= 7 * 24 * 60 * 60 * 1000;
    renderMiniCalendar();
}

// 🔄 Рендер мини-календаря
function renderMiniCalendar() {
    function getYesterdayDate() {
        const now = new Date();
        now.setHours(now.getHours() - 24);
        return now;
    }
    const container = document.getElementById('calendar-week');
    if (!container) return;

    // ✅ Админ деректерін жүктеу
    const holidays = JSON.parse(localStorage.getItem('calendarHolidays')) || [];
    const daysOff = JSON.parse(localStorage.getItem('calendarDaysOff')) || [];

    const weekStart = new Date(currentWeekStart);
    let html = '';

    for (let i = 0; i < 7; i++) {
        const day = new Date(weekStart.getTime() + i * 24 * 60 * 60 * 1000);
        const dayStr = day.toISOString().split('T')[0];

        const isToday = dayStr === getYesterdayDate().toISOString().split('T')[0];

        // ✅ ТОЧНЫЕ ПРОВЕРКИ (приоритет!)
        const isHoliday = holidays.includes(dayStr);
        const isAdminDayOff = daysOff.includes(dayStr);
        const isWeekend = day.getDay() === 0 || day.getDay() === 6; // Жс=0, Сн=6

        const eventsToday = eventsData.filter(ev => ev.date === dayStr);
        const dayNumber = day.getDate();

        // ✅ 🎨 ПРАВИЛЬНАЯ ЛОГИКА ЦВЕТОВ
        let statusClass = '';
        let statusText = '';

        if (isHoliday) {
            statusClass = 'admin-holiday';  // 🟡 САРАЯ Мереке
            statusText = '<div style="font-size:0.6rem;color:#856404;"></div>';
        }
        else if (isAdminDayOff || isWeekend) {
            statusClass = 'admin-dayoff';   // 🔴 КРАСНЫЙ Демалыс/Выходной
            statusText = isWeekend ?
                '<div style="font-size:0.6rem;color:#fff;"></div>' :
                '<div style="font-size:0.6rem;color:#c0392b;"></div>';
        }

        let eventHtml = eventsToday.length ?
            `<div class="day-events">${eventsToday.length}</div>` : '';

        html += `
            <div class="day-cell ${isToday ? 'today' : ''} ${statusClass}">
                <div class="day-number">${dayNumber}</div>
                ${statusText}${eventHtml}
            </div>
        `;
    }

    const weekGrid = container.querySelector('.calendar-week');
    if (weekGrid) weekGrid.innerHTML = html;
}



function setupEventHandlers() {
    // 1. Күнтізбе стрелкалары
    document.getElementById('prev-week')?.addEventListener('click', prevWeek);
    document.getElementById('next-week')?.addEventListener('click', nextWeek);

    // 2. Форма байланыс
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = feedbackForm.querySelector('input[type="text"]').value;
            const email = feedbackForm.querySelector('input[type="email"]').value;
            alert(`Рахмет, ${name}! Сіздің хабарламаңыз жіберілді.`);
            feedbackForm.reset();
        });
    }

    // 3. ✅ НАВИГАЦИЯНЫ ТҮЗЕТУ
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // ⚠️ МАҢЫЗДЫ!

            const pageId = link.getAttribute('data-page');
            if (!pageId) return;

            // Active class-ты ауыстыру
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            link.classList.add('active');

            // Бетті көрсету
            const targetPage = document.getElementById(pageId + '-page') ||
                document.querySelector(`[id="${pageId}"]`);
            if (targetPage) targetPage.classList.add('active');

            // Жаңа бетті жаңарту
            pageAttr = pageId;

            if (pageId === 'main') {
                currentWeekStart = getWeekStart();
                renderMiniCalendar();
                renderEvents();
            } else if (pageId === 'events') {
                renderEvents();
            } else if (pageId === 'profile') {
                updateProfileUI();
            }
        });
    });

    // 4. Категория батырмалары
    document.querySelectorAll('.cat-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            applyFilters();
        });
    });

    // 5. Іздеу
    const searchInput = document.getElementById('search-events');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') applyFilters();
        });
    }
}

// ============================================================================
// 7. МОИ БРОНИРОВАНИЯ
// ============================================================================
function renderMyBookings() {
    const container = document.getElementById('bookings-list');
    if (!container) return;

    container.innerHTML = `<div class="empty-message"><p>QR кодтар дайындалуда...</p></div>`;

    const email = localStorage.getItem('currentUser');
    const allBookings = JSON.parse(localStorage.getItem('eventBookings')) || [];
    const myBookings = allBookings.filter(b => b.userEmail === email);

    if (myBookings.length === 0) {
        container.innerHTML = `<div class="empty-message"><p>Сізде белсенді брондар жоқ.</p></div>`;
        return;
    }

    container.innerHTML = myBookings.slice().reverse().map(b => {
        const safeId = b.bookingId.replace('#', '');
        return `
                <div class="event-card booking-card" style="display:flex; gap:20px; padding:20px; background:#fff; margin-bottom:15px; border-radius:15px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); align-items:center;">
                    <div id="qr-${safeId}" class="qr-container" style="background:#f8f9ff; padding:15px; border:2px solid #3498db; border-radius:12px; min-width:130px; min-height:130px; display:flex; align-items:center; justify-content:center;">
                        <i class="fas fa-spinner fa-spin" style="font-size:1.5rem; color:#3498db;"></i>
                    </div>
                    <div style="flex:1;">
                        <h3 style="margin:0; color:#2c3e50;">${b.eventTitle}</h3>
                        <p style="margin:5px 0; font-size:0.85rem; color:#7f8c8d;">Күні: ${b.eventDate}</p>
                        <p style="font-weight:bold; color:#3498db; font-family:monospace;">${b.bookingId}</p>
                        <div style="font-size:0.8rem; color:#27ae60; margin:5px 0;">
                            <strong>${b.name}</strong> | ${b.group}
                        </div>
                        <button onclick="cancelBooking('${b.bookingId}')" style="margin-top:10px; color:#e74c3c; background:none; border:none; cursor:pointer; text-decoration:underline; font-weight:600;">
                            Болдырмау
                        </button>
                    </div>
                </div>
            `;
    }).join('');

    generateQRCodes(myBookings);
}

function generateQRCodes(bookings) {
    let attempts = 0;
    const maxAttempts = 50;

    function tryGenerate() {
        attempts++;
        // Проверяем наличие библиотеки
        if (typeof QRCode !== 'undefined') {
            bookings.forEach(b => {
                const safeId = b.bookingId.replace('#', '');
                const qrElement = document.getElementById(`qr-${safeId}`);

                if (qrElement) {
                    qrElement.innerHTML = ""; // ✅ ОЧИЩАЕМ спиннер перед созданием QR
                    try {
                        const qrData = `${b.bookingId}`;
                        new QRCode(qrElement, {
                            text: qrData,
                            width: 120,
                            height: 120,
                            colorDark: "#000000",
                            colorLight: "#ffffff",
                            correctLevel: QRCode.CorrectLevel.H
                        });
                    } catch (e) {
                        console.error('QR error:', e);
                        qrElement.innerHTML = '<i class="fas fa-qrcode" style="font-size:2rem; color:#e74c3c;"></i>';
                    }
                }
            });
        } else if (attempts < maxAttempts) {
            setTimeout(tryGenerate, 200);
        }
    }
    tryGenerate();
}

// ============================================================================
// 8. ОТМЕНА БРОНИРОВАНИЯ
// ============================================================================
function cancelBooking(id) {
    console.log("Жою әрекеті басталды, ID:", id);

    if (confirm("Бұл брондауды жоюды растайсыз ба?")) {
        let all = JSON.parse(localStorage.getItem('eventBookings')) || [];
        const updatedBookings = all.filter(b => b.bookingId !== id);
        localStorage.setItem('eventBookings', JSON.stringify(updatedBookings));
        renderMyBookings();
        syncData();
    }
}

// ============================================================================
// 9. ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ
// ============================================================================
function updateProfileUI() {
    const currentUserEmail = localStorage.getItem('currentUser');
    const guestView = document.getElementById('guest-view');
    const userView = document.getElementById('user-view');
    const adminPanel = document.getElementById('admin-panel');

    if (!currentUserEmail) {
        if (guestView) guestView.style.display = 'block';
        if (userView) userView.style.display = 'none';
        return;
    }

    if (currentUserEmail === 'dosanova2021@icloud.com') {
        let userData = JSON.parse(localStorage.getItem(currentUserEmail)) || {};
        if (userData.role !== 'admin') {
            userData.role = 'admin';
            localStorage.setItem(currentUserEmail, JSON.stringify(userData));
        }
    }

    const userData = JSON.parse(localStorage.getItem(currentUserEmail));
    if (userData && guestView && userView) {
        guestView.style.display = 'none';
        userView.style.display = 'block';

        document.getElementById('display-name').innerText = userData.name || "Пайдаланушы";
        document.getElementById('display-email').innerText = currentUserEmail;

        const roleEl = document.getElementById('display-role');
        if (roleEl) roleEl.innerText = userData.role === 'admin' ? 'Администратор' : 'Пайдаланушы';

        const avatarEl = document.getElementById('user-avatar');
        if (avatarEl) {
            avatarEl.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=3498db&color=fff`;
        }

        if (adminPanel) {
            adminPanel.style.display = userData.role === 'admin' ? 'block' : 'none';
        }

        const adminActions = document.getElementById('admin-functions');
        if (adminActions) {
            adminActions.style.display = userData.role === 'admin' ? 'block' : 'none';
        }
    }
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    location.reload();
}

function handleDeleteAccount() {
    if (confirm('Аккаунтты өшіруді растайсыз ба?')) {
        const msg = document.getElementById('deletion-msg');
        if (msg) msg.style.display = 'block';
    }
}

// ============================================================================
// 10. РЕНДЕР СОБЫТИЙ
// ============================================================================
function renderEvents(dataToRender = eventsData) {
    const mainContainer = document.getElementById('events-preview');
    const listContainer = document.getElementById('events-list');

    if (!mainContainer && !listContainer) return;

    const now = new Date();
    const aktobeNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Almaty" }));
    const todayStartLocal = new Date(aktobeNow.getFullYear(), aktobeNow.getMonth(), aktobeNow.getDate());


    const activeNavLink = document.querySelector('.nav-link.active');
    const currentPageAttr = activeNavLink ? activeNavLink.getAttribute('data-page') : pageAttr;

    let upcomingEvents = [];
    let pastEvents = [];

    if (currentPageAttr === 'main') {
        upcomingEvents = dataToRender
            .filter(ev => new Date(ev.date) >= todayStartLocal)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        pastEvents = [];
    } else {
        upcomingEvents = dataToRender
            .filter(ev => new Date(ev.date) >= todayStartLocal)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        pastEvents = dataToRender
            .filter(ev => new Date(ev.date) < todayStartLocal)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    const createCard = (ev) => {
        const isEventPast = new Date(ev.date) < todayStartLocal;
        const currentUserEmail = localStorage.getItem('currentUser');

        const photoHtml = ev.photos && ev.photos[0]
            ? `<div class="event-card-img"><img src="${ev.photos[0]}" alt="${ev.title}"></div>`
            : `<div class="event-card-img no-img"><i class="fas fa-image"></i></div>`;

        const bookingBtn = isEventPast
            ? `<button class="register-btn" style="background: #94a3b8; cursor: not-allowed; margin-top:10px;" disabled>Өтіп кетті</button>`
            : `<button class="register-btn" onclick="openRegModal('${ev.title}', '${ev.id}', '${ev.date}')" style="margin-top:10px;">Тіркелу</button>`;

        let adminButtons = '';
        const userData = currentUserEmail ? JSON.parse(localStorage.getItem(currentUserEmail)) : null;
        if (userData && userData.role === 'admin' && currentPageAttr !== 'main') {
            adminButtons = `
                    <div style="display: flex; gap: 10px; margin-top: 10px;">
                        <button onclick="editEvent(${ev.id})" style="flex: 1; padding: 8px; background: #FACC15; color: white; border: none; border-radius: 8px;">Өңдеу</button>
                        <button onclick="deleteEvent(${ev.id})" style="flex: 1; padding: 8px; background: #F87171; color: white; border: none; border-radius: 8px;">Өшіру</button>
                    </div>`;
        }

        return `
                <div class="event-card" ${isEventPast ? 'style="opacity: 0.8;"' : ''}>
                    ${photoHtml}
                    <div class="event-card-body">
                        <div class="event-title-name">${ev.title}</div>
                        <div class="event-details"><i class="far fa-clock"></i> ${ev.time} | ${ev.date} | ${ev.location}</div>
                        ${bookingBtn}
                        ${adminButtons}
                    </div>
                </div>`;
    };

    let finalHtml = "";
    const moreWrapper = document.getElementById('more-events-wrapper');

    if (upcomingEvents.length > 0) {
        let eventsToShow = [...upcomingEvents];

        if (currentPageAttr === 'main') {
            if (eventsToShow.length > 6) {
                eventsToShow = eventsToShow.slice(0, 6);
                if (moreWrapper) moreWrapper.style.display = 'block';
            } else {
                if (moreWrapper) moreWrapper.style.display = 'none';
            }
        } else {
            if (moreWrapper) moreWrapper.style.display = 'none';
        }

        if (currentPageAttr !== 'main') {
            finalHtml += `<h3 class="menu-label" style="width:100%; grid-column:1/-1;">Жақында:</h3>`;
        }

        finalHtml += eventsToShow.map(ev => createCard(ev)).join('');
    }

    if (pastEvents.length > 0) {
        finalHtml += `<hr style="grid-column: 1/-1; width:100%; margin:30px 0; border:none; border-top:1px dashed #ccc;">`;
        finalHtml += `<h3 class="menu-label" style="opacity:0.6; width:100%; grid-column:1/-1;">Өткен іс-шаралар:</h3>`;
        finalHtml += pastEvents.map(ev => createCard(ev)).join('');
    }

    if (upcomingEvents.length === 0 && pastEvents.length === 0) {
        finalHtml = `<p style="text-align:center; width:100%; grid-column:1/-1;">Ештеңе табылмады...</p>`;
    }

    if (mainContainer) mainContainer.innerHTML = finalHtml;
    if (listContainer) listContainer.innerHTML = finalHtml;
}

// ============================================================================
// 11. МОДАЛЬНОЕ ОКНО РЕГИСТРАЦИИ
// ============================================================================
function openRegModal(title, eventId, eventDate) {
    const email = localStorage.getItem('currentUser');
    if (!email) {
        alert("Іс-шараға тіркелу үшін алдымен жүйеге кіріңіз!");
        const profileLink = document.querySelector('.nav-link[data-page="profile"]');
        if (profileLink) profileLink.click();
        return;
    }

    const modal = document.getElementById('eventModal');
    const userData = JSON.parse(localStorage.getItem(email)) || {};

    document.getElementById('modal-title').innerText = "Тіркелу: " + title;
    document.getElementById('modal-content').innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 12px; padding: 15px 0;">
                <p style="color: #666; font-size: 0.85rem; background: #f8faff; padding: 8px; border-radius: 8px;">
                    <i class="fas fa-info-circle"></i> Бронь нөмірі автоматты түрде жасалады.
                </p>
                <div style="padding: 12px; background: #f5f5f5; border-radius: 10px; border: 1px solid #ddd;">
                    <label style="font-weight: 600; color: #2c3e50; font-size: 0.9rem;">Аты-жөніңіз:</label><br>
                    <span style="color: #3498db; font-weight: 600; font-size: 1rem;">${userData.name || 'Аты көрсетілмеген'}</span>
                </div>
                <input type="text" id="reg-group" placeholder="Тобыңыз (мысалы: ИТ-22)" 
                    style="padding: 12px; border-radius: 10px; border: 1px solid #ddd;">
                <input type="text" id="reg-phone" placeholder="Телефон: +7 777 000 00 00" 
                    style="padding: 12px; border-radius: 10px; border: 1px solid #ddd;">
                <div style="padding: 12px; background: #f5f5f5; border-radius: 10px; border: 1px solid #ddd;">
                    <label style="font-weight: 600; color: #2c3e50; font-size: 0.9rem;">Email:</label><br>
                    <span style="color: #7f8c8d; font-size: 0.9rem; font-family: monospace;">${email}</span>
                </div>
            </div>
        `;

    const regBtn = document.getElementById('register-btn');
    regBtn.innerText = "Растау";
    regBtn.onclick = () => confirmBooking(eventId, title, eventDate);
    modal.style.display = "block";
}

function confirmBooking(eventId, title, date) {
    const name = JSON.parse(localStorage.getItem(localStorage.getItem('currentUser')) || '{}').name || 'Аты жоқ';
    const group = document.getElementById('reg-group').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();

    if (!group || !phone) {
        alert("Топ және телефонды толтырыңыз!");
        return;
    }

    const booking = {
        bookingId: '#' + Math.floor(1000 + Math.random() * 9000),
        eventTitle: title,
        eventDate: date,
        name: name,
        group: group,
        phone: phone,
        userEmail: localStorage.getItem('currentUser'),
        timestamp: new Date().toISOString()
    };

    let bookings = JSON.parse(localStorage.getItem('eventBookings')) || [];
    bookings.push(booking);
    localStorage.setItem('eventBookings', JSON.stringify(bookings));

    alert("Тіркелу сәтті аяқталды! Билетті «Менің брондарым» бөлімінен көре аласыз.");
    document.getElementById('eventModal').style.display = "none";
    window.location.href = "bookings.html";
}

// ============================================================================
// 12. АДМИН ПАНЕЛЬ
// ============================================================================
function searchUser() {
    const searchEmail = document.getElementById('user-search-input').value.trim().toLowerCase();
    const resultContainer = document.getElementById('search-result');

    if (!searchEmail) {
        alert('Email енгізіңіз');
        return;
    }

    const userData = JSON.parse(localStorage.getItem(searchEmail));

    if (!userData) {
        resultContainer.innerHTML = `<p style="color: #e74c3c; text-align: center; margin-top: 10px;">Мұндай пайдаланушы табылмады.</p>`;
        return;
    }

    const isAdmin = userData.role === 'admin';
    const btnText = isAdmin ? 'Құқықты алып тастау' : 'Админ қылу';
    const btnClass = isAdmin ? 'clear-filters' : 'search-btn';

    resultContainer.innerHTML = `
            <div class="event-card" style="margin-top: 15px; border-left: 5px solid ${isAdmin ? '#f1c40f' : '#3498db'}">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <div>
                        <h3 style="margin-bottom: 5px;">${userData.name}</h3>
                        <p style="font-size: 0.9rem; color: #666;">${searchEmail}</p>
                        <p style="font-size: 0.8rem;">Рөлі: <strong>${isAdmin ? 'Администратор' : 'Пайдаланушы'}</strong></p>
                    </div>
                    <button class="${btnClass}" onclick="toggleAdminRole('${searchEmail}')" style="padding: 8px 15px; font-size: 0.8rem;">
                        ${btnText}
                    </button>
                </div>
            </div>
        `;
}

function toggleAdminRole(email) {
    const currentUserEmail = localStorage.getItem('currentUser');

    if (email === currentUserEmail) {
        alert('Өз құқығыңызды өзгерте алмайсыз!');
        return;
    }

    let userData = JSON.parse(localStorage.getItem(email));
    if (userData) {
        userData.role = (userData.role === 'admin') ? 'user' : 'admin';
        localStorage.setItem(email, JSON.stringify(userData));
        alert(`Пайдаланушы мәртебесі өзгертілді!`);
        searchUser();
        syncData();
    }
}

// ============================================================================
// 13. ФОТОГАЛЕРЕЯ
// ============================================================================
function renderPhotoGrid() {
    const photoGrid = document.getElementById('photos-grid');
    if (!photoGrid) return;

    const pastEventsWithPhotos = eventsData.filter(ev => ev.photos && ev.photos.length > 0);

    if (pastEventsWithPhotos.length === 0) {
        photoGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">Әзірге фотосуреттер жоқ</p>';
        return;
    }

    photoGrid.innerHTML = pastEventsWithPhotos.map(ev => `
            <div class="photo-item" onclick="openFullScreen('${ev.photos[0]}')">
                <img src="${ev.photos[0]}" alt="${ev.title}">
                <p class="photo-caption">${ev.title}</p>
            </div>
        `).join('');
}

function openFullScreen(src) {
    const viewer = document.getElementById('imageViewer');
    const fullImg = document.getElementById('fullImage');
    if (viewer && fullImg) {
        fullImg.src = src;
        viewer.style.display = 'flex';
    }
}

function removePhoto(id) {
    if (confirm("Фотоны өшіруді растайсыз ба?")) {
        const ev = eventsData.find(item => item.id === id);
        if (ev) {
            ev.photos = [];
            syncData();
        }
    }
}

function addPhotoToEvent(id) {
    const ev = eventsData.find(item => item.id === id);
    if (!ev) return;

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = event => {
            ev.photos = [event.target.result];
            syncData();
            alert("Фото сәтті сақталды!");
        };
        reader.readAsDataURL(file);
    };
    fileInput.click();
}

// ============================================================================
// 14. ФИЛЬТРАЦИЯ
// ============================================================================
function applyFilters() {
    const searchInput = document.getElementById('search-events');
    const searchText = searchInput ? searchInput.value.toLowerCase() : "";

    const activeBtn = document.querySelector('.cat-btn.active');
    const category = activeBtn ? activeBtn.getAttribute('data-category') : 'all';

    const filteredData = eventsData.filter(ev => {
        const matchesSearch = ev.title.toLowerCase().includes(searchText) ||
            ev.location.toLowerCase().includes(searchText);
        const matchesCategory = (category === 'all' || ev.category === category);
        return matchesSearch && matchesCategory;
    });

    renderEvents(filteredData);
}

function clearFilters() {
    const searchInput = document.getElementById('search-events');
    if (searchInput) searchInput.value = "";

    const allBtn = document.querySelector('.cat-btn[data-category="all"]');
    if (allBtn) {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        allBtn.classList.add('active');
    }
    renderEvents(eventsData);
}

// ============================================================================
// 15. АДМИН - ДОБАВЛЕНИЕ/РЕДАКТИРОВАНИЕ СОБЫТИЙ
// ============================================================================
function openAddEventModal() {
    const modal = document.getElementById('eventModal');
    const modalContent = document.getElementById('modal-content');
    const modalTitle = document.getElementById('modal-title');

    if (!modal || !modalContent) return;

    modalTitle.innerText = "Жаңа іс-шара қосу";
    currentSelectedFileBase64 = null;

    modalContent.innerHTML = `
            <div class="reg-form" style="display: flex; flex-direction: column; gap: 10px; padding: 10px;">
                <input type="text" id="new-title" placeholder="Іс-шара атауы" style="padding: 10px; border-radius: 8px; border: 1px solid #ddd;">
                <input type="date" id="new-date" style="padding: 10px; border-radius: 8px; border: 1px solid #ddd;">
                <input type="time" id="new-time" style="padding: 10px; border-radius: 8px; border: 1px solid #ddd;">
                <input type="text" id="new-loc" placeholder="Өтетін орны" style="padding: 10px; border-radius: 8px; border: 1px solid #ddd;">
                <select id="new-cat" style="padding: 10px; border-radius: 8px; border: 1px solid #ddd;">
                    <option value="concert">КОНЦЕРТ</option>
                    <option value="exhibition">КӨРМЕ</option>
                    <option value="sport">СПОРТ</option>
                    <option value="festival">ФЕСТИВАЛЬ</option>
                </select>
                <p id="edit-notice" style="font-size: 0.8rem; color: #e67e22; margin-top: 5px;">
                    <i class="fas fa-info-circle"></i> Суретті іс-шараны қосқаннан кейін "Өңдеу" батырмасы арқылы қоса аласыз.
                </p>
            </div>
        `;

    const regBtn = document.getElementById('register-btn');
    regBtn.innerText = "Қосу";
    regBtn.onclick = () => handleSaveEvent(null);
    modal.style.display = "block";
}

function editEvent(id) {
    const ev = eventsData.find(item => item.id === id);
    if (!ev) return;

    openAddEventModal();

    document.getElementById('modal-title').innerText = "Іс-шараны өзгерту";

    const notice = document.getElementById('edit-notice');
    if (notice) notice.remove();

    document.getElementById('new-title').value = ev.title;
    document.getElementById('new-date').value = ev.date;
    document.getElementById('new-time').value = ev.time;
    document.getElementById('new-loc').value = ev.location;
    document.getElementById('new-cat').value = ev.category || 'festival';

    const form = document.querySelector('.reg-form');
    const photoSection = document.createElement('div');
    photoSection.style.marginTop = "10px";
    photoSection.style.borderTop = "1px solid #eee";
    photoSection.style.paddingTop = "10px";
    photoSection.innerHTML = `
            <label style="font-size: 0.8rem; color: #666;">Сурет URL-і (немесе файл таңдаңыз):</label>
            <input type="text" id="new-photo-url" placeholder="https://..." style="width:100%; padding: 10px; border-radius: 8px; border: 1px solid #ddd; margin-bottom: 5px;">
            <input type="file" id="modal-file-input" accept="image/*" style="display: none;">
            <button type="button" onclick="document.getElementById('modal-file-input').click()" 
                    style="width: 100%; padding: 10px; background: #f0f7ff; border: 1.5px dashed #3498db; border-radius: 8px; color: #3498db; cursor: pointer; font-weight: 600;">
                <i class="fas fa-camera"></i> Суретті таңдау
            </button>
            <div id="file-name-preview" style="font-size: 0.75rem; color: #27ae60; margin-top: 5px; text-align: center;"></div>
        `;
    form.appendChild(photoSection);

    if (ev.photos && ev.photos[0] && !ev.photos[0].startsWith('data:')) {
        document.getElementById('new-photo-url').value = ev.photos[0];
    }

    document.getElementById('modal-file-input').addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            document.getElementById('file-name-preview').innerText = "Таңдалды: " + file.name;
            const reader = new FileReader();
            reader.onload = (event) => { currentSelectedFileBase64 = event.target.result; };
            reader.readAsDataURL(file);
        }
    });

    const regBtn = document.getElementById('register-btn');
    regBtn.innerText = "Жаңарту";
    regBtn.onclick = () => handleSaveEvent(id);
}

function handleSaveEvent(id = null) {
    const title = document.getElementById('new-title').value.trim();
    const date = document.getElementById('new-date').value;
    const time = document.getElementById('new-time').value;
    const location = document.getElementById('new-loc').value.trim();
    const category = document.getElementById('new-cat').value;

    if (!title || !date) return alert("Мәліметтерді толтырыңыз!");

    if (id) {
        const index = eventsData.findIndex(ev => ev.id === id);
        if (index !== -1) {
            eventsData[index] = { ...eventsData[index], title, date, time, location, category };
            const photoUrl = document.getElementById('new-photo-url')?.value.trim();
            const finalPhoto = currentSelectedFileBase64 || photoUrl;
            if (finalPhoto) eventsData[index].photos = [finalPhoto];
        }
    } else {
        eventsData.push({ id: Date.now(), title, date, time, location, category, photos: [] });
    }

    try {
        localStorage.setItem('allEvents', JSON.stringify(eventsData));
        syncData();
        renderEvents();
        document.getElementById('eventModal').style.display = "none";
        alert("Сәтті сақталды!");
    } catch (e) {
        alert("Қате: Сурет өлшемі тым үлкен! Сақтау мүмкін емес.");
    }
}

function deleteEvent(id) {
    if (confirm("Бұл іс-шараны өшіруді растайсыз ба?")) {
        eventsData = eventsData.filter(ev => ev.id !== id);
        localStorage.setItem('allEvents', JSON.stringify(eventsData));
        renderEvents();
        alert("Іс-шара сәтті өшірілді!");
    }
}

function goToEventsPage() {
    const eventsLink = document.querySelector('.nav-link[data-page="events"]');
    if (eventsLink) {
        eventsLink.click();
        window.scrollTo(0, 0);
    }
}

// ============================================================================
// 16. ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН
// ============================================================================
window.addEventListener('click', (event) => {
    const modal = document.getElementById('editProfileModal');
    if (event.target === modal) closeEditModal();
});

// ============================================================================
// 17. УНИВЕРСАЛЬНОЕ ЗАКРЫТИЕ МОДАЛОВ (НОВОЕ!)
// ============================================================================
function closeModal() {
    const modal = document.getElementById('eventModal');
    if (modal) {
        modal.style.display = 'none';
        const regBtn = document.getElementById('register-btn');
        if (regBtn) regBtn.onclick = null; // Сбрасываем обработчик
        document.getElementById('modal-content').innerHTML = ''; // Очищаем контент
    }
}

// Делаем глобальной
window.closeModal = closeModal;

// Инициализация обработчиков модала
function initModalHandlers() {
    // × кнопка
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    // Backdrop
    const modal = document.getElementById('eventModal');
    if (modal) {
        modal.onclick = function (e) {
            if (e.target === modal) closeModal();
        };
    }
}

// Вызываем после каждого открытия модала
document.getElementById('eventModal')?.addEventListener('DOMNodeInserted', initModalHandlers);

// ============================================================================
// 18. АДМИН КАЛЕНДАРЬ МЕНЕДЖЕР (ОБНОВЛЕННЫЙ)
// ============================================================================
let currentViewDate = new Date();
let holidays = JSON.parse(localStorage.getItem('calendarHolidays')) || [];
let daysOff = JSON.parse(localStorage.getItem('calendarDaysOff')) || []; // Новый массив для выходных
let currentAdminMode = 'holiday'; // Текущий выбранный режим ('holiday' или 'dayoff')

function setCalendarMode(mode) {
    currentAdminMode = mode;
    // Визуальное переключение активного режима в легенде
    document.getElementById('mode-holiday').style.borderColor = mode === 'holiday' ? '#f1c40f' : 'transparent';
    document.getElementById('mode-dayoff').style.borderColor = mode === 'dayoff' ? '#F87171' : 'transparent';
}

function openCalendarManager() {
    window.location.href = 'calendar_admin.html';  // ✅ Бөлек бетке өткізу
}

function closeCalendarManager() {
    document.getElementById('admin-calendar-section').style.display = 'none';
    document.getElementById('profile-page').classList.add('active');
}

function renderFullCalendar() {
    const gridBody = document.getElementById('calendar-grid-body');
    const monthYearLabel = document.getElementById('current-month-year');
    if (!gridBody) return;

    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();
    monthYearLabel.innerText = new Intl.DateTimeFormat('kk-KZ', { month: 'long', year: 'numeric' }).format(currentViewDate);

    gridBody.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;

    for (let i = 0; i < startOffset; i++) {
        gridBody.innerHTML += `<div class="calendar-day-box empty" style="background: transparent; border: none;"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isHoliday = holidays.includes(dateStr);
        const isDayOff = daysOff.includes(dateStr);
        const hasEvent = eventsData.some(ev => ev.date === dateStr);

        // Определяем класс фона (Мереке приоритетнее Демалыс)
        let statusClass = '';
        if (isHoliday) statusClass = 'holiday';
        else if (isDayOff) statusClass = 'day-off-red'; // Нужно добавить в CSS: background #F87171

        // Синяя точка или рамка для Іс-шара (она остается, но в легенде её нет)
        const eventDot = hasEvent ? '<div style="width:6px; height:6px; background:#3498db; border-radius:50%; margin: 2px auto;"></div>' : '';

        gridBody.innerHTML += `
            <div class="calendar-day-box ${statusClass} ${hasEvent ? 'has-event' : ''}" 
                 onclick="handleDateClick('${dateStr}')" 
                 style="border: 1px solid #eee; padding: 10px; text-align: center; cursor: pointer; position: relative; min-height: 60px; ${isHoliday ? 'background:#f1c40f;' : (isDayOff ? 'background:#F87171; color:white;' : (hasEvent ? 'border-color:#3498db;' : ''))}">
                <span class="day-number" style="font-weight: bold;">${day}</span>
                <div style="font-size: 0.65rem; margin-top: 5px;">
                    ${isHoliday ? 'Мереке' : (isDayOff ? 'Демалыс' : '')}
                </div>
                ${eventDot}
            </div>
        `;
    }
}

function handleDateClick(dateStr) {
    if (currentAdminMode === 'holiday') {
        // Если это праздник, убираем его, иначе добавляем (и убираем из выходных, если был там)
        if (holidays.includes(dateStr)) {
            holidays = holidays.filter(d => d !== dateStr);
        } else {
            holidays.push(dateStr);
            daysOff = daysOff.filter(d => d !== dateStr);
        }
    } else {
        // Режим 'dayoff'
        if (daysOff.includes(dateStr)) {
            daysOff = daysOff.filter(d => d !== dateStr);
        } else {
            daysOff.push(dateStr);
            holidays = holidays.filter(d => d !== dateStr);
        }
    }
    renderFullCalendar();
}

function saveCalendarChanges() {
    localStorage.setItem('calendarHolidays', JSON.stringify(holidays));
    localStorage.setItem('calendarDaysOff', JSON.stringify(daysOff));
    alert("Өзгерістер сәтті сақталды!");
}

window.setCalendarMode = setCalendarMode;
window.saveCalendarChanges = saveCalendarChanges;
window.handleDateClick = handleDateClick;




//атппрапрооррвррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррр

// 📅 Күнтізбе синхронизация listener-ы (БАСТАПҚЫ бетте)
window.addEventListener('storage', function (e) {
    // calendarHolidays немесе calendarDaysOff өзгерсе
    if (e.key === 'calendarHolidays' || e.key === 'calendarDaysOff') {
        if (pageAttr === 'main' || document.querySelector('.nav-link.active[data-page="main"]')) {
            renderMiniCalendar(); // Мини-күнтізбені жаңарту
        }
    }
});

// 📱 DOMContentLoaded-та бастапқы синхронизация
document.addEventListener('DOMContentLoaded', function () {
    // ... басқа кодтар ...

    // ✅ Күнтізбе деректерін жүктеп, бірден көрсету
    if (pageAttr === 'main') {
        currentWeekStart = getWeekStart();
        renderMiniCalendar();
    }

    setupEventHandlers(); // Қалған handler-лар
});

// 🔄 syncData() функциясын кеңейту (бар болса)
function syncData() {
    // Іс-шараларды синхронизациялау
    const savedEvents = localStorage.getItem('allEvents');
    if (savedEvents) {
        eventsData = JSON.parse(savedEvents);
    }

    // ✅ Күнтізбе синхронизациясы
    if (document.getElementById('calendar-week')) {
        renderMiniCalendar();
    }

    // Іс-шараларды қайта рендерлеу
    renderEvents();
}
