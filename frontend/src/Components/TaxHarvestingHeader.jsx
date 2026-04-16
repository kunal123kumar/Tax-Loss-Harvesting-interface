import { useState } from "react";

const TaxHarvestingHeader = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex items-center gap-4 mb-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Tax Harvesting
      </h1>

      <div className="relative inline-block">
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="
            text-blue-600 dark:text-blue-400
            text-sm font-medium underline underline-offset-4
            hover:text-blue-500
          "
        >
          How it works?
        </button>

        {showTooltip && (
          <div
            className="
              absolute z-50 bottom-full left-0 mb-2 w-72
              bg-white dark:bg-gray-900
              text-slate-800 dark:text-gray-200
              p-4 rounded-lg shadow-xl text-xs
              border border-slate-200 dark:border-gray-700
            "
          >
            <p>
              Tax-loss harvesting helps reduce your taxable gains by
              offsetting profits with losses.
              <span className="text-blue-600 dark:text-blue-400 ml-1 cursor-pointer font-semibold">
                Know More
              </span>
            </p>

            <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white dark:bg-gray-900 rotate-45 border-r border-b border-slate-200 dark:border-gray-700"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxHarvestingHeader;