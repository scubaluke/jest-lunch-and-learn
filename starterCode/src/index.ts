import app from './app'

const port = process.env.PORT || 5050

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`)
})
