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
    errors,
    submitted,
    submitting,
  } = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    validations: {
      firstName: ['required'],
      lastName: ['required']
    },
    submitHandler: async ({ values, resetForm }) => {
      console.log('values', values)
      console.log('submitting...')
      
      await simulateApiCall(3000)
      
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
        {submitted && errors.firstName && <div style={errStyles}>{errors.firstName}</div>}
        <br /><br />
        <label>Last name</label>
        <input
          value={values.lastName}
          onChange={e => {
            setValue({ lastName: e.target.value })
          }}
        />
        {submitted && errors.lastName && <div style={errStyles}>{errors.lastName}</div>}
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
