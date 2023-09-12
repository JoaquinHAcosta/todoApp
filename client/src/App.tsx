import React from 'react'
import { Todos } from './components/Todos'
import { type TodoId, type Todo as TodoType } from './types.d'

const mockTodos = [
  {
    id: '1',
    title: 'Rezar',
    completed: false
  },
  {
    id: '2',
    title: 'Dar las gracias al señor',
    completed: false
  },
  {
    id: '3',
    title: 'Arrepentirme de mis pecados',
    completed: false
  }
]

const App: React.FC = () => {
  const [ todos, setTodos ] = React.useState(mockTodos)

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = (
    { id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
      const newTodos = todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed
          }
        }
        return todo
      })

      setTodos(newTodos)
  }

  return (
    <div className='todoapp'>
      <h1>todo mvc</h1>
      <Todos
        todos={todos}
        onRemoveTodo={handleRemove}
        onToggleCompleteTodo={handleCompleted}
      />
    </div>
  )
}

export default App
