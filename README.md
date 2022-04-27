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

# commands
```
$ npx hardhat compile //get ABI and compile .sol file
$ npx hardhat node //get local network accounts and priv keys in terminal; connect browser MetaMask to local8545; import account from terminal priv key options; should see 10k eth
$ npx hardhat run scripts/deploy.js --network localhost //test it, see outputs in the 'hardhat node' terminal

```
