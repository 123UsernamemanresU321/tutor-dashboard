(() => {
  const config = window.BUSINESS_CONFIG || {};
  const tokens = {
    brandName: config.brandName || 'BRAND_NAME',
    operatorName: config.operatorName || 'OPERATOR_NAME',
    merchantName: config.merchantName || 'MERCHANT_NAME',
    supportEmail: config.supportEmail || 'SUPPORT_EMAIL',
    businessAddress: config.businessAddress || 'BUSINESS_ADDRESS',
    termsEffectiveDate: config.termsEffectiveDate || 'TERMS_EFFECTIVE_DATE'
  };

  function applyText(root = document) {
    root.querySelectorAll('[data-brand-name]').forEach(el => {
      el.textContent = tokens.brandName;
    });
    root.querySelectorAll('[data-operator-name]').forEach(el => {
      el.textContent = tokens.operatorName;
    });
    root.querySelectorAll('[data-merchant-name]').forEach(el => {
      el.textContent = tokens.merchantName;
    });
    root.querySelectorAll('[data-support-email]').forEach(el => {
      el.textContent = tokens.supportEmail;
      if (el.tagName === 'A') {
        el.setAttribute('href', `mailto:${tokens.supportEmail}`);
      }
    });
    root.querySelectorAll('[data-business-address]').forEach(el => {
      el.textContent = tokens.businessAddress;
    });
    root.querySelectorAll('[data-terms-effective-date]').forEach(el => {
      el.textContent = tokens.termsEffectiveDate;
    });
    root.querySelectorAll('[data-merchant-disclosure]').forEach(el => {
      el.textContent = `Operated by ${tokens.operatorName}, trading under ${tokens.merchantName}. Payments processed by Yoco under ${tokens.merchantName}.`;
    });
    root.querySelectorAll('[data-yoco-merchant-line]').forEach(el => {
      el.textContent = `Payments are processed securely by Yoco (merchant: ${tokens.merchantName}).`;
    });
    root.querySelectorAll('[data-merchant-receipt]').forEach(el => {
      el.textContent = `Merchant: ${tokens.merchantName}. Service Provider/Operator: ${tokens.operatorName}.`;
    });
    root.querySelectorAll('[data-about-operator-merchant]').forEach(el => {
      el.textContent = `Tutoring is delivered by ${tokens.operatorName}. Payments are handled through Yoco under ${tokens.merchantName} as merchant of record.`;
    });
  }

  window.applyBusinessText = applyText;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyText());
  } else {
    applyText();
  }
})();
