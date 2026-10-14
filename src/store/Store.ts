import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { productT } from '../types/productT'; // Sadece öğretmeninin tipi!

interface User {
  id: number | string;
  token?: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null; 
  login: (data: User) => void;
  logout: () => void;
  wishlist: productT[]; // Saf productT dizisi
  toggleLike: (product: productT) => void; // Saf productT alır
  cart: productT[]; // SEPET DE TAMAMEN SAF productT DİZİSİ OLDU!
  addToCart: (product: productT) => void; // Saf productT alır
  removeFromCart: (productId: number | string) => void; // Bu fonksiyon adeti 1 azaltır (eksi butonu)
  clearCart: () => void; // Bu fonksiyon bütün sepeti temizler (üstteki büyük buton)

  // +++ EKLEDİĞİMİZ YENİ FONKSİYON +++
  // Çöp kutusu simgesi için: Bu ürünün adedi ne olursa olsun tamamen siler.
  removeAllSingleProductFromCart: (productId: number | string) => void; 
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (data) => set({ user: data }),
      logout: () => set({ user: null }),
      
      wishlist: [],
      
      toggleLike: (product) => set((state) => {
        const isExist = state.wishlist.find((item) => String(item?.id) === String(product?.id));

        if (isExist) {
          return {
            wishlist: state.wishlist.filter((item) => String(item?.id) !== String(product?.id))
          };
        } else {
          return {
            wishlist: [...state.wishlist, product]
          };
        }
      }),

      cart: [],

      // Sepete eklerken tipi bozmamak için adet bilgisini nesneye JavaScript ile yediriyoruz
      addToCart: (product) => set((state) => {
        const isExist = state.cart.find((item) => String(item?.id) === String(product?.id));

        if (isExist) {
          return {
            cart: state.cart.map((item) => 
              String(item?.id) === String(product?.id)
                ? { ...item, quantity: ((item as any).quantity || 1) + 1 }
                : item
            )
          };
        } else {
          return {
            cart: [...state.cart, { ...product, quantity: 1 }]
          };
        }
      }),

      // Bu fonksiyon adeti 1 azaltır (eksi butonu mantığı)
      removeFromCart: (productId) => set((state) => {
        const targetProduct = state.cart.find((item) => String(item?.id) === String(productId));

        if (targetProduct && ((targetProduct as any).quantity || 1) > 1) {
          return {
            cart: state.cart.map((item) => 
              String(item?.id) === String(productId)
                ? { ...item, quantity: ((item as any).quantity || 1) - 1 }
                : item
            )
          };
        } else {
          return {
            cart: state.cart.filter((item) => String(item?.id) !== String(productId))
          };
        }
      }),
      removeAllSingleProductFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((item) => String(item?.id) !== String(productId))
      })),

      clearCart: () => set({ cart: [] })

    }),
    { 
      name: 'ynamdar-auth' 
    } 
  )
);