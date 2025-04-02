import Form from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config/config'
import React, { Fragment, useState } from 'react'
import ImageUpload from './ImageUplaod'

const Products = () => {
  const onSubmit = (event) => {
    event.preventDefault()
    console.log(formData)
  }
  const initialState = {
    image:null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStok: "",
  }
  const [products, setProducts] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const [image, setImage] = useState(null)
  const [uploadImage, setUploadImage] = useState('')
  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={()=> setProducts(true)}>Add New Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'></div>
      <Sheet open={products} onOpenChange={()=> setProducts(false)}>
        <SheetContent position='right' className='overflow-auto p-4'>
          <SheetHeader>
            <ImageUpload file={image} setImage={setImage} uploadImage={uploadImage} setUploadImage={setUploadImage} />
            <SheetTitle>
              Add New Product
            </SheetTitle>
          </SheetHeader>
          <div className='py-6'>
            <Form formcontrols={addProductFormElements} setFormData={setFormData} formData={formData} onSubmit={onSubmit} />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default Products