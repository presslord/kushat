/* ===== Мобильное приложение «Меню на день» ===== */
/* Рацион для набора веса — банк вариантов + конструктор дня */

// ---------- БАНК ВАРИАНТОВ ----------
const BANK = {
  breakfast: {
    title: "🍳 Завтраки",
    time: "5–10 мин",
    items: [
      { name: "Классическая овсянка-бомба", desc: "Овсянка на молоке + 1 ст. л. сливочного масла + 1–2 ст. л. арахисовой пасты + банан + мед.", hint: "Самый дешевый и калорийный вариант" },
      { name: "Ленивые сырники", desc: "Творог + 1 яйцо + пара ложек муки. Перемешать, выкладывать ложкой на сковороду как оладьи. Подавать со сметаной и вареньем.", hint: "Можно купить хорошие замороженные сырники, проверив состав" },
      { name: "Скрэмбл с сыром и индейкой", desc: "2–3 яйца взбить с молоком, вылить на сковороду, посыпать тертым сыром + ветчина из индейки/курицы. + 2 куска хлеба с маслом." },
      { name: "Горячие бутерброды", desc: "Хлеб + сливочное масло + ломтик сыра + вареная или запеченная курица. В микроволновку на 1–1.5 мин, пока сыр не расплавится." }
    ]
  },
  lunch: {
    title: "🍽 Обеды",
    time: "10–15 мин (с разогревом)",
    items: [
      { name: "Котлеты с гречкой", desc: "2–3 готовые котлеты (курица/индейка/говядина, строго без свинины/шпика!) + гречка. Апгрейд: масло в горячую гречку, котлеты под крышкой с 2 ложками сметаны." },
      { name: "Пельмени или вареники", desc: "Пельмени из курицы или индейки (или вареники с картошкой/творогом). Варить 7 минут. Щедро полить сметаной 20% и посыпать черным перцем.", hint: "Ленивый чит-код: очень калорийно и без готовки" },
      { name: "Паста «а-ля Карбонара»", desc: "Отварить макароны. Обжарить 3 мин кусочки готовой куриной котлеты или наггетсы, добавить макароны, залить 2–3 ст. л. сливок (или сметаны с водой), посыпать сыром, прогреть 1 минуту." },
      { name: "Картофельное пюре + котлеты", desc: "Качественное пюре из хлопьев + кусочек сливочного масла для калорийности + 2–3 котлеты + соленый огурец или салат из капусты с маслом." }
    ]
  },
  dinner: {
    title: "🌮 Ужины",
    time: "15–40 мин (в основном пассивно)",
    items: [
      { name: "Домашняя шаурма", desc: "Лаваш + размятая готовая куриная котлета + огурец + помидор + тертый сыр + соус (сметана + кетчуп + чеснок). Поджарить на сухой сковороде 3 мин с двух сторон.", hint: "Хит для набора веса" },
      { name: "Куриные бедра в духовке", desc: "Бедра натереть солью, перцем, обмазать сметаной. В духовку на 40–45 мин при 200°C. Гарнир: рис или макароны.", hint: "Закинул и забыл — пока печется, вы свободны" },
      { name: "Макароны по-студенчески", desc: "Обжарить куриный фарш с луком (10 мин), смешать с отваренными макаронами, добавить кусочек сливочного масла.", hint: "Можно сделать сразу на 2 дня" },
      { name: "Творожный ужин", desc: "200 г творога 5–9% + 2 ст. л. сметаны + горсть орехов/семечек + варенье или мед.", hint: "Если совсем лень жевать. Легко усваивается, строительный материал для мышц ночью" }
    ]
  },
  snack: {
    title: "🥤 Перекусы",
    time: "2 мин, 2 раза в день",
    items: [
      { name: "Смузи-гейнер", desc: "В блендер: 300 мл молока + 1 банан + 2 ст. л. овсянки + 1 ст. л. арахисовой пасты (или горсть арахиса). Взбить.", hint: "Жидкие калории усваиваются легче всего" },
      { name: "Орехово-фруктовый микс", desc: "Горсть арахиса или грецких орехов + 1 банан или яблоко." },
      { name: "Сэндвич с сыром", desc: "2 куска хлеба, сливочное масло, толстый ломтик сыра, лист салата или огурец." },
      { name: "Ряженка + печенье", desc: "Большая бутылка ряженки (0.5 л) и 3–4 штуки простого печенья («Юбилейное» или овсяное)." }
    ]
  }
};

