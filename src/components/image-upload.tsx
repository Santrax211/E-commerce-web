"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ImageIcon, Trash2, Upload } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface ImageUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
  maxImages?: number
}

export default function ImageUpload({ value = [], onChange, maxImages = 5 }: ImageUploadProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  
  const handleClick = () => {
    fileInputRef.current?.click()
  }
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    
    if (!files || files.length === 0) return
    
    if (value.length + files.length > maxImages) {
      toast({
        title: "Límite excedido",
        description: `Solo puedes subir un máximo de ${maxImages} imágenes`,
        variant: "destructive"
      })
      return
    }
    
    setIsUploading(true)
    
    try {
      const uploadedUrls = []
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
          toast({
            title: "Tipo de archivo no válido",
            description: "Solo se permiten imágenes",
            variant: "destructive"
          })
          continue
        }
        
        // Validar tamaño (5MB máximo)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "Archivo demasiado grande",
            description: "El tamaño máximo permitido es 5MB",
            variant: "destructive"
          })
          continue
        }
        
        const formData = new FormData()
        formData.append('file', file)
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        
        if (!response.ok) {
          throw new Error('Error al subir imagen')
        }
        
        const data = await response.json()
        uploadedUrls.push(data.secure_url)
      }
      
      onChange([...value, ...uploadedUrls])
      
      toast({
        title: "Imágenes subidas",
        description: `Se han subido ${uploadedUrls.length} imágenes correctamente`
      })
    } catch (error) {
      console.error('Error al subir imágenes:', error)
      toast({
        title: "Error",
        description: "Ocurrió un error al subir las imágenes",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
      // Limpiar input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }
  
  const handleRemove = (index: number) => {
    const newUrls = [...value]
    newUrls.splice(index, 1)
    onChange(newUrls)
  }
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {value.map((url, index) => (
          <div key={index} className="relative aspect-square overflow-hidden rounded-md border">
            <Image
              src={url || "/placeholder.svg"}
              alt={`Imagen ${index + 1}`}
              fill
              className="object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={() => handleRemove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        {value.length < maxImages && (
          <button
            type="button"
            onClick={handleClick}
            className="flex aspect-square items-center justify-center rounded-md border border-dashed"
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="flex flex-col items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span className="mt-2 text-xs text-muted-foreground">Subiendo...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                <span className="mt-2 text-xs text-muted-foreground">Añadir imagen</span>
              </div>
            )}
          </button>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
        disabled={isUploading}
      />
      
      <div className="flex items-center justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          disabled={isUploading || value.length >= maxImages}
        >
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? "Subiendo..." : "Subir imágenes"}
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        Formatos permitidos: JPG, PNG, WebP. Tamaño máximo: 5MB.
      </p>
    </div>
  )
}