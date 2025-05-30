"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"
import type { CartItem } from "@/lib/types"

interface CartSummaryProps {
  cartItems: CartItem[]
  onRemoveItem: (productId: number) => void
  onUpdateQuantity: (productId: number, quantity: number) => void
  onProcessPayment: () => void
  total: number
}

export default function CartSummary({
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onProcessPayment,
  total,
}: CartSummaryProps) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-xl">Carrito de Compras</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {cartItems.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">Tu carrito está vacío</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex gap-4 py-2 border-b">
                <div className="relative h-16 w-16 flex-shrink-0">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-red-500"
                    onClick={() => onRemoveItem(item.product.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={cartItems.length === 0} onClick={onProcessPayment}>
          Proceder al Pago
        </Button>
      </CardFooter>
    </Card>
  )
}
