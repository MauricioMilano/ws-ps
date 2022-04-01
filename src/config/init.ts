import { Collection } from 'mongodb';
import { regrasScore } from '../models/regrasScore';
import { Vendedor } from '../models/vendedor';
import { VendedorRepository } from '../repository/vendedorRepository';
import { RegrasScoreRepository } from '../repository/regrasScoreRepository';
import { dictCollections } from './mongodb';
export class init{
  constructor(collections:Partial<dictCollections>){
    // const regras = new RegrasScoreRepository(collections.RegrasScore)
    // regras.save(new regrasScore("junior", 1))
    // regras.save(new regrasScore("pleno", 1.5))
    // regras.save(new regrasScore("senior", 2))

    // const Vendedores = new VendedorRepository(collections.Vendedor)
    // Vendedores.save(new Vendedor(undefined, "Mauricio","senior"));
    // Vendedores.save(new Vendedor(undefined, "Jorge","pleno"));
    // Vendedores.save(new Vendedor(undefined, "Caio","junior"));

  }
}