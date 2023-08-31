import { ChangeEvent, useState } from 'react'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import styles from './Input.module.scss'
import { capitalize, getClassNames } from '../../../utils'

const { labelGroup, errorClassName } = styles

type InputProps = {
  inputProps: {
    name: string
    label: string
    error: string
    type: string
    placeholder: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur: () => void
    onFocus?: () => void
    value: string
  }
  className?: string
}

function Input({ inputProps, className = '' }: InputProps) {
  const [togglePassword, setTogglePassword] = useState<boolean>(false)
  const {
    name,
    label,
    error,
    type,
    placeholder,
    onChange,
    onBlur,
    value,
    onFocus,
  } = inputProps

  const passwordInputType = togglePassword ? 'text' : 'password'

  return (
    <div className={getClassNames([styles.root, className])}>
      <div className={labelGroup}>
        <label htmlFor={name}>{label}</label>
        {error && <span>{capitalize(error)}</span>}
      </div>
      <div className={styles.inputContainer}>
        <input
          autoComplete='off'
          name={name}
          type={type === 'password' ? passwordInputType : type}
          placeholder={placeholder}
          className={error ? errorClassName : ''}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          value={value}
        />
        {type === 'password' && (
          <button
            type='button'
            className={styles.eye}
            onClick={() => setTogglePassword(!togglePassword)}
          >
            {togglePassword ? <BsEyeSlashFill /> : <BsEyeFill />}
          </button>
        )}
      </div>
    </div>
  )
}

export default Input
