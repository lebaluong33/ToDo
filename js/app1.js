const clear = document.getElementsByClassName("clear");
const date = document.getElementById("date");
const input = document.getElementById("input");
const list = document.getElementById("list");
const changeContent = document.getElementsByClassName("text");
const selectAll = document.getElementById("select-all");
const all = document.getElementById("all");
const actived = document.getElementById("actived");
const completed = document.getElementById("completed");
const itemLeft = document.getElementById("item-left");
const isClearCompleted = document.getElementById("clear-completed");

let listToDo = [];
let id=0;
let isSelectAll = false;
let categories = {
  all: true,
  actived: false,
  completed: false
};
let toDoCompleted = 0;
const enterKey = 13;

const purpose = 
  {
    all:"all",
    actived: "actived",
    completed: "completed",
    clearCompleted: "clear-Completed"
  };
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";

const options = { weekday: "long", day: "numeric", month: "short", year: "numeric"};
const today = new Date();

const mainApp = () => {
  //add date
  date.innerHTML = today.toLocaleDateString("en-US", options);

  //get data, add to list
  input.addEventListener("keyup", (event) => {
    if (event.keyCode === enterKey) {
      const toDo = input.value;
      id = listToDo.length;
      if (toDo) {
        addToDo(toDo, id, false);
        listToDo.push({
          name: toDo,
          id: id,
          done: false
        });
        isClearCompleted.classList.remove("display-none");
        showItemLeft(listToDo.length);
        input.value = "";
      }
    }
  });

  //listen categories event 
  all.addEventListener("click", () =>{
    if (!categories.all) {
      render(purpose.all);
    }
    let choiceCategory = {
      all: true,
      actived: false,
      completed: false
    };
    categories = choiceCategory;
  });
  actived.addEventListener("click", () => {
    if(!categories.actived) {
      render(purpose.actived);
    }
    let choiceCategory = {
      all: false,
      actived: true,
      completed: false
    };
    categories = choiceCategory;
  });
  completed.addEventListener("click", () => {
    if(!categories.completed) {
      render(purpose.completed);
    }
    let choiceCategory = {
      all: false,
      actived: false,
      completed: true
    };
    categories = choiceCategory;
  });

  //clear completed
  isClearCompleted.addEventListener("click", () => {
    let categoryStatus = Object.keys(categories).find(key => categories[key] === true);
    clearCompleted();
    refreshList();
    render(categoryStatus);
  });

  //listen job event 
  list.addEventListener("click", (event) => {
    let element = event.target;
    if (element.attributes.job) {
      const elementJob = element.attributes.job.value;
      switch (elementJob) {
        case "complete":
          {
            completeToDo(element);
            break;
          }
        case "delete":
          {
            removeToDo(element);
            break;
          }
        default: break;
      }
    }
  });

  //listen change text event
  list.addEventListener("dblclick", (event) => {
    let element = event.target;
    if (element.attributes.job) {
      const elementJob = element.attributes.job.value;
      if (elementJob === "change") {
        onChangeToDo(element);
      }
    }
  });

  //select All 
  selectAll.addEventListener("click", () => {
    isSelectAll = !isSelectAll;
    renderSelectAll();
  });

}

const addToDo = (toDo, id, done) => {
  const finish = done ? check : uncheck;
  const textDecoration = done ? lineThrough : "";
  const text = `
              <li class="item-container flex-column">
                <div class="item flex-row" id="view">  
                  <i class="far ${finish} icon-circle" job="complete" id="${id}"></i>
                  <p class="${textDecoration} text" disabled job="change" id="${id}">${toDo}</p>
                  <i class="fas fa-trash-alt delete icon-trash" job="delete" id="${id}"></i>
                </div>
                <input type="text" class="change-text display-none" id="${id}" value="${toDo}">
              </li> ` ;
  const position = "beforeend";
  list.insertAdjacentHTML(position, text);
};

const completeToDo = (element = {}) => {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.parentNode.querySelector(".text").classList.toggle(lineThrough);
  listToDo[element.id].done = listToDo[element.id].done ? false : true;
};

const removeToDo = (element = {}) => {
  element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
  listToDo.splice(element.id, 1);
  showItemLeft(listToDo.length);
  refreshList();
  let categoryStatus = Object.keys(categories).find(key => categories[key] === true);
  render(categoryStatus);
};

const onChangeToDo = (element = {}) => {
  const inputText = element.parentNode.parentNode.lastElementChild;
  element.parentNode.classList.add("display-none");
  inputText.classList.remove("display-none");
  inputText.toggleAttribute("autofocus");
  inputText.addEventListener("change", () => {
      const toDo = inputText.value;
      let id = inputText.attributes.id.value;
      listToDo[id].name = toDo;
      inputText.classList.add("display-none");
      element.innerHTML = toDo;
      element.parentNode.classList.remove("display-none");
  });
};


const removeAllChild = (myNode) => {
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
};

const renderSelectAll = () => {
  removeAllChild(list);
  listToDo.map((item) => {
    addToDo(item.name, item.id, isSelectAll);
    item.done = isSelectAll;
  });
};

const render = (feature) => {
  removeAllChild(list);
  listToDo.map((item) => {
    let check;
    switch(feature){
      case purpose.actived: 
        check = !item.done;
        break;
      case purpose.completed: 
        check = item.done;
        break;
      default: 
        check = true;
        break;
    }
    if (check) addToDo(item.name, item.id, item.done);
  });
  completedCounter();
  let status = (feature === purpose.all || feature === purpose.clearCompleted) ? 
  listToDo.length : 
  feature === purpose.actived ?
  listToDo.length - toDoCompleted :
  toDoCompleted;
  showItemLeft(status);
  if (listToDo.length === 0) isClearCompleted.classList.add("display-none");
};

const refreshList = () => {
  for (let i = 0; i < listToDo.length; i++) {
    listToDo[i].id = i;
  }
};

const completedCounter = () => {
  let done = listToDo.filter(toDos => toDos.done === true);
  toDoCompleted = done.length;
};

const clearCompleted = () => {
  let done = listToDo.filter(toDos => toDos.done === false);
  listToDo = done;
};

const showItemLeft = (number) => {
  const text = (number != 0) ? `${number} ${number > 1 ? "items" : "item"} left` : "";
  itemLeft.innerHTML = text;
};

mainApp();