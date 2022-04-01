import { Collection, Db, MongoClient, MongoError } from 'mongodb'
import { Logger } from './logger'
import { CollectionsEnum } from '../enums/collections'
export interface dictCollections {
  // [key: string|number]:Collection<Document>,
  Lead: Collection<Document>
  Vendedor: Collection<Document>,
  RegrasScore: Collection<Document>
}

export class MongoDB {
  private _database: string
  private _collectionList: Array<string>
  private _client: MongoClient
  private _logger: Logger
  private _collections:
    Partial<dictCollections>

  constructor(
    url: string,
    database: string,
    collectionList: Array<string>,
    logger: Logger
  ) {
    this._database = database
    this._collectionList = collectionList
    this._client = new MongoClient(url)
    this._logger = logger
    this._collections = {}
  }
  public async connect() {
    try {
      await this._client.connect()
      const db = await this._client.db(this._database)
      const collections = new CollectionsEnum().getCollections();
      if (db instanceof Db) {
        this._collections = {
          Lead: db.collection(collections.lead),
          Vendedor: db.collection(
            collections.vendedor
          ),
          RegrasScore: db.collection(collections.regrasScore)
        }
        this._logger.info("[Database] Database has loaded")
      }
      // return db
      // this._collections = {
      //   Leads: db.collection(new CollectionsEnum().getCollections().leads),
      //   Vendedores: db.collection(new CollectionsEnum().getCollections().vendedores)
      // }
      // // Object.keys(this._collections).forEach(collection:string => {
      // //   this._collections[collection] = db.collection(collection)
      // // });
      // this._logger.info("[Database] Database has connected");
    } catch (error) {
      this._logger.error(`[Database] Database exception: ${error}`)
    }
    return this
  }
  getCollections(): Partial<dictCollections>  {
    return this._collections
  }
}
