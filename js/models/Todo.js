class ToDo{
  constructor(id,text,isCompleted) {
    this.id = id || new Date().valueOf();
    this.text = text;
    this.isCompleted = isCompleted
  }
}