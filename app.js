/* ===== Мобильное приложение «Меню на день» v2 ===== */
/* Календарь + ручная раскладка меню по слотам */

// ---------- БАНК ВАРИАНТОВ ----------
const SNACKS = [
  { name: "Смузи-гейнер", kcal: 650, desc: "В блендер: 300 мл молока + 1 банан + 2 ст. л. овсянки + 1 ст. л. арахисовой пасты (или горсть арахиса). Взбить.", hint: "Жидкие калории усваиваются легче всего" },
  { name: "Орехово-фруктовый микс", kcal: 450, desc: "Горсть арахиса или грецких орехов (самые дешевые и калорийные) + 1 банан или яблоко." },
  { name: "Сэндвич с сыром", kcal: 480, desc: "2 куска хлеба, сливочное масло, толстый ломтик сыра, лист салата или огурец." },
  { name: "Питьевой йогурт/ряженка + печенье", kcal: 470, desc: "Большая бутылка ряженки (0.5 л) и 3–4 штуки простого печенья (типа «Юбилейного» или овсяного)." }
];

const BANK = {
  breakfast: {
    title: "🍳 Завтраки", time: "5–10 мин", slotLabel: "Завтрак", icon: "🍳",
    items: [
      { name: "Классическая овсянка-бомба", kcal: 750, desc: "Овсянка на молоке + 1 ст. л. сливочного масла + 1–2 ст. л. арахисовой пасты + банан + мед.", hint: "Самый дешевый и калорийный вариант" },
      { name: "Ленивые сырники", kcal: 600, desc: "Творог + 1 яйцо + пара ложек муки. Перемешать, выкладывать ложкой на сковороду как оладьи. Подавать со сметаной и вареньем.", hint: "Можно купить хорошие замороженные сырники в магазине, проверив состав" },
      { name: "Скрэмбл с сыром и индейкой", kcal: 620, desc: "2–3 яйца взбить с молоком, вылить на сковороду, посыпать тертым сыром и добавить ломтики ветчины из индейки/курицы. + 2 куска хлеба с маслом." },
      { name: "Горячие бутерброды", kcal: 580, desc: "Хлеб, слой сливочного масла, ломтик сыра, сверху вареная или запеченная курица. В микроволновку на 1–1.5 минуты, пока сыр не расплавится." }
    ]
  },
  snack1: {
    title: "🥤 Перекусы", time: "2 мин", slotLabel: "Перекус 1", icon: "🥤",
    items: SNACKS
  },
  lunch: {
    title: "🍽 Обеды", time: "10–15 мин", slotLabel: "Обед", icon: "🍽",
    items: [
      { name: "Котлеты с гречкой", kcal: 780, desc: "2–3 готовые котлеты (курица/индейка/говядина, строго читаем состав, чтобы не было свинины/шпика!) + гречка. Апгрейд: добавить в горячую гречку кусочек сливочного масла, а котлеты разогреть под крышкой с 2 ложками сметаны." },
      { name: "Пельмени или вареники (ленивый чит-код)", kcal: 820, desc: "Покупаем пельмени из курицы или индейки (или вареники с картошкой/творогом). Варим 7 минут. Апгрейд: щедро полить сметаной 20% и посыпать черным перцем. Это очень калорийно и не требует готовки." },
      { name: "Паста «а-ля Карбонара»", kcal: 800, desc: "Отварить макароны. На сковороде 3 минуты обжарить кусочки готовой куриной котлеты или наггетсы. Добавить макароны, залить 2–3 ст. л. сливок (или сметаны, разбавленной водой), посыпать сыром, прогреть 1 минуту." },
      { name: "Картофельное пюре + котлеты", kcal: 760, desc: "Можно использовать качественное пюре из хлопьев (в них уже есть сухое молоко, но добавьте еще кусочек сливочного масла для калорийности) + 2–3 котлеты + соленый огурец или салат из капусты с маслом." }
    ]
  },
  snack2: {
    title: "🥤 Перекусы", time: "2 мин", slotLabel: "Перекус 2", icon: "🥤",
    items: SNACKS
  },
  dinner: {
    title: "🌮 Ужины", time: "15–40 мин", slotLabel: "Ужин", icon: "🌮",
    items: [
      { name: "Домашняя шаурма", kcal: 720, desc: "Лаваш + размятая готовая куриная котлета + огурец + помидор + тертый сыр + соус (сметана + кетчуп + чеснок). Скрутить и поджарить на сухой сковороде 3 минуты с двух сторон.", hint: "Хит для набора веса" },
      { name: "Куриные бедра в духовке (закинул и забыл)", kcal: 750, desc: "Бедра (они сочнее и дешевле филе) натереть солью, перцем и обмазать сметаной. В духовку на 40–45 мин при 200°C. Пока идет процесс, вы свободны. Гарнир: рис или макароны." },
      { name: "Макароны по-студенчески", kcal: 700, desc: "Обжарить куриный фарш с луком (10 мин), смешать с заранее отваренными макаронами, добавить кусочек сливочного масла.", hint: "Можно сделать сразу на 2 дня" },
      { name: "Творожный ужин (если совсем лень жевать)", kcal: 550, desc: "200 г творога 5–9% + 2 ст. л. сметаны + горсть орехов/семечек + варенье или мед. Легко усваивается и дает строительный материал для мышц ночью." }
    ]
  }
};

