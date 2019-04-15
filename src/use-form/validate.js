/* eslint no-restricted-syntax: 0 */

const getKey = value => Object.keys(value)[0]
const getVal = value => Object.values(value)[0]

const validate = (values, errors, validations, validators) => {
  let newErrors = Object.assign({}, errors)
  let valid = true

  for (const key in values) {
    if (validations[key]) {
      const fieldErrs = validations[key].reduce((errs, rule) => {
        let v = null
        if (typeof rule === 'object') {
          // const key = getKey(rule)
          // const matchKey = getVal(rule)
          v = validators[getKey(rule)](values[key], values, getVal(rule))
        } else if (typeof rule === 'function') {
          v = rule(values)
        } else {
          v = validators[rule](values[key])
        }

        // const v = validators[rule](values[key])
        return v
          ? [...errs, v]
          : errs

        // if (v) {
        //   return [...errs, v]
        //   errs.push(v)
        // } else {
        //   return errs
        // }
        // return errs
      }, [])

      if (fieldErrs.length > 0) {
        newErrors = {
          ...{ [key]: fieldErrs },
          ...newErrors,
        }
      } else {
        const { [key]: v, ...stateWithout } = newErrors
        newErrors = stateWithout
      }
    }
  }

  if (Object.keys(newErrors).length > 0) {
    valid = false
  }

  return {
    errors: newErrors,
    valid,
  }
}

export default validate
