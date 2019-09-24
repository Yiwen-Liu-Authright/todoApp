/*
 * @Comment: Yiwen Liu
 * @Date: 2019-09-20 17:03:20
 * @LastEditTime: 2019-09-24 10:14:55
 * @Status: 
 * @Description: 
 */

const INITIALLIST = ["Eat Dinner", "Wash Cloth", "Take Shower"];

const todoTask = [];

const addTodo = (newtext) => {
    const todo = {
        text: newtext,
        checked: false,
    }

    todoTask.push(todo);
    console.log(`finished push "${todo.text}" to the array`);
    renderTodo();
}

const isChecked = (taskText) => {
    for (let i = 0; i < todoTask.length; i++) {
        if (todoTask[i].text === taskText) {
            return todoTask[i].checked;
        }
    }
    alert("No Item in the list");
    return false;
}

const toggleChecked = (taskText) => {
    for (let i = 0; i < todoTask.length; i++) {
        if (todoTask[i].text === taskText) {
            todoTask[i].checked = !(todoTask[i].checked);
            return todoTask[i].checked;
        }
    }
    alert("No Item in the list");
    return false;
}

const renderTodo = () => {

    console.log("Render todolist...");
    document.getElementById('renderedList').innerHTML = "";
    for (let i = 0; i < todoTask.length; i++) {
        const newTaskName = todoTask[i].text;
        const newLIItem = document.createElement('LI');
        // Task Name
        const taskNode = document.createTextNode(newTaskName);
        newLIItem.appendChild(taskNode);
        // Delete Button
        const deleteButton = document.createElement("img");
        deleteButton.src = "deleteButton.png";
        deleteButton.className = "deleteButton";
        newLIItem.appendChild(deleteButton);
        // Maintain the rendered item className is Checked or not
        if (isChecked(newTaskName) === true) {
            console.log("HELLO");
            newLIItem.className = "checked";
        } else {
            console.log("WORLD");
            newLIItem.className = "";
        }
        // Append it to the UL
        document.getElementById("renderedList").appendChild(newLIItem);
    }
}

// Generate the Initial List
for (let i = 0; i < INITIALLIST.length; i++) {
    addTodo(INITIALLIST[i]);
}

document.getElementById("newInput").addEventListener('keypress',
    event => {
        if (event.keyCode === 13) {
            addTodo(event.target.value);
        }
    });

document.getElementById("renderedList").addEventListener('click',
    event => {
        if (event.target.tagName == "LI") {
            const currentTask = event.target;
            currentTask.classList.toggle("checked");    
            console.log(`${currentTask.textContent} is toggled`);
            //toggleChecked(currentTask.textContent)
            console.log(`"${currentTask.textContent}" checked is ${toggleChecked(currentTask.textContent)}`); // why undefined
        }
    });



