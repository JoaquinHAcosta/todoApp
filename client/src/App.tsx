import React from 'react'
import { Todos } from './components/todos'

const mockTodos = [
  {
    id: '1',
    title: 'todo 1',
    completed: false
  },
  {
    id: '23',
    title: 'todo 2',
    completed: false
  },
  {
    id: '3',
    title: 'todo 3',
    completed: false
  }
]

const App: React.FC = () => {
  const [ todos, setTodos ] = React.useState(mockTodos)
  return (
    <>
      <h1>todo mvc</h1>
      <Todos todos={todos}/>
    </>
  )
}

export default App
