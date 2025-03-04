"use client";

import { useEffect, useRef } from "react";

export default function ForexTradingViewPage() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const forexScreenerRef = useRef<HTMLDivElement>(null);
  const stocksScreenerRef = useRef<HTMLDivElement>(null);
  const financialsRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const forexCrossRatesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widgetConfigs = [
      {
        ref: tickerRef,
        src: "ticker-tape",
        config: {
          symbols: [
            { proName: "OANDA:EURUSD", title: "EUR/USD" },
            { proName: "OANDA:GBPUSD", title: "GBP/USD" },
            { proName: "OANDA:USDJPY", title: "USD/JPY" },
            { proName: "NASDAQ:AAPL", title: "Apple" },
            { proName: "NASDAQ:GOOGL", title: "Google" },
            { proName: "INDEX:DXY", title: "US Dollar Index" },
            { proName: "INDEX:SPX", title: "S&P 500" },
          ],
          showSymbolLogo: true,
          colorTheme: "dark",
        },
      },
      {
        ref: chartRef,
        src: "advanced-chart",
        config: {
          symbol: "OANDA:EURUSD",
          theme: "dark",
          width: "100%",
          height: "500",
        },
      },
      {
        ref: forexScreenerRef,
        src: "screener",
        config: {
          colorTheme: "dark",
          isTransparent: false,
          showSymbolLogo: true,
          width: "100%",
          height: "700",
          defaultColumn: "overview",
          screener_type: "forex",
          displayCurrency: "USD",
          locale: "en",
        },
      },
      {
        ref: stocksScreenerRef,
        src: "screener",
        config: {
          width: "100%",
          height: "700",
          defaultColumn: "overview",
          defaultScreen: "general",
          market: "forex",
          showToolbar: true,
          colorTheme: "dark",
          locale: "en",
        },
      },
      {
        ref: financialsRef,
        src: "financials",
        config: {
          symbol: "OANDA:EURUSD",
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
          symbol: "OANDA:EURUSD",
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
      {
        ref: forexCrossRatesRef,
        src: "forex-cross-rates",
        config: {
          width: "100%",
          height: "400",
          currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
          isTransparent: false,
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
      <div ref={tickerRef} className="w-full p-2 rounded-lg shadow-lg" />
      <div ref={chartRef} className="w-full p-4 rounded-lg shadow-lg mb-10" />
      <div
        ref={forexCrossRatesRef}
        className="w-full p-4 rounded-lg shadow-lg mt-10"
      />
      <div
        ref={forexScreenerRef}
        className="w-full p-4 rounded-lg shadow-lg mb-10"
      />

      <div className="flex flex-row gap-6">
        <div className="w-1/2 p-4 rounded-lg shadow-lg bg-gray-800">
          <div ref={analysisRef} className="w-full" />
        </div>
        <div className="w-1/2 p-4 rounded-lg shadow-lg bg-gray-800">
          <div ref={timelineRef} className="w-full" />
        </div>
      </div>
    </div>
  );
}
