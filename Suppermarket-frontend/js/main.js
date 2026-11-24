/* =============================================
   FreshMart - Main JavaScript (main.js)
   Shared functionality: navbar, cart count,
   toast notifications, flash sale timer
   ============================================= */

'use strict';

// =============================================
// CART UTILITIES (shared)
// =============================================

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('freshmart_cart')) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('freshmart_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  showToast('Added to Cart', `${product.name} has been added to your cart.`, 'success');
  animateCartIcon();
}

function getTotalCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.qty || 1), 0);
}

function updateCartBadge() {
  const count = getTotalCartCount();
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

function animateCartIcon() {
  const cartBtns = document.querySelectorAll('.cart-action-btn');
  cartBtns.forEach(btn => {
    btn.classList.add('bounce');
    setTimeout(() => btn.classList.remove('bounce'), 500);
  });
}

// =============================================
// WISHLIST UTILITIES
// =============================================

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem('freshmart_wishlist')) || [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(list) {
  localStorage.setItem('freshmart_wishlist', JSON.stringify(list));
}

function toggleWishlist(productId, productName) {
  const list = getWishlist();
  const idx = list.indexOf(productId);
  if (idx > -1) {
    list.splice(idx, 1);
    showToast('Removed from Wishlist', `${productName} removed.`, 'info');
  } else {
    list.push(productId);
    showToast('Added to Wishlist', `${productName} saved to your wishlist! 💚`, 'success');
  }
  saveWishlist(list);
  return idx === -1;
}

function isWishlisted(productId) {
  return getWishlist().includes(productId);
}

// =============================================
// TOAST NOTIFICATIONS
// =============================================

function showToast(title, message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: { icon: 'fa-circle-check', color: '#FF5A36' },
    error:   { icon: 'fa-circle-xmark', color: '#E53935' },
    warning: { icon: 'fa-triangle-exclamation', color: '#FF6F00' },
    info:    { icon: 'fa-circle-info', color: '#1976D2' }
  };

  const { icon } = icons[type] || icons.success;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon"><i class="fa-solid ${icon}"></i></div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-msg">${message}</div>` : ''}
    </div>
    <button class="toast-close" onclick="removeToast(this.closest('.toast'))">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => removeToast(toast), 3500);
}

function removeToast(toast) {
  if (!toast || toast._removing) return;
  toast._removing = true;
  toast.classList.add('removing');
  setTimeout(() => toast.remove(), 300);
}

// =============================================
// NAVBAR - SCROLL EFFECT
// =============================================

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handler = () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handler, { passive: true });
  handler();
}

// =============================================
// NAVBAR - MOBILE MENU
// =============================================

function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
    }
  });
}

// =============================================
// NAVBAR - SEARCH
// =============================================

function initNavbarSearch() {
  const searchInputs = document.querySelectorAll('.search-input, .mobile-search-input');
  const searchBtns = document.querySelectorAll('.search-btn, .mobile-search-btn');
  const categorySelects = document.querySelectorAll('.search-category');

  function doSearch(inputEl) {
    const query = inputEl ? inputEl.value.trim() : '';
    const parent = inputEl ? inputEl.closest('.navbar-search, .mobile-nav-search') : null;
    const catSelect = parent ? parent.querySelector('.search-category') : null;
    const cat = catSelect ? catSelect.value : 'All';

    let url = 'products.html';
    const params = [];
    if (query) params.push(`search=${encodeURIComponent(query)}`);
    if (cat && cat !== 'All') params.push(`cat=${encodeURIComponent(cat)}`);

    if (params.length > 0) url += `?${params.join('&')}`;
    window.location.href = url;
  }

  searchInputs.forEach(input => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') doSearch(input);
    });
  });

  searchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.navbar-search, .mobile-nav-search')?.querySelector('input');
      doSearch(input);
    });
  });

  categorySelects.forEach(select => {
    select.addEventListener('change', () => {
      const cat = select.value;
      const input = select.closest('.navbar-search')?.querySelector('.search-input');
      const query = input ? input.value.trim() : '';
      if (query) {
        doSearch(input);
      } else if (cat && cat !== 'All') {
        window.location.href = `products.html?cat=${encodeURIComponent(cat)}`;
      } else {
        window.location.href = `products.html`;
      }
    });
  });
}

// =============================================
// USER - AUTH STATE
// =============================================

function getUser() {
  try {
    return JSON.parse(localStorage.getItem('freshmart_user')) || null;
  } catch (e) {
    return null;
  }
}

function initAuthState() {
  const user = getUser();
  const avatarEls = document.querySelectorAll('.nav-user-avatar');

  avatarEls.forEach(el => {
    if (user) {
      const initials = `${(user.firstName || 'U')[0]}${(user.lastName || '')[0] || ''}`.toUpperCase();
      el.textContent = initials;
      el.title = `${user.firstName} ${user.lastName}`;
      el.href = 'profile.html';
    } else {
      el.innerHTML = '<i class="fa-solid fa-user"></i>';
      el.href = 'login.html';
    }
  });
}

// =============================================
// FLASH SALE - COUNTDOWN TIMER
// =============================================

let countdownInterval = null;

function initFlashSaleTimer() {
  const timerEl = document.querySelector('.countdown-parts');
  if (!timerEl) return;

  // Store end time in session so it persists on reload
  let endTime = sessionStorage.getItem('freshmart_flash_end');
  if (!endTime) {
    endTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
    sessionStorage.setItem('freshmart_flash_end', endTime);
  }

  endTime = parseInt(endTime);

  function updateTimer() {
    const now = Date.now();
    const diff = endTime - now;

    if (diff <= 0) {
      clearInterval(countdownInterval);
      endTime = Date.now() + 24 * 60 * 60 * 1000;
      sessionStorage.setItem('freshmart_flash_end', endTime);
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const hEl = document.getElementById('countdown-hours');
    const mEl = document.getElementById('countdown-minutes');
    const sEl = document.getElementById('countdown-seconds');

    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
    if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
}

// =============================================
// PRODUCT CARD BUILDER (shared)
// =============================================

function buildProductCard(product) {
  const wishlisted = isWishlisted(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : (product.discountPercent || 0);

  const stars = renderStars(product.rating || 4);
  const imageUrl = product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-card-image">
        <img src="${imageUrl}" alt="${escapeHtml(product.name)}" class="product-img" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';">
        <div class="product-card-badges">
          ${product.isNew ? '<span class="badge-new">New</span>' : ''}
          ${discountPct > 0 ? `<span class="badge-sale">-${discountPct}%</span>` : ''}
          ${!product.inStock ? '<span class="badge-out">Out of Stock</span>' : ''}
        </div>
        <button class="wishlist-btn ${wishlisted ? 'active' : ''}"
          onclick="handleWishlistToggle(this, ${product.id}, '${escapeHtml(product.name)}')"
          title="${wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
          <i class="fa-${wishlisted ? 'solid' : 'regular'} fa-heart"></i>
        </button>
        <button class="product-quick-view-btn" onclick="openQuickView(${product.id}, event)">
          <i class="fa-regular fa-eye"></i> Quick View
        </button>
      </div>
      <div class="product-card-body">
        <span class="product-category-tag">${product.category}</span>
        <h3 class="product-name">${escapeHtml(product.name)}</h3>
        <div class="product-rating">
          <div class="stars">${stars}</div>
          <span class="rating-count">(${product.ratingCount || Math.floor(Math.random() * 300 + 50)})</span>
        </div>
        <div class="product-price">
          <span class="price-current">$${product.price.toFixed(2)}</span>
          ${hasDiscount ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
          ${discountPct > 0 ? `<span class="discount-pct">${discountPct}% off</span>` : ''}
        </div>
      </div>
      <div class="product-card-footer">
        <button class="add-to-cart-btn" ${!product.inStock ? 'disabled' : ''}
          onclick="handleAddToCart(${product.id}, this)">
          <i class="fa-solid fa-cart-plus"></i>
          ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  `;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    '<i class="fa-solid fa-star"></i>'.repeat(full) +
    (half ? '<i class="fa-solid fa-star-half-stroke"></i>' : '') +
    '<i class="fa-regular fa-star"></i>'.repeat(empty)
  );
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// =============================================
// GLOBAL EVENT HANDLERS (product cards)
// =============================================

