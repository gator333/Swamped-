// kraken_mapper.js
if (CONFIG.enableKrakenFetcher) {
  document.addEventListener("DOMContentLoaded", () => {
    createKrakenUI();
    validateKrakenCache();
  });
}

function createKrakenUI() {
  const c = document.createElement('div');
  c.innerHTML = '<button onclick="fetchAndMapKrakenPairs()">🦦 Update Kraken Symbols</button>';
  document.body.prepend(c);
}

function logMessage(msg) {
  const lb = document.getElementById('log-box');
  lb.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${msg}</div>`;
}

function validateKrakenCache() {
  const raw = localStorage.getItem("kraken_binance_pairs");
  logMessage(!raw?"No Kraken list found.":"Kraken list loaded.");
}

async function fetchAndMapKrakenPairs() {
  const res = await fetch("https://api.kraken.com/0/public/AssetPairs");
  const data = await res.json();
  const mapped = Object.entries(data.result).map(([id,p])=>({
    kraken:id,
    binance_equiv:(p.base+p.quote).replace(/X|Z/g,'').toUpperCase()
  }));
  localStorage.setItem("kraken_binance_pairs", JSON.stringify(mapped));
  logMessage(`Fetched ${mapped.length} pairs`);
}