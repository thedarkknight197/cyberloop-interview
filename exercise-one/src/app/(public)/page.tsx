'use client'
import {AddTodo} from "@/app/(public)/add-todo";
import {removeTodo, todosAtom, toggleTodo} from "@/store/todo";
import { useAtom } from "jotai";

export default function Home() {
    const [todos] = useAtom(todosAtom)

    return (
      <div className={"container mx-auto"}>
          <div className={"flex flex-row justify-between items-center"}>
              <h1 className={"text-2xl font-bold my-4"}>Todo List App</h1>
              {/*<Button>Add Todo</Button>*/}
              <AddTodo />
          </div>
          <hr />
          <ul className={"space-y-2 mt-4"}>
              {todos.map((todo) => (
                  <li
                      key={todo.id}
                      className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 shadow-sm hover:bg-gray-50"
                  >
                      <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span
                          className={`flex-1 ${
                              todo.completed ? "line-through text-gray-400" : "text-gray-800"
                          }`}
                      >
                          {todo.text}
                      </span>
                      <button
                          onClick={() => removeTodo(todo.id)}
                          className="ml-2 rounded-md bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                          Remove
                      </button>
                  </li>
              ))}
          </ul>
      </div>
  );
}
