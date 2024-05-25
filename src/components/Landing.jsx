import React from "react";
import Span from "./Span";
import { und } from "../assets";
import Connect from "./Connect";
import Footer from "./Footer";
import { FaServer } from "react-icons/fa";
import { MdChatBubble, MdCurrencyExchange, MdDomain } from "react-icons/md";

const Landing = ({ increaseAllowance, account, connectWallet, loading }) => {
  return (
    <section className="p-6 flex flex-col gap-8 w-full text-[#fff]">
      <div className="flex flex-col items-center justify-center gap-8 lg:max-w-[900px] lg:mx-auto">
        <div className="flex flex-col gap-1 text-center ">
          <h3 className="text-xl font-semibold leading-8 whitespace-nowrap lg:text-2xl ">
            Simple and Secure Messaging
          </h3>
          <p className="capitalize font-light opacity-45 text-sm">
            keeping you informed and connected.
          </p>
        </div>
        <div>
          <Connect
            increaseAllowance={increaseAllowance}
            account={account}
            connectWallet={connectWallet}
            loading={loading}
          />
        </div>
        <p className="text-center font-thin leading-8 text-sm lg:w-[60%] lg:mx-auto ">
          $ONS is an AI-powered decentralized communication infrastructure built
          to provide encrypted emails, unified notifications, and targeted
          marketing across multiple chains and dApps for users, developers, and
          marketers.
        </p>
      </div>

      <div className="flex flex-col gap-4 font-light w-full lg:max-w-[900px] lg:mx-auto text-[#333] lg:flex-row">
        <article className="flex justify-between bg-slate-50  p-6 rounded-lg w-full">
          <Span title={"Instances"} value={"20.50m"} icon={<FaServer />} />
          <Span
            title={"Interactions"}
            value={"180.50m"}
            icon={<MdChatBubble />}
          />
        </article>
        <article className="flex justify-between bg-slate-50  p-6 rounded-lg w-full">
          <Span
            title={"Transactions"}
            value={"300.50m"}
            icon={<MdCurrencyExchange />}
          />
          <Span title={"Domains"} value={"2.98m"} icon={<MdDomain />} />
        </article>
      </div>

      <div className="w-full lg:max-w-[900px] lg:mx-auto text-[#333]">
        <select
          name=""
          id=""
          className="w-full border p-2 border-slate-200 outline-none font-light text-sm"
        >
          <option value="">Protocol</option>
          <option value="">Network</option>
          <option value="">Minting</option>
          <option value="">Airdrop</option>
        </select>
      </div>
      <figure>
        <img
          src={und}
          alt=""
          className="w-full md:w-[500px] mx-auto lg:rounded-full"
        />
      </figure>
      <Footer />
    </section>
  );
};

export default Landing;
