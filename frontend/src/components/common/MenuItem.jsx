import React from 'react'
import { LayoutDashboard, NotebookPen, ShoppingBasket } from "lucide-react"
import { useNavigate } from 'react-router-dom'
const MenuItem = ({setOpen}) => {
   const  navigate = useNavigate()
        // admin sidebar menu items 
const adminSidebarMenuItems =[
  {
      id:'dashboard',
      label:'Dashboard',
      path:'/admin/dashboard',
      icon: <LayoutDashboard/>
  },
  {
      id:'products',
      label:'Products',
      path:'/admin/products',
      icon: <ShoppingBasket/>
  },
  {
      id:'orders',
      label:'Orders',
      path:'/admin/orders',
      icon: <NotebookPen/>
  },
]
  return (
    <nav className='mt-8 flex-col flex gap-2'>
    {
      adminSidebarMenuItems.map((item, index) => (
        <div className='flex text-xl cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground' key={index} onClick={() => { navigate(item.path) 
            setOpen ?  setOpen(false) : null 
         }}>
          {item.icon} <span className='text-sm font-medium '>{item.label}</span>

        </div>
      ))
    }

  </nav>
  )
}

export default MenuItem