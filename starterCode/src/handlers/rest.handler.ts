import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import { add } from '../helpers/add'

export class RestHandler {
  public static async respond(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(StatusCodes.OK)
        .json({ message: 'hi, this is Express + TypeScript' })
    } catch (error) {
      const responseBody = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Please try again later',
      }
      next(responseBody)
      next(error)
    }
  }

  public static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const numbers = String(req.query.numbers)
      const numbersArray = numbers
        .split(',')
        .map((number) => Number(number.trim()))
      const sum = add(numbersArray)
      res.status(200).json({ sum })
    } catch (error) {
      next(error)
    }
  }
}
