import express, { Request, Response } from 'express'

const app = express()
const port = 5050

app.get('/', (req: Request, res: Response) => {
  res.send('hi, this is Express + TypeScript')
})

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`)
})
