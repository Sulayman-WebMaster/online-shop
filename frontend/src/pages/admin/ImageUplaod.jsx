import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React, { useRef, useState } from 'react'

const ImageUpload = ({ uploadImage, setUploadImage, onSubmit }) => {
  const inputRef = useRef(null)
  const [image, setImage] = useState(null)

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
    if (droppedFile) {
      setImage(droppedFile)
      setUploadImage(droppedFile)
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setUploadImage(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

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
            <Button variant='ghost' className='text-muted-foreground hover:text-foreground' onClick={handleRemoveImage}>
              <XIcon className='w-4 h-4 text-red-500' />
              <span className='sr-only'>Remove File</span>
            </Button>
          </div>
        )}
      </div>
      {image && (
        <Button className='mt-4 w-full' onClick={onSubmit}>
          Submit
        </Button>
      )}
    </div>
  )
}

export default ImageUpload
