import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

const AdminLayout = () => {
   const [open, setOpen] = React.useState(false)
  return (
    <div className='flex min-h-screen w-full'>
        {/* admin sidebar */}
        <AdminSidebar open={open} setOpen={setOpen}/>
        <div className="flex flex-1 flex-col">
            {/* admin header  */}
            <AdminHeader setOpen={setOpen} />
            <main className='flex-1 flex bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default AdminLayout