const SLOT_ORDER = ["breakfast", "snack1", "lunch", "snack2", "dinner"];

// ---------- ХРАНИЛИЩЕ ----------
const LS_PLAN = "foodday.plan.v2";   // { "2026-10-31": { breakfast: 0, snack1: 2, ..., portions: { breakfast: 1.5 }, liked: bool } }
const LS_GOAL = "foodday.kcalGoal";  // целевой калораж на день (на одного)
const LS_GRAM = "foodday.gramScale"; // множитель граммовок: 1 = обычные порции из банка

function loadPlan() { try { return JSON.parse(localStorage.getItem(LS_PLAN)) || {}; } catch (e) { return {}; } }
function savePlan(plan) { localStorage.setItem(LS_PLAN, JSON.stringify(plan)); }
function getGoal() { const g = parseInt(localStorage.getItem(LS_GOAL), 10); return isNaN(g) ? 3000 : g; }
function setGoal(v) { localStorage.setItem(LS_GOAL, String(v)); }
function getGramScale() { const g = parseFloat(localStorage.getItem(LS_GRAM)); return isNaN(g) ? 1 : g; }
function setGramScale(v) { localStorage.setItem(LS_GRAM, String(v)); }

// ---------- ГРАММОВКИ / ПОРЦИИ ----------
const PORTION_PRESETS = [0.5, 0.75, 1, 1.5, 2];
const PORTION_LABELS = { 0.5: "½", 0.75: "¾", 1: "×1", 1.5: "×1.5", 2: "×2" };

function fmtNum(n) { return Number(n.toFixed(1)).toString().replace(".", ","); }

// коэффициент порции для слота в плане дня (1 по умолчанию)
function slotCoef(p, slot) {
  const c = p.portions && p.portions[slot];
  return (typeof c === "number" && c > 0) ? c : 1;
}

// калорийность блюда с учётом глобальной шкалы граммовок и ручной порции
function itemKcal(item, coef) {
  if (!item || !item.kcal) return 0;
  return Math.round(item.kcal * getGramScale() * coef);
}

// сумма калорий за день (на одного)
function dayKcal(p) {
  let sum = 0;
  SLOT_ORDER.forEach(s => {
    const idx = p[s];
    if (typeof idx === "number" && BANK[s].items[idx]) sum += itemKcal(BANK[s].items[idx], slotCoef(p, s));
  });
  return sum;
}

// установить ручную порцию для слота (null/1 — сброс)
function setSlotCoef(slot, coef) {
  const plan = loadPlan();
  const p = plan[currentDate] || {};
  if (!p.portions) p.portions = {};
  if (coef === null || coef === 1) delete p.portions[slot]; else p.portions[slot] = coef;
  if (Object.keys(p).filter(k => k !== "portions").length === 0 && Object.keys(p.portions).length === 0) {
    delete plan[currentDate];
  } else {
    plan[currentDate] = p;
  }
  savePlan(plan);
}

