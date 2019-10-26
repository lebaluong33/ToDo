const clear = document.getElementsByClassName("clear");
const date = document.getElementById("date");
const input = document.getElementById("input");
const list = document.getElementById("list");
const changeContent = document.getElementsByClassName("text");
const selectAll = document.getElementById("select-all");

let listToDo = [];
let id=0;

const uncheck = "fa-circle";
const check = "fa-check-circle";
const lineThrough = "line-through";

const options = { weekday: "long", day: "numeric", month: "short", year: "numeric"};
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US",options);

const addToDo = (todo, id, done, trash) => {
  if(trash) { return; }
  const finish = done ? check : uncheck;
  const textDecoration = done ? lineThrough : "";
  const text = ` 
            <li class="item flex-row">
              <i class="far ${finish} complete icon-circle" job="complete" id="${id}"></i>
              <input class="${textDecoration} text" disabled value="${todo}" autofocus id="${id}"/>
              <i class="fas fa-trash-alt delete icon-trash" job="delete" id="${id}"></i>
            </li> ` ;
  const position = "beforeend";
  list.insertAdjacentHTML(position, text);
};
input.addEventListener("keyup", (event) => {
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
  listToDo[element.id].done = !listToDo[element.id].done;
};
const removeToDo = (element) => {
  element.parentNode.parentNode.removeChild(element.parentNode);
  listToDo[element.id].trash = true;
};
list.addEventListener("click", (event) => {
  let element = event.target;
  const elementJob = element.attributes.job.value;
  switch (elementJob){
    case "complete" :
      completeToDo(element);
      break;
    case "delete":
      removeToDo(element);
      break;
    default: break;
  }
});
list.addEventListener("dblclick", (event) => {
  let element = event.target;
  const elementJob = element.attributes.job.value;
  element.toggleAttribute("disabled");
  if(elementJob == "change") onChangeToDo(element);
});
const onChangeToDo = (element) => {
  element.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
      element.toggleAttribute("disabled");
      const toDo = element.value;
      let id = element.attributes.id.value;
      listToDo[id].name = toDo;
    }
  });
};
const onChangeClass = ( changeIconClass, finish, doing) =>{
  changeIconClass.remove(finish);
  changeIconClass.add(doing);
}; 
selectAll.addEventListener("click", () => {
  const textDecoration = lineThrough ;
  for (item of listToDo){
    item.done = true;
  }
  for (item of list.children){
    const changeIconClass = item.firstElementChild.classList;
    const hasCheck = changeIconClass.contains(check)
    hasCheck ? onChangeClass(changeIconClass, check, uncheck) : onChangeClass(changeIconClass, uncheck,check);
  }
});
