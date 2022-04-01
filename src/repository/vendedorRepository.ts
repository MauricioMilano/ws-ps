// TODO: Refactor to implement an abstract class

import { Collection,  ObjectId, Filter, Document } from 'mongodb';
import { Vendedor } from '../models/vendedor';
import { repository } from './repository';

export class VendedorRepository implements repository<Vendedor> {
  private collection: Collection
  constructor(collection: any) {
    if (collection instanceof Collection) {
      this.collection = collection
    }else{
      throw new Error("Erro ao instanciar a collection Vendedor")
    }
  }
  async get(query: Filter<Vendedor>):Promise<Vendedor[]> {
    return await this.collection.find(query).toArray() as Vendedor[]
  }
  async save(vendedor: Vendedor):Promise<void> {
    await this.collection.insertOne(vendedor);
  }
  async update(id: ObjectId , vendedor: Vendedor):Promise<void> {
    delete vendedor._id
    await this.collection.updateMany({ _id: new ObjectId(id) }, {$set:vendedor}, {upsert: false})
  }
  async delete(id: ObjectId):Promise<void> {
    await this.collection.deleteMany({ _id: id })
  }
  async aggregate(pipeline: Document[] | undefined):Promise<Document[]>{
    return await this.collection.aggregate(pipeline).toArray()
  }
}

