import { Request, Response, NextFunction } from 'express'

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
  // next is not used, but still needed
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  const { status, message, method } = errorResponse
  const responseBody: ResponseBody = { message }
  if (method) {
    responseBody.method = method
  }
  res.status(status).json(responseBody)
}
