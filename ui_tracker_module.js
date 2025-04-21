// ui_tracker_module.js
if (CONFIG.enableUIEnhancements) {
  document.addEventListener("DOMContentLoaded",()=>{
    const tbl = document.createElement('table');
    tbl.innerHTML = '<thead><tr><th>Coin</th><th>Change</th></tr></thead><tbody id="scannerBody"></tbody>';
    document.getElementById('scannerContainer').appendChild(tbl);
  });
}

function logMessage(msg) {
  const lb = document.getElementById('log-box');
  lb.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${msg}</div>`;
}