function ymd(d) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

// ---------- СОСТОЯНИЕ ----------
let calCursor = new Date(); calCursor.setDate(1);
let currentDate = ymd(new Date());
let currentSlot = null;

// ---------- НАВИГАЦИЯ ----------
const ICON_CAL = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15.5" rx="3.5"/><path d="M3.5 10h17"/><path d="M8 3v4M16 3v4"/></svg>';
const ICON_BOOK = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>';
const ICON_GEAR = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.56V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.56 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1z"/></svg>';
const NAV_ITEMS = [
  { screen: "calendar", icon: ICON_CAL, label: "Календарь" },
  { screen: "bank", icon: ICON_BOOK, label: "Банк" },
  { screen: "settings", icon: ICON_GEAR, label: "Настройки" }
];
function buildNavs() {
  document.querySelectorAll(".bottom-nav").forEach(nav => {
    const active = nav.dataset.nav;
    nav.innerHTML = "";
    NAV_ITEMS.forEach(item => {
      const b = document.createElement("button");
      b.className = "nav-btn" + (item.screen === active ? " active" : "");
      b.innerHTML = `${item.icon}<span>${item.label}</span>`;
      b.onclick = () => showScreen(item.screen);
      nav.appendChild(b);
    });
  });
}
function showScreen(name) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("screen-" + name).classList.add("active");
  if (name === "calendar") renderCalendar();
  if (name === "day") renderDay();
  if (name === "bank") renderBank();
  if (name === "settings") renderSettings();
}

// ---------- КАЛЕНДАРЬ ----------
const MONTHS = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const MONTHS_GEN = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];

function dayStatus(dateKey) {
  const p = loadPlan()[dateKey];
  if (!p) return "empty";
  const filled = SLOT_ORDER.filter(s => typeof p[s] === "number").length;
  if (filled === 0) return p.liked ? "liked" : "empty";
  if (filled === SLOT_ORDER.length) return p.liked ? "liked" : "full";
  return "partial";
}

function renderCalendar() {
  const plan = loadPlan();
  const todayKey = ymd(new Date());
  document.getElementById("calTitle").textContent = `${MONTHS[calCursor.getMonth()]} ${calCursor.getFullYear()}`;
  const grid = document.getElementById("calGrid");
  grid.innerHTML = "";
  const year = calCursor.getFullYear(), month = calCursor.getMonth();
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7; // Пн = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < firstDow; i++) {
    const c = document.createElement("div"); c.className = "cal-cell blank"; grid.appendChild(c);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const key = ymd(new Date(year, month, d));
    const cell = document.createElement("button");
    cell.className = "cal-cell day status-" + dayStatus(key);
    if (key === todayKey) cell.classList.add("today");
    if (key === currentDate) cell.classList.add("selected");
    cell.innerHTML = `<span class="num">${d}</span><span class="dot"></span>`;
    cell.onclick = () => { currentDate = key; showScreen("day"); };
    grid.appendChild(cell);
  }
}

document.getElementById("btnToday").onclick = () => {
  calCursor = new Date(); calCursor.setDate(1);
  currentDate = ymd(new Date());
  renderCalendar();
};
document.getElementById("calPrev").onclick = () => { calCursor.setMonth(calCursor.getMonth() - 1); renderCalendar(); };
document.getElementById("calNext").onclick = () => { calCursor.setMonth(calCursor.getMonth() + 1); renderCalendar(); };

// ---------- ЭКРАН ДНЯ ----------
function prettyDate(key) {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  const wd = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"][dt.getDay()];
  return `${wd}, ${d} ${MONTHS_GEN[m - 1]} ${y}`;
}

