import {useRef, useReducer, useState, useEffect} from 'react'
import FormInput from './FormInput'
import clsx from "clsx"

import styles from "../../styles/Form.module.scss"

const ACTIONS = {
    saveValues: 'SAVE_VALUES',
}
// [styles.Todo__ListElementWrapper]: true,
//                 [styles.Todo__ListElementWrapper__Checked]: todo.completed

const formReducer = (state, action) => {
    if(action.type === ACTIONS.saveValues){
        console.log("🚀 ~ file: Form.jsx:11 ~ formReducer ~ action", action)
        // debugger;
        let eachValueInOwnObject = []
        for(const key in action.payload){
            eachValueInOwnObject = [...eachValueInOwnObject, {[key]: action.payload[key]}]
        }

        return {...state, ...action.payload}
    }


    return [state]
}

const useSetForm = ({}) => {
    const [state, dispatch] = useReducer(formReducer, {})
    const [errors, setErrors] = useState({})

    const setFormValues = (values = {}) => {
        setErrors({})
        let faultyFields = {}
        for(const key in values){
            const result =  validateField(key, values[key])
            if(!result){
                faultyFields = {...faultyFields, [key]: true}
            }
        }
        console.log("🚀 ~ file: Form.jsx:34 ~ setFormValues ~ faultyFields", faultyFields)
        
        if(!!Object.keys(faultyFields).length) return setErrors(faultyFields)
        
        console.log("🚀 ~ file: Form.jsx:19 ~ setFormValues ~ values", values)
        dispatch({
            type: ACTIONS.saveValues,
            payload: values,
        })
            
    }

    const validateField = (key, value) => {
        if(value.length < 2) {
            return false
            // console.log("ja det skiter sig", key)
            // // debugger;
            // return setError(() => [...error, key])
        }
        return true
        // if(key === 'name'){
        //     if(value.length < 2) return setError([...error, key])
        // }

        // if(key === 'email'){
            
        // }

        // if(key === 'password'){
            
        // }
    }

    return [errors, setFormValues, state]
}


const Form = () => {

    const [error, setFormValues, state] = useSetForm({})
    const [step, setStep] = useState(1)
    const [enter, setEnter] = useState(0)
    const [leave, setLeave] = useState(0)
    const [hideSubmit, setHideSubmit] = useState(true)
    
    const slideFormAndChangeStep = (currentStep) => {
        setHideSubmit(() => true)
        setLeave(currentStep)
        const nextStep = currentStep + 1
        setTimeout(() => {
            setStep(() => nextStep)
            setTimeout(() => {
                setEnter(() => nextStep)
                // setHideSubmit(() => false)
                setTimeout(() => setHideSubmit(false), 1000)
            }, 50)
        }, 400);
    }

    useEffect(() => {
        const savedFields = Object.keys(state).length
        if(!savedFields.length){
            setEnter(1)
            setTimeout(() => setHideSubmit(() => false), 200)
        }

        if(savedFields === 3) {
            slideFormAndChangeStep(1)     
        }

        if(savedFields === 6) {
            slideFormAndChangeStep(2)
        }

        if(savedFields === 8) {
            slideFormAndChangeStep(3)
        }
    }, [state])

    const handleSubmit = (e) => {
        e.preventDefault()
        let formValues = null
        if(step === 1){
            formValues = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }
        }

        if(step === 2){
            formValues = {
                address: addressRef.current.value,
                zipcode: zipRef.current.value,
                city: cityRef.current.value,
            }
        }

        if(step === 3){
            formValues = {
                phone: phoneRef.current.value,
                ssn: ssnRef.current.value,
            }
        }

        setFormValues(formValues)
    }

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const addressRef = useRef()
    const zipRef = useRef()
    const cityRef = useRef()
    const phoneRef = useRef()
    const ssnRef = useRef()

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
        {step === 1 && (
            <div className={clsx({
                [styles.Form__Group]: true,
                [styles.Form__Enter]: enter === 1,
                [styles.Form__Leave]: leave === 1,
            })}>
            <FormInput inputRef={nameRef} error={error} name={'Name'} type={'text'} />
            <FormInput inputRef={emailRef} error={error} name={'Email'} type={'email'} />
            <FormInput inputRef={passwordRef} error={error} name={'Password'} type={'password'}/>
            <div className={styles.Form__SubmitWrapper}>
                <button className={clsx({
                    [styles.Form__Submit]: true,
                    [styles.Form__Submit__Show]: !hideSubmit,
                    })} type="submit" value="Submit">Submit</button>
            </div>
            </div>
        )}
        {step === 2 && (
            <div className={clsx({
                [styles.Form__Group]: true,
                [styles.Form__Enter]: enter === 2,
                [styles.Form__Leave]: leave === 2,
            })}>
            <FormInput inputRef={addressRef} error={error} name={'Address'} type={'text'} />
            <FormInput inputRef={zipRef} error={error} name={'Zipcode'} type={'number'} />
            <FormInput inputRef={cityRef} error={error} name={'City'} type={'text'}/>
            <div className={styles.Form__SubmitWrapper}>
                <button className={clsx({
                    [styles.Form__Submit]: true,
                    [styles.Form__Submit__Show]: !hideSubmit,
                    })} type="submit" value="Submit">Submit</button>
            </div>
            </div>
        )}
        {step === 3 && (
            <div className={clsx({
                [styles.Form__Group]: true,
                [styles.Form__Enter]: enter === 3,
                [styles.Form__Leave]: leave === 3,
            })}>
            <FormInput inputRef={phoneRef} error={error} name={'Phone'} type={'number'} />
            <FormInput inputRef={ssnRef} error={error} name={'SSN'} type={'number'} />
            <div className={styles.Form__SubmitWrapper}>
                <button className={clsx({
                    [styles.Form__Submit]: true,
                    [styles.Form__Submit__Show]: !hideSubmit,
                    })} type="submit" value="Submit">Submit</button>
            </div>
            </div>
        )}
        {step === 4 
        && (
            <ul>
                {Object.entries(state).map(([key, value]) => (
                    <div>{key} : {value}</div>
                ))
                }
            </ul>
        )}
    </form>
  )
}

export default Form