import { type TodoTitle } from '../types.d'
import React from 'react'

interface Props {
    saveTodo: ({ title }: TodoTitle) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
    const [inputValue, setInputValue] = React.useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        saveTodo({ title: inputValue })
        setInputValue('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className='new-todo'
                value={inputValue}
                onChange={(event) => { setInputValue(event.target.value) }}
                placeholder='What do you have to do?'
                autoFocus
            />
        </form>
    )
}
