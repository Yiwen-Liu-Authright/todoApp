/*
 * @Comment: Yiwen Liu
 * @Date: 2019-09-19 18:44:08
 * @LastEditTime: 2019-09-20 16:08:38
 * @Status: Inprocess
 * @Description: Each render <li> version
 */

// Initial List
INITIALLIST = ["Eat Dinner", "Wash Cloth", "Take Shower"]
// Generate the Initial List
for (let i = 0; i < INITIALLIST.length; i++) {
    addTodo(INITIALLIST[i]);
}

// Press Enter to Add Task
document.getElementById("newInput").addEventListener('keypress',
    event => {
        if (event.keyCode === 13) {
            this.addTodo(event.target.value);
        }
    });


let todoList = document.querySelector("UL");
// Clicked the Task to complete
todoList.addEventListener('click',
    event => {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle('checked');
            console.log(`"${event.target.textContent}" is clicked`);
        }
    }, false);

const close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        this.parentElement.remove();
    }
}

// const createTodoElement = (newTaskText) => {
//     const taskText = newTaskText;
//     const deleteButton = document.createElement('button');

//     if (newTaskText.length <= 0) {
//         alert("Please Enter Something...");
//     } else {

//     }
// }
// Add ToDo Item To the UL
function addTodo(newTaskName) {
    console.log("Add Task...");

    const newLIItem = document.createElement("li");

    if (newTaskName === "") {
        alert("Please Enter Something...");
        //return;
    } else {
        // Task Name
        const taskNode = document.createTextNode(newTaskName);
        newLIItem.appendChild(taskNode);
        // Delete Button
        const closeButton = document.createElement("span");
        const mark = document.createTextNode("X");
        closeButton.className = "close";
        closeButton.appendChild(mark);
        newLIItem.appendChild(closeButton);
        // Append it to the UL
        document.getElementById("todolist").appendChild(newLIItem);
        console.log(`Task "${newLIItem.textContent}" has been already generated`);
        // Clear the Input
        document.getElementById("newInput").value = "";
    }
}


