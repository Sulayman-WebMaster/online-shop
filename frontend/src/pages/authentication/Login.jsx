import Form from '@/components/common/Form'
import { loginFormControls } from '@/config/config'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
const initailState ={
  email:'',
  password: '',
  
}

const Login = () => {
  const [formData,setFormData] =useState(initailState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function onSubmit(e){
    e.preventDefault()
    dispatch(loginUser(formData)).then( data => {
      console.log(data)
      if(data?.payload?.success){
        toast(data.payload?.message)
        navigate('/shop/home')
        } 
      }
    )
  
  }
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
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
       />
    </div>
  )
}

export default Login