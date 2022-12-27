import { useRef, useContext } from "react"
import styles from "../../styles/CreateTodo.module.scss"
import { TodoContext } from "../context/TodoContext"

const CreateTodo = () => {
    const {addTodo} = useContext(TodoContext)
    const inputRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        addTodo(inputRef.current.value)
        inputRef.current.value = ''
    }

    return (
        <form className={styles.CreateTodo} action="" onSubmit={handleSubmit}>
            <label htmlFor="todo">Skapa todo</label>
            <input ref={inputRef} type="text" />
        </form>
    )
}

export default CreateTodo
