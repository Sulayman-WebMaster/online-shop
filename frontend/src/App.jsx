import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/authentication/AuthLayout'
import Login from './pages/authentication/Login'
import Register from './pages/authentication/Register'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Orders from './pages/admin/Orders'
import Features from './pages/admin/Features'
import ShoppingLayout from './pages/shoping/ShoppingLayout'
import NotFound from './pages/Not-Found/NotFound'
import ShopCheckout from './pages/shoping/ShopCheckout'
import ShopHome from './pages/shoping/ShopHome'
import ShopList from './pages/shoping/ShopList'
import ShopAccount from './pages/shoping/ShopAccount'
import CheckAuth from './components/common/CheckAuth'
import UnauthPage from './pages/UnauthPage'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'


function App() {


const {isAuthenticated,user} = useSelector(state => state.auth )
console.log(isAuthenticated)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkAuth())
  },[dispatch])

  return (

    <div className='flex flex-col overflow-hidden bg-white'>
      {/* <h1>Header component</h1> */}
      {/* auth routes  */}
      <Routes>
        <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout />
        </CheckAuth>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* admin routes  */}
        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckAuth>}>
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="features" element={<Features />} />
          <Route path="features" element={<Features />} />
        </Route>
        {/* shopping routes  */}
        <Route path="/shop" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout />
        </CheckAuth>}>
          <Route path="checkout" element={<ShopCheckout />} />
          <Route path="home" element={<ShopHome />} />
          <Route path="listing" element={<ShopList />} />
          <Route path="account" element={<ShopAccount />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>

    </div>

  )
}

export default App
