import { z } from "zod"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9]{10,15}$/

export const registerSchema = z.object({
    identity: z.string()
        .min(2, "Email or phone-number required")
        .refine(v => emailRegex.test(v) || mobileRegex.test(v), {
            message: "identity must be email or phone number"
        }),
    firstName: z.string().min(1, "firstname is required"),
    lastName: z.string().min(1, "lastname is required"),
    password: z.string().min(4, "password is required"),
    confirmPassword: z.string().min(4, "confirm password is required")
}).refine(data => data.password === data.confirmPassword, {
    message: 'confirmed password is not match',
    path: ['confirmPassword']
})

export const loginSchema = z.object({
    identity: z.string()
        .min(2, "email or password is required")
        .refine(
            (v) =>
                emailRegex.test(v) || mobileRegex.test(v),
            "must be valid email or phone"
        )
        .transform((v) => {
            if (v.includes("@")) {
                return { type: "email", value: v.toLowerCase().trim() }
            }
            return { type: "mobile", value: v.replace(/\D/g, "") }
        }),
    password: z.string().min(4, "password at least 4 characters"),
})

