import Form from '@/components/common/Form'
import { registerFormControls } from '@/config/config'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
const initailState ={
  userName: '',
  email:'',
  password: ''
}

const Register = () => {
  const [formData,setFormData] =useState(initailState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function onSubmit(e){
  e.preventDefault()
  dispatch(registerUser(formData)).then(()=>{navigate("/auth/login")})
  
   

  }
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
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
       />
    </div>
  )
}

export default Register