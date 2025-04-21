// config_ui_module.js
if (CONFIG.enableUIEnhancements) {
  const panel = document.getElementById('configPanel');
  panel.innerHTML = '<label>Thresh %: <input id="th" value="2"/></label>';
}