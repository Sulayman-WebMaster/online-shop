import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import Form from '@/components/common/Form';
import { loginFormControls } from '@/config/config';
import { loginUser } from '@/store/auth-slice';

// Initial state for the form data
const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response =  dispatch(loginUser(formData));
      const { payload } = response;


      // Check for successful login
      if (payload?.success) {
        toast.success(payload.message || 'Login successful!');
        navigate('/shop/home');
      } else {
        toast.error(payload?.message || 'Login failed! Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
        <p>Don't have an account?</p>
        <Link className="font-medium text-primary hover:underline" to="/auth/register">
          Register
        </Link>
      </div>
      {/* Form component */}
      <Form
        formcontrols={loginFormControls}
        buttonText="Sign In"
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Login;