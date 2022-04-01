// TODO: Refactor to implement an abstract class

import { Collection,  ObjectId, Filter, Document } from 'mongodb';
import { regrasScore } from '../models/regrasScore';
import { repository } from './repository';
export class RegrasScoreRepository implements repository<regrasScore>{
  private collection: Collection
  constructor(collection: any) {
    if (collection instanceof Collection) {
      this.collection = collection
    }else{
      throw new Error("Erro ao instanciar a collection RegrasScore")
    }
  }
  async get(query: Filter<regrasScore>):Promise<regrasScore[] | []> {
    return await this.collection.find(query).toArray() as regrasScore[] | []
  }
  async save(vendedor: regrasScore):Promise<void> {
    await this.collection.insertOne(vendedor);
  }
  async update(id: ObjectId , regrasScore: regrasScore):Promise<void> {
    await this.collection.updateOne({ _id: id }, regrasScore)
  }
  async delete(id: ObjectId):Promise<void> {
    await this.collection.deleteMany({ _id: id })
  }
  async aggregate(pipeline: Document[] | undefined):Promise<Document[]>{
    return await this.collection.aggregate(pipeline).toArray()
  }
}

