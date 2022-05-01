import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Manager from "./artifacts/contracts/Manager.sol/Manager.json"
import { Contract } from "web3-eth-contract"
declare var window: any;
interface ITicket {
  status: number,
  name: string,
  index: number
}

function App() {
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState<any>(); //TODO: figure out how to declare this with <Contract> instead of <any>
  const [tickets, setTickets] = useState<ITicket[]>([]);

  const getTickets = async () => {
    const res = await contract.getTickets();
    setTickets(res);
  }

  const createTicket = async (_name: string) => {
    const transaction = await contract.createTicket(_name)
    await transaction.wait();
    getTickets();
  }

  const updateTicketStatus = async (_index: number, _status: number) => {
    const transaction = await contract.updateTicketStatus(_index, _status)
    await transaction.wait();
    getTickets();
  }

  const renameTicket = async (_index: number) => {
    let newName = prompt("Please enter a new ticket name", "");
    const transaction = await contract.renameTicket(_index, newName)
    await transaction.wait();
    getTickets();
  }

  const initConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setAccount(accounts[0]);
      setContract(
        new ethers.Contract(
          "0x5FbDB2315678afecb367f032d93F642f64180aa3", //from terminal after deploy.js called
          Manager.abi,
          signer
        )
      )
    } else {
      console.log("Install metamask, NOW >:|")
    }
  };

  useEffect(() => {
    initConnection();
  }, []);


  // //Old functions for Greeter V1
  // const [data, setData] = useState<string>();
  // const [contract, setContract] = useState<any>(); //TODO: add Greeter type to types/index.d.ts and remove this 'as any'
  // const getData = async () => {
  //   const data = await contract.greet();
  //   setData(data);
  // }
  // const updateData = async () => {
  //   const transaction = await contract.setGreeting(data);
  //   await transaction.wait();
  //   getData();
  // }
  // const initConnection = async () => {
  //   console.log(process.env.REACT_APP_KEY)
  //   if (typeof window.ethereum !== undefined) {
  //     await window.ethereum.request({ method: "eth_requestAccounts" });
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     setContract(
  //       new ethers.Contract(
  //         "0x5fbdb2315678afecb367f032d93f642f64180aa3", //from terminal after deploy.js called
  //         Manager.abi,
  //         signer
  //       ) 
  //     )
  //   } else {
  //     console.log("Install metamask >:|");
  //   }
  // }
  // useEffect(() => {
  //   initConnection();
  // }, []);

  return (
    <div className="App">
      <div className="header">
        <p>Task Manager</p>
        {account != "" ? (
          <p>Connected to {account.substring(0, 9)}...</p>
        ) : (
          <button onClick={initConnection}>Connect</button>
        )}

      </div>
      <div className="input_section">
        <div>
          <button
            className="big_button"
            onClick={() => createTicket(name)}>
            Create Ticket
          </button>
          <input
            className="input"
            onChange={(e) => setName(e.target.value)}
            placeholder="Ticket Name"
          />
        </div>
        <button
          className="big_button"
          onClick={getTickets}>
          Load data
        </button>
      </div>


      <div className="main">
        <div className="main_col" style={{ backgroundColor: "lightpink" }}>
          <div className="main_col_heading">
            ToDo
          </div>
          {tickets
            .map((ticket, index) => ({ id: index, item: ticket}))
            .filter((ticket) => ticket.item.status == 0)
            .map((ticket, index) => {
              return (
                <div className="main_ticket_card">
                  <p className="main_ticket_card_id">#{ticket.item.index}</p>
                  <p >{ticket.item.name}</p>
                  <div className="main_ticket_button_section">
                    <button
                      className="small_button"
                      style={{ backgroundColor: "lightblue" }}
                      onClick={() => updateTicketStatus(ticket.id, 1)}>
                      Busy
                    </button>
                    <button
                      className="small_button"
                      style={{ backgroundColor: "lightGreen" }}
                      onClick={() => updateTicketStatus(ticket.id, 2)}>
                      Done
                    </button>
                    <button
                      className="small_button"
                      style={{ backgroundColor: "lightGrey" }}
                      onClick={() => renameTicket(ticket.id)}>
                      Rename
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="main_col" style={{ backgroundColor: "cyan" }}>
          <div className="main_col_heading">
            Busy
          </div>
          {tickets
            .filter((ticket) => ticket.status == 1)
            .map((ticket, index) => {
              return <p>{ticket.name}</p>
            })
          }
        </div>
        <div className="main_col" style={{ backgroundColor: "lightgreen" }}>
          <div className="main_col_heading">
            Done
          </div>
          {tickets
            .filter((ticket) => ticket.status == 2)
            .map((ticket, index) => {
              return <p>{ticket.name}</p>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;