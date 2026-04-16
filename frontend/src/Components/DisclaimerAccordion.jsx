import { useState } from "react";

const DisclaimerAccordion = () => {
  const [open, setOpen] = useState(false);

  const data = [
    "Tax loss harvesting is currently not allowed under Indian tax regulations.",
    "Does not apply to derivatives or futures.",
    "Prices are fetched from Coingecko.",
    "Some countries do not differentiate STCG & LTCG.",
    "Only realized losses are counted."
  ];

  return (
    <div
      className="
        rounded-xl overflow-hidden transition-all
        border border-blue-200 dark:border-blue-800
        bg-blue-50 dark:bg-blue-900/20
      "
    >
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full flex justify-between items-center p-4
          text-blue-900 dark:text-blue-200
          hover:bg-blue-100 dark:hover:bg-blue-900/40
        "
      >
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 flex items-center justify-center rounded-full border border-blue-400 text-xs font-bold">
            i
          </span>
          <span className="text-sm font-medium">
            Important Notes & Disclaimers
          </span>
        </div>

        <span
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Content */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-8 pb-6 space-y-3 text-sm list-disc text-slate-700 dark:text-slate-300">
          {data.map((item, i) => (
            <li key={i} className="pl-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DisclaimerAccordion;