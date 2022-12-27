import {useContext} from "react"
import styles from "../../styles/TodoList.module.scss"
import Todo from "./Todo"
import { TodoContext } from "../context/TodoContext"

const TodoList = () => {
    const {state} = useContext(TodoContext)
    
    return(
        <ul className={styles.TodoList}>
            {!!state.length && state.map(todo => (
                <Todo key={todo.id} todo={todo} />
            ))}
        </ul>
    )
}

export default TodoList