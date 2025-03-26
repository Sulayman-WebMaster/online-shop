import Form from '@/components/common/Form'
import { registerFormControls } from '@/config/config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const initailState ={
  userName: '',
  password: '',
  email:''
}
function onSubmit(){

}
const Register = () => {
  const [formData,setFormData] =useState(initailState)
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create a new account</h1>
        <p>Already have an account</p>
       <Link className='font-medium text-primary hover:underline' to="/auth/login">Login</Link>
      </div>
      <Form
      formcontrols={registerFormControls}
      buttonText={'Sign Up'}
      formData={setFormData}
      onSubmit={onSubmit}
       />
    </div>
  )
}

export default Register