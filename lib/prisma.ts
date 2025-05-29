import { PrismaClient } from '@prisma/client'

// Solution pour éviter les instances multiples pendant le développement
declare global {
  var prisma: PrismaClient | undefined
}

const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma
