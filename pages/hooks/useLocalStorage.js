export default function (key, value) {
    // const [valInLS, setValInLS] = useState('')

    const getValue = () => {
        const val = localStorage.getItem(key)
        
        if(!val) return

        return JSON.parse(val)
    }

    const setValue = (value) => {
        localStorage?.setItem(key, JSON.stringify(value))
    }
    
    return [getValue, setValue]
}