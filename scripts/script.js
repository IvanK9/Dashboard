const appState = {
  monthlyData: {
    // ЯНВАРЬ 2026
    "2026-0": {
      projects: [
        {
          id: "p1",
          company: "SmartTech",
          name: "Cloud Portal",
          budget: 500000.0,
          employeeCapacity: 2,
        },
        {
          id: "p2",
          company: "BioGen",
          name: "Research App",
          budget: 350000.75,
          employeeCapacity: 1.5,
        },
      ],
      employees: [
        {
          id: "e1",
          firstName: "Александр",
          lastName: "Иванов",
          birthDate: "1992-05-15",
          role: "Senior",
          salary: 4500,
          assignments: [{ projectId: "p1", capacity: 1, fit: 0.95 }],
        },
        {
          id: "e2",
          firstName: "Мария",
          lastName: "Петрова",
          birthDate: "1995-10-20",
          role: "Middle",
          salary: 3200,
          assignments: [{ projectId: "p2", capacity: 0.5, fit: 0.9 }],
        },
        {
          id: "e3",
          firstName: "Олег",
          lastName: "Сидоров",
          birthDate: "1988-02-10",
          role: "Architect",
          salary: 7000,
          assignments: [{ projectId: "p2", capacity: 1, fit: 0.85 }],
        },
      ],
    },

    // ФЕВРАЛЬ 2026 (Демонстрация независимости данных)
    "2026-1": {
      projects: [
        {
          id: "p1",
          company: "SmartTech",
          name: "Cloud Portal",
          budget: 550000.0,
          employeeCapacity: 2,
        },
        {
          id: "p3", // Новый проект
          company: "EcoWorld",
          name: "Solar Tracker",
          budget: 200000.0,
          employeeCapacity: 1,
        },
      ],
      employees: [
        {
          id: "e1",
          firstName: "Александр",
          lastName: "Иванов",
          birthDate: "1992-05-15",
          role: "Lead", // Повысили до "Ведущего" в феврале
          salary: 5000,
          assignments: [{ projectId: "p1", capacity: 1, fit: 0.95 }],
        },
        {
          id: "e4",
          firstName: "Елена",
          lastName: "Кузнецова",
          birthDate: "1998-11-30",
          role: "Junior",
          salary: 1800,
          assignments: [{ projectId: "p3", capacity: 1, fit: 0.9 }],
        },
        {
          id: "e3",
          firstName: "Олег",
          lastName: "Сидоров",
          birthDate: "1988-02-10",
          role: "Junior",
          salary: 1800,
          assignments: [{ projectId: "p2", capacity: 0.5, fit: 0.9 }],
        },
      ],
    },
  },
};

// STORAGE

