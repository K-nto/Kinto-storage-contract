import { Operation } from "./operations";
import {Object, Property} from 'fabric-contract-api';

@Object()
export class FileOperation {
  @Property()
  public id: string;
  @Property()
  public fileHash: string;
  @Property()
  public wallet: string;
  @Property()
  public operation: Operation;
}
