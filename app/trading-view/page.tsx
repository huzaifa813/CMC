"use client";

import { useEffect, useRef } from "react";

export default function TradingViewPage() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const financialsRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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
          height: "300",
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
          height: "800",
        },
      },
      {
        ref: analysisRef,
        src: "technical-analysis",
        config: {
          interval: "1m",
          width: "100%",
          height: "450",
          symbol: "NASDAQ:AAPL",
          showIntervalTabs: true,
          displayMode: "single",
          locale: "en",
          colorTheme: "dark",
        },
      },
      {
        ref: timelineRef,
        src: "timeline",
        config: {
          feedMode: "all_symbols",
          isTransparent: false,
          displayMode: "regular",
          width: "100%",
          height: "450",
          colorTheme: "dark",
          locale: "en",
        },
      },
    ];

    widgetConfigs.forEach(({ ref, src, config }) => {
      if (!ref.current) return;
      ref.current.innerHTML = "";
      const script = document.createElement("script");
      script.src = `https://s3.tradingview.com/external-embedding/embed-widget-${src}.js`;
      script.async = true;
      script.innerHTML = JSON.stringify(config);
      ref.current.appendChild(script);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white px-6 py-12">
      {/* Ticker Widget */}
      <div ref={tickerRef} className="w-full p-2 rounded-lg shadow-lg" />

      {/* Chart Widget */}
      <div ref={chartRef} className="w-full p-4 rounded-lg shadow-lg mb-10" />

      {/* Profile Section */}
      <div ref={profileRef} className="w-full p-4 rounded-lg shadow-lg mb-10" />

      {/* Financials Section */}
      <div
        ref={financialsRef}
        className="w-full p-4 rounded-lg shadow-lg mb-10"
      />

      {/* Row Layout for Analysis & Timeline */}
      <div className="flex flex-row gap-6">
        {/* Technical Analysis Section */}
        <div className="w-1/2 p-4 rounded-lg shadow-lg bg-gray-800">
          <div ref={analysisRef} className="w-full" />
        </div>

        {/* Timeline Widget Section */}
        <div className="w-1/2 p-4 rounded-lg shadow-lg bg-gray-800">
          <div ref={timelineRef} className="w-full" />
        </div>
      </div>
    </div>
  );
}
