import styles from "../../styles/FormInput.module.scss"

const FormInput = ({inputRef, error, name, type}) => {
  return (
    <div className={styles.FormInput}>
        <label className={styles.FormInput__Label} htmlFor={name.toLowerCase()}>
            {name}
        </label>
        <input ref={inputRef} className={styles.FormInput__Input} type={type} id={name.toLowerCase()} placeholder={name}/>
        {error[name.toLowerCase()] && (<span className={styles.FormInput__Error}>Felaktigt</span>)}
    </div>
  )
}

export default FormInput