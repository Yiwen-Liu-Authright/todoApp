/*
 * @Comment: Yiwen Liu
 * @Date: 2019-09-19 18:44:08
 * @LastEditTime: 2019-09-24 10:11:55
 * @Status: Inprocess
 * @Description: Each render <li> version
 */

// Initial List
INITIALLIST = ["Eat Dinner", "Wash Cloth", "Take Shower"]
// Generate the Initial List
for (let i = 0; i < INITIALLIST.length; i++) {
    addTodo(INITIALLIST[i]);
}

// Add the New Task To DOM
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

// Press Enter to Add Task
document.getElementById("newInput").addEventListener('keypress',
    event => {
        if (event.keyCode === 13) {
            this.addTodo(event.target.value);
        }
    });

// Clicked the Task to Complete & Delete
document.addEventListener('click',
    event => {
        // Click to check the Task
        if (event.target.tagName === "LI") {
            event.target.classList.toggle('checked');
            console.log(`"${event.target.textContent}" is clicked`);
        }

        if (event.target.tagName === "SPAN") {
            event.target.parentElement.remove();
        }
    }, false);