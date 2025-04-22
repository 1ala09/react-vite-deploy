import { useState } from "react";
import Input from "./components/Input";
import "./App.css";
import Button from "./components/Button";

const App = () => {
  //state for input change
  const [inputVisibility, setInputVisibility] = useState("");

  //interface for state
  interface taskProp {
    id: number;
    text: string;
    completed: boolean;
    Disabled: boolean;
  }

  //state for list
  const [tasks, setTask] = useState<taskProp[]>([]);

  //add a todo
  const handleAddTodo = () => {
    if (inputVisibility.trim() !== "") {
      const newTasks = {
        id: Date.now() /*gives each object its own unique id but with date.now() is literarily 
        a clock timestamp,this displays miliseconds right under the hood, and so each array on "add" 
        takes its own ms, which cant be reset*/,

        text: inputVisibility,
        completed: false,
        Disabled: true,
      };
      setTask([...tasks, newTasks]);
      setInputVisibility("");
    }
  };

  //enter a todo
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVisibility(event.target.value);
  };

  //separating pending todo
  const pendingTodo = tasks.filter((task) => {
    if (task.completed === false) {
      return true;
    } else {
      return false;
    }
  });

  //separating completed todo
  const completedTodo = tasks.filter((task) => {
    if (task.completed === true) {
      return true;
    } else {
      return false;
    }
  });

  //function for toggling completed todo
  const toggleCompleted = (index: number) => {
    const updatedTask = tasks.map((task) =>
      task.id == index ? { ...task, completed: !task.completed } : task
    );
    setTask(updatedTask);
  };

  //function for toggling edited todo
  const toggleEdit = (index: number) => {
    const updatedTask = tasks.map((task) =>
      task.id === index ? { ...task, Disabled: !task.Disabled } : task
    );
    setTask(updatedTask);
  };

  //deleting todo
  const handleDelete = (index: number) => {
    const updatedTask = tasks.filter((task) => task.id !== index);
    setTask(updatedTask);
  };

  //making added todo editable onchange
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedTask = tasks.map((task) =>
      task.id === index ? { ...task, text: e.target.value } : task
    );
    setTask(updatedTask);
  };
  return (
    <>
      <h1 className="title">To-do-List</h1>
      <span className="to-do-list">
        <Input
          type="text"
          placeholder="Enter a Task..."
          className="todoInput"
          disabled={false}
          value={inputVisibility}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTodo();
            }
          }}
        />
        <Button
          onClick={handleAddTodo}
          variant="default"
          size="medium"
          type="button"
          className="add-btn"
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
        >
          add
        </Button>
      </span>

      {pendingTodo.length > 0 ? <h2>Pending {pendingTodo.length}</h2> : null}
      <ul>
        {pendingTodo.map((todo) => (
          <li key={todo.id} className="added-todo-container1">
            <span className="added-todo">
              <Input
                value={todo.text}
                type="text"
                onChange={(e) => handleEditChange(e, todo.id)}
                lefticon={
                  <Input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleCompleted(todo.id)}
                  />
                }
                disabled={todo.Disabled}
              />

              <Button
                onClick={() => handleDelete(todo.id)}
                variant="destructive"
                size="medium"
                type="button"
              >
                delete
              </Button>
              <Button
                onClick={() => toggleEdit(todo.id)}
                variant="secondary"
                size="medium"
                type="button"
              >
                {todo.Disabled ? "edit" : "save"}
              </Button>
            </span>
          </li>
        ))}
      </ul>

      {completedTodo.length > 0 ? (
        <h2>completed {completedTodo.length}</h2>
      ) : null}
      {completedTodo.map((todo) => (
        <li key={todo.id} className="added-todo-container1">
          <span className="added-todo">
            <Input
              value={todo.text}
              type="text"
              onChange={(e) => handleEditChange(e, todo.id)}
              lefticon={
                <Input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompleted(todo.id)}
                />
              }
              disabled={true}
              style={{ textDecoration: "line-through", color: "grey" }}
            />

            <Button
              onClick={() => handleDelete(todo.id)}
              variant="destructive"
              size="medium"
              type="button"
            >
              delete
            </Button>
            <Button variant="secondary" size="medium" type="button">
              edit
            </Button>
          </span>
        </li>
      ))}
    </>
  );
};

export default App;
