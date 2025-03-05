"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TokenList } from "@/components/tokenlist";
import { OrderList } from "@/components/orderlist";
import { DexPairInfo } from "@/components/pairdata";
import { Order, TokenBoost, TokenProfile } from "../types";

export default function DexScreenerTokenData() {
  const [tokens, setTokens] = useState<TokenProfile[]>([]);
  const [boosts, setBoosts] = useState<TokenBoost[]>([]);
  const [topBoosts, setTopBoosts] = useState<TokenBoost[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "profiles" | "boosts" | "topBoosts" | "orders" | "multiplePairs" | string
  >("profiles");

  const [chainId, setChainId] = useState<string>("");
  const [tokenAddress, setTokenAddress] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profilesRes, boostsRes, topBoostsRes] = await Promise.all([
          fetch("https://api.dexscreener.com/token-profiles/latest/v1"),
          fetch("https://api.dexscreener.com/token-boosts/latest/v1"),
          fetch("https://api.dexscreener.com/token-boosts/top/v1"),
        ]);

        if (!profilesRes.ok || !boostsRes.ok || !topBoostsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [profilesData, boostsData, topBoostsData] = await Promise.all([
          profilesRes.json(),
          boostsRes.json(),
          topBoostsRes.json(),
        ]);

        setTokens(Array.isArray(profilesData) ? profilesData : []);
        setBoosts(Array.isArray(boostsData) ? boostsData : []);
        setTopBoosts(Array.isArray(topBoostsData) ? topBoostsData : []);
      } catch (err) {
        console.log(err);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchOrders = async () => {
    if (!chainId || !tokenAddress) {
      setError("Please enter Chain ID and Token Address");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderRes = await fetch(
        `https://api.dexscreener.com/orders/v1/${chainId}/${tokenAddress}`
      );

      if (!orderRes.ok) {
        throw new Error("Failed to fetch orders");
      }

      const orderData = await orderRes.json();
      setOrders(Array.isArray(orderData) ? orderData : []);
    } catch (err) {
      console.error(err);
      setError("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <p className="text-white text-center text-lg mt-6">Loading...</p>;
  if (error) return console.log(error);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        DexScreener Token Data
      </h1>

      <div className="flex justify-center mb-6 border-b border-gray-600">
        <div className="flex space-x-6 relative">
          {["profiles", "boosts", "topBoosts", "orders", "multiplePairs"].map(
            (tab) => (
              <div
                key={tab}
                className="relative cursor-pointer px-4 py-2 text-lg font-semibold"
                onClick={() => setActiveTab(tab)}
              >
                <motion.span
                  animate={{ scale: activeTab === tab ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                  className={`relative ${
                    activeTab === tab ? "text-blue-500" : "text-gray-400"
                  }`}
                >
                  {tab === "profiles"
                    ? "Token Profiles"
                    : tab === "boosts"
                    ? "Token Boosts"
                    : tab === "topBoosts"
                    ? "Top Boosts"
                    : tab === "orders"
                    ? "Orders"
                    : "Multiple Pairs"}
                </motion.span>
                {activeTab === tab && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 bottom-0 w-full h-1 bg-blue-500 rounded"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </div>
            )
          )}
        </div>
      </div>

      {activeTab === "orders" && (
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
            placeholder="Enter Token Address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            className="px-4 py-2 mr-4 rounded bg-gray-900 text-white border-2 border-gray-600 focus:border-blue-500 focus:outline-none"
          />

          <button
            onClick={fetchOrders}
            className="ml-4 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            Fetch Orders
          </button>
        </div>
      )}

      {activeTab === "profiles" ? (
        <TokenList tokens={tokens} />
      ) : activeTab === "boosts" ? (
        <TokenList tokens={boosts} isBoost />
      ) : activeTab === "topBoosts" ? (
        <TokenList tokens={topBoosts} isBoost />
      ) : activeTab === "orders" ? (
        <OrderList orders={orders} />
      ) : (
        <DexPairInfo />
      )}
    </div>
  );
}
