import {useContext} from 'react'
import {TodoContext} from "../context/TodoContext"
import clsx from "clsx"
import styles from "../../styles/Todo.module.scss"

const Todo = ({todo}) => {       
    const {completeTodo, removeTodo} = useContext(TodoContext)
    
  return (
    <li key={todo.id}
        className={styles.Todo}
        >
        <span className={clsx({
                [styles.Todo__ListElementWrapper]: true,
                [styles.Todo__ListElementWrapper__Checked]: todo.completed
            })}  
            onClick={() => completeTodo(todo.id)}
        >
            <p>{todo.text}</p>
            <input type="checkbox" name="complete" id="" readOnly checked={todo.completed}/>
        </span>
        <span className={styles.Todo__RemoveTodo}>
            <input type="checkbox" name="remove" id="" onChange={() => removeTodo(todo.id)}/>
        </span>
    </li>
  )
}

export default Todo