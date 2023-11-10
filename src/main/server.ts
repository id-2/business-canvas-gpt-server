import app from './configs/app'
import env from './configs/env'

app.listen(env.port, () => {
  console.log(`Server running at http://${env.host}:${env.port}`)
})
