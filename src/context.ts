import { PrismaClient } from '@prisma/client'
import { ContextParameters } from 'graphql-yoga/dist/types'
import * as dotenv from 'dotenv'

dotenv.config() // load the environment variables

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  request: any
}

export function createContext(request: ContextParameters) {
  return {
    ...request,
    prisma,
  }
}
