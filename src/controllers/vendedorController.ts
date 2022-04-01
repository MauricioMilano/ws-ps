import { Express, Request, Response } from 'express'
import { Logger } from '../config/logger'
import { VendedorRepository } from '../repository/vendedorRepository'
const express = require('express')
import { exceptionMessages } from '../enums/exceptionMessages'
import { Exception } from '../models/exceptions'
import { repository } from '../repository/repository'
import { Vendedor } from '../models/vendedor'
import { regrasScore } from '../models/regrasScore'
const router = express.Router()

export class VendedorController {
  private repository: repository<Vendedor>;
  private logger: Logger
  constructor(repository: repository<Vendedor>, logger: Logger) {
    this.repository = repository
    this.logger = logger
  }
  getRouter() {
    const repository = this.repository
    const logger = this.logger
    router.get('/', async function (req: Request, res: Response) {
      try {
        const agg = await repository.aggregate(regrasScore.getRegrasAggregate())
        const response = regrasScore.processaRegra(agg,{})
        console.log(response[0])
        res.send(response[0]).status(200)
      } catch (exception) {
        const errorMessage =
          exceptionMessages.getExceptionsMessages().vendedor.controllers.error_reading
        logger.error(errorMessage)
        const response = new Exception(errorMessage, exception)
        response.notFound(res)
      }
    })
    router.post('/', function (req: Request, res: Response) {
      try {
        const response = repository.save(req.body as Vendedor)
        logger.info(`Cadastrando vendedor : ${req.body}`)
        res.status(200).send(response)
      } catch (exception) {
        const errorMessage = exceptionMessages.getExceptionsMessages().vendedor.controllers.error_saving
        logger.error(errorMessage)
        const response = new Exception(errorMessage, exception)
        response.badRequest(res)
      }
    })

    return router
  }

}
