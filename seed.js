var StatusENUMS = {

    ACTIVE : "ACTIVE",
    COMPLETE : "COMPLETE",
    DELETED : "DELETED"
}

var todos = {
    1 : {title : "Understand Git", status: StatusENUMS.ACTIVE},
    2 : {title : "Install Webstorm", status: StatusENUMS.ACTIVE},
    3 : {title : "Learn CSS", status: StatusENUMS.ACTIVE},
    4 : {title : "Async JS", status: StatusENUMS.COMPLETE},
    5 : {title : "Install express", status: StatusENUMS.COMPLETE},
    6 : {title : "Understand Callbacks", status: StatusENUMS.COMPLETE},
    7 : {title : "Set alarm", status: StatusENUMS.DELETED},
    8 : {title : "Buy mi", status: StatusENUMS.DELETED},
}

var next_todo_id = 9;

module.exports = {
    StatusENUMS : StatusENUMS,
    todos : todos,
    next_todo_id : next_todo_id
}

