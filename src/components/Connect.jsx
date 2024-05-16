import React from "react";

const Connect = ({ account, increaseAllowance, connectWallet, loading }) => {
  return (
    <div>
      {account ? (
        <div className="flex gap-6 items-center">
          <button
            className="bg-white text-orange-800 font-semibold rounded-md px-6 py-2 w-[100px] md:w-[150px]"
            onClick={increaseAllowance}
            disabled={loading}
          >
            Airdrop
          </button>
          <button
            className="bg-white text-orange-800 font-semibold rounded-md px-6 py-2 w-[100px] md:w-[150px] text-center "
            onClick={increaseAllowance}
            disabled={loading}
          >
            Mint
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
