import { app } from "./app"

const port = 3336

app.listen(
  {
    port,
  },
  () => {
    console.log(`Server running at ${port}`)
  },
)
