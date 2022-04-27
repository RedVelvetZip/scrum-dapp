# scrum-dapp
 scrum board dapp inspiried by HashLips

# set up
 ```
 $ npx create-react-app scrum --template typescript
 $ cd scrum
 $ npm i ethers hardhat
 $ npm i @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers
 $ npx hardhat
```

# deploy on local 8545
```
$ npx hardhat compile //get ABI and compile .sol file
$ npx hardhat node //get local network accounts and priv keys in terminal; connect browser MetaMask to local8545; import account from terminal priv key options; should see 10k eth
$ npx hardhat run scripts/deploy.js --network localhost //test it, see outputs in the 'hardhat node' terminal
$ npm run start //find dapp on localhost:3000 and interact
```

# deploy on testnet (Rinkeby)
```
$ npx hardhat compile //get ABI and compile .sol file
```
//get Infura URL, add to .env
//get wallet's private key for the hardhat.config.js setup, add to .env, precede it with an "0x"
//in hardhat.config.js, add
```
require("@nomiclabs/hardhat-waffle");
.
.
.
defaultNetwork: "rinkeby",
```
test it, see outputs in the 'hardhat node' terminal
```
$ npx hardhat run scripts/deploy.js --network rinkeby
```
find dapp on localhost:3000 and interact
```
$ npm run start
```
