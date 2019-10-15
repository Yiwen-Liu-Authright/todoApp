export const rerender = (todoTask) => {
    const renderType = document.getElementsByClassName("currentFilter")[0];
    try {
        //console.log(renderType);
        let finalArr = [];
        if (renderType.textContent === "To Do") {
            finalArr = todoTask.filter((todo) => {
                return todo.checked === false
            })
        } else if (renderType.textContent === "Completed") {
            finalArr = todoTask.filter((todo) => {
                return todo.checked === true
            })
        } else if (renderType.textContent === "All") {
            finalArr = todoTask
        } else { console.error("Invalid button"); }

        renderAll(finalArr);
        
    } catch (error) { console.error(error); }
}

// Render All
const renderAll = (todoTask) => {
    document.getElementById('renderedList').innerHTML = "";
    for (let i = 0; i < todoTask.length; i++) {
        // Create and Li Item
        const newTaskName = todoTask[i].text;
        const newLIItem = createLIItem(newTaskName);
        // Maintain the rendered item className is Checked or not
        toggleChecked(todoTask, newTaskName, newLIItem);
        // Append it to the UL
        document.getElementById("renderedList").appendChild(newLIItem);
    }
}

const createLIItem = (newTaskName) => {
    const newLIItem = document.createElement('LI');
    // Task Name
    const taskNode = document.createTextNode(newTaskName);
    newLIItem.appendChild(taskNode);
    // Delete Button
    const deleteButton = document.createElement("img");
    deleteButton.src = "./assets/deleteButton.png";
    deleteButton.className = "deleteButton";
    newLIItem.appendChild(deleteButton);

    return newLIItem;
}

const isChecked = (todoTask, taskText) => {
    try {
        for (let i = 0; i < todoTask.length; i++) {
            if (todoTask[i].text === taskText) {
                return todoTask[i].checked;
            }
        }
        throw "No Item in the list";
    } catch (error) {
        console.error(error);
    }
    return false;
}

const toggleChecked = (todoTask, newTaskName, newLIItem) => {
    if (isChecked(todoTask, newTaskName) === true) {
        newLIItem.className = "checked";
    } else {
        newLIItem.className = "";
    }
}