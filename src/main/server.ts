import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(3000, () => console.log(`Server running at http://localhost:${env.port}`))
  }, (erro) => { console.log(erro) })
