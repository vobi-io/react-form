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
}

export default validators
