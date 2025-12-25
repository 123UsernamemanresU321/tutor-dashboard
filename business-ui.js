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
      el.textContent = `Service operated by ${tokens.operatorName}; merchant of record: ${tokens.merchantName}; payments processed securely via PayFast.`;
    });
    root.querySelectorAll('[data-yoco-merchant-line]').forEach(el => {
      el.textContent = `Payments are processed securely by PayFast (merchant: ${tokens.merchantName}).`;
    });
    root.querySelectorAll('[data-merchant-receipt]').forEach(el => {
      el.textContent = `Merchant: ${tokens.merchantName}. Service Provider/Operator: ${tokens.operatorName}.`;
    });
    root.querySelectorAll('[data-about-operator-merchant]').forEach(el => {
      el.textContent = `Tutoring is delivered by ${tokens.operatorName}. Merchant of record: ${tokens.merchantName}. Payments are processed via PayFast.`;
    });
  }

  window.applyBusinessText = applyText;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyText());
  } else {
    applyText();
  }
})();
