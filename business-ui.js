(() => {
  const config = window.BUSINESS_CONFIG || {};
  const t = window.t || ((key, vars) => {
    if (!vars) return key;
    return key.replace(/\{\{(\w+)\}\}/g, (_, k) => (vars[k] ?? ''));
  });
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
      el.textContent = t('business.disclosure', tokens);
    });
    root.querySelectorAll('[data-yoco-merchant-line]').forEach(el => {
      el.textContent = t('business.yoco_merchant_line', tokens);
    });
    root.querySelectorAll('[data-merchant-receipt]').forEach(el => {
      el.textContent = t('business.merchant_receipt', tokens);
    });
    root.querySelectorAll('[data-about-operator-merchant]').forEach(el => {
      el.textContent = t('business.about_operator_merchant', tokens);
    });
  }

  window.applyBusinessText = applyText;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyText());
  } else {
    applyText();
  }
  window.addEventListener('i18n:change', () => applyText());
})();
