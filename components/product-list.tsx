"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/lib/types"
import { Trash2 } from "lucide-react"

interface ProductListProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  onRemoveProduct: (productId: number) => void
}

export default function ProductList({ products, onAddToCart, onRemoveProduct }: ProductListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Productos Disponibles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="relative h-40 w-full mb-4">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
              </div>
              <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
              <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button onClick={() => onAddToCart(product)} className="flex-1">
                Agregar al Carrito
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onRemoveProduct(product.id)}
                className="flex-shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
