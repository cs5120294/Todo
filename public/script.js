console.log("Is Script File Loading");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODOS_LIST_ID_ACTIVE = "todos_list_div_active";
const TODOS_LIST_ID_COMPLETED = "todos_list_div_completed";
const TODOS_LIST_ID_DELETED = "todos_list_div_deleted";
const NEW_TODO_INPUT_ID = "new_todo_input";

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
        todo_element.appendChild(complete_checkbox);
        // var complete_button = document.createElement("button");
        // complete_button.innerText = "Mark as Complete";
        // complete_button.setAttribute("onclick", "completeTodoAJAX("+id+")");
        // complete_button.setAttribute("class", "breathHorizontal");
        // todo_element.appendChild(complete_button);
        todo_element.innerHTML += todo_object.title;
        var delete_button = document.createElement("button");
        delete_button.innerText = "X";
        delete_button.setAttribute("onclick", "deleteTodoAJAX("+id+")");
        delete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(delete_button);
    }

    if (todo_object.status == "COMPLETE"){
        // var active_button = document.createElement("button");
        // active_button.innerText = "Mark as Active";
        // active_button.setAttribute("onclick", "completeTodoAJAX("+id+")");
        // active_button.setAttribute("class", "breathHorizontal");
        // todo_element.appendChild(active_button);
        var active_checkbox = document.createElement("input");
        active_checkbox.type = "checkbox";
        active_checkbox.setAttribute("onchange","activateTodoAJAX("+id+")");
        active_checkbox.setAttribute("checked",true);
        todo_element.appendChild(active_checkbox);

        todo_element.innerHTML += todo_object.title;

        var delete_button = document.createElement("button");
        delete_button.innerText = "Delete";
        delete_button.setAttribute("onclick", "deleteTodoAJAX("+id+")");
        delete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(delete_button);
    }

    if (todo_object.status == "DELETED"){
        // HW : Add this functionality
        // Add Delete Buttons for ACTIVE, COMPLETE TODO ITEMS
        // add a delete button
        // HW : Write this code
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