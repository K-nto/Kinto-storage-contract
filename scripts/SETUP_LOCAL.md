### Local setup

With these instructions you can set up a local hyperledget network on your device:

Instructions

1. Install fabric samples from here https://hyperledger-fabric.readthedocs.io/en/latest/install.html
2. copy `setupEnv.sh` and `setupEnv2.sh` into `/fabric-samples/test-network`
3. run `./setupEnv.sh`
4. Get the Package id from the last console lines. Example: `kinto-1:ca209a456ec960fbcafa90cf3a8`
5. Open `setupEnv2.sh` and set `CC_PACKAGE_ID` with the package id from step 4. Example: `CC_PACKAGE_ID=kinto-1:ca209a456ec960fbcafa90cf3a8`
6. run `./setupEnv2.sh`