window.handleAddToCart = function(productId, btnEl) {
  const products = window.PRODUCTS || window.PRODUCTS_DATA || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  addToCart(product);

  if (btnEl) {
    const originalText = btnEl.innerHTML;
    btnEl.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
    btnEl.style.background = 'linear-gradient(135deg, #E03E15, #FF5A36)';
    setTimeout(() => {
      btnEl.innerHTML = originalText;
      btnEl.style.background = '';
    }, 1200);
  }
};

window.handleWishlistToggle = function(btn, productId, productName) {
  const added = toggleWishlist(productId, productName);
  btn.classList.toggle('active', added);
  btn.innerHTML = `<i class="fa-${added ? 'solid' : 'regular'} fa-heart"></i>`;
};

// =============================================
// QUICK VIEW MODAL
// =============================================

window.openQuickView = function(productId, event) {
  if (event) event.stopPropagation();

  const products = window.PRODUCTS || window.PRODUCTS_DATA || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let modalOverlay = document.getElementById('quickViewModal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'quickViewModal';
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeQuickView();
    });
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const stars = renderStars(product.rating || 4.8);
  const imageUrl = product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';

  modalOverlay.innerHTML = `
    <div class="modal-card">
      <button class="modal-close-btn" onclick="closeQuickView()">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div class="modal-media">
        <img src="${imageUrl}" alt="${escapeHtml(product.name)}" class="modal-img">
      </div>

      <div class="modal-details">
        <div class="modal-badge-halal">
          <i class="fa-solid fa-certificate"></i> 100% Halol Sertifikatlangan
        </div>

        <span class="product-category-tag">${product.category}</span>
        <h2 class="modal-title">${escapeHtml(product.name)}</h2>

        <div class="product-rating">
          <div class="stars">${stars}</div>
          <span class="rating-count">${product.rating || 4.9} (${product.ratingCount || 420} sharhlar)</span>
        </div>

        <div class="modal-price-row">
          <span class="modal-price">$${product.price.toFixed(2)}</span>
          ${hasDiscount ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
          ${hasDiscount ? `<span class="discount-pct">-${product.discountPercent || 20}%</span>` : ''}
        </div>

        <p class="modal-desc">
          Eng yangi tabiiy va saralangan sifatli mahsulot. Toshkent bo'ylab 2 soat ichida eshigingizgacha xavfsiz va toza holatda yetkaziladi.
        </p>

        <div class="modal-features">
          <div class="modal-feat"><i class="fa-solid fa-truck-fast"></i> 2 soatda yetkazish</div>
          <div class="modal-feat"><i class="fa-solid fa-shield-halved"></i> Sifat kafolati</div>
          <div class="modal-feat"><i class="fa-solid fa-seedling"></i> 100% Organik</div>
          <div class="modal-feat"><i class="fa-solid fa-rotate-left"></i> Bepul qaytarish</div>
        </div>

        <div class="modal-actions">
          <button class="btn btn-primary btn-lg" style="flex:1;" onclick="handleAddToCart(${product.id}, this); closeQuickView();">
            <i class="fa-solid fa-cart-shopping"></i> Savatga qo'shish
          </button>
          <button class="nav-action-btn" style="border:1px solid #E0E0E0;" onclick="handleWishlistToggle(this, ${product.id}, '${escapeHtml(product.name)}')">
            <i class="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeQuickView = function() {
  const modalOverlay = document.getElementById('quickViewModal');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// =============================================
// SKELETON CARDS
// =============================================

function renderSkeletonCards(count, container) {
  if (!container) return;
  container.innerHTML = Array(count).fill(0).map(() => `
    <div class="skeleton-card">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton skeleton-line w-40"></div>
        <div class="skeleton skeleton-line w-80"></div>
        <div class="skeleton skeleton-line w-60"></div>
        <div class="skeleton skeleton-line w-40"></div>
        <div class="skeleton skeleton-btn"></div>
      </div>
    </div>
  `).join('');
}

// =============================================
// NAVBAR HTML BUILDER (shared)
// =============================================

function buildNavbar(activePage) {
  const pages = [
    { href: 'index.html', label: 'Home', icon: 'fa-house' },
    { href: 'products.html', label: 'Products', icon: 'fa-store' },
    { href: 'cart.html', label: 'Cart', icon: 'fa-cart-shopping' },
    { href: 'profile.html', label: 'Profile', icon: 'fa-user' },
  ];

  const navHTML = `
    <nav class="navbar" id="mainNavbar">
      <div class="container">
        <div class="navbar-inner">
          <a href="index.html" class="navbar-logo">
            <div class="logo-icon">🌿</div>
            <span class="logo-text">Fresh<span>Mart</span></span>
          </a>

          <div class="navbar-search">
            <select class="search-category">
              <option>All</option>
              <option>Vegetables</option>
              <option>Fruits</option>
              <option>Dairy</option>
              <option>Meat</option>
              <option>Bakery</option>
              <option>Beverages</option>
              <option>Snacks</option>
              <option>Frozen</option>
            </select>
            <input type="text" class="search-input" placeholder="Search for groceries, products...">
            <button class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>

          <div class="navbar-actions">
            <div class="nav-location">
              <i class="fa-solid fa-location-dot"></i>
              <span>Deliver to <strong>12345</strong></span>
            </div>
            <a href="products.html" class="nav-action-btn" title="Wishlist">
              <i class="fa-regular fa-heart"></i>
            </a>
            <a href="cart.html" class="nav-action-btn cart-action-btn" title="Cart">
              <i class="fa-solid fa-cart-shopping"></i>
              <span class="badge cart-badge" style="display:none">0</span>
            </a>
            <a href="login.html" class="nav-user-avatar" title="Account">
              <i class="fa-solid fa-user"></i>
            </a>
          </div>

          <div class="hamburger" id="hamburger">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>

      <div class="mobile-nav" id="mobileNav">
        <div class="mobile-nav-search">
          <input type="text" class="mobile-search-input" placeholder="Search groceries...">
          <button class="mobile-search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
        ${pages.map(p => `
          <a href="${p.href}" class="mobile-nav-link ${p.href === activePage ? 'active' : ''}">
            <i class="fa-solid ${p.icon}"></i> ${p.label}
            ${p.href === 'cart.html' ? '<span class="cart-badge" style="display:none; margin-left:auto; background:var(--accent); color:white; border-radius:999px; font-size:.7rem; font-weight:700; padding:1px 7px;">0</span>' : ''}
          </a>
        `).join('')}
        <a href="login.html" class="mobile-nav-link">
          <i class="fa-solid fa-right-to-bracket"></i> Login / Register
        </a>
      </div>
    </nav>
  `;
  return navHTML;
}

function buildFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <span class="logo-text">Fresh<span style="color:#FF6F00">Mart</span></span>
            <p>Your trusted online grocery store delivering fresh, quality products right to your doorstep. Shop smart, eat fresh.</p>
            <div class="footer-social">
              <a href="#" class="social-icon"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="#" class="social-icon"><i class="fa-brands fa-instagram"></i></a>
              <a href="#" class="social-icon"><i class="fa-brands fa-x-twitter"></i></a>
              <a href="#" class="social-icon"><i class="fa-brands fa-youtube"></i></a>
            </div>
          </div>

          <div class="footer-col">
            <h4>Categories</h4>
            <div class="footer-links">
              <a href="products.html?cat=Vegetables"><i class="fa-solid fa-chevron-right"></i> Vegetables</a>
              <a href="products.html?cat=Fruits"><i class="fa-solid fa-chevron-right"></i> Fruits</a>
              <a href="products.html?cat=Dairy"><i class="fa-solid fa-chevron-right"></i> Dairy & Eggs</a>
              <a href="products.html?cat=Meat"><i class="fa-solid fa-chevron-right"></i> Meat & Poultry</a>
              <a href="products.html?cat=Bakery"><i class="fa-solid fa-chevron-right"></i> Bakery</a>
              <a href="products.html?cat=Beverages"><i class="fa-solid fa-chevron-right"></i> Beverages</a>
            </div>
          </div>

          <div class="footer-col">
            <h4>Customer Service</h4>
            <div class="footer-links">
              <a href="#"><i class="fa-solid fa-chevron-right"></i> Help Center</a>
              <a href="#"><i class="fa-solid fa-chevron-right"></i> Track Your Order</a>
              <a href="#"><i class="fa-solid fa-chevron-right"></i> Returns & Refunds</a>
              <a href="#"><i class="fa-solid fa-chevron-right"></i> Shipping Policy</a>
              <a href="#"><i class="fa-solid fa-chevron-right"></i> Privacy Policy</a>
              <a href="#"><i class="fa-solid fa-chevron-right"></i> Terms of Service</a>
            </div>
          </div>

          <div class="footer-col">
            <h4>Newsletter</h4>
            <p style="font-size:.85rem;color:rgba(255,255,255,.6);margin-bottom:4px;">Get exclusive deals & fresh updates.</p>
            <div class="newsletter-form">
              <input type="email" class="newsletter-input" placeholder="Enter your email">
              <button class="newsletter-btn" onclick="subscribeNewsletter(this)">Subscribe</button>
            </div>
            <div style="margin-top:20px;">
              <h4>Contact Us</h4>
              <div class="footer-links" style="margin-top:10px;">
                <a href="tel:+18001234567"><i class="fa-solid fa-phone"></i> +1 800 123 4567</a>
                <a href="mailto:support@freshmart.com"><i class="fa-solid fa-envelope"></i> support@freshmart.com</a>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} FreshMart. All rights reserved.</p>
          <div class="footer-payments">
            <span class="payment-icon">VISA</span>
            <span class="payment-icon">MC</span>
            <span class="payment-icon">AMEX</span>
            <span class="payment-icon">PayPal</span>
            <span class="payment-icon">Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

window.subscribeNewsletter = function(btn) {
  const input = btn.previousElementSibling;
  if (input.value && input.value.includes('@')) {
    showToast('Subscribed! 🎉', 'Thanks for subscribing to FreshMart updates.', 'success');
    input.value = '';
  } else {
    showToast('Invalid Email', 'Please enter a valid email address.', 'error');
  }
};

// =============================================
// CSS FOR BOUNCE ANIMATION
// =============================================
(function addBounceCSS() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes cartBounce {
      0%, 100% { transform: scale(1); }
      30% { transform: scale(1.3); }
      60% { transform: scale(0.9); }
    }
    .bounce { animation: cartBounce 0.5s ease; }
    .mobile-nav-link.active {
      background: var(--primary-pale);
      color: var(--primary);
    }
  `;
  document.head.appendChild(style);
})();

