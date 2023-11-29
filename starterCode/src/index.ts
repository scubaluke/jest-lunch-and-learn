import app from './app'

const port = 5050

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`)
})
