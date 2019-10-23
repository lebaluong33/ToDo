const clear = document.querySelector(".clear");
const date = document.getElementById("date");
const input = document.getElementById("input");
const list = document.getElementById("list");

let listToDo = [];
let id=0;

const check = "fa-circle";
const uncheck = "fa-check-circle";
const lineThrough = "line-through";

const options = { weekday: "long", day: "numeric", month: "short", year: "numeric"};
const today = new Date();

date.innerHTML = today.toLocaleDateString("en-US",options);

const addToDo = (todo, id, done, trash) => {
  if(trash) { return; }
  const finish = done ? uncheck : check;
  const textDecoration = done ? lineThrough : "";
  const text = ` 
            <li class="item flex-row">
              <i class="far ${finish} complete icon-circle" job="complete" id="${id}"></i>
              <p class=" ${textDecoration} text">${todo}</p>
              <i class="fas fa-trash-alt delete icon-trash" job="delete" id="${id}"></i>
            </li> ` ;
  const position = "beforeend";
  list.insertAdjacentHTML(position, text);
};
document.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo, id, false, false);
      listToDo.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });
      input.value = "";
    }
    id++;
  }
});
const completeToDo = (element) => {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  listToDo[element.id].done = listToDo[element.id].done ? false : true ;
};
const removeToDo = (element) => {
  element.parentNode.parentNode.removeChild(element.parentNode);
  listToDo[element.id].trash = true;
};
list.addEventListener("click", (event) => {
  let element = event.target;
  const elementJob = element.attributes.job.value;
  if(elementJob == "complete"){
    completeToDo(element);
  }
  else {
    removeToDo(element);
  }
});
