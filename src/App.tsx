import { ChangeEvent, useRef, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import List from "./components/List";
import Alert from "./components/Alert";
import Modal from "./components/Modal";

let idCounter = 0;
function App() {
  const [inputValue, setInputValue] = useState("");

  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>();

  const [showCompletedTodo, setShowCompletedTodo] = useState<
    { id: number; text: string; readOnly: boolean }[]
  >([]);

  const [showModal, setShowModal] = useState(false);

  const [todoVisibility, setTodoVisibility] = useState<
    { id: number; text: string; readOnly: boolean }[]
  >([]);

  const [show, setShow] = useState(false);

  const refs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const handleEdit = (id: number) => {
    setTodoVisibility(
      todoVisibility.map((todo) =>
        todo.id === id ? { ...todo, readOnly: !todo.readOnly } : todo
      )
    );

    setTimeout(() => {
      refs.current[id]?.focus();
    }, 0);
  };

  const handleClickOutside = (id: number) => {
    setTimeout(() => {
      setTodoVisibility(
        todoVisibility.map((todo) =>
          todo.id === id ? { ...todo, readOnly: true } : todo
        )
      );
    }, 100);
  };

  const handleDelete = (id: number) => {
    setPendingDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (pendingDeleteId !== null) {
      setTodoVisibility(
        todoVisibility.filter((item) => item.id !== pendingDeleteId)
      );
      setShowCompletedTodo(
        showCompletedTodo.filter((t) => t.id !== pendingDeleteId)
      );

      setPendingDeleteId(null);
      setShowModal(false);
    }
  };

  const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleAppendTodo();
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCloseAlert = () => {
    setShow(false);
    inputRef.current?.focus();
  };

  const handleAppendTodo = () => {
    if (inputRef.current?.value.trim() === "") {
      setShow(true);
      inputRef.current?.blur();
      return;
    } else {
      const newTodo = {
        id: idCounter++,
        text: inputValue,
        readOnly: true,
        completed: false,
      };

      setTodoVisibility([...todoVisibility, newTodo]);
      setInputValue("");
    }
  };

  const handleCompletedTodo = (id: number) => {
    const completed = todoVisibility.find((element) => element.id === id);
    if (completed) {
      setTodoVisibility(todoVisibility.filter((element) => element.id !== id));
      setShowCompletedTodo([...showCompletedTodo, completed]);
    }
  };

  const handleUndoTodo = (id: number) => {
    const todo = showCompletedTodo.find((t) => t.id === id);
    if (todo) {
      setShowCompletedTodo(showCompletedTodo.filter((t) => t.id !== id));
      setTodoVisibility([...todoVisibility, todo]);
    }
  };

  return (
    <div>
      {show && (
        <Alert type="info" closable onClose={handleCloseAlert}>
          Please Enter a Todo!
        </Alert>
      )}
      {showModal && (
        <>
          <Modal
            body="Are you sure you want to delete?"
            yesText="yes"
            noText="no"
            onNo={() => {
              setShowModal(false);
            }}
            onYes={confirmDelete}
          ></Modal>
        </>
      )}
      <div style={{ pointerEvents: show ? "none" : "auto" }}>
        <p></p>
        <h1 className="title">TODO LIST</h1>
        <div className="input-addButton">
          <Input
            type="text"
            placeholder="Enter a Task"
            value={inputValue}
            onChange={handleInputValue}
            className="typeTodo"
            onKeyDown={handleOnKeyDown}
            mainInputRef={inputRef}
          />
          <Button variant="add" onClick={handleAppendTodo}>
            add
          </Button>
        </div>
        <div className="todo-Container">
          <div className="pending-todos">
            {todoVisibility.length >= 1 ? (
              <h4 style={{ color: "black" }}>
                Pending Todos ({todoVisibility.length})
              </h4>
            ) : null}
            {todoVisibility.map((todo) => (
              <div key={todo.id} className="pendingTodo">
                {todo.readOnly ? (
                  <List
                    value={todo.text}
                    readOnly={todo.readOnly}
                    className="addedTodo"
                  />
                ) : (
                  <List
                    type="text"
                    value={todo.text}
                    className="addedTodo"
                    inputRef={(el) => (refs.current[todo.id] = el)}
                    onChange={(e) => {
                      setTodoVisibility(
                        todoVisibility.map((t) =>
                          t.id === todo.id ? { ...t, text: e.target.value } : t
                        )
                      );
                    }}
                    onBlur={() => handleClickOutside(todo.id)}
                  />
                )}
                <div className="delete-edit-completeBtn">
                  <Button
                    variant="delete"
                    onClick={() => handleDelete(todo.id)}
                  >
                    delete
                  </Button>
                  <Button variant="edit" onClick={() => handleEdit(todo.id)}>
                    {todo.readOnly ? "Edit" : "Save"}
                  </Button>
                  <Button
                    variant="complete"
                    onClick={() => handleCompletedTodo(todo.id)}
                  >
                    complete
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="completed-todos">
            {showCompletedTodo.length >= 1 ? (
              <h4 style={{ color: "black" }}>
                Completed Todos ({showCompletedTodo.length})
              </h4>
            ) : null}
            {showCompletedTodo.map((todo) => (
              <div key={todo.id} className="completedTodo">
                <List
                  value={todo.text}
                  readOnly={todo.readOnly}
                  className="completed-style"
                />

                <div className="delete-edit-completeBtn">
                  <Button
                    variant="delete"
                    onClick={() => handleDelete(todo.id)}
                  >
                    delete
                  </Button>
                  <Button variant="edit" onClick={() => handleEdit(todo.id)}>
                    {todo.readOnly ? "Edit" : "Save"}
                  </Button>
                  <Button
                    variant="complete"
                    onClick={() => handleUndoTodo(todo.id)}
                  >
                    Undo
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
