import React from "react";

const Connect = ({ account, increaseAllowance, connectWallet, loading }) => {
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
        </div>
      ) : (
        <p className="font-mono text-xs underline " onClick={connectWallet}>
          Connect Wallet to get started...
        </p>
      )}
    </div>
  );
};

export default Connect;
