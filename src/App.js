import { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import ContractJSON from './artifacts/contracts/Greeter.sol/Greeter.json';
require('dotenv').config();

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

// MetaMask injects the ethereum object into the webpage.
const ethereum = window.ethereum;

function App() {
  const [gm, setGm] = useState();

  async function requestAccount() {
    await ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchGm() {
    if (typeof ethereum !== 'undefined') {
      const provider = new ethers.providers.AlchemyProvider("rinkeby", process.env.REACT_APP_ALCHEMY_API_KEY);
      const contract = new ethers.Contract(contractAddress, ContractJSON.abi, provider);
      try {
        const isGm = await contract.readState();
        setGm(isGm);
        console.log('isGm: ', isGm);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function setGmButton() {
    if (typeof ethereum !== 'undefined') {
      const provider = new ethers.providers.AlchemyProvider("rinkeby", process.env.REACT_APP_ALCHEMY_API_KEY);
      const wallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, provider);
      const signer = wallet.connect(provider);
      const contract = new ethers.Contract(contractAddress, ContractJSON.abi, signer);
      const transaction = await contract.toggleGm();
      await transaction.wait();
      fetchGm();
    }
  }

  requestAccount();

  console.log("gm", gm);
  const headerClass = gm ? "App-header-gm" : "App-header";

  return (
    <div className="App">
      <header className={headerClass}>
        <button onClick={fetchGm}>GM?</button>
        <button onClick={setGmButton}>GM</button>
      </header>
    </div>
  );
}

export default App;
