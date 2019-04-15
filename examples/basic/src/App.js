import React from 'react'
import { useForm } from '@vobi/react-form'

const simulateApiCall = async (timeout = 1500) => {
  await new Promise(resolve => setTimeout(resolve, timeout));
}

const errStyles = {
  color: 'red'
}

const App = () => {
  const {
    values,
    setValue,
    submit,
    valid,
    submitted,
    submitting,
    getFirstError,
  } = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validations: {
      firstName: ['required'],
      lastName: ['required'],
      email: ['required', 'email']
    },
    submitHandler: async ({ values, resetForm }) => {
      console.log('values', values)
      console.log('submitting...')
      
      await simulateApiCall(1500)
      
      resetForm()
      console.log('submitted!')
    }
  })

  return (
    <div>
      <form onSubmit={submit}>
        <label>First name</label>
        <input
          value={values.firstName}
          onChange={e => {
            setValue({ firstName: e.target.value })
          }}
        />
        {submitted && getFirstError('firstName') && <div style={errStyles}>{getFirstError('firstName')}</div>}
        <br /><br />
        <label>Last name</label>
        <input
          value={values.lastName}
          onChange={e => {
            setValue({ lastName: e.target.value })
          }}
        />
        {submitted && getFirstError('lastName') && <div style={errStyles}>{getFirstError('lastName')}</div>}
        <br /><br />
        <label>Email</label>
        <input
          value={values.email}
          onChange={e => {
            setValue({ email: e.target.value })
          }}
        />
        {submitted && getFirstError('email') && <div style={errStyles}>{getFirstError('email')}</div>}
        <br /><br />
        <button
          disabled={submitting || (submitted && !valid)}
          type="submit"
        >
          {submitting ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}

export default App
