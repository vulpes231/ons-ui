import React, { useState, useEffect } from "react";
import { FaCoins } from "react-icons/fa";

function Navbar({ account, connectWallet, connectLoading }) {
  const [acc, setAcc] = useState(null);

  useEffect(() => {
    if (account) {
      setAcc(account.slice(0, 8));
    }
  }, [account]);
  return (
    <header className="w-full px-6 lg:px-20">
      <nav className="flex w-full justify-between items-center">
        <h1 className="text-2xl capitalize font-bold flex gap-2 items-center">
          <span>
            <FaCoins />
          </span>{" "}
          Oneos
        </h1>
        <div>
          {account ? (
            <div className="text-xs bg-white text-[#333] rounded-sm px-2 lg:px-6 py-2 shadow-black shadow-xs lg:font-semibold cursor-pointer">
              Connected: {acc}...
            </div>
          ) : (
            <button
              className="bg-white text-[#333] py- px-3 rounded-sm text-sm cursor-pointer"
              onClick={connectWallet}
            >
              {connectLoading ? "Connecting..." : " Connect wallet"}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
