import React from 'react'
import { Todos } from './components/Todos'
import { type FilterValue, type TodoId, type Todo as TodoType } from './types.d'
import { TODO_FILTERS } from './const'
import { Footer } from './components/Footer'

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
  const [ filterSelected, setFilterSelected ] = React.useState<FilterValue>(TODO_FILTERS.ALL)

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

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  return (
    <div className='todoapp'>
      <h1>ToDo MVC</h1>
      <Todos
        todos={filteredTodos}
        onRemoveTodo={handleRemove}
        onToggleCompleteTodo={handleCompleted}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
