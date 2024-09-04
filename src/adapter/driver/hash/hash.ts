import { v4 as uuidv4 } from 'uuid'
import IHash from '../../../core/domain/repositories/iHash'

export default class Hash implements IHash {
  generate(): string {
    return uuidv4()
  }
}