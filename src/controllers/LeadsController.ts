import { Express, Request, Response } from 'express'
import { Logger } from '../config/logger'
import { VendedorRepository } from '../repository/vendedorRepository'
const express = require('express')
import { exceptionMessages } from '../enums/exceptionMessages'
import { Exception } from '../models/exceptions'
import { LeadRepository } from '../repository/leadRepository'
import { repository } from '../repository/repository'
import { Lead } from '../models/lead'
import { Vendedor } from '../models/vendedor'
import { regrasScore } from '../models/regrasScore'
import { ObjectId } from 'mongodb'
const router = express.Router()

export class LeadController {
  private repository: repository<Lead>
  private logger: Logger
  private vendedorRepository: repository<Vendedor>
  private regrasScoreRepository: repository<regrasScore>

  constructor(repository: repository<Lead>, vendedorRepository: repository<Vendedor>, regrasScoreRepository: repository<regrasScore>, logger: Logger) {
    this.repository = repository
    this.logger = logger
    this.vendedorRepository = vendedorRepository;
    this.regrasScoreRepository = regrasScoreRepository
  }
  getRouter() {
    const repository = this.repository
    const vendedorRepository = this.vendedorRepository
    const regrasScoreRepository = this.regrasScoreRepository
    const logger = this.logger
    router.get('/', async function (req: Request, res: Response) {
      try {
        const result = await repository.get({})
        res.send(result).status(200)
      } catch (exception) {
        const errorMessage =
          exceptionMessages.getExceptionsMessages().leads.controllers.error_reading
        logger.error(errorMessage)
        const response = new Exception(errorMessage, exception)
        response.notFound(res)
      }
    })
    router.post('/', async function (req: Request, res: Response) {
      try {
        logger.info(`Saving Lead : ${req.body}`)
        let vendedores = await vendedorRepository.aggregate(regrasScore.getRegrasAggregate())
        regrasScore.validaHorario()
        let response = regrasScore.processaRegra(vendedores,{})
        let vendedor_escolhido = response[1]
        const lead: Lead = new Lead(undefined, req.body.nome, req.body.telefone);
        const vendedor: Vendedor = response[0] as Vendedor
        lead.associarVendedor(response[1])
        const leadSaved = repository.save(lead)
        vendedor.ultimo_lead_recebido = new Date();
        vendedorRepository.update(vendedor_escolhido._id as ObjectId, new Vendedor(undefined, vendedor_escolhido.nome, vendedor_escolhido.nivel))
        res.status(200).send({message: "Lead criado com sucesso"})
      } catch (exception) {
        const errorMessage = exceptionMessages.getExceptionsMessages().leads.controllers.error_saving
        logger.error(errorMessage)
        const response = new Exception(errorMessage, exception)
        response.badRequest(res)
      }
    })
    return router
  }
}
