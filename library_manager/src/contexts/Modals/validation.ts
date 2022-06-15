import { z } from 'zod'

export const updateFormValidation = z.object({
  name: z.string().min(1).max(255).nonempty({ message: "Обо'язкове поле" }),
  author: z.string().nonempty({ message: "Обо'язкове поле" }),
  year: z.number()
})

export const addFormValidation = z.object({
  book_id: z.number(),
  name: z.string().min(1).max(255).nonempty({ message: "Обо'язкове поле" }),
  author: z.string().nonempty({ message: "Обо'язкове поле" }),
  year: z.number(),
  count: z.number()
})
