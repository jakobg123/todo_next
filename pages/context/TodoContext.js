import { createContext, useReducer, useEffect } from "react";
import todoReducer, { ACTIONS, initialState } from "../reducers/todoReducer"
import useLocalStorage from "../hooks/useLocalStorage"

export const TodoContext = createContext()

export const TodoProvider = ({children}) => {
    const [state, dispatch] = useReducer(todoReducer, initialState)
    const [valueInLocalStorage, setValueInLocalStorage] = useLocalStorage('todos', [])
    
    useEffect(() => {
        if(!state.length){
            const todosInLocalStorage = valueInLocalStorage()    
            if(!todosInLocalStorage || !todosInLocalStorage.length) return
            return savedTodos(todosInLocalStorage)
        }

        return setValueInLocalStorage(state)      
    }, [state])
    
    const addTodo = (todo) => {
        dispatch({
            type: ACTIONS.addTodo,
            payload: todo
        })
    }

    const completeTodo = (id) => {
        dispatch({
            type: ACTIONS.completeTodo,
            payload: id,
        })
    }

    const removeTodo = (id) => {
        dispatch({
            type: ACTIONS.removeTodo,
            payload: id,
        })
        setValueInLocalStorage([])
    }

    const savedTodos = (todos) => {
        dispatch({
            type: ACTIONS.savedTodos,
            payload: todos
        })
    }

    const value = {
        state,
        addTodo,
        completeTodo,
        removeTodo,
        savedTodos,
        valueInLocalStorage,
        setValueInLocalStorage
    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}