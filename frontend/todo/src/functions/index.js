import * as api from "../api/index";

export const readTodos = async () => {
  try {
    const { data } = await api.readTodos();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createTodo = async (todo) => {
  try {
    console.log("createTodo at client");
    const { data } = await api.createTodo(todo);
    console.log("functions", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateTodo = async (id, todo) => {
  try {
    // console.log("createTodo at client");
    const { data } = await api.updateTodo(id, todo);
    // console.log("functions", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodo = async (id, todo) => {
  try {
    await api.deleteTodo(id);
  } catch (err) {
    console.log(err);
  }
};
