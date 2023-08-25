import { Link, useNavigate } from 'react-router-dom'
import { FaRegTimesCircle } from 'react-icons/fa'
import { IoMdArrowRoundBack } from 'react-icons/io'
import styles from './Form.module.scss'
import { capitalize, getClassNames } from '../../utils'
import { Input, SmallLoader } from '../UI'
import { ROUTES } from '../../constants'
import { UseInput } from '../../types'

const CONFIG = {
  login: {
    title: 'Sign In',
    linkTo: ROUTES.register,
    linkToLabelP: 'New Customer?',
    linkToLabelSpan: 'Register',
    buttonLabel: 'SIGN IN',
  },
  register: {
    title: 'Register',
    linkTo: ROUTES.login,
    linkToLabelP: 'Alredy have an account?',
    linkToLabelSpan: 'Login',
    buttonLabel: 'REGISTER',
  },
  shipping: {
    title: 'Shipping',
    linkTo: null,
    linkToLabelP: null,
    linkToLabelSpan: null,
    buttonLabel: 'CONTINUE',
  },
}

type FormInputs = {
  name: string
  type: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  value: string
  error: string
  label: string
}

type FormProps = {
  errorMessage?: string
  formValues: UseInput[]
  formInputs: FormInputs[]
  isLoading?: boolean
  redirect?: string
  handleSubmit: () => void
  variant?: 'login' | 'register' | 'shipping'
  className?: string
}

function Form({
  errorMessage = '',
  formValues,
  formInputs,
  isLoading = false,
  redirect = '/',
  handleSubmit,
  variant = 'login',
  className = '',
}: FormProps) {
  const navigate = useNavigate()

  function checkValidation(values: UseInput) {
    if (values.isValid) {
      return true
    }
    return false
  }

  const isFormValid = formValues.every(checkValidation)
  const isAuthForm = variant === 'login' || variant === 'register'

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isFormValid) {
      formValues.forEach((formValue: UseInput) => {
        formValue.onBlur()
      })
      return
    }

    handleSubmit()
  }

  return (
    <>
      {isAuthForm && (
        <div
          className={getClassNames([styles.toast, errorMessage && styles.show])}
        >
          <FaRegTimesCircle />
          {`Error: ${capitalize(errorMessage)}`}
        </div>
      )}
      <div className={getClassNames([styles.root, className])}>
        {isAuthForm && (
          <button
            type='button'
            className={styles.goBackButton}
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack />
            Go Back
          </button>
        )}
        <div className={styles.formContainer}>
          <h1>{CONFIG[variant].title}</h1>
          <form onSubmit={onSubmit}>
            {formInputs.map((formInputProps) => (
              <Input key={formInputProps.name} inputProps={formInputProps} />
            ))}
            <div className={styles.buttonsContainer}>
              {variant === 'shipping' && <Link to={ROUTES.cart}>GO BACK</Link>}
              <button
                type='submit'
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? <SmallLoader /> : CONFIG[variant].buttonLabel}
              </button>
            </div>
            {isAuthForm && (
              <p className={styles.linkTo}>
                {CONFIG[variant].linkToLabelP}{' '}
                <span>
                  <Link to={`${CONFIG[variant].linkTo}?redirect=${redirect}`}>
                    {CONFIG[variant].linkToLabelSpan}
                  </Link>
                </span>
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default Form
