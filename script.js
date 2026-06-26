const form = document.getElementById("todoForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const filters = document.querySelectorAll(".filter");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let currentFilter = "all";

// Save Local Storage

function saveData(){

    localStorage.setItem("todos",JSON.stringify(todos));

}

// Render Tasks

function render(){

    list.innerHTML="";

    let filtered = todos.filter(todo=>{

        if(currentFilter==="active")
            return !todo.completed;

        if(currentFilter==="completed")
            return todo.completed;

        return true;

    });

    filtered.forEach(todo=>{

        const li=document.createElement("li");

        li.dataset.id=todo.id;

        li.innerHTML=`

        <span class="${todo.completed ? "completed":""}">
        ${todo.text}
        </span>

        <div class="actions">

            <button class="toggle">
            ${todo.completed ? "Undo":"Done"}
            </button>

            <button class="edit">
            Edit
            </button>

            <button class="delete">
            Delete
            </button>

        </div>

        `;

        list.appendChild(li);

    });

}

// CREATE

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const text=input.value.trim();

    if(text==="") return;

    todos.push({

        id:Date.now(),
        text:text,
        completed:false

    });

    input.value="";

    saveData();

    render();

});

// EVENT DELEGATION

list.addEventListener("click",(e)=>{

    const li=e.target.closest("li");

    if(!li) return;

    const id=Number(li.dataset.id);

    const task=todos.find(todo=>todo.id===id);

    // Delete

    if(e.target.classList.contains("delete")){

        todos=todos.filter(todo=>todo.id!==id);

    }

    // Toggle

    if(e.target.classList.contains("toggle")){

        task.completed=!task.completed;

    }

    // Edit

    if(e.target.classList.contains("edit")){

        const updated=prompt("Edit Task",task.text);

        if(updated!==null && updated.trim()!==""){

            task.text=updated.trim();

        }

    }

    saveData();

    render();

});

// FILTER

filters.forEach(btn=>{

    btn.addEventListener("click",()=>{

        currentFilter=btn.dataset.filter;

        filters.forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        render();

    });

});

// Initial Load

render();
