import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  // React Hooks List
  //   Fungsi untuk menampung data sementara,layaknya RAM dalam komputer
  const [todoList, setTodoList] = useState(
    localStorage.getItem("myTodos")
      ? JSON.parse(localStorage.getItem("myTodos"))
      : []
  );

  //   Fungsi untuk menangkap hasil ketikan user
  const inputRef = useRef();

  // Logic Add Task
  const addTask = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isCompleted: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  //   Logic Delete Task
  const deleteTask = (id) => {
    setTodoList((prvTodos) => {
      return prvTodos.filter((todo) => todo.id !== id);
    });
  };

  //   Logic Completed/Not Completed Task
  const toggleCompleted = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
    });
  };

  //   React Hook useEffect
  useEffect(() => {
    localStorage.setItem("myTodos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <>
      <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
        {/* Title */}
        <div className="flex items-center mt-7 gap-2">
          <img src={todo_icon} alt="icon todo list" className="w-8" />
          <h1 className="text-3xl font-semibold ">TODO List - Activities</h1>
        </div>
        {/* Input Text + Button */}
        <div className="flex items-center my-7 rounded-full gap-1">
          <input
            type="text"
            placeholder="Tambah Kegiatan"
            class="input input-bordered w-full max-w-xs"
            ref={inputRef}
          />
          <button class="btn btn-active btn-primary" onClick={addTask}>
            Tambahkan
          </button>
        </div>
        {/* Todo List/Daftar Kegiatan */}
        <div>
          {todoList.map((item, index) => {
            return (
              <TodoItems
                key={index}
                text={item.text}
                id={item.id}
                isCompleted={item.isCompleted}
                deleteTask={deleteTask}
                toggleCompleted={toggleCompleted}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todo;