function getDayPlan() { const plan = loadPlan(); return plan[currentDate] || {}; }
function setSlot(slot, idx) {
  const plan = loadPlan();
  const p = plan[currentDate] || {};
  if (idx === null) delete p[slot]; else p[slot] = idx;
  if (Object.keys(p).length === 0) delete plan[currentDate]; else plan[currentDate] = p;
  savePlan(plan);
}

function renderDay() {
  const p = getDayPlan();
  document.getElementById("dayTitle").textContent = prettyDate(currentDate);
  const filled = SLOT_ORDER.filter(s => typeof p[s] === "number").length;
  document.getElementById("daySubtitle").textContent = filled === 0 ? "Меню ещё не выбрано" : `Выбрано ${filled} из ${SLOT_ORDER.length} приёмов`;
  document.getElementById("progressFill").style.width = Math.min(100, filled / SLOT_ORDER.length * 100) + "%";
  document.getElementById("progressText").textContent = `${filled}/${SLOT_ORDER.length}`;

  // счётчик калорий
  const kcal = dayKcal(p);
  const goal = getGoal();
  const pct = Math.min(100, kcal / goal * 100);
  document.getElementById("kcalFill").style.width = pct + "%";
  document.getElementById("kcalNum").textContent = kcal.toLocaleString("ru-RU");
  document.getElementById("kcalGoalLabel").textContent = "из " + goal.toLocaleString("ru-RU") + " ккал · цель на одного";
  document.getElementById("kcalPair").textContent = kcal > 0 ? `На двоих: ${(kcal * 2).toLocaleString("ru-RU")} ккал` : "";

  const wrap = document.getElementById("daySlots");
  wrap.innerHTML = "";
  SLOT_ORDER.forEach(slot => {
    const cat = BANK[slot];
    const idx = p[slot];
    const item = typeof idx === "number" ? cat.items[idx] : null;
    const coef = slotCoef(p, slot);
    const card = document.createElement("button");
    card.className = "slot-card" + (item ? "" : " empty");
    card.innerHTML = `
      <div class="slot-icon">${cat.icon}</div>
      <div class="slot-body">
        <div class="slot-label">${cat.slotLabel}</div>
        <div class="slot-name">${item ? item.name : "+ Выбрать блюдо"}</div>
        ${item ? `<div class="slot-desc">${item.desc}</div>` : ""}
        ${item && item.hint ? `<div class="slot-hint">💡 ${item.hint}</div>` : ""}
      </div>
      <div class="slot-side">
        <div class="slot-time">${cat.time}</div>
        ${item ? `<div class="slot-kcal">${itemKcal(item, coef)} ккал${coef !== 1 ? ` <b>(${PORTION_LABELS[coef] || "×" + fmtNum(coef)})</b>` : ""}</div>` : ""}
      </div>`;
    card.onclick = () => openModal(slot);
    wrap.appendChild(card);
  });
  const btnLike = document.getElementById("btnLike");
  btnLike.textContent = p.liked ? "♥ В избранном" : "♥ В избранное";
  btnLike.classList.toggle("active", !!p.liked);
}

document.getElementById("btnBackCal").onclick = () => showScreen("calendar");

// 🎲 — случайный вариант для всех пустых слотов (ротация против повторов последних 3 дней)
document.getElementById("btnDice").onclick = () => {
  const plan = loadPlan();
  const day = plan[currentDate] || {};
  const recent = Object.keys(plan).filter(k => k !== currentDate).sort().reverse().slice(0, 3);
  SLOT_ORDER.forEach(slot => {
    if (typeof day[slot] === "number") return; // уже выбрано руками — не трогаем
    const cat = BANK[slot];
    const used = new Set(recent.map(k => plan[k] && plan[k][slot]).filter(v => typeof v === "number"));
    let candidates = cat.items.map((_, i) => i).filter(i => !used.has(i));
    if (candidates.length === 0) candidates = cat.items.map((_, i) => i);
    if (slot === "snack2" && typeof day.snack1 === "number" && candidates.length > 1) {
      candidates = candidates.filter(i => i !== day.snack1);
    }
    setSlot(slot, candidates[Math.floor(Math.random() * candidates.length)]);
  });
  renderDay();
  toast("🎲 Дописали пустые слоты!");
};

