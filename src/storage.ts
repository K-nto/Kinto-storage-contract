import {
  Context,
  Contract,
  Info,
  Returns,
  Transaction,
} from 'fabric-contract-api';
import {Asset} from './asset';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';

/**
 * @class StorageContract
 * @description Contract for storage operations
 */
@Info({title: 'Storage', description: 'Smart contract for trading assets'})
export class StorageContract extends Contract {
  /**
   * @function initLedger
   * @description Initializes the ledger if not existant and creates a genesis block.
   * @async
   */
  @Transaction()
  public async initLedger(ctx: Context) {
    console.info('============= START : Initialize Ledger ===========');

    const fileOperation: Asset = {
      ID: ctx.stub.getTxID(),
      fileHash: 'GENESIS',
      wallet: 'KINTO',
      operation: 'INIT',
    };

    await ctx.stub.putState(
      fileOperation.ID,
      Buffer.from(stringify(sortKeysRecursive(fileOperation)))
    );

    console.info(`Asset ${fileOperation.ID} initialized`);

    console.info('[INFO] Added: ', fileOperation);

    console.info('============= END : Initialize Ledger ===========');
  }

  /**
   * @function queryFileOperation
   * @description gets a specific transaction in the blockchain.
   * @async
   * @param (fileOperationTransactionId) Id of the transaction
   */
  @Transaction(false)
  public async queryFileOperation(
    ctx: Context,
    fileOperationTransactionId: string
  ): Promise<string> {
    const fileOperationAsBytes = await ctx.stub.getState(
      fileOperationTransactionId
    ); // get the fileOperation from chaincode state
    if (!fileOperationAsBytes || !fileOperationAsBytes.length) {
      throw new Error(`${fileOperationTransactionId} does not exist`);
    }
    return fileOperationAsBytes.toString();
  }

  /**
   * @function createFileOperation
   * @description creates a transaction for a file operation in the blockchain.
   * @async
   * @param (fileHash) hash of the file
   * @param (wallet) wallet owner
   * @param (operation) Operation type
   */
  @Transaction()
  public async createFileOperation(
    ctx: Context,
    fileHash: string,
    wallet: string,
    operation: string
  ) {
    console.info('============= START : Create fileOperation ===========');

    const fileOperation: Asset = {
      ID: ctx.stub.getTxID(),
      fileHash,
      wallet,
      operation,
    };

    await ctx.stub.putState(
      fileOperation.ID,
      Buffer.from(JSON.stringify(fileOperation))
    );
    console.info('============= END : Create fileOperation ===========');
  }

  /**
   * @function queryAllFileOperations
   * @description get all file operation transactions on the blockchain.
   * @async
   */
  @Transaction(false)
  @Returns('string')
  public async queryAllFileOperations(ctx: Context): Promise<string> {
    const allResults = [];
    const iterator = await ctx.stub.getStateByRange('', '');
    let result = await iterator.next();

    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString(
        'utf8'
      );
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      allResults.push(record);
      result = await iterator.next();
    }
    return JSON.stringify(allResults);
  }

  /**
   * @function modifyFile
   * @description creates a transaction for a file operation mmodification in the blockchain.
   * @async
   * @param (fileOperationId) Id of the transaction
   * @param (fileHash) hash of the file
   */
  @Transaction(false)
  public async modifyFile(
    ctx: Context,
    fileOperationId: string,
    fileHash: string
  ) {
    console.info('============= START : modifyFile ===========');

    const fileOperationAsBytes = await ctx.stub.getState(fileOperationId);
    if (!fileOperationAsBytes || !fileOperationAsBytes.length) {
      throw new Error(`${fileOperationId} does not exist`);
    }
    const fileOperation: Asset = JSON.parse(fileOperationAsBytes.toString());
    fileOperation.fileHash = fileHash;

    await ctx.stub.putState(
      fileOperationId,
      Buffer.from(JSON.stringify(fileOperation))
    );
    console.info('============= END : modifyFile ===========');
  }
}
