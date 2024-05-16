import React, { useState, useEffect } from "react";
import Web3 from "web3";

function Navbar({ account, connectWallet }) {
  const [acc, setAcc] = useState(null);
  useEffect(() => {
    if (account) {
      setAcc(account.slice(0, 8));
    }
  }, [account]);
  return (
    <nav className="flex w-full justify-between items-center">
      <h1 className="text-2xl capitalize font-bold">Oneos</h1>
      <div>
        {account ? (
          <div className="text-xs bg-white text-orange-500 rounded-lg px-2 py-1 shadow-black shadow-sm">
            Connected: {acc}...
          </div>
        ) : (
          <button
            className="bg-white text-orange-500 py-2 px-3 rounded-sm"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
