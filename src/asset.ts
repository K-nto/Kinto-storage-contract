import {Object, Property} from 'fabric-contract-api';

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
