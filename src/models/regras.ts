import { Vendedor } from './vendedor';

export interface regras<T, V> {
  condition(params:T):V
}