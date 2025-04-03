import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React, { useEffect, useRef } from 'react'
import axios from 'axios'

const ImageUpload = ({ image,setImage,uploadImage, setUploadImage, onSubmit }) => {
  const inputRef = useRef(null)
  const handleImageFileChange = (event) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setImage(selectedFile)
      setUploadImage(selectedFile)
    }
  }

  
  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files?.[0]
    if (droppedFile){ 
      setImage(droppedFile)
    } }

  

  const handleRemoveImage = () => {
    setImage(null)
    setUploadImage(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }
  async function uploadImageToCloudinary(){
   
      const data = new FormData();
      data.append('my_file',image)
      const res = await axios.post('http://localhost:5000/api/admin/products/upload-image', data)
      console.log(res, "response")
      if(res) setUploadImage(res.data)
   
  }
  useEffect(()=>{
   if(image !== null) uploadImageToCloudinary();
  },[image])

  return (
    <div className='w-full max-w-md mx-auto'>
      <label className='text-lg font-semibold mb-2 block'>Upload Image</label>
      <div 
        onDragOver={handleDragOver} 
        onDrop={handleDrop} 
        className='relative border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center'
      >
        <Input
          id='image-upload'
          type='file'
          ref={inputRef}
          onChange={handleImageFileChange}
          accept='image/*'
          className='hidden'
        />
        {!image ? (
          <Label htmlFor='image-upload' className='flex flex-col items-center justify-center h-32 cursor-pointer'>
            <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
            <span>Drag & Drop or Click to Upload</span>
          </Label>
        ) : (
          <div className='flex items-center justify-between text-center text-sm text-gray-600 w-full'>
            <div className='flex items-center'>
              <FileIcon className='w-10 h-10 text-muted-foreground mr-2' />
              <span className='truncate'>{image.name}</span>
            </div>
            <Button variant='ghost' size="icon" className='text-muted-foreground hover:text-foreground' onClick={handleRemoveImage}>
              <XIcon className='w-4 h-4 text-red-500' />
              <span className='sr-only'>Remove File</span>
            </Button>
          </div>
        )}
      </div>
    
    </div>
  )
}

export default ImageUpload
