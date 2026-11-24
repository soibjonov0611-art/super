/* =============================================
   FreshMart - Cart JavaScript (cart.js)
   Cart management: render, quantities, totals
   ============================================= */

'use strict';

// =============================================
// CONSTANTS
// =============================================

const DISCOUNT_CODES = {
  'FRESH10': { pct: 10, label: '10% off your order' },
  'SAVE20':  { pct: 20, label: '20% off your order' },
  'NEWUSER': { pct: 15, label: '15% off for new users' }
};

const DELIVERY_FREE_THRESHOLD = 50;
const DELIVERY_FEE = 4.99;

let appliedDiscount = null;

// =============================================
// INIT
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  initDiscountCode();
  initClearCart();
  renderRecommendations();
});

// =============================================
// RENDER CART
// =============================================

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cartItemsList');
  const emptyState = document.getElementById('emptyCartState');
  const cartSection = document.getElementById('cartItemsSection');
  const orderSummaryEl = document.getElementById('orderSummary');
  const countBadge = document.getElementById('cartCountBadge');

  const totalItems = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
  if (countBadge) countBadge.textContent = totalItems;

  if (!container) return;

  if (cart.length === 0) {
    // Show empty state
    if (emptyState) emptyState.style.display = 'block';
    if (cartSection) cartSection.style.display = 'none';
    if (orderSummaryEl) orderSummaryEl.style.display = 'none';
    return;
  }

  // Show cart
  if (emptyState) emptyState.style.display = 'none';
  if (cartSection) cartSection.style.display = 'flex';
  if (orderSummaryEl) orderSummaryEl.style.display = 'block';

  container.innerHTML = cart.map(item => buildCartItem(item)).join('');
  updateOrderSummary();
}

function buildCartItem(item) {
  const qty = item.qty || 1;
  const total = (item.price * qty).toFixed(2);
  const matched = typeof PRODUCTS !== 'undefined' ? PRODUCTS.find(p => p.id === item.id) : null;
  const imageUrl = (matched && matched.image) || item.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
  const itemName = (matched && matched.name) || item.name;

  return `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-img">
        <img src="${imageUrl}" alt="${escapeHtml(itemName)}" class="cart-item-img-tag" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';">
      </div>

      <div class="cart-item-info">
        <span class="cart-item-category">${item.category || ''}</span>
        <div class="cart-item-name">${escapeHtml(itemName)}</div>
        <div class="cart-item-variant">Unit price: $${item.price.toFixed(2)}</div>
      </div>

      <div class="cart-item-controls">
        <div class="qty-stepper">
          <button class="qty-btn" onclick="decreaseQty(${item.id})">
            <i class="fa-solid fa-minus"></i>
          </button>
          <input type="number" class="qty-value" value="${qty}" min="1" max="99"
            onchange="setQty(${item.id}, this.value)">
          <button class="qty-btn" onclick="increaseQty(${item.id})">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <div class="cart-item-total">$${total}</div>
      </div>

      <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove item">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `;
}

// =============================================
// QUANTITY MANAGEMENT
// =============================================

window.increaseQty = function(id) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = (item.qty || 1) + 1;
    saveCart(cart);
    renderCart();
  }
};

window.decreaseQty = function(id) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    if ((item.qty || 1) <= 1) {
      removeFromCart(id);
      return;
    }
    item.qty = item.qty - 1;
    saveCart(cart);
    renderCart();
  }
};

window.setQty = function(id, value) {
  const qty = parseInt(value);
  if (isNaN(qty) || qty < 1) return;

  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = Math.min(qty, 99);
    saveCart(cart);
    renderCart();
  }
};

window.removeFromCart = function(id) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  const name = item ? item.name : 'Item';

  const updated = cart.filter(i => i.id !== id);
  saveCart(updated);
  showToast('Item Removed', `${name} removed from cart.`, 'info');
  renderCart();
};

// =============================================
// CLEAR CART
// =============================================

function initClearCart() {
  const clearBtn = document.getElementById('clearCartBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your entire cart?')) {
        saveCart([]);
        appliedDiscount = null;
        showToast('Cart Cleared', 'All items have been removed.', 'info');
        renderCart();
      }
    });
  }
}

