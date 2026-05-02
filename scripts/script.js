const appState = {
  // Глобальный период управления
  "currentPeriod": "2026-0", 

  "monthlyData": {
    // ЯНВАРЬ 2026
    "2026-0": {
      "projects": [
        {
          "id": "p1",
          "company": "SmartTech",
          "name": "Cloud Portal",
          "budget": 500000.00,
          "totalCapacity": 2.0, // "Всего" в поле производительности
          "expectedRevenue": 120000.50,
          "assignedEmployeeIds": ["e1", "e2"] 
        },
        {
          "id": "p2",
          "company": "BioGen",
          "name": "Research App",
          "budget": 350000.75,
          "totalCapacity": 1.5,
          "expectedRevenue": -15000.00, // Будет красным
          "assignedEmployeeIds": ["e3"]
        }
      ],
      "employees": [
        {
          "id": "e1",
          "firstName": "Александр",
          "lastName": "Иванов",
          "birthDate": "1992-05-15", // Возраст вычисляется динамически
          "role": "Senior", // "Старший"
          "salary": 4500,
          "estimatedPayment": 4800.50,
          "maxCapacity": 1.5, // Максимальный ресурс
          "currentUsage": 1.2, // Использованный ресурс
          "projectTasksCount": 2,
          "projectedIncome": 1500.00,
          "vacationDays": 0, // Сохраняется в снимке месяца
          "fitness": 1.0,
          "power": 1.0
        },
        {
          "id": "e2",
          "firstName": "Мария",
          "lastName": "Петрова",
          "birthDate": "1995-10-20",
          "role": "Middle", // "Средний"
          "salary": 3200,
          "estimatedPayment": 3100.00,
          "maxCapacity": 1.0,
          "currentUsage": 1.0,
          "projectTasksCount": 1,
          "projectedIncome": 800.00,
          "vacationDays": 5, // В январе был отпуск
          "fitness": 0.9,
          "power": 1.0
        },
        {
          "id": "e3",
          "firstName": "Олег",
          "lastName": "Сидоров",
          "birthDate": "1988-02-10",
          "role": "Architect", // "Архитектор"
          "salary": 7000,
          "estimatedPayment": 7500.00,
          "maxCapacity": 1.0,
          "currentUsage": 0.5,
          "projectTasksCount": 3,
          "projectedIncome": 2500.00,
          "vacationDays": 0,
          "fitness": 1.0,
          "power": 1.0
        }
      ]
    },

    // ФЕВРАЛЬ 2026 (Демонстрация независимости данных)
    "2026-1": {
      "projects": [
        {
          "id": "p1",
          "company": "SmartTech",
          "name": "Cloud Portal",
          "budget": 550000.00, // Бюджет вырос в новом месяце
          "totalCapacity": 2.0,
          "expectedRevenue": 140000.00,
          "assignedEmployeeIds": ["e1"] // Состав команды изменился
        },
        {
          "id": "p3", // Новый проект
          "company": "EcoWorld",
          "name": "Solar Tracker",
          "budget": 200000.00,
          "totalCapacity": 1.0,
          "expectedRevenue": 45000.00,
          "assignedEmployeeIds": ["e4"]
        }
      ],
      "employees": [
        {
          "id": "e1",
          "firstName": "Александр",
          "lastName": "Иванов",
          "birthDate": "1992-05-15",
          "role": "Lead", // Повысили до "Ведущего" в феврале
          "salary": 5000,
          "estimatedPayment": 5200.00,
          "maxCapacity": 1.5,
          "currentUsage": 1.5, // Вместимость заполнена, кнопка "Назначить" будет недоступна
          "projectTasksCount": 4,
          "projectedIncome": 2000.00,
          "vacationDays": 2,
          "fitness": 1.0,
          "power": 1.1
        },
        {
          "id": "e4", // Новый сотрудник в феврале
          "firstName": "Елена",
          "lastName": "Кузнецова",
          "birthDate": "1998-11-30",
          "role": "Junior",
          "salary": 1800,
          "estimatedPayment": 1800.00,
          "maxCapacity": 1.0,
          "currentUsage": 0.8,
          "projectTasksCount": 1,
          "projectedIncome": 300.00,
          "vacationDays": 0,
          "fitness": 1.0,
          "power": 0.8
        },
        {
          "id": "e3",
          "firstName": "Олег",
          "lastName": "Сидоров",
          "birthDate": "1988-02-10",
          "role": "Architect",
          "salary": 7200, // Индексация зарплаты
          "estimatedPayment": 7200.00,
          "maxCapacity": 1.0,
          "currentUsage": 0.0,
          "projectTasksCount": 0,
          "projectedIncome": 0,
          "vacationDays": 20, // Почти весь месяц в отпуске
          "fitness": 1.0,
          "power": 1.0
        }
      ]
    }
  }
};

// DRAWER

const body = document.querySelector('.body');
const drawer = document.querySelector('.drawer');
const btnAddProject = document.querySelector('.projects__btn--add');
const btnCloseDrawer = document.querySelector('.form__btn--close');

btnAddProject.addEventListener('click', () => {
    drawer.classList.add('drawer--open');
    // body.classList.add('overlay');
})


btnCloseDrawer.addEventListener('click', () => {
    drawer.classList.remove('drawer--open');
    // body.classList.remove('overlay');
})


// SIDEBAR

const sidebarBtn = document.querySelector('.sidebar__btn');
const sidebarBtnOpen = document.querySelector('.sidebar__open');
const sidebar = document.querySelector('.sidebar');

sidebarBtn.addEventListener('click', () => {
    sidebar.classList.add('sidebar--close');
    sidebarBtnOpen.classList.remove('hidden');
});

sidebarBtnOpen.addEventListener('click', () => {
    sidebar.classList.remove('sidebar--close');
    sidebarBtnOpen.classList.add('hidden');
});

// NAVIGATION

const navLinkProject = document.querySelector('.nav__link--project');
const navLinkEmployees = document.querySelector('.nav__link--employees');
const sectionProject = document.querySelector('.project');
const sectionEmployees = document.querySelector('.employee');

navLinkProject.addEventListener('click', () => {
    navLinkProject.classList.add('nav__link--active');
    navLinkEmployees.classList.remove('nav__link--active');
    sectionProject.classList.remove('hidden');
    sectionEmployees.classList.add('hidden');
});

navLinkEmployees.addEventListener('click', () => {
    navLinkEmployees.classList.add('nav__link--active');
    navLinkProject.classList.remove('nav__link--active');
    sectionEmployees.classList.remove('hidden');
    sectionProject.classList.add('hidden');
});

// MODAL

const modal = document.querySelector('.modal');
const modalOpen = document.querySelector('.projects__btn--seed');
const modalClose = document.querySelector('.modal__btn');

modalOpen.addEventListener('click', () => {
    modal.showModal();
});

modalClose.addEventListener('click', () => {
    modal.close();
});

function closeOverlay({ currentTarget, target }) {
  const modal = currentTarget;
  const isClickOverlay = target === modal;
  if (isClickOverlay) {
    modal.close();
    // returnScroll();
  }
}