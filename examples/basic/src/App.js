import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { useForm } from '@vobi/react-form'

const App = () => {
  const {
    values
  } = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
    }
  })

  console.log('values', values)

  return (
    <div>App</div>
  )
}

export default App;