// =============================================
// ORDER SUMMARY
// =============================================

function updateOrderSummary() {
  const cart = getCart();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
  const delivery = subtotal >= DELIVERY_FREE_THRESHOLD ? 0 : DELIVERY_FEE;

  let discountAmount = 0;
  if (appliedDiscount) {
    discountAmount = subtotal * (appliedDiscount.pct / 100);
  }

  const total = subtotal + delivery - discountAmount;

  // Update DOM
  setTextById('summarySubtotal', `$${subtotal.toFixed(2)}`);
  setTextById('summaryDelivery', delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`);
  setTextById('summaryDiscount', appliedDiscount ? `-$${discountAmount.toFixed(2)}` : '-');
  setTextById('summaryTotal', `$${total.toFixed(2)}`);

  // Show/hide discount line
  const discountLine = document.getElementById('summaryDiscountLine');
  if (discountLine) {
    discountLine.style.display = appliedDiscount ? 'flex' : 'none';
  }

  // Delivery message
  const deliveryMsg = document.getElementById('deliveryFreeMsg');
  if (deliveryMsg) {
    if (delivery === 0) {
      deliveryMsg.textContent = '🎉 You qualify for free delivery!';
      deliveryMsg.style.color = 'var(--primary)';
    } else {
      const remaining = (DELIVERY_FREE_THRESHOLD - subtotal).toFixed(2);
      deliveryMsg.textContent = `Add $${remaining} more for free delivery`;
      deliveryMsg.style.color = 'var(--text-medium)';
    }
  }
}

function setTextById(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// =============================================
// DISCOUNT CODE
// =============================================

function initDiscountCode() {
  const applyBtn = document.getElementById('applyDiscountBtn');
  if (applyBtn) {
    applyBtn.addEventListener('click', applyDiscountCode);
  }

  const discountInput = document.getElementById('discountInput');
  if (discountInput) {
    discountInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') applyDiscountCode();
    });
  }
}

function applyDiscountCode() {
  const input = document.getElementById('discountInput');
  const msgEl = document.getElementById('discountMsg');
  if (!input || !msgEl) return;

  const code = input.value.trim().toUpperCase();
  const discount = DISCOUNT_CODES[code];

  msgEl.className = 'discount-msg';
  msgEl.style.display = 'none';

  if (!code) {
    msgEl.textContent = 'Please enter a discount code.';
    msgEl.className = 'discount-msg error';
    msgEl.style.display = 'block';
    return;
  }

  if (discount) {
    appliedDiscount = discount;
    msgEl.textContent = `✓ Code "${code}" applied — ${discount.label}!`;
    msgEl.className = 'discount-msg success';
    msgEl.style.display = 'block';
    showToast('Discount Applied! 🎉', discount.label, 'success');
    updateOrderSummary();
  } else {
    appliedDiscount = null;
    msgEl.textContent = `❌ Code "${code}" is invalid or expired.`;
    msgEl.className = 'discount-msg error';
    msgEl.style.display = 'block';
    updateOrderSummary();
  }
}

// =============================================
// CHECKOUT
// =============================================

window.proceedToCheckout = function() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Empty Cart', 'Please add items before checkout.', 'warning');
    return;
  }

  const user = getUser();
  if (!user) {
    showToast('Sign In Required', 'Please sign in to proceed to checkout.', 'warning');
    setTimeout(() => window.location.href = 'login.html', 1200);
    return;
  }

  showToast('Redirecting...', 'Taking you to checkout!', 'info');
  // In a real app, redirect to checkout page
};

// =============================================
// RECOMMENDATIONS
// =============================================

function renderRecommendations() {
  const container = document.getElementById('recommendationsGrid');
  if (!container || typeof PRODUCTS === 'undefined') return;

  const cart = getCart();
  const cartIds = cart.map(i => i.id);

  // Pick products not in cart
  const notInCart = PRODUCTS.filter(p => !cartIds.includes(p.id));
  const picks = notInCart.sort(() => Math.random() - 0.5).slice(0, 4);

  container.innerHTML = picks.map(p => buildProductCard(p)).join('');
}

// Make escapeHtml available (also defined in main.js, keeping here as fallback)
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
