import { useState, useMemo } from "react";
import HoldingsData from "../Data/HoldingData.json";

const COIN_META = {
  BTC:  { icon: "₿",  color: "#f7931a" },
  ETH:  { icon: "Ξ",  color: "#627eea" },
  USDT: { icon: "₮",  color: "#26a17b" },
  MATIC:{ icon: "M",  color: "#8247e5" },
  SOL:  { icon: "◎",  color: "#9945ff" },
  XRP:  { icon: "✕",  color: "#346aa9" },
  ADA:  { icon: "A",  color: "#0033ad" },
  DOGE: { icon: "D",  color: "#c2a633" },
  DOT:  { icon: "●",  color: "#e6007a" },
  BNB:  { icon: "B",  color: "#f0b90b" },
  LTC:  { icon: "Ł",  color: "#9b9b9b" },
  AVAX: { icon: "A",  color: "#e84142" },
  SHIB: { icon: "S",  color: "#f00500" },
  TRX:  { icon: "T",  color: "#ff060a" },
  ATOM: { icon: "⚛", color: "#2e3148" },
  LINK: { icon: "⬡", color: "#375bd2" },
  UNI:  { icon: "U",  color: "#ff007a" },
  ICP:  { icon: "I",  color: "#29abe2" },
  NEAR: { icon: "N",  color: "#00c08b" },
  ALGO: { icon: "a",  color: "#000000" },
};

const PRE = { stcgP: 1540, stcgL: 743, ltcgP: 1200, ltcgL: 650 };

const fmtUSD = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(n));

const fmtHolding = (n, coin) => {
  const decimals = n < 1 ? 4 : n < 100 ? 2 : 0;
  return `${n.toLocaleString("en-US", { maximumFractionDigits: decimals })} ${coin}`;
};

const GainCell = ({ value, balance, coin }) => {
  const isNeg = value < 0;
  return (
    <div>
      <span className={isNeg ? "text-red-500 dark:text-red-400" : "text-green-600 dark:text-green-400"}>
        {isNeg ? "-" : "+"}{fmtUSD(value)}
      </span>
      <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
        {fmtHolding(balance ?? 0, coin)}
      </div>
    </div>
  );
};

const StatRow = ({ label, st, lt, bold, inverted }) => {
  const base = inverted
    ? "text-white/90"
    : "text-slate-700 dark:text-slate-200";
  const labelCls = inverted
    ? "text-white/70 text-sm"
    : "text-slate-500 dark:text-slate-400 text-sm";
  const weight = bold ? "font-semibold" : "font-normal";
  return (
    <div className={`grid grid-cols-3 py-2 border-b ${inverted ? "border-white/15" : "border-slate-100 dark:border-slate-700/60"} ${weight}`}>
      <span className={labelCls}>{label}</span>
      <span className={`text-right ${base} text-sm`}>{st}</span>
      <span className={`text-right ${base} text-sm`}>{lt}</span>
    </div>
  );
};

