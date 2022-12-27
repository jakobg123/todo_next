import { TodoProvider } from './context/TodoContext'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <TodoProvider>
        <Component {...pageProps} />
    </TodoProvider>
    )
}
