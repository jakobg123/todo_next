import { v4 as uuidv4 } from 'uuid';

export const ACTIONS = {
    addTodo: 'ADD_TODO',
    completeTodo: 'COMPLETE_TODO',
    localStorageTodos: 'LOCAL_STORAGE_TODOS',
    removeTodo: 'REMOVE_TODO',
    savedTodos: 'SAVED_TODOS'
}

export const initialState = [
]

export default function (state, action){
    if(action.type === ACTIONS.addTodo){
        return [
            {
                text : action.payload, 
                completed: false,
                id: uuidv4(),
            }, 
            ...state
        ]
    }

    if(action.type === ACTIONS.localStorageTodos){
        return [...action.payload]
    }

    if(action.type === ACTIONS.completeTodo){
       return state.map(todo => {
            if(todo.id !== action.payload) return todo
            return {...todo, completed: !todo.completed}
        })
    }

    if(action.type === ACTIONS.removeTodo){
        return state.filter(todo => todo.id !== action.payload)
    }

    if(action.type === ACTIONS.savedTodos){
        return [...action.payload]
    }

    return state
}