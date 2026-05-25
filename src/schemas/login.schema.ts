import z from 'zod'

export const LoginSchema = z.object({
  email: z.email('Введите адрес эл. почты'),
  code: z
    .string()
    .length(6, 'Код должен состоять из 6 цифр')
    .optional()
    .or(z.literal(''))
})

export type TypeLoginSchema = z.infer<typeof LoginSchema>