document.getElementById("btnLike").onclick = () => {
  const plan = loadPlan();
  const p = plan[currentDate] || {};
  p.liked = !p.liked;
  plan[currentDate] = p;
  if (Object.keys(p).length === 0) delete plan[currentDate];
  savePlan(plan);
  renderDay();
};

// ---------- МОДАЛКА ВЫБОРА ----------
let modalCoef = 1; // текущая выбранная порция в открытой модалке

function openModal(slot) {
  currentSlot = slot;
  const cat = BANK[slot];
  const p = getDayPlan();
  modalCoef = slotCoef(p, slot);
  document.getElementById("modalTitle").textContent = `${cat.icon} ${cat.slotLabel} (${cat.time})`;
  const list = document.getElementById("modalList");
  list.innerHTML = "";
  cat.items.forEach((item, i) => {
    const b = document.createElement("button");
    b.className = "choice-item" + (p[slot] === i ? " chosen" : "");
    b.innerHTML = `<div class="choice-name">${p[slot] === i ? "✅ " : ""}${item.name}</div>
      <div class="choice-desc">${item.desc}</div>
      ${item.hint ? `<div class="choice-hint">💡 ${item.hint}</div>` : ""}
      ${item.kcal ? `<div class="choice-kcal">🔥 ${itemKcal(item, modalCoef)} ккал${modalCoef !== 1 ? ` <b>(${PORTION_LABELS[modalCoef] || "×" + fmtNum(modalCoef)})</b>` : ""}</div>` : ""}`;
    b.onclick = () => { setSlot(slot, i); if (modalCoef !== 1) setSlotCoef(slot, modalCoef); closeModal(); renderDay(); };
    list.appendChild(b);
  });
  renderPortionRow(!!(typeof p[slot] === "number"));
  document.getElementById("modal").style.display = "flex";
}

// строка выбора граммовки внутри шторки
function renderPortionRow(hasChoice) {
  const label = document.getElementById("portionValue");
  const cur = itemKcalCur();
  label.textContent = cur ? cur.toLocaleString("ru-RU") + " ккал" : "сначала выберите блюдо";
  const wrap = document.getElementById("portionPresets");
  wrap.innerHTML = "";
  PORTION_PRESETS.forEach(c => {
    const b = document.createElement("button");
    b.className = "portion-btn" + (c === modalCoef ? " active" : "");
    b.textContent = PORTION_LABELS[c];
    b.disabled = !hasChoice;
    b.onclick = () => {
      modalCoef = c;
      if (hasChoice) setSlotCoef(currentSlot, c);
      // пересчитываем калорийность во всех вариантах шторки
      const items = BANK[currentSlot].items;
      Array.from(document.getElementById("modalList").children).forEach((el, i) => {
        const item = items[i];
        if (!item || !item.kcal) return;
        const k = el.querySelector(".choice-kcal");
        if (k) k.innerHTML = `🔥 ${itemKcal(item, modalCoef)} ккал${modalCoef !== 1 ? ` <b>(${PORTION_LABELS[modalCoef] || "×" + fmtNum(modalCoef)})</b>` : ""}`;
      });
      renderPortionRow(hasChoice);
      renderDay();
    };
    wrap.appendChild(b);
  });
}

function itemKcalCur() {
  const p = getDayPlan();
  const idx = p[currentSlot];
  if (typeof idx !== "number") return 0;
  return itemKcal(BANK[currentSlot].items[idx], modalCoef);
}

function closeModal() { document.getElementById("modal").style.display = "none"; }
document.getElementById("modalClose").onclick = closeModal;
document.getElementById("modalBackdrop").onclick = closeModal;
document.getElementById("modalClear").onclick = () => { setSlot(currentSlot, null); setSlotCoef(currentSlot, null); closeModal(); renderDay(); };