const getRealTimePeriod = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()}`;
};

const Storage = {
  state: JSON.parse(localStorage.getItem("monthlyData")) || appState,

  save() {
    localStorage.setItem("monthlyData", JSON.stringify(this.state));
  },

  getPeriodData(period) {
    if (!this.state.monthlyData[period]) {
      this.state.monthlyData[period] = { projects: [], employees: [] };
    }
    return this.state.monthlyData[period];
  },

  deleteEmployee(employeeId, period) {
    const data = this.getPeriodData(period);
    data.employees = data.employees.filter((emp) => emp.id !== employeeId);
    this.save();
  },

  updateEmployee(employeeId, period, field, value) {
    const data = this.getPeriodData(period);
    const employee = data.employees.find((emp) => emp.id === employeeId);
    if (employee) {
      employee[field] = field === "salary" ? parseFloat(value) : value;
      this.save();
    }
  },
};

// DRAWER

const body = document.querySelector(".body");
const drawer = document.querySelector(".drawer");
const btnAddProject = document.querySelector(".projects__btn--add");
const btnCloseDrawer = document.querySelector(".form__btn--close");

btnAddProject.addEventListener("click", () => {
  drawer.classList.add("drawer--open");
  // body.classList.add('overlay');
});

btnCloseDrawer.addEventListener("click", () => {
  drawer.classList.remove("drawer--open");
  // body.classList.remove('overlay');
});

// SIDEBAR

const sidebarBtn = document.querySelector(".sidebar__btn");
const sidebarBtnOpen = document.querySelector(".sidebar__open");
const sidebar = document.querySelector(".sidebar");

sidebarBtn.addEventListener("click", () => {
  sidebar.classList.add("sidebar--close");
  sidebarBtnOpen.classList.remove("hidden");
});

sidebarBtnOpen.addEventListener("click", () => {
  sidebar.classList.remove("sidebar--close");
  sidebarBtnOpen.classList.add("hidden");
});

// NAVIGATION

const navLinkProject = document.querySelector(".nav__link--project");
const navLinkEmployees = document.querySelector(".nav__link--employees");
const sectionProject = document.querySelector(".project");
const sectionEmployees = document.querySelector(".employee");

navLinkProject.addEventListener("click", () => {
  navLinkProject.classList.add("nav__link--active");
  navLinkEmployees.classList.remove("nav__link--active");
  sectionProject.classList.remove("hidden");
  sectionEmployees.classList.add("hidden");
  renderProjectTable();
});

navLinkEmployees.addEventListener("click", () => {
  navLinkEmployees.classList.add("nav__link--active");
  navLinkProject.classList.remove("nav__link--active");
  sectionEmployees.classList.remove("hidden");
  sectionProject.classList.add("hidden");
  renderEmployeesTable();
});

// MODAL

const modal = document.querySelector(".modal");
const modalOpen = document.querySelector(".projects__btn--seed");
const modalClose = document.querySelector(".modal__btn");

modalOpen.addEventListener("click", () => {
  modal.showModal();
});

modalClose.addEventListener("click", () => {
  modal.close();
});

function closeOverlay({ currentTarget, target }) {
  const modal = currentTarget;
  const isClickOverlay = target === modal;
  if (isClickOverlay) {
    modal.close();
  }
}

// PROJECT

// let currentPeriod = Storage.state.currentPeriod || "2025-0";
let currentPeriod = getRealTimePeriod();
const selectMonth = document.querySelector(".sidebar__select-months");
const selectYear = document.querySelector(".sidebar__select-years");

function initPeriod() {
  const [year, month] = currentPeriod.split("-");

  if (selectMonth && selectYear) {
    selectMonth.value = month;
    selectYear.value = year;
  }

  [selectMonth, selectYear].forEach((el) =>
    el.addEventListener("change", () => {
      currentPeriod = `${selectYear.value}-${selectMonth.value}`;
      Storage.state.currentPeriod = currentPeriod;

      Storage.save();
      renderProjectTable();
      renderEmployeesTable()
    }),
  );
}

function renderProjectTable() {
  const periodData = Storage.getPeriodData(currentPeriod);
  const tableProject = document.querySelector(".project__table-body");

  if (!periodData.projects || periodData.projects.length === 0) {
    tableProject.innerHTML = `<tr><td colspan="7">There is no data for this period</td></tr>`;
    return;
  }

  let projects = [...periodData.projects];

  tableProject.textContent = "";

  periodData.projects.forEach((el) => {
    const assignedCount = periodData.employees.filter((emp) =>
      emp.assignments.some((asgn) => asgn.projectId === el.id),
    ).length;

    const row = document.createElement("tr");
    const revenueClass = el.expectedRevenue < 0 ? "text-red" : "text-green";

    row.insertAdjacentHTML(
      "beforeend",
      `
        <td>${el.company}</td>
        <td>${el.name}</td>
        <td>${el.budget.toLocaleString()}</td>
        <td>${assignedCount} / ${el.employeeCapacity}</td>
        <td><button class="project__table--showEmployees data-id="${el.id}">Show Emploees</button></td>
        <td>-</td>
        <td><button class="project__table--delete data-id="${el.id}">Delete</button></td>`,
    );
    tableProject.append(row);
  });
}

// EMPLOYEE

function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function renderEmployeesTable() {
  const data = Storage.getPeriodData(currentPeriod);
  const tableBody = document.querySelector(".employee__table-body");

  if (!tableBody) return;

  tableBody.innerHTML = "";

  if (!data.employees || data.employees.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8">В этом периоде сотрудников пока нет</td></tr>`;
    return;
  }

  data.employees.forEach((emp) => {
    const currentUsage = emp.assignments.reduce(
      (sum, asgn) => sum + asgn.capacity,
      0,
    );
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${emp.firstName}</td>
            <td>${emp.lastName}</td>
            <td>${emp.birthDate ? calculateAge(emp.birthDate) : "—"}</td>
            <td>${emp.role}</td>
            <td>${emp.salary.toFixed(2)}</td>
            <td>Estimated Payment</td>
            <td>
              <button class="emp-assign-btn">Show Assignments(${currentUsage})</button>
            </td>
            <td>projectIncome</td>
            <td>
              <div class="emp__btns">
                <button class="emp__btn--availability">Availability</button>
                <button class="emp__btn--assign">Assign</button>
                <button class="emp__btn--delete">Delete</button>
              </div>
            </td>
        `;
    tableBody.append(row);
  });
}

initPeriod();
