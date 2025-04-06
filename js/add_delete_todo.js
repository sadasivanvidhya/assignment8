const taskInput = document.getElementById('todoTask');
const todoList = document.getElementById('taskList');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//Function to save tasks to localStorage
const saveTask=()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Function to render tasks on UI
const renderTasks = () => {
    todoList.innerHTML = ""; // Clear existing list
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const li = document.createElement('li');
        const span = document.createElement('span');
        const button = document.createElement('button');

        span.textContent = task.text;

        // stripe on the task
        if (task.status) {
            span.classList.add('completed');
        }

        // Toggle task completion on click
        span.addEventListener('click', () => {
            tasks[i].status = !tasks[i].status;
            saveTask();
            renderTasks();
        });

        button.innerHTML = '<i class="fas fa-trash" style="color: red;"></i>';
        button.addEventListener('click', () => deleteTodoList(i));

        li.appendChild(span);
        li.appendChild(button);
        todoList.appendChild(li);
    }
};
//Function to delete a task
const deleteTodoList=(i)=>{
    let newTask = [];
    for(let j=0;j<tasks.length;j++){
        if(j!==i){
            newTask[newTask.length] = tasks[j];
        }
    }
    tasks =newTask;
    saveTask();
    renderTasks();
}

// Function to add a task
const addTodo=()=>{ 
    if(!taskInput.value.trim())return;
    tasks.push({text:taskInput.value,status:false});
    saveTask();
    renderTasks();
    taskInput.value='';
}

// form submission
document.getElementById('todoForm').addEventListener('submit',(e)=>{
    e.preventDefault();
    addTodo();//function call
});
//to show the tasks
renderTasks();