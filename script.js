const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (new URLSearchParams(window.location.search).get("grid") === "1") {
  document.body.classList.add("show-mobile-grid");
}

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuButton.classList.toggle("active", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      siteNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const carousel = document.querySelector("[data-carousel]");
if (carousel) {
  const slides = Array.from(carousel.querySelectorAll(".testimonial"));
  const prev = document.querySelector("[data-carousel-prev]");
  const next = document.querySelector("[data-carousel-next]");
  let activeIndex = 0;

  const showSlide = (index) => {
    slides[activeIndex].classList.remove("active");
    activeIndex = (index + slides.length) % slides.length;
    slides[activeIndex].classList.add("active");
  };

  prev?.addEventListener("click", () => showSlide(activeIndex - 1));
  next?.addEventListener("click", () => showSlide(activeIndex + 1));
}

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const isVisible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !isVisible);
    });
  });
});

const promptPicker = document.querySelector(".prompt-picker-tool");

if (promptPicker) {
  const prompts = {
    mvp: {
      title: "Быстро MVP",
      badge: "MVP sprint",
      text: `Ты - senior product engineer и наставник по vibe coding.

Помоги мне быстро собрать MVP проекта.

Контекст:
- Идея проекта: [опиши идею]
- Для кого: [целевая аудитория]
- Главная польза: [какую проблему решает]
- Стек/инструменты: [если уже выбраны]
- Время на первую версию: [например, 1 день / 1 неделя]

Сделай:
1. Сформулируй самое маленькое полезное ядро MVP.
2. Убери все функции, без которых можно запуститься.
3. Разбей работу на 5-7 коротких задач.
4. Для каждой задачи дай понятный результат: что должно быть готово.
5. Отдельно напиши, что проверить перед публикацией.

Формат ответа:
- Короткая концепция MVP
- Список функций первой версии
- План разработки по шагам
- Чек-лист запуска
- Что добавить во второй версии`
    },
    clean: {
      title: "Почистить код",
      badge: "Refactor",
      text: `Ты - senior code reviewer.

Помоги мне почистить код без поломки текущего поведения.

Контекст:
- Что делает проект: [кратко]
- Какие файлы/модули вызывают проблемы: [укажи]
- Что сейчас мешает: [дубли, хаос, длинные функции, непонятные имена]
- Что нельзя ломать: [важные сценарии]

Сделай:
1. Найди места, где код сложный, повторяется или плохо читается.
2. Предложи безопасный порядок рефакторинга.
3. Объясни, какие изменения можно сделать сразу, а какие лучше отложить.
4. Дай конкретные рекомендации по именам, структуре и разделению логики.
5. Составь чек-лист проверки после рефакторинга.

Формат ответа:
- Главные проблемы кода
- План чистки по шагам
- Риски
- Что протестировать
- Финальная структура, к которой стоит прийти`
    },
    speed: {
      title: "Ускорить",
      badge: "Performance",
      text: `Ты - performance engineer.

Помоги ускорить проект и найти самые заметные тормоза.

Контекст:
- Тип проекта: [сайт / приложение / бот / сервис]
- Где тормозит: [загрузка, интерфейс, запросы, сборка, сервер]
- Что уже пробовали: [если пробовали]
- Ограничения: [нельзя менять стек, мало времени, слабый сервер]

Сделай:
1. Составь список вероятных причин замедления.
2. Раздели улучшения на быстрые, средние и сложные.
3. Подскажи, какие метрики или проверки снять до правок.
4. Дай конкретный план оптимизации.
5. Отметь изменения, которые могут сломать поведение или UX.

Формат ответа:
- Диагностика
- Быстрые победы за 30-60 минут
- Глубокие улучшения
- Что измерить
- План проверки результата`
    },
    enterprise: {
      title: "Сделать enterprise",
      badge: "Scale ready",
      text: `Ты - enterprise software architect.

Помоги подготовить проект к более серьезному уровню: надежность, безопасность, структура и масштабирование.

Контекст:
- Что делает проект: [описание]
- Текущий стек: [frontend/backend/db/hosting]
- Кто будет пользоваться: [команда, клиенты, админы]
- Что уже есть: [авторизация, роли, платежи, админка, логирование]
- Что важно для бизнеса: [стабильность, скорость, безопасность, контроль]

Сделай:
1. Оцени, чего не хватает до enterprise-уровня.
2. Раздели рекомендации на архитектуру, безопасность, данные, наблюдаемость и процессы.
3. Предложи минимальный roadmap без перегруза.
4. Укажи, какие решения не стоит усложнять раньше времени.
5. Дай чек-лист готовности к росту.

Формат ответа:
- Текущий уровень зрелости
- Главные пробелы
- Roadmap на 30 дней
- Roadmap на 90 дней
- Enterprise checklist`
    }
  };

  const options = Array.from(promptPicker.querySelectorAll("[data-prompt-choice]"));
  const select = promptPicker.querySelector("[data-prompt-select]");
  const title = promptPicker.querySelector("[data-prompt-title]");
  const badge = promptPicker.querySelector("[data-prompt-badge]");
  const output = promptPicker.querySelector("[data-prompt-output]");
  const copyButton = promptPicker.querySelector("[data-copy-prompt]");
  const copyStatus = promptPicker.querySelector("[data-copy-status]");
  let activePrompt = prompts.enterprise.text;

  const setPrompt = (key) => {
    const prompt = prompts[key] || prompts.mvp;
    activePrompt = prompt.text;
    title.textContent = prompt.title;
    badge.textContent = prompt.badge;
    output.textContent = prompt.text;
    copyStatus.textContent = "";

    options.forEach((option) => {
      option.classList.toggle("active", option.dataset.promptChoice === key);
    });

    if (select && select.value !== key) {
      select.value = key;
    }
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(activePrompt);
      copyStatus.textContent = "Скопировано";
    } catch (error) {
      const textarea = document.createElement("textarea");
      textarea.value = activePrompt;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      copyStatus.textContent = "Скопировано";
    }
  };

  options.forEach((option) => {
    option.addEventListener("click", () => setPrompt(option.dataset.promptChoice));
  });

  select?.addEventListener("change", () => setPrompt(select.value));
  copyButton?.addEventListener("click", copyPrompt);
  setPrompt(select?.value || "enterprise");
}