// =============================================
// LIVE SEARCH AUTOCOMPLETE
// =============================================

function initLiveSearch() {
  const searchContainers = document.querySelectorAll('.navbar-search');

  searchContainers.forEach(container => {
    const input = container.querySelector('.search-input');
    if (!input) return;

    let dropdown = container.querySelector('.search-results-dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'search-results-dropdown';
      container.appendChild(dropdown);
    }

    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      if (query.length < 2) {
        dropdown.classList.remove('active');
        dropdown.innerHTML = '';
        return;
      }

      const products = window.PRODUCTS || window.PRODUCTS_DATA || [];
      const matches = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
      ).slice(0, 5);

      if (matches.length === 0) {
        dropdown.innerHTML = `
          <div style="padding:16px 20px; text-align:center; color:#888; font-size:0.88rem;">
            Hech qanday mahsulot topilmadi
          </div>
        `;
      } else {
        dropdown.innerHTML = matches.map(p => `
          <div class="search-result-item" onclick="openQuickView(${p.id}); document.querySelector('.search-results-dropdown')?.classList.remove('active');">
            <img src="${p.image}" alt="${escapeHtml(p.name)}" class="search-result-img" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=100&q=80';">
            <div class="search-result-info">
              <div class="search-result-name">${escapeHtml(p.name)}</div>
              <div class="search-result-meta">
                <span>${p.category}</span> • <span>★ ${p.rating || 4.8}</span>
              </div>
            </div>
            <div class="search-result-price">$${p.price.toFixed(2)}</div>
          </div>
        `).join('') + `
          <a href="products.html?search=${encodeURIComponent(query)}" style="display:block; padding:10px 18px; text-align:center; background:#F8FBF8; font-weight:700; font-size:0.82rem; color:var(--primary); text-decoration:none; border-top:1px solid #EAEAEA;">
            Barcha natijalarni ko'rish (${products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)).length}) →
          </a>
        `;
      }

      dropdown.classList.add('active');
    });

    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  });
}

// =============================================
// BACK TO TOP BUTTON
// =============================================

function initBackToTop() {
  let btn = document.getElementById('backToTopBtn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'backToTopBtn';
    btn.className = 'back-to-top';
    btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    btn.title = 'Yuqoriga qaytish';
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
}

// =============================================
// INIT ON DOM READY
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initNavbarSearch();
  initLiveSearch();
  initBackToTop();
  initAuthState();
  updateCartBadge();
  initFlashSaleTimer();
});
