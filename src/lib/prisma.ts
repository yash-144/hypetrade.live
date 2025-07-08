import { PrismaClient } from '../../src/generated/prisma'

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query'],
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
