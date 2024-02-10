class Field {
  constructor(names, age, pocketMoney) {
    (this.names = names), (this.age = age), (this.pocketMoney = pocketMoney);
  }
}

const elements = {
  navRegistration: document.getElementById("nav-registration"),
  navList: document.getElementById("nav-list-data"),
  registrationContent: document.getElementById("registration-content"),
  listContent: document.getElementById("list-data-content"),
  inputNames: document.getElementById("input-name"),
  inputAge: document.getElementById("input-age"),
  inputPocketMoney: document.getElementById("input-pocket"),
  dangerName: document.getElementById("danger-input-name"),
  dangerAge: document.getElementById("danger-input-age"),
  dangerMoney: document.getElementById("danger-input-money"),
  btnToList: document.getElementById("list"),
  btnSubmit: document.getElementById("btn-submitreg"),
  btnTheme: document.getElementById("theme"),
  textTheme: document.getElementById("text-theme"),
  btnMobileThemeForm: document.getElementById("mobile-theme-form"),
  textMobileThemeForm: document.getElementById("text-theme-form"),
  btnMobileThemeList: document.getElementById("mobile-theme-list"),
  textMobileThemeList: document.getElementById("text-theme-list"),
  contentResume: document.getElementById("content-resume"),
  loading: document.getElementById("loading"),
  tableBody: document.getElementById("table-budy"),
  body: document.body,
  myModal: new bootstrap.Modal(document.getElementById("exampleModal")),
};

let screenWidth = window.innerWidth;
const people = [];

// function
const validationInput = (names, age, pocketMoney) => {
  const message = {};

  if (names.length < 10) {
    message.name = true;
    elements.dangerName.classList.add("active");
  }
  if (age < 25) {
    message.age = true;
    elements.dangerAge.classList.add("active");
  }
  if (pocketMoney < 100000 || pocketMoney > 1000000) {
    message.pocketMoney = true;
    elements.dangerMoney.classList.add("active");
  }
  return message;
};

const handleSubmit = (event) => {
  event.preventDefault();
  let inputField = new Field(
    elements.inputNames.value,
    elements.inputAge.value,
    elements.inputPocketMoney.value
  );
  let { names, pocketMoney, age } = inputField;

  const message = validationInput(names, age, pocketMoney);

  if (Object.keys(message).length) {
    // If there are validation errors, display them and return false
    clearInput();
    return false;
  }

  // Show loading animation
  loading()
    .then(() => {
      // Loading animation complete, proceed with form submission
      const person = { names, age, pocketMoney };
      people.push(person);
      console.log(people);
      const textResume = resumePeople();
      elements.contentResume.innerHTML = textResume;
      readPeople();
      clearInput();
      elements.myModal.show();
      return true; // Return true indicating successful submission
    })
    .catch((error) => {
      console.error(error);
      return false; // Return false indicating submission failure
    });
};

const loading = () => {
  elements.loading.classList.add("active");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      elements.loading.classList.remove("active");
      resolve(); // Resolve the promise after the loading animation is complete
    }, 2000);
  });
};

const clearInput = () => {
  elements.inputNames.value = "";
  elements.inputAge.value = "";
  elements.inputPocketMoney.value = "";
};

const readPeople = () => {
  const data = document.createElement("tr");
  for (let index = 0; index < people.length; index++) {
    data.innerHTML = `
    <th scope="row">${index + 1}</th>
    <td>${people[index].names}</td>
    <td>${people[index].age}</td>
    <td>${people[index].pocketMoney}</td>
  `;
    elements.tableBody.appendChild(data);
  }
};

const resumePeople = () => {
  let averageOfAge = 0;
  let averageOfMoney = 0;
  for (let index = 0; index < people.length; index++) {
    averageOfAge += parseInt(people[index].age);
    averageOfMoney += parseInt(people[index].pocketMoney);
  }
  averageOfAge = averageOfAge / people.length;
  averageOfMoney = averageOfMoney / people.length;

  return `Rata rata pendaftar memiliki uang sangu sebesar ${averageOfMoney} dengan rata rata umur ${averageOfAge}`;
};

const handleNavRegistrationClick = () => {
  elements.registrationContent.classList.add("active");
  elements.listContent.classList.remove("active");
};

const handleNavListClick = () => {
  elements.listContent.classList.add("active");
  elements.registrationContent.classList.remove("active");
};

const handleInputNames = () => {
  if (elements.inputNames.value.trim().length > 10) {
    elements.dangerName.classList.remove("active");
  }
};

const handleInputAge = () => {
  if (parseInt(elements.inputAge.value) >= 25) {
    elements.dangerAge.classList.remove("active");
  }
};

const handleInputPocketMoney = () => {
  const value = parseInt(elements.inputPocketMoney.value);
  if (value >= 100000 && value <= 1000000) {
    elements.dangerMoney.classList.remove("active");
  }
};

const handleBtnToListClick = () => {
  elements.myModal.hide();
  elements.listContent.classList.add("active");
  elements.registrationContent.classList.remove("active");
};

const handleBtnThemeClick = () => {
  elements.body.classList.toggle("dark");
  elements.textTheme.innerHTML = elements.body.classList.contains("dark")
    ? "Light Mode"
    : "Dark Mode";
};

const handleBtnMobileThemeFormClick = () => {
  elements.body.classList.toggle("dark");
  const text = elements.body.classList.contains("dark")
    ? "Light Mode"
    : "Dark Mode";
  elements.textMobileThemeList.innerHTML = text;
  elements.textMobileThemeForm.innerHTML = text;
};

const handleBtnMobileThemeListClick = () => {
  elements.body.classList.toggle("dark");
  const text = elements.body.classList.contains("dark")
    ? "Light Mode"
    : "Dark Mode";
  elements.textMobileThemeList.innerHTML = text;
  elements.textMobileThemeForm.innerHTML = text;
};

const changeTextContent = () => {
  const screenWidth = window.innerWidth;
  const isMobile = screenWidth < 600;
  elements.navRegistration.innerHTML = isMobile
    ? "<i class='fa-solid fa-table-list'></i>"
    : "Registration Form";
  elements.navList.innerHTML = isMobile
    ? "<i class='fa-solid fa-user-pen'></i>"
    : "List of Registrant";
};

// event
elements.btnSubmit.addEventListener("click", handleSubmit);
elements.navRegistration.addEventListener("click", handleNavRegistrationClick);
elements.navList.addEventListener("click", handleNavListClick);
elements.inputNames.addEventListener("input", handleInputNames);
elements.inputAge.addEventListener("input", handleInputAge);
elements.inputPocketMoney.addEventListener("input", handleInputPocketMoney);
elements.btnToList.addEventListener("click", handleBtnToListClick);
elements.btnTheme.addEventListener("click", handleBtnThemeClick);
elements.btnMobileThemeForm.addEventListener(
  "click",
  handleBtnMobileThemeFormClick
);
elements.btnMobileThemeList.addEventListener(
  "click",
  handleBtnMobileThemeListClick
);
window.addEventListener("resize", changeTextContent);