// ---------- БАНК ----------
function renderBank() {
  const wrap = document.getElementById("bankContent");
  wrap.innerHTML = "";
  const seen = new Set();
  ["breakfast", "lunch", "dinner", "snack1"].forEach(key => {
    const cat = BANK[key];
    if (seen.has(cat.title)) return; seen.add(cat.title);
    const sec = document.createElement("div");
    sec.className = "bank-section";
    sec.innerHTML = `<div class="bank-head"><h2>${cat.title}</h2><span class="bank-time">${cat.time}</span></div>`;
    cat.items.forEach(item => {
      const c = document.createElement("div");
      c.className = "bank-item";
      c.innerHTML = `<div class="bank-name">${item.name}</div><div class="bank-desc">${item.desc}</div>${item.hint ? `<div class="bank-hint">💡 ${item.hint}</div>` : ""}`;
      sec.appendChild(c);
    });
    wrap.appendChild(sec);
  });
}
document.getElementById("btnBackBank").onclick = () => showScreen("calendar");

// ---------- НАСТРОЙКИ (цель калорий + граммовки) ----------
const PRESETS = [2500, 3000, 3500, 4000];
const GRAM_PRESETS = [
  { v: 0.75, label: "Маленькие ×0.75" },
  { v: 1,    label: "Обычные ×1" },
  { v: 1.25, label: "Большие ×1.25" },
  { v: 1.5,  label: "Огромные ×1.5" }
];
function renderSettings() {
  const goal = getGoal();
  document.getElementById("goalValue").textContent = goal.toLocaleString("ru-RU");
  document.getElementById("goalSlider").value = goal;
  const wrap = document.getElementById("goalPresets");
  wrap.innerHTML = "";
  PRESETS.forEach(v => {
    const b = document.createElement("button");
    b.className = "preset" + (v === goal ? " active" : "");
    b.textContent = v.toLocaleString("ru-RU");
    b.onclick = () => { setGoal(v); renderSettings(); };
    wrap.appendChild(b);
  });

  // шкала граммовок
  const gs = getGramScale();
  document.getElementById("gramValue").textContent = "×" + fmtNum(gs);
  document.getElementById("gramSlider").value = gs;
  const gwrap = document.getElementById("gramPresets");
  gwrap.innerHTML = "";
  GRAM_PRESETS.forEach(p => {
    const b = document.createElement("button");
    b.className = "preset" + (p.v === gs ? " active" : "");
    b.textContent = p.label;
    b.onclick = () => { setGramScale(p.v); renderSettings(); if (document.getElementById("screen-day").classList.contains("active")) renderDay(); };
    gwrap.appendChild(b);
  });
}
document.getElementById("goalMinus").onclick = () => { setGoal(Math.max(1500, getGoal() - 100)); renderSettings(); };
document.getElementById("goalPlus").onclick = () => { setGoal(Math.min(5000, getGoal() + 100)); renderSettings(); };
document.getElementById("goalSlider").oninput = (e) => { setGoal(parseInt(e.target.value, 10)); renderSettings(); };
document.getElementById("gramSlider").oninput = (e) => { setGramScale(parseFloat(e.target.value)); renderSettings(); };

// ---------- ТОСТ ----------
let toastTimer = null;
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg; t.style.display = "block";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.style.display = "none", 2500);
}

// ---------- PWA: установка и service worker ----------
let deferredPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault(); deferredPrompt = e;
  if (!localStorage.getItem("foodday.installDismissed")) {
    document.getElementById("installBanner").style.display = "flex";
  }
});
document.getElementById("btnInstall").onclick = async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById("installBanner").style.display = "none";
};
document.getElementById("btnInstallClose").onclick = () => {
  localStorage.setItem("foodday.installDismissed", "1");
  document.getElementById("installBanner").style.display = "none";
};
if ("serviceWorker" in navigator) {
  // относительный путь + новый scope: важно для GitHub Pages (*.github.io/репозиторий/)
  const swUrl = new URL("sw.js", location.href).href;
  const swScope = new URL("./", location.href).href;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(swUrl, { scope: swScope }).catch(() => {});
  });
}

// ---------- СТАРТ ----------
buildNavs();
showScreen("calendar");
