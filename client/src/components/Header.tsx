import { CreateTodo } from './CreateTodo'

interface Props {
    saveTodo: (title: string) => void
}

export const Header: React.FC<Props> = ({ saveTodo }) => {
    return (
        <header className="header">
            <h1>todo<img
            style={{ width: '60px', height: 'auto' }}
            src="https://camo.githubusercontent.com/62ff93d7e4956bece0d03f14003ccd7b10e469c6588a605d2d6d5bea84db402c/68747470733a2f2f636c6f756473706f696e742e78797a2f77702d636f6e74656e742f75706c6f6164732f323032302f30322f547970655363726970742d69732d612d6c616e67756167652d6f6e2d746f702d6f662d4a6176615363726970742e2e706e67" alt="" />
            </h1>

            <CreateTodo saveTodo={saveTodo}/>
        </header>
    )
}
