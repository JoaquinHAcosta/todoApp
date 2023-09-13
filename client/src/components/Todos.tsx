import { type Todo as TodoType } from '../types.d'
import React from 'react'
import { Todo } from './Todo'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Props {
    todos: TodoType[]
    setCompleted: (id: string, completed: boolean) => void
    setTitle: (params: Omit<TodoType, 'completed'>) => void
    removeTodo: (id: string) => void
    // onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
}

export const Todos: React.FC<Props> = ({
    todos,
    setCompleted,
    setTitle,
    removeTodo
}) => {
    const [isEditing, setIsEditing] = React.useState('')
    const [parent] = useAutoAnimate(/* optional config */)
    return (
        <ul className="todo-list" ref={parent}>
            {
                todos?.map((todo) => (
                    <li
                        key={todo.id}
                        onDoubleClick={() => { setIsEditing(todo.id) }}
                        className={`
                            ${todo.completed ? 'completed' : ''}
                            ${isEditing === todo.id ? 'editing' : ''}
                        `}>
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                            setCompleted={setCompleted}
                            setTitle={setTitle}
                            removeTodo={removeTodo}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                        />
                    </li>
                ))
            }
        </ul>
    )
}
