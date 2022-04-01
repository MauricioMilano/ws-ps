import { ObjectId } from 'mongodb'
export class Vendedor {
  public _id: ObjectId | undefined = undefined
  public nome: string
  public nivel_senioridade: string
  public ultimo_lead_recebido: Date
  constructor(
    id: ObjectId | undefined = undefined,
    nome: string,
    nivel_senioridade: string
  ) {
    this._id = id
    this.nome = nome
    this.nivel_senioridade = nivel_senioridade
    this.ultimo_lead_recebido = new Date()
  }
}
