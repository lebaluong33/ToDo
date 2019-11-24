const enterKey = 13;
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";

const nowDate = () => {
  const options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
  const today = new Date();
  return today.toLocaleDateString("en-US", options);
};

const onAddTodo = (event, input, newList, isClearCompleted) => {
  if (event.keyCode === enterKey) {
    const todo = input.value;
    const id = new Date().valueOf();
    if (todo) {
      newList.addTodo(id,todo, false);
      const finish = isCompleted ? check : uncheck;
      const textDecoration = isCompleted ? lineThrough : "";
      const newText = `
              <li class="item-container flex-column" myId="${id}">
                <div class="item flex-row" id="view">  
                  <i class="far ${finish} icon-circle" id="check-complete" myId="${id}"></i>
                  <p class="${textDecoration} text" disabled myId="${id}">${text}</p>
                  <i class="fas fa-trash-alt delete icon-trash" id="delete-todo" myId="${id}"></i>
                </div>
                <input type="text" class="change-text display-none" id="${id}" value="${text}">
              </li> ` ;
      const position = "beforeend";
      list.insertAdjacentHTML(position, newText);
      
      isClearCompleted.classList.remove("display-none");
      showItemLeft(newList.listTodo.length);
      input.value = "";
    }
  }
};

const removeToDo = (element, newList) => {

  showItemLeft(list.length);
  refreshList();
  // let categoryStatus = Object.keys(categories).find(key => categories[key] === true);
  // render(categoryStatus);
};

const onCheckComplete = (element = {}, newList = {}) => {
  console.log(element);
  newList.completeToDo(element,newList.listTodo);
};

const showItemLeft = (number) => {
  if(number){
  const text = (number != 0) ? `${number} ${number > 1 ? "items" : "item"} left` : "";
  itemLeft.innerHTML = text;
  }
};