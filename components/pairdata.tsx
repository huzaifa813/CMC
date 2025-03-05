import { PairData } from "@/app/types";
import { useState } from "react";

export function DexPairInfo() {
  const [chainId, setChainId] = useState<string>("");
  const [pairId, setPairId] = useState<string>("");
  const [pairData, setPairData] = useState<PairData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPairData = async () => {
    if (!chainId || !pairId) {
      setError("Please enter Chain ID and Pair ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/pairs/${chainId}/${pairId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data.pairs && data.pairs.length > 0) {
        setPairData(data.pairs[0]);
      } else {
        setError("No pair data found.");
        setPairData(null);
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching data");
      setPairData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Input Fields */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Enter Chain ID"
          value={chainId}
          onChange={(e) => setChainId(e.target.value)}
          className="px-4 py-2 mr-4 rounded bg-gray-900 text-white border-2 border-gray-600 focus:border-blue-500 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Enter Pair ID"
          value={pairId}
          onChange={(e) => setPairId(e.target.value)}
          className="px-4 py-2 mr-4 rounded bg-gray-900 text-white border-2 border-gray-600 focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={fetchPairData}
          className="ml-4 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          Fetch Data
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Loading State */}
      {loading && <p className="text-white text-center">Loading...</p>}

      {/* Display Pair Data */}
      {pairData && (
        <div className="mt-6 p-6 bg-gray-800 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold">Pair Information</h2>
          <p className="text-gray-400">Chain ID: {pairData.chainId}</p>
          <p className="text-gray-400">
            Dex:{" "}
            <a href={pairData.url} className="text-blue-400">
              {pairData.dexId}
            </a>
          </p>
          <p className="text-gray-400">Pair Address: {pairData.pairAddress}</p>
          <p className="text-green-400">
            Price (Native): {pairData.priceNative}
          </p>
          <p className="text-green-400">Price (USD): ${pairData.priceUsd}</p>
          <p className="text-yellow-400">
            Market Cap: ${pairData.marketCap.toLocaleString()}
          </p>
          <p className="text-yellow-400">
            FDV: ${pairData.fdv.toLocaleString()}
          </p>
          <p className="text-gray-400">
            Liquidity (USD): ${pairData.liquidity.usd.toLocaleString()}
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Base Token</h3>
            <p className="text-gray-400">
              {pairData.baseToken.name} ({pairData.baseToken.symbol})
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Quote Token</h3>
            <p className="text-gray-400">
              {pairData.quoteToken.name} ({pairData.quoteToken.symbol})
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
