console.log("Is Script File Loading");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODOS_LIST_ID_ACTIVE = "todos_list_div_active";
const TODOS_LIST_ID_COMPLETED = "todos_list_div_completed";
const TODOS_LIST_ID_DELETED = "todos_list_div_deleted";
const NEW_TODO_INPUT_ID = "new_todo_input";
const HIDE_COMPLETE_BUTTON_ID = "hide_button_complete";
const HIDE_DELETE_BUTTON_ID = "hide_button_delete";

window.onload = getTodosAJAX();

function addTodoElements(todos_data_json){

    var todos = JSON.parse(todos_data_json);
    var parent_active = document.getElementById(TODOS_LIST_ID_ACTIVE);
    parent_active.innerHTML = "";

    var parent_completed = document.getElementById(TODOS_LIST_ID_COMPLETED);
    parent_completed.innerHTML = "";

    var parent_deleted = document.getElementById(TODOS_LIST_ID_DELETED);
    parent_deleted.innerHTML = "";

    Object.keys(todos).forEach(
        function(key) {
            if(todos[key].status == "ACTIVE"){
                var todo_element = createTodoElement(key, todos[key]);
                parent_active.appendChild(todo_element)
            }
            else if(todos[key].status == "COMPLETE"){
                var todo_element = createTodoElement(key, todos[key]);
                parent_completed.appendChild(todo_element)
            }
            else if(todos[key].status == "DELETED"){
                var todo_element = createTodoElement(key, todos[key]);
                parent_deleted.appendChild(todo_element)
            }
        }
    )
}

function createTodoElement(id, todo_object){

    var todo_element = document.createElement("div");

    todo_element.setAttribute("data-id", id);

    todo_element.setAttribute("class", "todoStatus"+ todo_object.status + " " + "breathVertical");

    if (todo_object.status == "ACTIVE"){
        var complete_checkbox = document.createElement("input");
        complete_checkbox.type = "checkbox";
        complete_checkbox.setAttribute("onchange","completeTodoAJAX("+id+")");
        complete_checkbox.setAttribute("class","check_active");
        todo_element.appendChild(complete_checkbox);
        todo_element.innerHTML += todo_object.title;

        var delete_button = document.createElement("button");
        delete_button.innerText = "X";
        delete_button.setAttribute("class","btn btn-primary");
        delete_button.setAttribute("onclick", "deleteTodoAJAX("+id+")");
        delete_button.setAttribute("class", "breathHorizontal delete_button");
        todo_element.appendChild(delete_button);
    }

    if (todo_object.status == "COMPLETE"){
        var active_checkbox = document.createElement("input");
        active_checkbox.type = "checkbox";
        active_checkbox.setAttribute("onchange","activateTodoAJAX("+id+")");
        active_checkbox.setAttribute("checked","checked");
        active_checkbox.setAttribute("class","regular-checkbox");
        todo_element.appendChild(active_checkbox);

        var completed_text = document.createElement("div");
        completed_text.innerHTML=todo_object.title;
        completed_text.setAttribute("class", "completed-text");

        // todo_element.innerHTML += todo_object.title;

        var delete_button = document.createElement("button");
        delete_button.innerText = "X";
        delete_button.setAttribute("class","btn btn-primary");
        delete_button.setAttribute("onclick", "deleteTodoAJAX("+id+")");
        delete_button.setAttribute("class", "breathHorizontal delete_button");
        completed_text.appendChild(delete_button)
        todo_element.appendChild(completed_text);
        // todo_element.appendChild(delete_button);
    }

    if (todo_object.status == "DELETED"){
        todo_element.innerHTML += todo_object.title;
    }

    return todo_element;
}

function getTodosAJAX(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos", true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                addTodoElements(xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}

function addTodoAJAX(){

    var title= document.getElementById(NEW_TODO_INPUT_ID).value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var data = "todo_title=" + encodeURI(title);

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addTodoElements(xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

function hideCompletedToDoAJAX(){
    var elem = document.getElementById(TODOS_LIST_ID_COMPLETED);
    if(elem.style.display=='none'){
        elem.style.display = 'block';
    }
    else{
        elem.style.display = 'none';
    }
}

function hideDeletedToDoAJAX(){
    var elem = document.getElementById(TODOS_LIST_ID_DELETED);
    if(elem.style.display=='none'){
        elem.style.display = 'block';
    }
    else{
        elem.style.display = 'none';
    }
}

function completeTodoAJAX(id){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=COMPLETE";

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addTodoElements(xhr.responseText);
            }
            else{
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

function activateTodoAJAX(id){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=ACTIVE";

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addTodoElements(xhr.responseText);
            }
            else{
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

function deleteTodoAJAX(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addTodoElements(xhr.responseText);
            }
            else{
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}