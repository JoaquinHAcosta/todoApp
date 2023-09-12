import { type FilterValue} from '../types'
import { Filters } from './Filters'

interface Props {
    activeCount: number
    completedCount: number
    onClearCompleted: () => void
    filterSelected: FilterValue
    handleFilterChange: (filter: FilterValue) => void
}

export const Footer: React.FC<Props> = ({
    activeCount = 0,
    completedCount,
    filterSelected,
    handleFilterChange,
    onClearCompleted
}) => {
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeCount}</strong> tareas pendientes
            </span>

            <Filters
                filterSelected={filterSelected}
                onFilterChange={() => { handleFilterChange }}
            />
        </footer>
    )
}
