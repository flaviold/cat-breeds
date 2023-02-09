import { Request } from 'express'

export interface BaseController<T> {
  handle: (request: Request) => Promise<T>
}
