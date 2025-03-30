import { ShieldUser } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import MenuItem from '@/components/common/MenuItem'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const AdminSidebar = ({open,setOpen}) => {
  const navigate = useNavigate();
  return <Fragment>
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className='w-64'>
        <div className="flex flex-col h-full">
          <SheetHeader className="border-b">
            <SheetTitle className='flex items-center gap-2 font-bold text-xl'>
          <ShieldUser width={30} />
              <span>Admin Panel</span></SheetTitle>
          </SheetHeader>
          <MenuItem setOpen={setOpen}/>
        </div>
      </SheetContent>
    </Sheet>
    <aside className='hidden w-64 cursor-pointer flex-col border-r bg-background p-6 lg:flex'>
      <div onClick={()=>{navigate("/admin/dashboard")}} className='flex items-center gap-2'>
      <ShieldUser width={30} /> <h1 className='text-xl fotn-bold'>Admin Panel</h1> 
      </div>
      <MenuItem />
    </aside>
  </Fragment>
}

export default AdminSidebar