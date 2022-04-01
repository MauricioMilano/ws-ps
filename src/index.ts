import { Express, Request, Response } from 'express'

import { MongoDB, dictCollections } from './config/mongodb'
import { VendedorController } from './controllers/vendedorController'
import { VendedorRepository } from './repository/vendedorRepository'
import { CollectionsEnum } from './enums/collections'
import { Logger } from './config/logger'
import { init } from './config/init'
import { LeadController } from './controllers/LeadsController'
import { LeadRepository } from './repository/leadRepository'
import { regrasScore } from './models/regrasScore'
import { RegrasScoreRepository } from './repository/regrasScoreRepository'

const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000
const logger = new Logger()
async function loadDatabases(app: Express) {
  const collectionsList = new CollectionsEnum().getCollections()
  const mongoInstance: MongoDB = new MongoDB(
    process.env.MONGO_URL || '',
    process.env.MONGO_DATABASE || '',
    Object.values(collectionsList),
    logger
  )
  await mongoInstance.connect()

  // app.use("/vendedor",new VendedorController(new VendedorRepository(mongoInstance.getCollections()[])))
  // const collections:dictCollections | {[key: string|number]:Collection<Document>} = mongoInstance.getCollections()
  const collections: Partial<dictCollections> = mongoInstance.getCollections()
  new init(collections)
  app.use(
    '/vendedor',
    new VendedorController(
      new VendedorRepository(collections.Vendedor),
      logger
    ).getRouter()
  )
  app.use(
    '/lead',
    new LeadController(
      new LeadRepository(collections.Lead),
      new VendedorRepository(collections.Vendedor),
      new RegrasScoreRepository(collections.RegrasScore),
      logger
    ).getRouter()
  )
}
var bodyParser = require('body-parser')

loadDatabases(app)
app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`[Server] Server is running at Port:${port}`)
})
