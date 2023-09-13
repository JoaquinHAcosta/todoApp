import { type TodoList } from '../types'

const API_URL = 'https://api.jsonbin.io/v3/b/6501156f8d92e126ae6b3e9b'

interface Todo {
    id: string
    title: string
    completed: boolean
    order: number
}

export const fetchTodos = async (): Promise<Todo[]> => {
    const res = await fetch(API_URL)
    if (!res.ok) {
        console.error('Error fetchig todos')
        return []
    }

    const { record: todos } = await res.json() as { record: Todo[] }
    return todos
}

export const updateTodos = async ({ todos }: { todos: TodoList }): Promise<boolean> => {
    // console.log(import.meta.env.VITE_API_BIN_KEY)
    const res = await fetch(API_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // 'X-Master-Key': import.meta.env.VITE_API_BIN_KEY
            'X-Master-Key': '$2b$10$ToXLBiqBOTX2foEmcp138OmAOE5jA25j2bK4DlewRdfcoEWfed.Q2'
        },
        body: JSON.stringify(todos)
    })

    return res.ok
}
