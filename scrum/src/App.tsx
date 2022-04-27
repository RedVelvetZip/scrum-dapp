import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json"
declare var window: any;

function App() {
  const [data, setData] = useState<string>();
  const [contract, setContract] = useState<any>(); //TODO: add Greeter type to types/index.d.ts and remove this 'as any'

  const requestAccount = async () => {
    await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
  };


  const getData = async () => {
    const data = await contract.greet();
    setData(data);
  }

  const updateData = async () => {
    const transaction = await contract.setGreeting(data);
    await transaction.wait();
    getData();
  }

  const initConnection = async () => {
    if (typeof window.ethereum !== undefined) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setContract(
        new ethers.Contract(
          "0x5fbdb2315678afecb367f032d93f642f64180aa3", //get from terminal after deploy.js is called
          Greeter.abi,
          signer
        ) 
      )
    } else {
      console.log("Install metamask >:|");
    }
  }

  useEffect(() => {
    initConnection();
  }, []);


  return (
    <div className="App">
      <button onClick={getData}>Get Data</button>
      <button onClick={updateData}>Set Data</button>
      <input
        onChange={(e) => setData(e.target.value)}
        placeholder="New Greeting"
      />
      <p>{data}</p>
    </div>
  );
}

export default App;
