import Form from '@/components/common/Form'
import registerFormControls from '@/config/config'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { data, Link, useNavigate } from 'react-router-dom'
import { toast } from "sonner"

const initailState ={
  userName: '',
  email:'',
  password: ''
}

const Register = () => {
  const [formData,setFormData] =useState(initailState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit = async (e) => {
  
 try {
   e.preventDefault()
   const res = dispatch(registerUser(formData))
   const payload = await res.unwrap(); 
   if (payload?.success) {
     toast.success(payload.message || 'Registration successful!')
     navigate('/auth/login'); // Redirect to the login page after successful registration
   } else {
     toast.error(payload?.message || 'Registration failed! Please try again.');
   }
 } catch (error) {
   console.error('Registration error:', error);
   toast.error('An error occurred. Please try again.');
  
 }
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