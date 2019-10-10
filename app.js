/*
 * @Comment: Yiwen Liu
 * @Date: 2019-09-20 17:03:20
 * @LastEditTime: 2019-10-10 18:03:34
 * @Status: 
 * @Description: 
 */

import { renderAll } from "./render.js";
import todos from './todos.js';

// const INITIALLIST = ["Eat Dinner", "Wash Cloth", "Take Shower"];
const { addTodo, getTodos, deleteTodo, fetchTodos, postTodos } = todos();

let todoTask = [];
fetchRemoteData();
// console.log(todoTask);
// rerender();

async function fetchRemoteData() {
    await fetchTodos();
    todoTask = getTodos();
    rerender();
}

async function postRemoteData() {
    await postTodos();
}

function rerender() {
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
        const clicked = event.target;
        try {
            if (clicked.tagName === "LI") {
                clicked.classList.toggle("checked");
                toggleChecked(clicked.textContent);
                //console.log(`"${currentTask.textContent}" checked is ${toggleChecked(currentTask.textContent)}`); // why undefined
                rerender();
            } else if (clicked.tagName === "IMG") {
                deleteTodo(clicked.parentElement.textContent);
                rerender();
            } else { throw "Invalid Elements"; }
        } catch (error) {
            console.error(error);
        }
    });

document.getElementById("save").addEventListener('click',
    event => {
        postRemoteData();
    })

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