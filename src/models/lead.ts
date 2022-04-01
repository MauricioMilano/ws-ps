import { Moment } from 'moment'
import { ObjectId } from 'mongodb';
import { Vendedor } from './vendedor';
const moment = require('moment');

export class Lead {
  public _id: ObjectId | undefined;
  public nome: string
  public telefone: string
  public vendedor_id: ObjectId | undefined
  public data_recebimento: string
  constructor(_id: ObjectId | undefined, nome:string , telefone:string ) {
    this._id = _id
    this.nome = nome
    this.telefone = telefone
    this.data_recebimento = new moment().format()
  }
  associarVendedor(vendedor: Vendedor) {
    this.vendedor_id = vendedor._id;
  }
}