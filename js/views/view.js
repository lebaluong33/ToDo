
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

const mainApp = () => {
  //init new list
  const newList = new TodoList();
  //add date
  date.innerHTML = nowDate();
  //get data, add to list
  input.addEventListener("keyup", (event) => {
    onAddTodo(event, input, newList, isClearCompleted,list);
  });

  list.addEventListener("click", (event) => {
    let element = event.target;
    if (element.attributes.id) {
      const elementJob = element.attributes.id.value;
      switch (elementJob) {
        case "check-complete":
          {
            onCheckComplete(element, newList);
            break;
          }
        case "delete-todo":
          {
            removeToDo(element, newList);
            break;
          }
        default: break;
      }
    }
  });
  //listen categories event 
  all.addEventListener("click", () => {
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
    if (!categories.actived) {
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
    if (!categories.completed) {
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
mainApp();