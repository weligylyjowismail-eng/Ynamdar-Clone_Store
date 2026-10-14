import type { productT } from "./productT"

export type CategoryT = {
  id: number
  image: string
  name_tm: string
  name_ru: string
  name_en: string
  parent_id: null | number
  children: CategoryT[]
  products?:productT[]
}