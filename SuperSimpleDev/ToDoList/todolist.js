const savedToDo = JSON.parse(localStorage.getItem('todoList'));
let todoList = savedToDo || [];



renderTodoList();

function renderTodoList(){

    let todoListHTML = '';

    for (let i = 0; i < todoList.length; i++){
        const todoObject = todoList[i];

        const name = todoObject.name;
        const dueDate = todoObject.dueDate;

        const html = `
        <div>${name}</div>
        <div> ${dueDate}</div>
            <button class ="delete-todo" onclick = "
                todoList.splice(${i},1);
                renderTodoList();
            ">Delete</button>
        `;
        todoListHTML += html;
  
    }
    localStorage.setItem('todoList', JSON.stringify(todoList));
    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}


function addTodo(){
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    const dueDateInput = document.querySelector('.js-due-date-input');
    const dueDate = dueDateInput.value;

    todoList.push({name: name, dueDate: dueDate})
    inputElement.value = '';

    renderTodoList();
}



