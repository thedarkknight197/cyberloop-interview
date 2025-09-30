import {atom, createStore} from 'jotai';
import {z} from "zod";

export const store = createStore();

export type Todo = {
    id: number,
    text: string,
    completed: boolean
}

export const todoSchema = z.object({
    name: z.string().min(1, "Il nome è obbligatorio"),
})

export const todosAtom = atom<Todo[]>([]);

todosAtom.onMount = (set) => {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem("todos")
        if (saved) {
            try {
                set(JSON.parse(saved))
            } catch (error) {
                console.error(new Error(`Not saved! ${error}`))
            }
        }
    }
}

const syncToLocalStorage = (get: () => Todo[]) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("todos", JSON.stringify(get()))
    }
}

export const addTodo = (text: string) => {
    store.set(todosAtom, (prev) => {
        const updated = [...prev, { id: Date.now(), text, completed: false }]
        syncToLocalStorage(() => updated)
        return updated
    })
}

export const toggleTodo = (id: number) => {
    store.set(todosAtom, (prev) => {
        const updated = prev.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
        syncToLocalStorage(() => updated)
        return updated
    })
}

export const removeTodo = (id: number) => {
    store.set(todosAtom, (prev) => {
        const updated = prev.filter((todo) => todo.id !== id)
        syncToLocalStorage(() => updated)
        return updated
    })
}
