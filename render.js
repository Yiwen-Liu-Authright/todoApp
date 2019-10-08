// Render All
export const renderAll = (todoTask) => {
    console.log("Render All...");
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
// Render todo
export const renderTodo = (todoTask) => {
    console.log("Render Todo...");
    document.getElementById('renderedList').innerHTML = "";
    for (let i = 0; i < todoTask.length; i++) {
        if (todoTask[i].checked === false) {
            // Create an Li Item
            const newTaskName = todoTask[i].text;
            const newLIItem = createLIItem(newTaskName);
            // Maintain the rendered item className is Checked or not
            toggleChecked(todoTask, newTaskName, newLIItem);
            // Append it to the UL
            document.getElementById("renderedList").appendChild(newLIItem);
        }
    }
}
// render Compelete
export const renderCompeleted = (todoTask) => {
    console.log("Render Compeleted...");
    document.getElementById('renderedList').innerHTML = "";
    for (let i = 0; i < todoTask.length; i++) {
        if (todoTask[i].checked === true) {
            // Create an Li elements
            const newTaskName = todoTask[i].text;
            const newLIItem = createLIItem(newTaskName);
            // Maintain the rendered item className is Checked or not
            toggleChecked(todoTask, newTaskName, newLIItem);
            // Append it to the UL
            document.getElementById("renderedList").appendChild(newLIItem);
        }
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