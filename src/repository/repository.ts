import { Filter, ObjectId, Document } from 'mongodb';

export interface repository<T>{
  get(query:Filter<T>): Promise<T[] | []> ;
  save(document: T): Promise<void>;
  update(id: ObjectId, document:T):Promise<void>;
  delete(id:ObjectId):Promise<void>
  aggregate(pipeline: Document[] | undefined):Promise<Document[]>
}