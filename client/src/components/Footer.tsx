import { type FilterValue } from '../types'
import { Filters } from './Filters'

interface Props {
    activeCount: number
    completedCount: number
    onClearCompleted: () => void
    filterSelected: FilterValue
    handleFilterChange: (filter: FilterValue) => void
}

export const Footer: React.FC<Props> = ({
    activeCount,
    completedCount,
    filterSelected,
    handleFilterChange,
    onClearCompleted
}) => {
    const singleActiveCount = activeCount === 1
    const activeTodoWord = singleActiveCount ? 'task' : 'tasks'
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeCount}</strong> pending {activeTodoWord}.
            </span>

            <Filters
                filterSelected={filterSelected}
                onFilterChange={ handleFilterChange }
            />

            {
                completedCount > 0 && (
                    <button
                        className='clear-completed'
                        onClick={onClearCompleted}
                    >
                        Clear completed
                    </button>
                )
            }
        </footer>
    )
}
