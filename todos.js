//  const todos = (initialList) => {
export default () => {
    let todos = [];

    function addTodo(newText) {
        const todo = {
            text: newText,
            checked: false,
        }
        todos.unshift(todo);
    }

    const getTodos = () => { return todos; }

    const deleteTodo = (removeText) => {
        try {
            for (let i = 0; i < todos.length; i++) {
                // console.log(`${todos[i].text} === ${removeText}`);
                if (todos[i].text === removeText) {
                    todos.splice(i, 1);
                    return;
                }
            }
            throw `Can't find the delete element "${removeText}"`;
        } catch (error) {
            console.error(error);
        }
    }

    // function initialTodos() {
    //     for (let i = 0; i < initialList.length; i++) {
    //         addTodo(initialList[i]);
    //     }
    // }

    async function fetchTodos() {
        let response = await fetch("https://todoapp-yiwenliu.firebaseio.com/todos.json");
        let json = await response.json();
        todos = json;
    }

    async function postTodos() {
        console.log(todos);
        let response = await fetch("https://todoapp-yiwenliu.firebaseio.com/todos.json", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(todos)
        });
        let data = await response.json();
        // alert(data.message);
    }

    return { addTodo, getTodos, deleteTodo, fetchTodos, postTodos };

}

// export todos;