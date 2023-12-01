import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

interface ResponseBody {
  message: string
  method?: string
}

interface ErrorResponse extends ResponseBody {
  status: number
}

export function errorHandler(
  errorResponse: ErrorResponse,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const {
    status = StatusCodes.SERVICE_UNAVAILABLE,
    message,
    method,
  } = errorResponse
  const responseBody: ResponseBody = { message }
  if (method) {
    responseBody.method = method
  }
  res.status(status).json(responseBody)
}
