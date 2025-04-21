// scanner_core.js
if (CONFIG.enableScannerCore) {
  setTimeout(startScanner, 500);
}

function startScanner() {
  const syms = JSON.parse(localStorage.getItem("kraken_binance_pairs")||"[]").map(p=>p.binance_equiv);
  logMessage(`Scanning ${syms.length} coins`);
  setInterval(()=>scanSymbols(syms),20000);
}

async function scanSymbols(arr) {
  for (const sym of arr) {
    try {
      const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${sym}&interval=1m&limit=2`);
      const d = await res.json();
      const prev = +d[0][4], curr = +d[1][4];
      const change = ((curr-prev)/prev*100).toFixed(2);
      logMessage(`${sym} ▲${change}%`);
    } catch (e) {
      logMessage(`Err ${sym}: ${e.message}`);
    }
  }
}