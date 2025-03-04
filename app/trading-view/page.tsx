"use client";

import { useEffect, useRef } from "react";

export default function TradingViewPage() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const financialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widgetConfigs = [
      {
        ref: tickerRef,
        src: "ticker-tape",
        config: {
          symbols: [
            { proName: "NASDAQ:AAPL", title: "Apple" },
            { proName: "NASDAQ:GOOGL", title: "Google" },
          ],
          showSymbolLogo: true,
          colorTheme: "dark",
        },
      },
      {
        ref: chartRef,
        src: "advanced-chart",
        config: {
          symbol: "NASDAQ:AAPL",
          theme: "dark",
          width: "100%",
          height: "500",
        },
      },
      {
        ref: profileRef,
        src: "symbol-profile",
        config: {
          width: "100%",
          isTransparent: false,
          colorTheme: "dark",
          symbol: "NASDAQ:AAPL",
          locale: "en",
        },
      },
      {
        ref: financialsRef,
        src: "financials",
        config: {
          symbol: "NASDAQ:AAPL",
          colorTheme: "dark",
          isTransparent: false,
          width: "100%",
          height: "600",
        },
      },
    ];

    widgetConfigs.forEach(({ ref, src, config }) => {
      if (!ref.current) return;
      ref.current.innerHTML = ""; // Clear any previous widgets
      const script = document.createElement("script");
      script.src = `https://s3.tradingview.com/external-embedding/embed-widget-${src}.js`;
      script.async = true;
      script.innerHTML = JSON.stringify(config);
      ref.current.appendChild(script);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white px-6 py-12 overflow-hidden">
      {/* Ticker Widget */}
      <div ref={tickerRef} className="w-full mb-6 bg-gray-800 p-2 rounded-lg shadow-lg" />

      {/* Chart Widget */}
      <div ref={chartRef} className="w-full bg-gray-800 p-4 rounded-lg shadow-lg mb-10" />

      {/* Profile Section */}
      <h2 className="text-xl font-bold text-blue-400 mb-4">AAPL Profile</h2>
      <div ref={profileRef} className="w-full h-[500px] bg-gray-800 p-4 rounded-lg shadow-lg mb-10" />

      {/* Financials Section */}
      <h2 className="text-xl font-bold text-blue-400 mb-4">AAPL Financials</h2>
      <div ref={financialsRef} className="w-full bg-gray-800 p-4 rounded-lg shadow-lg" />
    </div>
  );
}
