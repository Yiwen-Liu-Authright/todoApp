/*
 * @Comment: Yiwen Liu
 * @Date: 2019-09-20 17:03:20
 * @LastEditTime: 2019-10-08 17:39:09
 * @Status: 
 * @Description: 
 */

import { renderAll } from "./render.js";

const INITIALLIST = ["Eat Dinner", "Wash Cloth", "Take Shower"];

const todoTask = [];

const addTodo = (newText) => {
    const todo = {
        text: newText,
        checked: false,
    }
    todoTask.unshift(todo);
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

const rerender = () => {
    const renderType = document.getElementsByClassName("clicked")[0];
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
        } else { throw "Invalid button"; }

        renderAll(finalArr);
    } catch (error) { console.error(error); }

}

// Generate the Initial List to Test
for (let i = 0; i < INITIALLIST.length; i++) {
    addTodo(INITIALLIST[i]);
    rerender();
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
                    rerender();
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
                rerender();
            } else if (currentTask.tagName === "IMG") {
                removeTodo(currentTask.parentElement.textContent);
                rerender();
            } else { throw "Invalid Elements"; }
        } catch (error) {
            console.error(error);
        }
    });
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

document.getElementById("btn-group").addEventListener('click',
    event => {
        clearClicked();
        event.target.classList = "clicked";
        rerender();
    });

// Clear all the button class
const clearClicked = () => {
    const clicked = document.getElementsByClassName("clicked");
    for (let i = 0; i < clicked.length; i++) {
        clicked[i].classList = " ";
    }
}