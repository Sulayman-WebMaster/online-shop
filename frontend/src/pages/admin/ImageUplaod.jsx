import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { UploadCloudIcon } from 'lucide-react'
import React, { useRef } from 'react'

const ImageUpload = ({ image, setImage }) => {
  const inputRef = useRef(null)

  const handleImageFileChange = (event) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) setImage(selectedFile)
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <label className='text-lg font-semibold mb-2 block'>Upload Image</label>
      <div className="relative border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center">
        <Input
          id="image-upload"
          type="file"
          ref={inputRef}
          onChange={handleImageFileChange}
          accept="image/*"
          className="hidden"
        />
        {!image ? (
          <Label htmlFor="image-upload" className='flex flex-col items-center justify-center h-32 cursor-pointer'>
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or Click to Upload</span>
          </Label>
        ) : (
          <div className="text-center text-sm text-gray-600">File selected: {image.name}</div>
        )}
      </div>
    </div>
  )
}

export default ImageUpload
