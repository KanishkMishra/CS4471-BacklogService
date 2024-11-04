// Create
function createBacklogTask(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

var taskTitle = "BACKLOG TASK";
var description = "We need to do stuff";
var storyPoints = 1;

const fragment = create(`<div class="task"><h2>${taskTitle}</h2><p>Description: ${description}</p><q1>Story Points: ${storyPoints}</q1></div>`);

document.body.insertBefore(fragment, document.getElementsByClassName('List')[0]);