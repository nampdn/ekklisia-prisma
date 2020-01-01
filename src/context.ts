import { Photon } from '@prisma/photon'
import { ContextParameters } from 'graphql-yoga/dist/types'
import * as dotenv from 'dotenv'

dotenv.config() // load the environment variables

console.log('DATABASE_URL:', process.env.DATABASE_URL)

const photon = new Photon()

export interface Context {
  photon: Photon
  request: any
}

export function createContext(request: ContextParameters) {
  return {
    ...request,
    photon,
  }
}
