// TODO: Refactor to implement an abstract class

import { Collection,  ObjectId, Filter, Document } from 'mongodb';
import { Lead } from '../models/lead';
import { repository } from './repository';
export class LeadRepository implements repository<Lead> {
  private collection: Collection
  constructor(collection: any) {
    if (collection instanceof Collection) {
      this.collection = collection
    }else{
      throw new Error("Erro ao instanciar a collection Leads")
    }
  }
  async get(query: Filter<Lead>):Promise<Lead[] | []>  {
    return await this.collection.find(query).toArray() as Lead[] | []
  }
  async save(vendedor: Lead):Promise<void> {
    await this.collection.insertOne(vendedor);
  }
  async update(id: ObjectId , vendedor: Lead):Promise<void> {
    await this.collection.updateOne({ _id: id }, vendedor)
  }
  async delete(id: ObjectId):Promise<void> {
    await this.collection.deleteMany({ _id: id })
  }
  async aggregate(pipeline: Document[] | undefined):Promise<Document[]>{
    return await this.collection.aggregate(pipeline).toArray()
  }
}

