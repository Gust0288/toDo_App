const input = document.getElementById("userInput");
const addButton = document.getElementById("add");
const clearButton = document.getElementById("clear");
const amountInput = document.getElementById("amountInput");

addButton.addEventListener("click", () => {
  let inputValue = input.value;
  let inputAmount = amountInput.value;

  //Kører funktionen med 2 parmetre task og antal
  addTask(inputValue, inputAmount);

  //clearer input felt i browser efter man trykker tilføj
  input.value = "";
  amountInput.value = "";
  // kører funtionen der laver elementet om til string for at gemme det i local storage
  saveTasksToLocalStorage();

  console.log(inputValue);
});
// initialisere et tomt array
let taskArray = [];
// funktion til at tilføje et object til array
function addTask(taskName, taskAmount) {
  const task = {
    name: taskName,
    id: crypto.randomUUID(), // laver et random id for alle objekter
    done: false,
    amount: taskAmount,
  };

  //pusher objektet til taskArray
  taskArray.push(task);

  console.log(taskArray);
  // kører funktionen der filtrer og tilføjer objecter til DOM
  filterAndSortArray();
}

function filterAndSortArray() {
  // her skulle der tilføjes filter elementer, men mangel på tid kom i vejen.
  // funktion tilføjer objekter til DOM
  showList();
}

//Bygger det ud i dommen
function showList() {
  const toDoTbody = document.getElementById("toDoList");
  const doneTbody = document.getElementById("doneList");

  toDoTbody.innerHTML = "";
  doneTbody.innerHTML = "";
  // for hvert element i arrayet laver funktionen en ny template den kopiere til ul - DOM
  taskArray.forEach((task) => {
    const template = document.querySelector("template");
    const clone = template.content.cloneNode(true);

    clone.querySelector(".labelInput").textContent = task.name;
    clone.querySelector(".amount").textContent = task.amount;

    const checkbox = clone.querySelector(".checkList");
    checkbox.checked = task.done;

    const editButton = clone.querySelector(".editBtn");
    editButton.addEventListener("click", () => {
      editTask(task);
    });

    const removeButton = clone.querySelector(".removeBtn");
    removeButton.addEventListener("click", () => {
      removeTask(task);
    });
    // går ind og lytter om der sker ændringer i booleanen task, om den skifter fra false til true eller omvendt
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasksToLocalStorage();
      filterAndSortArray();
    });
    // tilføjer kopi af template til DOM
    if (task.done) {
      doneTbody.appendChild(clone);
    } else {
      toDoTbody.appendChild(clone);
    }
  });
}
// Tilføjer funktionen af kunne ændre på sin tasks med et pop up vindue
function editTask(task) {
  const newName = prompt("Enter the new task name:", task.name);
  const newAmount = prompt("Amount:", task.amount);

  if (newName !== null && newAmount !== null) {
    task.name = newName;
    task.amount = newAmount;
    saveTasksToLocalStorage();
    filterAndSortArray();
  }
}

function removeTask(task) {
  taskArray = taskArray.filter((t) => t.id !== task.id);
  saveTasksToLocalStorage();
  filterAndSortArray();
}
// Sætter alle værdier i arrayet til string og tilføjer dem til localStorage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}
// gør sådan at værdierne fra localstorage er dem der bliver vist i dommen
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    taskArray = JSON.parse(storedTasks);
  } else {
    taskArray = [];
  }
  filterAndSortArray();
}
// Gør dig i stand til at slette hele listen
clearButton.addEventListener("click", () => {
  const confirmRemoveAll = confirm(
    `Are you sure you want to remove all tasks?`
  );

  if (confirmRemoveAll) {
    const toDoTbody = document.getElementById("toDoList");
    const doneTbody = document.getElementById("doneList");

    toDoTbody.innerHTML = "";
    doneTbody.innerHTML = "";

    taskArray = [];

    console.log("clear");
    localStorage.clear();
    console.log(localStorage);
  }
});
// loader funktion der viser elementerne i localstorage
loadTasksFromLocalStorage();
