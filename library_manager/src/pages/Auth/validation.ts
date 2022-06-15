import { z } from 'zod'

export const loginFormValidation = z.object({
  email: z.string().nonempty({ message: "Обо'язкове поле" }),
  password: z.string().nonempty({ message: "Обо'язкове поле" })
})

export const regFormValidation = z.object({
  email: z.string().nonempty({ message: "Обо'язкове поле" }),
  password: z.string().nonempty({ message: "Обо'язкове поле" }),
  firstName: z.string(),
  lastName: z.string()
})
