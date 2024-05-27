import React, { useState } from "react";

const Connect = ({
  account,
  increaseAllowance,
  connectWallet,
  loading,
  getOwner,
  changeOwner,
}) => {
  const [newOwner, setNewOwner] = useState(
    "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db"
  );
  return (
    <div>
      {account ? (
        <div className="flex gap-6 items-center">
          <button
            className="bg-white text-orange-500 font-semibold rounded-sm px-6 py-2 w-[100px] md:w-[150px] cursor-pointer hover:border hover:border-white hover:bg-transparent hover:text-white"
            onClick={increaseAllowance}
            disabled={loading}
          >
            {loading ? "Wait..." : "Airdrop"}
          </button>
          <button
            className="bg-white text-orange-500 font-semibold rounded-sm px-6 py-2 w-[100px] md:w-[150px] text-center  cursor-pointer hover:border hover:border-white hover:bg-transparent hover:text-white"
            onClick={increaseAllowance}
            disabled={loading}
          >
            {loading ? "Wait..." : "Mint"}
          </button>

          {/* <div>
            <button onClick={getOwner}>getOwner</button>
            <button onClick={() => changeOwner(newOwner)}>Change Owner</button>
          </div> */}
        </div>
      ) : (
        <div>
          <p className="font-mono text-xs underline " onClick={connectWallet}>
            Connect Wallet to get started...
          </p>
        </div>
      )}
    </div>
  );
};

export default Connect;