export default function TaxHarvestingDashboard() {
  const [selectedCoins, setSelectedCoins] = useState(new Set());
  const [showAll, setShowAll] = useState(false);

  const preNetST = PRE.stcgP - PRE.stcgL;
  const preNetLT = PRE.ltcgP - PRE.ltcgL;
  const preTotalRealized = preNetST + preNetLT;

  const post = useMemo(() => {
    let stP = PRE.stcgP, stL = PRE.stcgL, ltP = PRE.ltcgP, ltL = PRE.ltcgL;
    HoldingsData.forEach((a) => {
      if (!selectedCoins.has(a.coin)) return;
      const sg = a.stcg?.gain ?? 0;
      const lg = a.ltcg?.gain ?? 0;
      if (sg > 0) stP += sg; else stL += Math.abs(sg);
      if (lg > 0) ltP += lg; else ltL += Math.abs(lg);
    });
    const netST = stP - stL;
    const netLT = ltP - ltL;
    return { stP, stL, ltP, ltL, netST, netLT, total: netST + netLT };
  }, [selectedCoins]);

  const savings = preTotalRealized - post.total;

  const toggle = (coin) => {
    setSelectedCoins((prev) => {
      const next = new Set(prev);
      next.has(coin) ? next.delete(coin) : next.add(coin);
      return next;
    });
  };

  const toggleAll = (e) => {
    setSelectedCoins(
      e.target.checked ? new Set(HoldingsData.map((a) => a.coin)) : new Set()
    );
  };

  const allChecked = selectedCoins.size === HoldingsData.length;
  const indeterminate = selectedCoins.size > 0 && !allChecked;

  const displayedData = showAll ? HoldingsData : HoldingsData.slice(0, 6);

  const signedFmt = (n) =>
    `${n < 0 ? "-" : ""}${fmtUSD(n)}`;

  return (
    <div className="mt-6 space-y-5">
      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-4 ">
        {/* Pre Harvesting */}
        <div className="bg-white dark:bg-gray-800  dark:border-green-600 rounded-2xl p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-800 dark:text-gray-100 mb-3">
            Pre Harvesting
          </h2>
          <div className="grid grid-cols-3 mb-1">
            <span />
            <span className="text-right text-xs text-slate-400 dark:text-slate-500">Short-term</span>
            <span className="text-right text-xs text-slate-400 dark:text-slate-500">Long-term</span>
          </div>
          <StatRow label="Profits" st={`$${PRE.stcgP.toLocaleString()}`} lt={`$${PRE.ltcgP.toLocaleString()}`} />
          <StatRow label="Losses" st={`-$${PRE.stcgL.toLocaleString()}`} lt={`-$${PRE.ltcgL.toLocaleString()}`} />
          <StatRow label="Net Capital Gains" st={signedFmt(preNetST)} lt={signedFmt(preNetLT)} bold />
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">Realised Capital Gains:</span>
            <span className="text-2xl font-bold text-slate-800 dark:text-gray-100">
              {signedFmt(preTotalRealized)}
            </span>
          </div>
        </div>

        {/* After Harvesting */}
        <div className="bg-blue-600 rounded-2xl p-5 shadow-sm">
          <h2 className="text-base font-semibold text-white mb-3">After Harvesting</h2>
          <div className="grid grid-cols-3 mb-1">
            <span />
            <span className="text-right text-xs text-white/60">Short-term</span>
            <span className="text-right text-xs text-white/60">Long-term</span>
          </div>
          <StatRow label="Profits" st={`$${post.stP.toLocaleString()}`} lt={`$${post.ltP.toLocaleString()}`} inverted />
          <StatRow label="Losses" st={`-$${post.stL.toLocaleString()}`} lt={`-$${post.ltL.toLocaleString()}`} inverted />
          <StatRow label="Net Capital Gains" st={signedFmt(post.netST)} lt={signedFmt(post.netLT)} bold inverted />
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-sm text-white/70">Effective Capital Gains:</span>
            <span className="text-2xl font-bold text-white">{signedFmt(post.total)}</span>
          </div>
          {savings > 0 && (
            <div className="mt-2 inline-flex items-center gap-1.5 bg-white/15 text-white text-xs px-3 py-1.5 rounded-lg">
              <span>🎉</span>
              <span>You are going to save upto ${Math.round(savings).toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-gray-700">
          <h2 className="text-base font-semibold text-slate-800 dark:text-gray-100">Holdings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-gray-700">
                <th className="px-4 py-3 text-left w-10">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    ref={(el) => { if (el) el.indeterminate = indeterminate; }}
                    onChange={toggleAll}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400">
                  Asset
                  <span className="block font-normal text-slate-400 dark:text-slate-500">
                    Current Market Rate
                  </span>
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400">Holdings</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:table-cell">
                  Total Current Value
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400">Short-term</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400">Long-term</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400">Amount to Sell</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((asset) => {
                const sel = selectedCoins.has(asset.coin);
                const meta = COIN_META[asset.coin] ?? { icon: asset.coin[0], color: "#888" };
                const totalVal = asset.totalHolding * asset.currentPrice;
                const sg = asset.stcg?.gain ?? 0;
                const lg = asset.ltcg?.gain ?? 0;
                const price = asset.currentPrice >= 1
                  ? `$${asset.currentPrice.toLocaleString("en-US", { maximumFractionDigits: 2 })}`
                  : `$${asset.currentPrice.toFixed(6)}`;

                return (
                  <tr
                    key={asset.coin}
                    onClick={() => toggle(asset.coin)}
                    className={`border-b border-slate-50 dark:border-gray-700/60 cursor-pointer transition-colors
                      ${sel
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : "hover:bg-slate-50 dark:hover:bg-gray-700/40"
                      }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={sel}
                        onChange={() => toggle(asset.coin)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 accent-blue-600 cursor-pointer"
                      />
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                          style={{ background: `${meta.color}22`, color: meta.color }}
                        >
                          {meta.icon}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-800 dark:text-gray-100">
                            {asset.coinName}
                          </div>
                          <div className="text-xs text-slate-400 dark:text-slate-500">
                            {asset.coin} · {price}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700 dark:text-gray-200">
                      {fmtHolding(asset.totalHolding, asset.coin)}
                      <div className="text-xs text-slate-400 dark:text-slate-500">
                        {fmtUSD(totalVal)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-700 dark:text-gray-200 hidden sm:table-cell">
                      {fmtUSD(totalVal)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <GainCell value={sg} balance={asset.stcg?.balance} coin={asset.coin} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <GainCell value={lg} balance={asset.ltcg?.balance} coin={asset.coin} />
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-500 dark:text-slate-400">
                      {sel ? fmtHolding(asset.totalHolding, asset.coin) : "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          onClick={() => setShowAll((v) => !v)}
          className="w-full py-3 text-sm text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-gray-700/40 transition-colors border-t border-slate-100 dark:border-gray-700 font-medium"
        >
          {showAll ? "Show less" : "View all"}
        </button>
      </div>
    </div>
  );
}