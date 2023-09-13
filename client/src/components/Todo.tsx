import { type Todo as TodoType } from '../types.d'
import React from 'react'

interface Props extends TodoType {
    setCompleted: (id: string, completed: boolean) => void
    setTitle: (params: { id: string, title: string }) => void
    isEditing: string
    setIsEditing: (completed: string) => void
    removeTodo: (id: string) => void
    // onRemoveTodo: ({ id }: TodoId) => void
    // onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
}

export const Todo: React.FC<Props> = ({
    id,
    title,
    completed,
    setCompleted,
    setTitle,
    removeTodo,
    isEditing,
    setIsEditing
}) => {
    const [editedTitle, setEditedTitle] = React.useState(title)
    const inputEditTitle = React.useRef<HTMLInputElement>(null)

    // const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    //     onToggleCompleteTodo({
    //         id,
    //         completed: event.target.checked
    //     })
    // }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            setEditedTitle(editedTitle.trim())

            if (editedTitle !== title) {
                setTitle({ id, title: editedTitle })
            }

            if (editedTitle === '') removeTodo(id)

            setIsEditing('')
        }

        if (event.key === 'Escape') {
            setEditedTitle(title)
            setIsEditing('')
        }
    }

    React.useEffect(() => {
        inputEditTitle.current?.focus()
    }, [isEditing])

    return (
        <>
            <div className="view">
                <input
                    type="checkbox"
                    className="toggle"
                    checked={completed}
                    onChange={(e) => { setCompleted(id, e.target.checked) }}
                />
                <label>{title}</label>
                <button
                    className='destroy'
                    onClick={() => {
                        removeTodo(id)
                    }}
                />
            </div>

            <input
                className='edit'
                value={editedTitle}
                onChange={(e) => { setEditedTitle(e.target.value) }}
                onKeyDown={handleKeyDown}
                onBlur={() => { setIsEditing('') }}
                ref={inputEditTitle}
            />
        </>
    )
}
