import { useEffect, useState } from "react";
import Preloader from "./components/preloader";
import { readTodos, createTodo } from "./functions";
import { deleteTodo, updateTodo } from "./api";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({});
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    let currentTodo =
      currentId !== 0
        ? todos.find((todo) => todo._id === currentId)
        : { title: "", content: "" };

    setTodo(currentTodo);
  }, [currentId, todos]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodos();
      console.log(result);
      setTodos(result);
    };

    fetchData();
    // console.log(readTodos());
  }, [currentId]);

  useEffect(() => {
    const clearField = (e) => {
      if (e.keyCode === 27) {
        clear();
      }
    };

    window.addEventListener("keydown", clearField);
    return () => window.removeEventListener("keydown", clearField);
  }, []);

  //   window.addEventListener("keydown", close);
  //   return () => window.removeEventListener("keydown", close);
  // }, []);

  const clear = () => {
    setCurrentId(0);
    setTodo({ title: "", content: "" });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log("submit");
    if (currentId === 0) {
      const result = await createTodo(todo);
      // console.log(result);
      setTodos([...todos, result]);
      clear();
    } else {
      await updateTodo(currentId, todo);
      clear();
    }
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    const todosCopy = [...todos];
    todosCopy.filter((todo) => todo._id !== id);
    setTodos(todosCopy);
    clear();
  };

  return (
    <div className="container">
      <div className="row">
        <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">Title</i>
              <input
                id="icon_prefix"
                type="text"
                className="validate"
                value={todo.title}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              />
              <label htmlFor="icon_prefix">Title</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">mode_edit</i>
              <input
                id="icon_content"
                type="text"
                className="validate"
                value={todo.content}
                onChange={(e) => setTodo({ ...todo, content: e.target.value })}
              />
              <label htmlFor="icon_content">content</label>
            </div>
          </div>
          <div className="row right-align">
            <button className="btn-floating btn-large waves-effect waves-light darkgreen">
              <i className="material-icons">add</i>
            </button>
          </div>
        </form>
        {!todos ? (
          <Preloader />
        ) : todos.length > 0 ? (
          <ul className="collection">
            {todos.map((todo) => (
              <li
                key={todo._id}
                onClick={() => setCurrentId(todo._id)}
                className={`collection-item ${
                  todo._id === currentId ? "active" : ""
                }`}
              >
                <div>
                  <h5>{todo.title}</h5>
                  <p>
                    {todo.content}
                    <a
                      href="#!"
                      onClick={() => removeTodo(todo._id)}
                      className="secondary-content"
                    >
                      <i className="material-icons">delete</i>
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <h5>Nothing to do, Life is meaningless</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
