import express from 'express'

import {
  ContextRunner,
  ValidationChain,
  validationResult,
  query,
} from 'express-validator'

// can be reused by many routes
export function validate(validations: ContextRunner[]) {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    for (const validation of validations) {
      await validation.run(req)
    }

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({
      message: 'please fixe validation errors',
      errors: errors.array(),
    })
  }
}

export function validateNumericArray(): ValidationChain[] {
  return [
    query('numbers')
      .notEmpty()
      .custom((numbers: string | undefined) => {
        if (numbers) {
          const numbersArray = numbers
            .split(',')
            .map((number) => Number(number.trim()))
          return numbersArray.every((number) => !isNaN(number))
        }
        return true
      }),
  ]
}

export function validateDateFormat(): ValidationChain[] {
  return [
    query('date-format')
      .optional()
      .toUpperCase()
      .isIn(['YYYY-MM-DD', 'DD-MM-YY', 'MM-DD-YY']),
  ]
}
