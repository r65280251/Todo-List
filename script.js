const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const formBtn = document.querySelector("#form-btn")
const taskCount = document.querySelector("#task-count")
const cancelEditButton = document.querySelector("#cancel-edit-btn")
const completeCount = document.querySelector("#completed-count")

let todos = [{
    id: Date.now() + 1,
    text: "go to gym",
    isCompleted: true
},
{
    id: Date.now() + 2,
    text: "Revision Time",
    isCompleted: false
},
{
    id: Date.now() + 3,
    text: "Running",
    isCompleted: false
}
]

let editTodoId = null;

todoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const todoValue = todoInput.value.trim();
    if(!todoValue){
        return
    }


    console.log({ editTodoId, todoValue });

    if (editTodoId) {
        //editng..
        todos = todos.map((todo) => {
            if (todo.id === Number(editTodoId)) {
                return {
                    ...todo,
                    text: todoValue
                }
            }
            return todo
        })
    } else {
        let newTodo = {
            id: Date.now(),
            text: todoValue,
            isCompleted: false
        }
        todos.push(newTodo)
    }
    todoInput.value = ""
    renderTodo()
    cancelEdit()

})

function renderTodo(params) {
    
    todoList.innerHTML = "";
    // todoList.textContent = "";

    todos.forEach((todo) => {
        const li = document.createElement("li");

        li.className = "flex gap-2 border rounded-xl border-slate-300 p-4"

        // li.setAttribute("data-id", todo.id)  // Gugad
        li.dataset.id = todo.id // origijnal method

        li.innerHTML = `
        <input data-action="toggle" ${todo.isCompleted ? "checked" : ""} type="checkbox">
                    <p class="flex-1 ${todo.isCompleted ? "line-through text-blue-600" : ""}">${todo.text}</p>
                    <div class="flex gap-2">
                        <button class="cursor-pointer bg-green-300 p-2 rounded-md border hover:bg-green-200" data-action="edit">Edit</button>
                        <button class="cursor-pointer bg-red-300 p-2 rounded-md border hover:bg-red-200" data-action="delete">Delete</button>
                    </div>`
        todoList.append(li) // Exact HTML CODE
    })

    taskCount.textContent = `Task (${todos.length})`
    completeCount.textContent = `Completed : ${todos.filter((todo) => todo.isCompleted).length}`
}
renderTodo()
cancelEdit()

todoList.addEventListener("click", (e) => {
    e.stopPropagation()
    const li = e.target.closest("li")
    const id = li.dataset.id

    let action = e.target.dataset.action
    console.log(action);

    if (action === "delete") {
        deleteTodo(id)
    }
    if (action === "edit") {
        startEdit(id)
    }


    if (action === "toggle") {
        todos = todos.map((todo) => {
            if (todo.id === Number(id)) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                }
            }
            return todo
        })
        renderTodo()
        cancelEdit()
    
}

})

function deleteTodo(id) {
    todos = todos.filter((todo) => {
        if (todo.id !== Number(id)) {
            return todo
        }
    })
    renderTodo()
    cancelEdit()
    
}
function startEdit(id) {

    editTodoId = id;
    let currentTodo = todos.find((todo) => {
        if (todo.id === Number(id)) {
            return todo
        }
        
    })

    todoInput.value = currentTodo.text
    formBtn.textContent = "Update"
    formBtn.className = "bg-yellow-400 text-white px-4 py-2 border-2 border-black-500 rounded-lg text-red-500 text-xl font-2xl hover:bg-yellow-500"
    cancelEditButton.classList.remove("hidden")
   
}

function cancelEdit() {
    editTodoId = null;
    todoInput.value = ""
    formBtn.textContent = "Add"
    console.log(formBtn.textContent);
    formBtn.className = "px-5 py-3  bg-violet-600 text-white cursor-pointer"
    cancelEditButton.classList.add("hidden")
   
}
