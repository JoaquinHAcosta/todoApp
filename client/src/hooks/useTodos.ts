import { TODO_FILTERS } from '../const'
import { type TodoList, type FilterValue } from '../types'
import { fetchTodos, updateTodos } from '../services/todos'
import React from 'react'

const initialState = {
    sync: false,
    todos: [],
    filterSelected: (() => {
        // read from url query params using URLSearchParams
        const params = new URLSearchParams(window.location.search)
        const filter = params.get('filter') as FilterValue | null
        if (filter === null) return TODO_FILTERS.ALL
        // check filter is valid, if not return ALL
        return Object
            .values(TODO_FILTERS)
            .includes(filter)
            ? filter
            : TODO_FILTERS.ALL
    })()
}

type Action =
    | { type: 'INIT_TODOS', payload: { todos: TodoList } }
    | { type: 'CLEAR_COMPLETED' }
    | { type: 'COMPLETED', payload: { id: string, completed: boolean } }
    | { type: 'FILTER_CHANGE', payload: { filter: FilterValue } }
    | { type: 'REMOVE', payload: { id: string } }
    | { type: 'SAVE', payload: { title: string } }
    | { type: 'UPDATE_TITLE', payload: { id: string, title: string } }

interface State {
    sync: boolean
    todos: TodoList
    filterSelected: FilterValue
}

const reducer = (state: State, action: Action): State => {
    const { type } = action
    switch (type) {
        case 'INIT_TODOS':
            const { todos } = action.payload
            return {
                ...state,
                sync: false,
                todos
            }
        case 'CLEAR_COMPLETED':
            return {
                ...state,
                sync: true,
                todos: state.todos.filter((todo) => !todo.completed)
            }
        case 'COMPLETED':
            const { id, completed } = action.payload
            return {
                ...state,
                sync: true,
                todos: state.todos.map((todo) => {
                    if (todo.id === id) {
                        return {
                            ...todo,
                            completed
                        }
                    }
                return todo
                })
            }
        case 'FILTER_CHANGE':
            const { filter } = action.payload
            return {
                ...state,
                sync: true,
                filterSelected: filter
            }
        case 'REMOVE':
            const { id } = action.payload
            return {
                ...state,
                sync: true,
                todos: state.todos.filter((todo) => todo.id !== id)
            }
        case 'SAVE':
            const { title } = action.payload
            const newTodo = {
                id: crypto.randomUUID(),
                title,
                completed: false
            }

            return {
                ...state,
                sync: true,
                todos: [...state.todos, newTodo]
            }
        case 'UPDATE_TITLE':
            const { id, title } = action.payload
            return {
                ...state,
                sync: true,
                todos: state.todos.map((todo) => {
                    if (todo.id === id) {
                        return {
                            ...todo,
                            title
                        }
                    }
                    return todo
                })
            }
        default:
            return { ...state }
    }
}

export const useTodos = (): {
    activeCount: number
    completedCount: number
    todos: TodoList
    filterSelected: FilterValue
    handleClearCompleted: () => void
    handleCompleted: (id: string, completed: boolean) => void
    handleFilterchange: (filter: FilterValue) => void
    handleRemove: (id: string) => void
    handleSave: (title: string) => void
    handleUpdateTitle: (params: { id: string, title: string }) => void
} => {
    const [{ sync, todos, filterSelected }, dispatch] = React.useReducer(reducer, initialState)

    const handleCompleted = (id: string, completed: boolean): void => {
        dispatch({ type: 'COMPLETED', payload: { id, completed } })
    }

    const handleRemove = (id: string): void => {
        dispatch({ type: 'REMOVE', payload: { id } })
    }

    const handleUpdateTitle = ({ id, title }: { id: string, title: string }): void => {
        dispatch({ type: 'UPDATE_TITLE', payload: { id, title } })
    }

    const handleSave = (title: string): void => {
        dispatch({ type: 'SAVE', payload: { title } })
    }

    const handleClearCompleted = (): void => {
        dispatch({ type: 'CLEAR_COMPLETED' })
    }

    const handleFilterChange = (filter: FilterValue): void => {
        dispatch({ type: 'FILTER_CHANGE', payload: { filter } })

        const params = new URLSearchParams(window.location.search)
        params.set('filter', filter)
        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
    }

    const filteredTodos = todos.filter(todo => {
        if (filterSelected === TODO_FILTERS.ACTIVE) {
            return !todo.completed
        }
        if (filterSelected === TODO_FILTERS.COMPLETED) {
            return todo.completed
        }
        return todo
    })

    const completedCount = todos.filter((todo) => todo.completed).length
    const activeCount = todos.length - completedCount

    React.useEffect(() => {
        fetchTodos()
            .then(todos => {
                dispatch({ type: 'INIT_TODOS', payload: { todos } })
            })
            .catch(error => { console.log(error) })
    }, [])

    React.useEffect(() => {
        if (sync) {
            updateTodos({ todos }).catch(error => { console.log(error) })
        }
    }, [todos, sync])

    return {
        activeCount,
        completedCount,
        handleCompleted,
        handleRemove,
        handleUpdateTitle,
        handleSave,
        handleClearCompleted,
        handleFilterChange,
        todos: filteredTodos
    }
}