// ---------- ХРАНИЛИЩЕ ----------
const LS_TODAY = "foodday.today";
const LS_HISTORY = "foodday.history";

function todayKey() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
}

function loadToday() {
  try { return JSON.parse(localStorage.getItem(LS_TODAY)); } catch(e) { return null; }
}
function saveToday(plan) {
  localStorage.setItem(LS_TODAY, JSON.stringify({ date: todayKey(), plan, liked: false }));
}
function loadHistory() {
  try { return JSON.parse(localStorage.getItem(LS_HISTORY)) || []; } catch(e) { return []; }
}
function saveHistory(h) {
  localStorage.setItem(LS_HISTORY, JSON.stringify(h.slice(0, 60)));
}

// ---------- ГЕНЕРАЦИЯ ДНЯ ----------
// Умная ротация: избегаем повторов того, что было за последние дни
function recentChoices(excludeSameSlot = true) {
  const hist = loadHistory();
  const todays = loadToday();
  const used = { breakfast: [], lunch: [], dinner: [], snack: [] };
  hist.forEach(day => {
    Object.keys(used).forEach(slot => {
      if (day.plan[slot]) used[slot].push(day.plan[slot].name);
    });
  });
  return used;
}

function pickFrom(list, usedNames, maxBack = 3) {
  // сначала пробуем варианты, которых не было в последних maxBack днях
  const fresh = list.filter(it => !usedNames.slice(-maxBack).includes(it.name));
  const pool = fresh.length ? fresh : list;
  return pool[Math.floor(Math.random() * pool.length)];
}

function generateDay() {
  const used = recentChoices();
  const plan = {
    breakfast: pickFrom(BANK.breakfast.items, used.breakfast),
    lunch:     pickFrom(BANK.lunch.items, used.lunch),
    dinner:    pickFrom(BANK.dinner.items, used.dinner),
  };
  // два разных перекуса
  const s1 = pickFrom(BANK.snack.items, used.snack);
  let s2 = pickFrom(BANK.snack.items, [...used.snack, s1.name]);
  if (s2.name === s1.name) {
    const others = BANK.snack.items.filter(i => i.name !== s1.name);
    s2 = others[Math.floor(Math.random() * others.length)];
  }
  plan.snack1 = s1;
  plan.snack2 = s2;
  return plan;
}

// ---------- UI ----------
const $ = id => document.getElementById(id);

let currentPlan = null;

function fmtDate(dateStr) {
  const months = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
  const days = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];
  const d = new Date();
  return days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()];
}

function renderPlan(plan, liked) {
  currentPlan = plan;
  $("mBreakfast").textContent = plan.breakfast.name;
  $("tBreakfast").textContent = "⏱ " + BANK.breakfast.time + " • " + plan.breakfast.desc;
  $("mSnack1").textContent = plan.snack1.name;
  $("mLunch").textContent = plan.lunch.name;
  $("tLunch").textContent = "⏱ " + BANK.lunch.time + " • " + plan.lunch.desc;
  $("mSnack2").textContent = plan.snack2.name;
  $("mDinner").textContent = plan.dinner.name;
  $("tDinner").textContent = "⏱ " + BANK.dinner.time + " • " + plan.dinner.desc;

  $("menuResult").style.display = "block";
  $("btnReroll").style.display = "block";
  $("btnGenerate").textContent = "✅ На сегодня собрано";
  $("btnGenerate").disabled = true;
  $("btnGenerate").style.opacity = .5;

  const likeBtn = $("btnLike");
  likeBtn.classList.toggle("liked", !!liked);
  likeBtn.textContent = liked ? "💖 Сохранено" : "❤️ Нравится";
}

function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 1800);
}

