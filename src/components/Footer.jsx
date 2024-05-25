import React from "react";
import { FaReddit, FaTelegram, FaTwitch } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-4">
      <p className="text-xs font-thin">
        Copyright Oneos &copy; 2024, All Rights Reserved.
      </p>
      <span className="flex items-center gap-4">
        <FaReddit />
        <FaTelegram />
        <FaTwitch />
      </span>
    </footer>
  );
};

export default Footer;
