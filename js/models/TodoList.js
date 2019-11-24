
class TodoList {
  constructor(listTodo) {
    this.listTodo = listTodo || [];
  }

  addTodo = (id, text, isCompleted) => {
    let newTodo = new ToDo(id, text, isCompleted);
    this.listTodo.push(newTodo);
  };

  completeToDo = (element, list) => {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.parentNode.querySelector(".text").classList.toggle(lineThrough);
  const index = list.findIndex((item) => item.id = element.attributes.myId.value);
  list[index].isCompleted = list[index].isCompleted ? false : true;
  };
  removeToDo = (element, list) => {
  element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
  const index = list.findIndex((item) => item.id = element.attributes.myId.value);
  list.splice(index, 1);
};
}