// Банк вариантов
function renderBank() {
  const wrap = $("bankContent");
  wrap.innerHTML = "";
  Object.values(BANK).forEach(group => {
    const div = document.createElement("div");
    div.className = "bank-group";
    div.innerHTML = "<h2>" + group.title + " <small style='font-weight:400;color:#b07b4a'>(" + group.time + ")</small></h2>";
    group.items.forEach(item => {
      const el = document.createElement("div");
      el.className = "bank-item";
      el.innerHTML = "<b>" + item.name + "</b><br>" + item.desc +
        (item.hint ? "<span class='hint'>💡 " + item.hint + "</span>" : "");
      div.appendChild(el);
    });
    wrap.appendChild(div);
  });
}

// История
function renderHistory() {
  const wrap = $("historyContent");
  const hist = loadHistory();
  if (!hist.length) {
    wrap.innerHTML = "<div class='history-empty'>Пока пусто 🍽<br>Собери первый день на главном экране!</div>";
    return;
  }
  wrap.innerHTML = "";
  hist.forEach(day => {
    const el = document.createElement("div");
    el.className = "history-day";
    const p = day.plan;
    el.innerHTML =
      "<div class='h-date'>" + day.date + (day.liked ? " 💖" : "") + "</div>" +
      "<div class='h-line'>🍳 " + p.breakfast.name + "</div>" +
      "<div class='h-line'>🥤 " + p.snack1.name + "</div>" +
      "<div class='h-line'>🍽 " + p.lunch.name + "</div>" +
      "<div class='h-line'>🍪 " + p.snack2.name + "</div>" +
      "<div class='h-line'>🌮 " + p.dinner.name + "</div>";
    wrap.appendChild(el);
  });
}

// Архивируем текущий день в историю перед новой генерацией
function archiveCurrent() {
  const saved = loadToday();
  if (!saved) return;
  const hist = loadHistory();
  if (!hist.some(d => d.date === saved.date)) {
    hist.unshift(saved);
    saveHistory(hist);
  }
}

// ---------- НАВИГАЦИЯ ----------
function showScreen(name) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $("screen-" + name).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.screen === name);
  });
  if (name === "history") renderHistory();
}

document.querySelectorAll("[data-screen]").forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.screen));
});

// ---------- КНОПКИ ----------
$("btnGenerate").addEventListener("click", () => {
  archiveCurrent();
  const plan = generateDay();
  saveToday(plan);
  renderPlan(plan, false);
  toast("День собран! Приятного аппетита 😋");
});

$("btnReroll").addEventListener("click", () => {
  archiveCurrent();
  const plan = generateDay();
  saveToday(plan);
  renderPlan(plan, false);
  toast("Новый вариант дня 🎲");
});

$("btnLike").addEventListener("click", () => {
  if (!currentPlan) return;
  const saved = loadToday();
  const liked = !(saved && saved.liked);
  localStorage.setItem(LS_TODAY, JSON.stringify({ date: todayKey(), plan: currentPlan, liked }));
  const likeBtn = $("btnLike");
  likeBtn.classList.toggle("liked", liked);
  likeBtn.textContent = liked ? "💖 Сохранено" : "❤️ Нравится";
  toast(liked ? "Записали! Повторим когда-нибудь 😊" : "Убрали сердечко");
});

$("btnShare").addEventListener("click", async () => {
  if (!currentPlan) return;
  const p = currentPlan;
  const text =
    "🍽 Наше меню на " + fmtDate() + " (набор веса 💪):\n" +
    "🍳 Завтрак: " + p.breakfast.name + "\n" +
    "🥤 Перекус 1: " + p.snack1.name + "\n" +
    "🍽 Обед: " + p.lunch.name + "\n" +
    "🍪 Перекус 2: " + p.snack2.name + "\n" +
    "🌮 Ужин: " + p.dinner.name;
  if (navigator.share) {
    try { await navigator.share({ title: "Меню на день", text }); return; } catch(e) {}
  }
  try {
    await navigator.clipboard.writeText(text);
    toast("Скопировано в буфер 📋");
  } catch(e) {
    alert(text);
  }
});

// ---------- СТАРТ ----------
$("todayDate").textContent = fmtDate();
renderBank();

const existing = loadToday();
if (existing && existing.date === todayKey()) {
  renderPlan(existing.plan, existing.liked);
} else if (existing) {
  archiveCurrent();
}

// Service worker для офлайн-режима и возможности «Добавить на главный экран»
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
