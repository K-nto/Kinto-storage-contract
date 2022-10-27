import {Object, Property} from 'fabric-contract-api';

/**
 * @class Asset
 * @description This class is used by the contract to create the transactions related to storage operations
 */

@Object()
export class Asset {
  @Property()
  public ID: string;
  @Property()
  public fileHash: string;
  @Property()
  public wallet: string;
  @Property()
  public operation: string;
}
