// 1.  Start the App: The user launches the To-Do app.
// 2.  Add To-Do Item: The user adds a new item to the To-Do list.
// 3.  View To-Do List: Optionally, after adding items, the user can view the list of To-Do items.
// 4.  Mark Item as Done: The user selects an item from the To-Do list and marks it as done, which moves the item to the Done list.
// 5. Update Counters: The app updates the counters for both the To-Do list and the Done list.
// 6. View Done List: Optionally, the user can view the list of Done items.
// 7. Repeat or End: The user can repeat the process of adding items or marking them as done, or they can choose to end the session.




const input = document.getElementById("userInput");
const addButton = document.getElementById("add");

addButton.addEventListener("click", ()=>{
    
    let inputValue = input.value;

    addTask(inputValue);
    
    console.log(inputValue)
})


const taskArray =[];

function addTask(taskName){
    const task = {
        name: taskName,
        done: false
    }
    taskArray.push(task);

    console.log(taskArray)

 filterAndSortArray();


}

function filterAndSortArray(){

    showList();

}
//Bygger det ud i dommen
function showList(){
    const tbody = document.getElementById("toDoList");
    tbody.innerHTML = "";

    taskArray.forEach( (task)=>{
        const clone = document.querySelector("template").content.cloneNode(true);

        clone.getElementById("labelInput").textContent = task.name;

        tbody.appendChild(clone);

    })

}