const promptPackGrid = document.querySelector(".prompt-pack-grid");

if (promptPackGrid) {
  const promptItems = Array.from(promptPackGrid.querySelectorAll(".prompt-pack-card")).map((card, index) => ({
    id: `prompt-${index + 1}`,
    number: String(index + 1).padStart(2, "0"),
    title: card.querySelector("h3")?.textContent?.trim() || `Промпт ${index + 1}`,
    description: card.querySelector("p")?.textContent?.trim() || "",
    text: card.querySelector("code")?.textContent?.trim() || ""
  }));

  if (promptItems.length) {
    promptPackGrid.classList.add("is-terminal");
    promptPackGrid.innerHTML = `
      <article class="prompt-pack-terminal">
        <div class="prompt-pack-terminal__top">
          <div>
            <p class="eyebrow">15 готовых промптов</p>
            <h3 data-pack-title></h3>
            <p data-pack-description></p>
          </div>
          <span data-pack-count></span>
        </div>
        <div class="prompt-search" data-pack-search>
          <label class="prompt-search__field" for="prompt-pack-search">
            <span>Поиск промта</span>
            <span class="prompt-search__value"><input id="prompt-pack-search" type="text" autocomplete="off" data-pack-search-input><span aria-hidden="true" data-search-mirror></span><i aria-hidden="true"></i></span>
          </label>
          <div class="prompt-search__dropdown" data-pack-dropdown></div>
        </div>
        <pre><code data-pack-output></code></pre>
        <div class="prompt-pack-terminal__actions">
          <button class="button primary" type="button" data-copy-pack-prompt>Скопировать промпт</button>
          <span data-copy-pack-status aria-live="polite"></span>
        </div>
      </article>
    `;

    const search = promptPackGrid.querySelector("[data-pack-search]");
    const searchInput = promptPackGrid.querySelector("[data-pack-search-input]");
    const searchMirror = promptPackGrid.querySelector("[data-search-mirror]");
    const dropdown = promptPackGrid.querySelector("[data-pack-dropdown]");
    const title = promptPackGrid.querySelector("[data-pack-title]");
    const description = promptPackGrid.querySelector("[data-pack-description]");
    const count = promptPackGrid.querySelector("[data-pack-count]");
    const output = promptPackGrid.querySelector("[data-pack-output]");
    const copyButton = promptPackGrid.querySelector("[data-copy-pack-prompt]");
    const copyStatus = promptPackGrid.querySelector("[data-copy-pack-status]");
    let activeText = promptItems[0].text;
    let activeId = promptItems[0].id;

    const renderDropdown = (query = "") => {
      const normalizedQuery = query.trim().toLowerCase();
      const filteredItems = promptItems.filter((item) => {
        const haystack = `${item.title} ${item.description} ${item.text}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      });

      dropdown.innerHTML = "";

      if (!filteredItems.length) {
        const empty = document.createElement("div");
        empty.className = "prompt-search__empty";
        empty.textContent = "Ничего не найдено";
        dropdown.appendChild(empty);
        return;
      }

      filteredItems.forEach((item) => {
        const option = document.createElement("button");
        option.type = "button";
        option.className = "prompt-search__option";
        option.dataset.promptId = item.id;
        option.classList.toggle("active", item.id === activeId);
        option.innerHTML = `<span>${item.number}</span><strong>${item.title}</strong><small>${item.description}</small>`;
        dropdown.appendChild(option);
      });
    };

    const openDropdown = () => {
      search.classList.add("open");
      renderDropdown();
    };

    const closeDropdown = () => {
      search.classList.remove("open");
    };

    const setPackPrompt = (id) => {
      const selectedItem = promptItems.find((item) => item.id === id) || promptItems[0];
      activeId = selectedItem.id;
      activeText = selectedItem.text;
      title.textContent = selectedItem.title;
      description.textContent = selectedItem.description;
      count.textContent = `${selectedItem.number} / ${promptItems.length}`;
      output.textContent = selectedItem.text;
      copyStatus.textContent = "";
      searchInput.value = selectedItem.title;
      searchMirror.textContent = selectedItem.title;
      renderDropdown();
    };

    const copyPackPrompt = async () => {
      try {
        await navigator.clipboard.writeText(activeText);
      } catch (error) {
        const textarea = document.createElement("textarea");
        textarea.value = activeText;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      copyStatus.textContent = "Скопировано";
      window.setTimeout(() => {
        copyStatus.textContent = "";
      }, 1600);
    };

    searchInput.addEventListener("focus", openDropdown);
    searchInput.addEventListener("click", openDropdown);
    searchInput.addEventListener("input", () => {
      searchMirror.textContent = searchInput.value || "";
      openDropdown();
    });

    dropdown.addEventListener("click", (event) => {
      const option = event.target.closest("[data-prompt-id]");

      if (!option) {
        return;
      }

      setPackPrompt(option.dataset.promptId);
      closeDropdown();
    });

    document.addEventListener("click", (event) => {
      if (!promptPackGrid.contains(event.target)) {
        closeDropdown();
      }
    });

    copyButton.addEventListener("click", copyPackPrompt);
    setPackPrompt(promptItems[0].id);
  }
}

const promptCopyButtons = document.querySelectorAll("[data-copy-card-prompt]");

promptCopyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const card = button.closest(".prompt-pack-card");
    const promptText = card?.querySelector("code")?.textContent?.trim();

    if (!promptText) {
      return;
    }

    const originalText = button.textContent;

    try {
      await navigator.clipboard.writeText(promptText);
    } catch (error) {
      const textarea = document.createElement("textarea");
      textarea.value = promptText;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    button.textContent = "Скопировано";
    button.classList.add("is-copied");

    window.setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("is-copied");
    }, 1600);
  });
});
