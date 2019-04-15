import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { useForm } from '@vobi/react-form'

const App = () => {
  const {
    values,
    setValue,
    submit,
    valid,
    errors,
  } = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    submitHandler: ({ values }) => {
      console.log('values', values)
    }
  })
  console.log('valid', valid)
  console.log('errors', errors)

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
        <br /><br />
        <label>Last name</label>
        <input
          value={values.lastName}
          onChange={e => {
            setValue({ lastName: e.target.value })
          }}
        />
        <br /><br />
        {/* <button type="submit">Save</button> */}
      </form>
    </div>
  )
}

export default App;
