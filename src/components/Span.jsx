import React from "react";

const Span = ({ title, value, icon }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="font-bold text-slate-700 flex items-center gap-1">
        {icon}
        {title}
      </p>
      <p className="text-orange-500 text-xs">{value}</p>
    </div>
  );
};

export default Span;
