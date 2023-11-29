import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

function validateMethods({
  request,
  response,
  next,
  allow: Allow,
}: {
  request: Request
  response: Response
  next: NextFunction
  allow: string
}) {
  response.set({ Allow })
  const method = request.method

  const responseBody = {
    status: StatusCodes.METHOD_NOT_ALLOWED,
    message: 'Method not allowed',
    method,
  }
  next(responseBody)
}

export function allowGetOnly(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  return validateMethods({
    request,
    response,
    next,
    allow: 'GET',
  })
}
