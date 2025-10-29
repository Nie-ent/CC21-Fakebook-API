import { z } from "zod"

export const registerSchema = z.object({
    identity: z.string().min(2, "Email or phone-number required"),
    firstName: z.string().min(1, "firstname is required"),
    lastName: z.string().min(1, "lastname is required"),
    password: z.string().min(4, "password is required"),
    confirmPassword: z.string().min(4, "confirm password is required")
}).refine(data => data.password === data.confirmPassword, {
    message: 'confirmed password is not match',
    path: ['confirmPassword']
})
