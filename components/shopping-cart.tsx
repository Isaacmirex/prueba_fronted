"use client"

import { useState } from "react"
import ProductList from "./product-list"
import CartSummary from "./cart-summary"
import type { Product, CartItem } from "@/lib/types"
import AddProductForm from "./add-product-form"

// Datos de productos de ejemplo
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Auriculares Bluetooth",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    description: "Auriculares inalámbricos con cancelación de ruido",
  },
  {
    id: 2,
    name: "Smartwatch",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    description: "Reloj inteligente con monitor de actividad física",
  },
  {
    id: 3,
    name: "Teclado Mecánico",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=200&h=200&fit=crop",
    description: "Teclado gaming con retroiluminación RGB",
  },
  {
    id: 4,
    name: "Cámara Digital",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200&h=200&fit=crop",
    description: "Cámara de 24MP con zoom óptico 10x",
  },
  {
    id: 5,
    name: "Altavoz Portátil",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop",
    description: "Altavoz resistente al agua con 20 horas de batería",
  },
  {
    id: 6,
    name: "Mochila para Laptop",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
    description: 'Mochila con compartimento acolchado para laptop de hasta 15"',
  },
]

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [paymentProcessed, setPaymentProcessed] = useState(false)

  // Agregar nuevo producto
  const addProduct = (newProduct: Omit<Product, "id">) => {
    const product: Product = {
      ...newProduct,
      id: Math.max(...products.map((p) => p.id), 0) + 1,
    }
    setProducts((prev) => [...prev, product])
  }

  // Eliminar producto de la lista
  const removeProduct = (productId: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId))
    // También eliminar del carrito si está ahí
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  // Procesar pago
  const processPayment = () => {
    setPaymentProcessed(true)
    setCartItems([])
    // Resetear después de 3 segundos
    setTimeout(() => {
      setPaymentProcessed(false)
    }, 3000)
  }

  // Agregar producto al carrito
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      // Verificar si el producto ya está en el carrito
      const existingItem = prevItems.find((item) => item.product.id === product.id)

      if (existingItem) {
        // Incrementar la cantidad si ya existe
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        // Agregar nuevo producto al carrito
        return [...prevItems, { product, quantity: 1 }]
      }
    })
  }

  // Eliminar producto del carrito
  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }

  // Actualizar cantidad de un producto
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  // Calcular el total del carrito
  const cartTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Notification for successful payment */}
      {paymentProcessed && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <div className="text-lg">✅</div>
          <span className="font-medium">¡Pago realizado con éxito!</span>
        </div>
      )}

      <div className="md:col-span-2">
        <AddProductForm onAddProduct={addProduct} />
        <ProductList products={products} onAddToCart={addToCart} onRemoveProduct={removeProduct} />
      </div>
      <div className="md:col-span-1">
        <CartSummary
          cartItems={cartItems}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onProcessPayment={processPayment}
          total={cartTotal}
        />
      </div>
    </div>
  )
}
