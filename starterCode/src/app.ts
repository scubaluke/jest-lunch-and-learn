import express, { Request, Response } from 'express'
import { add } from './helpers/add'

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'hi, this is Express + TypeScript' })
})

app.get('/add', (req: Request, res: Response) => {
  const numbers = String(req.query.numbers)
  const numbersArray = numbers.split(',').map((number) => Number(number.trim()))
  const sum = add(numbersArray)
  res.status(200).json({ sum })
})

export default app
