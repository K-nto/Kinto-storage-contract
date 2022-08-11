import {Context, Contract} from 'fabric-contract-api';
import {FileOperation} from './file';
import { Operation } from './operations';

export class Storage extends Contract {
  public async initLedger(ctx: Context) {
    console.info('============= START : Initialize Ledger ===========');
    const fileOperation: FileOperation = new FileOperation("GENESIS", "KINTO", "INIT");

    await ctx.stub.putState(
      'FILE_OPERATION_',
      Buffer.from(JSON.stringify(fileOperation))
    );
    console.info('[INFO] Added: ', fileOperation);

    console.info('============= END : Initialize Ledger ===========');
  }

  public async queryFileOperation(ctx: Context, fileOperationId: string): Promise<string> {
    const fileOperationAsBytes = await ctx.stub.getState(fileOperationId); // get the fileOperation from chaincode state
    if (!fileOperationAsBytes || fileOperationAsBytes.length === 0) {
      throw new Error(`${fileOperationId} does not exist`);
    }
    console.log(fileOperationAsBytes.toString());
    return fileOperationAsBytes.toString();
  }

  public async createFileOperation(
    ctx: Context,
    fileHash: string,
    wallet: string,
    operation: Operation
  ) {
    console.info('============= START : Create fileOperation ===========');

    const fileOperation: FileOperation = new FileOperation(fileHash, wallet, operation);

    await ctx.stub.putState(fileOperation.id, Buffer.from(JSON.stringify(fileOperation)));
    console.info('============= END : Create fileOperation ===========');
  }

  public async queryAllFileOperations(ctx: Context): Promise<string> {
    const startKey = '';
    const endKey = '';
    const allResults = [];
    for await (const {key, value} of ctx.stub.getStateByRange(
      startKey,
      endKey
    )) {
      const strValue = Buffer.from(value).toString('utf8');
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      allResults.push({Key: key, Record: record});
    }
    console.info(allResults);
    return JSON.stringify(allResults);
  }

  public async modifyFile(
    ctx: Context,
    fileOperationId: string,
    fileHash: string
  ) {
    console.info('============= START : modifyFile ===========');

    const fileOperationAsBytes = await ctx.stub.getState(fileOperationId);
    if (!fileOperationAsBytes || fileOperationAsBytes.length === 0) {
      throw new Error(`${fileOperationId} does not exist`);
    }
    const fileOperation: FileOperation = JSON.parse(fileOperationAsBytes.toString());
    fileOperation.fileHash = fileHash;

    await ctx.stub.putState(fileOperationId, Buffer.from(JSON.stringify(fileOperation)));
    console.info('============= END : modifyFile ===========');
  }
}
