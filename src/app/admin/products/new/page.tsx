"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Loader2, Save } from 'lucide-react'
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import ImageUpload from "@/components/image-upload"

export default function NewProductPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    sku: "",
    weight: "",
    dimensions: "",
    features: "",
    images: [] as string[]
  })
  
  // Verificar si el usuario está autenticado y es admin
  if (status === 'loading') {
    return <div className="container py-12 text-center">Cargando...</div>
  }
  
  if (status === 'unauthenticated' || session?.user.role !== 'admin') {
    router.push('/login?redirect=/admin/products/new')
    return null
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleImagesChange = (urls: string[]) => {
    setFormData(prev => ({
      ...prev,
      images: urls
    }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Convertir valores numéricos
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        features: formData.features.split('\n').filter(line => line.trim() !== '')
      }
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Error al crear producto')
      }
      
      toast({
        title: "Producto creado",
        description: "El producto ha sido creado correctamente"
      })
      
      router.push('/admin/products')
    } catch (error: any) {
      console.error('Error al crear producto:', error)
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al crear el producto",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between pb-6 space-y-2">
        <div>
          <Link href="/admin/products" className="inline-flex items-center mb-2 text-sm font-medium">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Volver a Productos
          </Link>
          <h1 className="text-2xl font-bold">Añadir Nuevo Producto</h1>
        </div>
        <Button type="submit" form="product-form" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Guardar Producto
            </>
          )}
        </Button>
      </div>
      
      <form id="product-form" onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-8 md:col-span-2">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Producto</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecciona categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Electronics">Electrónica</SelectItem>
                        <SelectItem value="Clothing">Ropa</SelectItem>
                        <SelectItem value="Furniture">Muebles</SelectItem>
                        <SelectItem value="Appliances">Electrodomésticos</SelectItem>
                        <SelectItem value="Sports">Deportes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Cantidad en Stock</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU (Código de Producto)</Label>
                    <Input
                      id="sku"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-medium">Imágenes del Producto</h3>
                <Separator />
                
                <ImageUpload
                  value={formData.images}
                  onChange={handleImagesChange}
                  maxImages={5}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-medium">Información Adicional</h3>
                <Separator />
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.weight}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensiones (L x A x A cm)</Label>
                    <Input
                      id="dimensions"
                      name="dimensions"
                      placeholder="ej. 10 x 5 x 3"
                      value={formData.dimensions}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="features">Características (una por línea)</Label>
                  <Textarea
                    id="features"
                    name="features"
                    rows={4}
                    placeholder="Ingresa las características del producto, una por línea"
                    value={formData.features}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-medium">Estado del Inventario</h3>
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select defaultValue="instock">
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Selecciona estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instock">En Stock</SelectItem>
                      <SelectItem value="lowstock">Poco Stock</SelectItem>
                      <SelectItem value="outofstock">Agotado</SelectItem>
                      <SelectItem value="backorder">Pedido Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibilidad</Label>
                  <Select defaultValue="published">
                    <SelectTrigger id="visibility">
                      <SelectValue placeholder="Selecciona visibilidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Publicado</SelectItem>
                      <SelectItem value="draft">Borrador</SelectItem>
                      <SelectItem value="hidden">Oculto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-medium">SEO</h3>
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Título Meta</Label>
                  <Input
                    id="metaTitle"
                    placeholder="Título para SEO"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Descripción Meta</Label>
                  <Textarea
                    id="metaDescription"
                    placeholder="Descripción para SEO"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}