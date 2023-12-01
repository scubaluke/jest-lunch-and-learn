import dayjs from 'dayjs'
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

import { add } from '../helpers/add'
import { User } from '../dataSource'

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

  public static async users(
    req: Request<unknown, unknown, unknown, Record<string, string>>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const dateFormat = req.query['date-format']

      let users = await User.findAll()
      if (dateFormat) {
        users = users.map((user) => {
          const { createdAt, updatedAt, ...rest } = user.dataValues
          return {
            createdAt: dayjs(createdAt).format(dateFormat),
            updatedAt: dayjs(updatedAt).format(dateFormat),
            ...rest,
          }
        })
      }

      res.status(200).json({ users })
    } catch (error) {
      next(error)
    }
  }
}
