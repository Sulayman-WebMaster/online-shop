import Form from '@/components/common/Form'
import { loginFormControls } from '@/config/config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const initailState ={
  password: '',
  email:''
}
function onSubmit(){

}
const Login = () => {
  const [formData,setFormData] =useState(initailState)
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign in to your account</h1>
        <p>Don't Have an account?</p>
       <Link className='font-medium text-primary hover:underline' to="/auth/register">Register</Link>
      </div>
      <Form
      formcontrols={loginFormControls}
      buttonText={'Sign In'}
      formData={setFormData}
      onSubmit={onSubmit}
       />
    </div>
  )
}

export default Login