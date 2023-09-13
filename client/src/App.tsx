import React from 'react'
import { Todos } from './components/Todos'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Copyright } from './components/Copyright'
import { useTodos } from './hooks/useTodos'

const App: React.FC = () => {
  const {
    activeCount,
    completedCount,
    filterSelected,
    handleClearCompleted,
    handleCompleted,
    handleFilterChange,
    handleRemove,
    handleSave,
    handleUpdateTitle,
    todos: filteredTodos
  } = useTodos()

  return (
    <>
      <div className='todoapp'>
        <Header saveTodo={handleSave}/>
        <Todos
          todos={filteredTodos}
          setTitle={handleUpdateTitle}
          removeTodo={handleRemove}
          setCompleted={handleCompleted}
        />
        <Footer
          activeCount={activeCount}
          completedCount={completedCount}
          filterSelected={filterSelected}
          onClearCompleted={handleClearCompleted}
          handleFilterChange={handleFilterChange}
        />
      </div>
      <Copyright/>
    </>
  )
}

export default App
