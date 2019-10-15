/*
 * @Comment: Yiwen Liu
 * @Date: 2019-09-20 17:03:20
 * @LastEditTime: 2019-10-15 16:13:11
 * @Status: 
 * @Description: 
 */

import { rerender } from "./render.js";
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
    rerender(todoTask);
}

async function postRemoteData() {
    await postTodos();
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
                    rerender(todoTask);
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
                rerender(todoTask);
            } else if (clicked.tagName === "IMG") {
                deleteTodo(clicked.parentElement.textContent);
                rerender(todoTask);
            } else { throw "Invalid Elements"; }
        } catch (error) {
            console.error(error);
        }
    });

// document.getElementById("renderedList").addEventListener

document.getElementById("save").addEventListener('click',
    event => {
        postRemoteData();
    })

document.getElementById("btn-group").addEventListener('click',
    event => {
        clearFilterd();
        event.target.classList = "currentFilter";
        rerender(todoTask);
    });

// toggle checked task
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

// Clear all the filters' class style
const clearFilterd = () => {
    const filtered = document.getElementsByClassName("currentFilter");
    for (let i = 0; i < filtered.length; i++) {
        filtered[i].classList = " ";
    }
}