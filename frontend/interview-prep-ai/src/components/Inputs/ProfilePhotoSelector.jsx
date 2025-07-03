import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
      if (setPreview) {
        setPreview(preview)
      }
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    setPreviewUrl(null)
    if (setPreview) {
      setPreview(null)
    }
  }

  const onChooseFile = () => {
    inputRef.current.click()
  }

  return (
    <div className='flex flex-col items-center justify-center mb-6'>
      {/* Hidden file input */}
      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
      />

      {/* Avatar or Uploaded Image */}
      {!image ? (
        <div className='w-20 h-20 flex items-center justify-center bg-orange-50 rounded-full relative cursor-pointer'>
          <LuUser className='text-4xl text-orange-500' />
          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-gradient-to-r from-orange-500/85 to-orange-600 text-white rounded-full absolute -bottom-1 -right-1'
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className='relative'>
          <img
            src={preview || previewUrl}
            alt='profile'
            className='w-20 h-20 rounded-full object-cover'
          />
          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}

      {/* Placeholder for "Full Name" input below */}
      {/* Example usage: */}
      {/* <input type="text" placeholder="Full Name" className="mt-4 border px-3 py-2 rounded" /> */}
    </div>
  )
}

export default ProfilePhotoSelector
