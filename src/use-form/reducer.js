import initialState from './initialState'
import validators from './validators'
import validate from './validate'

const formReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'newValue': {
    const values = {
      ...state.values,
      ...action.payload.value,
    }
    const { errors, valid } = validate(
      values,
      state.errors,
      action.payload.validations,
      validators,
    )

    return {
      ...state,
      values,
      errors,
      valid,
    }
  }
  case 'newValues': {
    const values = {
      ...state.values,
      ...action.payload.values,
    }
    const { errors, valid } = validate(
      values,
      state.errors,
      action.payload.validations,
      validators,
    )

    return {
      ...state,
      values,
      errors,
      valid,
    }
  }
  case 'evaluateErrors': {
    let errors = Object.assign({}, state.errors)
    let valid = false
    if (action.payload.newErrors) {
      errors = {
        ...errors,
        ...action.payload.newErrors,
      }
    }
    if (action.payload.unsetErrors) {
      errors = action.payload.unsetErrors.reduce((errs, name) => {
        const { [name]: v, ...stateWithout } = errs
        return stateWithout
      }, errors)
    }
    if (Object.keys(errors).length > 0) {
      valid = false
    } else {
      valid = true
    }

    return {
      ...state,
      errors,
      valid,
    }
  }
  case 'setErrors':
    return {
      ...state,
      errors: action.payload,
    }
  case 'setError':
    return {
      ...state,
      errors: {
        ...state.errors,
        ...action.payload,
      },
    }
  case 'setValid':
    return {
      ...state,
      valid: action.payload,
    }
  case 'unsetErrors':
    return {
      ...state,
      errors: action.payload.reduce((errs, name) => {
        const { [name]: v, ...stateWithout } = errs
        return stateWithout
      }, state.errors),
    }
  case 'setSubmitting':
    return {
      ...state,
      submitting: action.payload,
    }
  case 'setSubmitted':
    return {
      ...state,
      submitted: action.payload,
    }
  case 'resetForm':
    return {
      ...state,
      values: action.payload,
      errors: {},
    }
  default:
    return state
  }
}

export default formReducer
