import isEmail from 'validator/lib/isEmail'
import isURL from 'validator/lib/isURL'

const validators = {
  required:
    val =>
      !val || (Array.isArray(val) && !val.length)
        ? 'Required'
        : null,
  email:
    val =>
      val && !isEmail(val)
        ? 'Invalid email'
        : null,
  url:
    val =>
      val && !isURL(val, { require_protocol: true, protocols: ['http', 'https'] })
        ? 'Invalid url'
        : null,
  match:
    (val, values, matchKey) =>
      val && values[matchKey] && val !== values[matchKey]
        ? 'Do not match'
        : null,
}

export default validators
