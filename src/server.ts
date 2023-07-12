import fastify from 'fastify'
const app = fastify()
const port = 3336

app.listen(
  {
    port,
  },
  () => {
    console.log(`Server running at ${port}`)
  },
)
