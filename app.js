/*
 * @Comment: Yiwen Liu
 * @Date: 2019-09-20 17:03:20
 * @LastEditTime: 2019-10-08 14:57:14
 * @Status: 
 * @Description: 
 */

import { renderAll, renderTodo, renderCompeleted } from "./render.js";

const INITIALLIST = ["Eat Dinner", "Wash Cloth", "Take Shower"];

const todoTask = [];

const addTodo = (newText) => {
    const todo = {
        text: newText,
        checked: false,
    }

    todoTask.unshift(todo);
    // console.log(`finished push "${todo.text}" to the array`);
}
const removeTodo = (removeText) => {
    try {
        for (let i = 0; i < todoTask.length; i++) {
            console.log(`${todoTask[i].text} === ${removeText}`);
            if (todoTask[i].text === removeText) {
                todoTask.splice(i, 1);
                return;
            }
        }
        throw `Can't find the remove element "${removeText}"`;
    } catch (error) {
        console.error(error);
    }
}

const toggleChecked = (taskText) => {
    try {
        for (let i = 0; i < todoTask.length; i++) {
            if (todoTask[i].text === taskText) {
                todoTask[i].checked = !(todoTask[i].checked);
                return todoTask[i].checked;
            }
        }
        throw "Can't find the specific Item From the List";
    } catch (error) {
        console.error(error);
    }
}

const renderController = () => {
    const renderType = document.getElementsByClassName("clicked");
    try {
        for (let i = 0; i < renderType.length; i++) {
            if (renderType[i].textContent === "To Do") {
                renderTodo(todoTask);
            } else if (renderType[i].textContent === "Completed") {
                renderCompeleted(todoTask);
            } else if (renderType[i].textContent === "All") {
                renderAll(todoTask);
            } else { throw "Invalid button"; }
        }
    } catch (error) { console.error(error); }

}

// Clear all the button class
const clearClicked = () => {
    const clicked = document.getElementsByClassName("clicked");
    for (let i = 0; i < clicked.length; i++) {
        clicked[i].classList = " ";
    }
}

// Generate the Initial List to Test
for (let i = 0; i < INITIALLIST.length; i++) {
    addTodo(INITIALLIST[i]);
    renderController();
}

document.getElementById("newInput").addEventListener('keypress',
    event => {
        try {
            if (event.keyCode === 13) {
                if (event.target.value == "") {
                    throw "Task name can't be empty";
                } else {
                    addTodo(event.target.value);
                    event.target.value = "";
                    renderController();
                }
            }
        } catch (error) {
            alert(error);
        }
    });

document.getElementById("renderedList").addEventListener('click',
    event => {
        const currentTask = event.target;
        try {
            if (currentTask.tagName === "LI") {
                currentTask.classList.toggle("checked");
                toggleChecked(currentTask.textContent);
                //console.log(`"${currentTask.textContent}" checked is ${toggleChecked(currentTask.textContent)}`); // why undefined
                renderController();
            } else if (currentTask.tagName === "IMG") {
                removeTodo(currentTask.parentElement.textContent);
                renderController();
            } else { throw "Invalid Elements"; }
        } catch (error) {
            console.error(error);
        }
    });

document.getElementById("btn-group").addEventListener('click',
    event => {
        try {
            if (event.target.textContent === "To Do") {
                clearClicked();
                event.target.classList = "clicked";
                renderTodo(todoTask);
            } else if (event.target.textContent === "Completed") {
                clearClicked();
                event.target.classList = "clicked";
                renderCompeleted(todoTask);
            } else if (event.target.textContent === "All") {
                clearClicked();
                event.target.classList = "clicked";
                renderAll(todoTask);
            } else { throw "Invalid Button" }
        } catch (error) {
            console.error(error);
        }
    });