//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');




//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


//Functions
function addTodo(Event){
    //Prevent form from submitting OJO  VER SI FUNCIONA PORQUE EVENT IS DEPRECATED
    Event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //ADD TODO AL LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //CHECK trash BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //Clear Todo INPUT VALUE
    todoInput.value = "";
}

function deleteCheck (Event) {
    const item = Event.target;
//DELETE TODO
if (item.classList[0]=== "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add('fall');
    todo.addEventListener('transitionend',function(){
        todo.remove()
    });
 }
 //CHECK MARK
 if (item.classList[0] === "complete-btn") {
     const todo = item.parentElement;
     todo.classList.toggle("completed");
 }
}
//FILTER ITEMS
 function filterTodo (Event) {
     const todos = todoList.childNodes;
     todos.forEach(function(todo){
         switch(Event.target.value) {
             case "all":
                 todo.style.display = "flex";
                 break;
                 case "completed":
                     if(todo.classList.contains("completed")){
                         todo.style.display = "flex";
                     }else {
                         todo.style.display = "none";
                     } break;
                 case "uncompleted":
                     if(!todo.classList.contains("completed")){
                         todo.style.display = "flex";
                     }else {
                        todo.style.display = "none";
                    } break;
         }
     });
 }

 function saveLocalTodos(todo) {
     //CHECK DO I ALREADY HAVE THING IN THERE?
     let todos;
     if(localStorage.getItem("todos") === null) {
         todos = [];
     } else {
         todos = JSON.parse(localStorage.getItem("todos"));
     }

     todos.push(todo);
     localStorage.setItem("todos",JSON.stringify(todos));
 }