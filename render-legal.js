const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, 'business-config.js');
const TARGETS = [
  path.join(ROOT, 'tos.html'),
  path.join(ROOT, 'privacy.html')
];

function loadConfig() {
  const text = fs.readFileSync(CONFIG_PATH, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(text, sandbox);
  const cfg = sandbox.window.BUSINESS_CONFIG || {};
  return {
    brandName: cfg.brandName || 'BRAND_NAME',
    operatorName: cfg.operatorName || 'OPERATOR_NAME',
    merchantName: cfg.merchantName || 'MERCHANT_NAME',
    supportEmail: cfg.supportEmail || 'SUPPORT_EMAIL',
    businessAddress: cfg.businessAddress || 'BUSINESS_ADDRESS',
    termsEffectiveDate: cfg.termsEffectiveDate || 'TERMS_EFFECTIVE_DATE'
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function replaceDataText(html, attr, value) {
  const safe = escapeHtml(value);
  const pattern = new RegExp(`(<[^>]*${attr}[^>]*>)([\\s\\S]*?)(</[^>]+>)`, 'g');
  return html.replace(pattern, `$1${safe}$3`);
}

function renderFile(filePath, tokens) {
  let html = fs.readFileSync(filePath, 'utf8');
  html = replaceDataText(html, 'data-brand-name', tokens.brandName);
  html = replaceDataText(html, 'data-operator-name', tokens.operatorName);
  html = replaceDataText(html, 'data-merchant-name', tokens.merchantName);
  html = replaceDataText(html, 'data-support-email', tokens.supportEmail);
  html = replaceDataText(html, 'data-business-address', tokens.businessAddress);
  html = replaceDataText(html, 'data-terms-effective-date', tokens.termsEffectiveDate);
  html = replaceDataText(
    html,
    'data-merchant-disclosure',
    `Operated by ${tokens.operatorName}, trading under ${tokens.merchantName}. Payments processed by PayFast under ${tokens.merchantName}.`
  );
  fs.writeFileSync(filePath, html);
}

function main() {
  const tokens = loadConfig();
  TARGETS.forEach(filePath => renderFile(filePath, tokens));
  console.log('Legal pages rendered with business-config.js values.');
}

main();
