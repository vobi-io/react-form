import { useReducer } from 'react'
import initialState from './initial-state'
import validators from './validators'
import validate from './validate'
import formReducer from './reducer'

function useForm({
  submitHandler = () => {},
  initialValues = {},
  validations = {},
  validationReducer = null,
}) {
  const [state, dispatch] = useReducer(formReducer, {
    ...initialState,
    values: initialValues,
  })

  const setValue = value => {
    dispatch({
      type: 'newValue',
      payload: {
        value,
        validations,
      },
    })
  }

  const setValues = values => {
    dispatch({
      type: 'newValues',
      payload: {
        values,
        validations,
      },
    })
  }

  const getFirstError = key => {
    const fieldErrs = state.errors[key]
    return Array.isArray(fieldErrs) ? fieldErrs[0] : undefined
  }

  const setErrors = errors =>
    dispatch({ type: 'setErrors', payload: errors })

  const setError = error =>
    dispatch({ type: 'setError', payload: error })

  const setValid = isValid =>
    dispatch({ type: 'setValid', payload: isValid })

  const setSubmitting = submitting =>
    dispatch({ type: 'setSubmitting', payload: submitting })

  const setSubmitted = submitted =>
    dispatch({ type: 'setSubmitted', payload: submitted })

  const resetForm = initials =>
    dispatch({ type: 'resetForm', payload: initials })

  const evaluateErrors = ({ newErrors, unsetErrors }) =>
    dispatch({ type: 'evaluateErrors', payload: { newErrors, unsetErrors } })

  const submit = async e => {
    if (e) {
      e.preventDefault()
    }

    setSubmitting(true)

    if (!state.valid) {
      setSubmitting(false)
      setSubmitted(true)
      return
    }

    const { errors, valid } = validate(state.values, state.errors, validations, validators)

    if (!valid) {
      setSubmitting(false)
      setErrors(errors)
      setValid(false)
      setSubmitted(true)
      return
    }

    if (validationReducer) {
      const { newErrors, unsetErrors } = validationReducer({ values: state.values })
      if (newErrors && Object.keys(newErrors).length > 0) {
        evaluateErrors({ newErrors, unsetErrors })
        setSubmitting(false)
        setSubmitted(true)
        return
      }
    }

    await submitHandler({
      values: state.values,
      errors: state.errors,
      resetForm: () => {
        resetForm(initialValues)
      },
    })

    // resetForm(initialValues)
    setSubmitting(false)
    setSubmitted(true)
  }

  const displayErrors = name =>
    state.errors[name]
      ? state.errors[name][0]
      : null

  return {
    setValue,
    setValues,
    getFirstError,
    setErrors,
    setError,
    errors: state.errors,
    valid: state.valid,
    values: state.values,
    submitting: state.submitting,
    submit,
    submitted: state.submitted,
    displayErrors,
  }
}

export default useForm
