// ===== Utilities & State =====
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const fmt = n => `₹${n.toFixed(2)}`;

const store = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
};

const state = {
  products: [],
  filtered: [],
  cart: store.get('cart', []),
  wishlist: store.get('wishlist', []),
  reviews: store.get('reviews', {}), // { [productId]: [{rating, text, date}] }
  mode: store.get('mode', 'light'),
  accent: store.get('accent', '#4CAF50'),
  dealEnd: store.get('dealEnd', null)
};

// ===== 36 Products =====
state.products = [
  // Audio (1–6)
  {id:1, title:"Noise-Cancelling Headphones", category:"Audio", price:2499, rating:4.6, img:"https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=800", desc:"Immersive sound with deep bass and ANC."},
  {id:2, title:"Bluetooth Speaker Mini", category:"Audio", price:1299, rating:4.3, img:"https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800", desc:"Pocket-sized, splash-proof, 12h battery."},
  {id:3, title:"Studio Monitor Headphones", category:"Audio", price:3299, rating:4.5, img:"https://images.unsplash.com/photo-1487215078519-e21cc028cb29?q=80&w=800", desc:"Flat response for mixing and monitoring."},
  {id:4, title:"Wireless Earbuds Pro", category:"Audio", price:2199, rating:4.2, img:"https://images.unsplash.com/photo-1606229365485-93a53b1b9e56?q=80&w=800", desc:"Secure fit, ENC mics, low-latency mode."},
  {id:5, title:"Soundbar 2.1", category:"Audio", price:4999, rating:4.4, img:"https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800", desc:"Deep bass with wireless subwoofer."},
  {id:6, title:"Hi-Res DAC USB-C", category:"Audio", price:999, rating:4.1, img:"https://images.unsplash.com/photo-1520975922284-4b67a6e0b19b?q=80&w=800", desc:"Upgrade your phone/PC audio instantly."},

  // Wearables (7–10)
  {id:7, title:"Smart Watch Pro", category:"Wearables", price:3299, rating:4.4, img:"https://images.unsplash.com/photo-1518441902115-c7b1b4095443?q=80&w=800", desc:"Fitness tracking, GPS, 5-day battery."},
  {id:8, title:"Fitness Band 2", category:"Wearables", price:1599, rating:4.1, img:"https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800", desc:"Heart-rate, SpO₂, sleep tracking."},
  {id:9, title:"Smart Scale", category:"Wearables", price:1799, rating:4.0, img:"https://images.unsplash.com/photo-1519452575417-564c1401ecc0?q=80&w=800", desc:"Body fat %, BMI, app sync."},
  {id:10, title:"VR Headset Lite", category:"Wearables", price:6999, rating:4.2, img:"https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=800", desc:"Immersive visuals with comfy straps."},

  // Accessories (11–16)
  {id:11, title:"Gaming Mouse RGB", category:"Accessories", price:1499, rating:4.2, img:"https://images.unsplash.com/photo-1587202372775-98927b715c87?q=80&w=800", desc:"12K DPI, 7 programmable buttons."},
  {id:12, title:"Mechanical Keyboard", category:"Accessories", price:2899, rating:4.7, img:"https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=800", desc:"Hot-swappable switches, white backlight."},
  {id:13, title:"USB-C Power Bank 20k", category:"Accessories", price:1999, rating:4.3, img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800", desc:"PD fast charging, dual ports."},
  {id:14, title:"MagSafe Charger Stand", category:"Accessories", price:1599, rating:4.2, img:"https://images.unsplash.com/photo-1585079542156-2755d9c8affd?q=80&w=800", desc:"15W wireless with desk stand."},
  {id:15, title:"Laptop Sleeve 14\"", category:"Accessories", price:899, rating:4.1, img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800", desc:"Water-repellent with pocket."},
  {id:16, title:"Webcam 1080p", category:"Accessories", price:1699, rating:4.0, img:"https://images.unsplash.com/photo-1590608897129-79da98d1590c?q=80&w=800", desc:"Auto-exposure, stereo mics."},

  // Cameras (17–20)
  {id:17, title:"4K Action Camera", category:"Cameras", price:5999, rating:4.5, img:"https://images.unsplash.com/photo-1519181245277-cffeb31da2fb?q=80&w=800", desc:"Waterproof case, stabilization."},
  {id:18, title:"Vlogging Camera 24MP", category:"Cameras", price:14999, rating:4.4, img:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800", desc:"Flip screen, mic input, Wi-Fi."},
  {id:19, title:"Mirrorless Lens 50mm", category:"Cameras", price:7999, rating:4.8, img:"https://images.unsplash.com/photo-1555617981-dac3880ea7f6?q=80&w=800", desc:"Crisp portraits, f/1.8 bokeh."},
  {id:20, title:"Tripod Carbon Lite", category:"Cameras", price:2499, rating:4.2, img:"https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=800", desc:"Ultra-light, 160cm, fluid head."},

  // Phones (21–24)
  {id:21, title:"Android Phone S", category:"Phones", price:12999, rating:4.4, img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800", desc:"90Hz AMOLED, 5G, 5000mAh."},
  {id:22, title:"Android Phone Max", category:"Phones", price:18999, rating:4.5, img:"https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=800", desc:"OIS camera, 120Hz, fast charge."},
  {id:23, title:"iOS Phone Mini", category:"Phones", price:39999, rating:4.7, img:"https://images.unsplash.com/photo-1512499617640-c2f999098c93?q=80&w=800", desc:"Compact powerhouse with A-series chip."},
  {id:24, title:"Wireless Charger Pad", category:"Phones", price:1199, rating:4.2, img:"https://images.unsplash.com/photo-1551642270-54b9d88f0903?q=80&w=800", desc:"Qi-certified 15W with LED."},

  // Laptops (25–28)
  {id:25, title:"14\" Ultrabook i5", category:"Laptops", price:44999, rating:4.6, img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800", desc:"Metal build, 16GB RAM, 512GB SSD."},
  {id:26, title:"Gaming Laptop RTX", category:"Laptops", price:79999, rating:4.5, img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800", desc:"144Hz display, RTX graphics."},
  {id:27, title:"2-in-1 Touch 13\"", category:"Laptops", price:59999, rating:4.3, img:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800", desc:"360° hinge with stylus."},
  {id:28, title:"Chromebook EDU", category:"Laptops", price:24999, rating:4.0, img:"https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=800", desc:"All-day battery, rugged design."},

  // Smart Home (29–32)
  {id:29, title:"Smart Bulb RGB", category:"Smart Home", price:699, rating:4.2, img:"https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=800", desc:"Voice control, scenes, schedules."},
  {id:30, title:"Smart Plug 16A", category:"Smart Home", price:999, rating:4.3, img:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800", desc:"Energy monitor, app control."},
  {id:31, title:"Video Doorbell", category:"Smart Home", price:3499, rating:4.1, img:"https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?q=80&w=800", desc:"1080p with motion alerts."},
  {id:32, title:"Robot Vacuum", category:"Smart Home", price:12999, rating:4.2, img:"https://images.unsplash.com/photo-1583947582886-bfc24f4e6f04?q=80&w=800", desc:"Auto-dock, mapping, mop add-on."},

  // Gaming & Home (33–36)
  {id:33, title:"Game Controller BT", category:"Gaming", price:1899, rating:4.3, img:"https://images.unsplash.com/photo-1585079542156-2755d9c8affd?q=80&w=800", desc:"Dual mode PC/Phone support."},
  {id:34, title:"4K Streaming Stick", category:"Home", price:3499, rating:4.4, img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800", desc:"Dolby Vision, voice remote."},
  {id:35, title:"Mechanical Numpad", category:"Accessories", price:1299, rating:4.1, img:"https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=800", desc:"Hot-swap numpad with knobs."},
  {id:36, title:"Desk Lamp LED", category:"Home", price:1199, rating:4.0, img:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800", desc:"Adjustable color temp, USB port."},
];

// ===== DOM Refs =====
const els = {
  grid: $('#productGrid'),
  categorySelect: $('#categorySelect'),
  sortSelect: $('#sortSelect'),
  search: $('#searchInput'),
  clearSearch: $('#clearSearch'),
  voiceBtn: $('#voiceBtn'),
  cartBtn: $('#cartBtn'),
  cartCount: $('#cartCount'),
  cartDrawer: $('#cartDrawer'),
  cartItems: $('#cartItems'),
  subTotal: $('#subTotal'),
  shipping: $('#shipping'),
  tax: $('#tax'),
  grandTotal: $('#grandTotal'),
  clearCart: $('#clearCart'),
  checkoutBtn: $('#checkoutBtn'),
  checkoutModal: $('#checkoutModal'),
  checkoutForm: $('#checkoutForm'),
  checkoutTotal: $('#checkoutTotal'),
  year: $('#year'),
  quickView: $('#quickView'),
  quickImg: $('#quickImage'),
  quickTitle: $('#quickTitle'),
  quickCat: $('#quickCategory'),
  quickDesc: $('#quickDesc'),
  quickPrice: $('#quickPrice'),
  quickAdd: $('#quickAdd'),
  quickWish: $('#quickWish'),
  openReviews: $('#openReviews'),
  reviewsModal: $('#reviewsModal'),
  revTitle: $('#revTitle'),
  reviewsList: $('#reviewsList'),
  reviewForm: $('#reviewForm'),
  wishlistBtn: $('#wishlistBtn'),
  wishDrawer: $('#wishlistDrawer'),
  wishItems: $('#wishItems'),
  wishCount: $('#wishCount'),
  dealTimer: $('#dealTimer'),
  shopDeal: $('#shopDeal'),
  modeToggle: $('#mode-toggle'),
  accentSelect: $('#accentSelect')
};
let currentProduct = null;

// ===== Theme & Mode =====
function applyAccent(hex) {
  document.documentElement.style.setProperty('--accent', hex);
  const contrast = '#ffffff';
  document.documentElement.style.setProperty('--accent-contrast', contrast);
}
function setMode(mode) {
  document.body.classList.toggle('dark-mode', mode === 'dark');
  store.set('mode', mode);
  els.modeToggle.textContent = mode === 'dark' ? '☀️' : '🌙';
}
applyAccent(state.accent);
setMode(state.mode);

// restore accent picker
if (els.accentSelect) {
  els.accentSelect.value = state.accent;
  els.accentSelect.addEventListener('change', e => {
    applyAccent(e.target.value);
    store.set('accent', e.target.value);
  });
}

// dark toggle
els.modeToggle?.addEventListener('click', () => {
  setMode(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
});

// ===== Populate categories =====
function populateCategories() {
  if (!els.categorySelect) return;
  const cats = ['All', ...new Set(state.products.map(p => p.category))];
  els.categorySelect.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join('');
}
populateCategories();

// ===== Rendering =====
function stars(n) { // n 0..5
  const r = Math.max(0, Math.min(5, Math.round(n)));
  const full = '★'.repeat(r);
  const empty = '☆'.repeat(5 - r);
  return `<span class="stars" title="${n.toFixed(1)} / 5">${full}${empty}</span>`;
}

function productCard(p) {
  const inWish = state.wishlist.some(w => w.id === p.id);
  return `
    <article class="card" data-id="${p.id}">
      <img src="${p.img}" alt="${p.title}">
      <div class="card-body">
        <div class="card-title">${p.title}</div>
        <div class="muted">${p.category}</div>
        <div>${stars(averageRating(p.id) ?? p.rating)}</div>
        <div class="price-row">
          <div class="price">${fmt(p.price)}</div>
          <div style="display:flex; gap:6px;">
            <button class="ghost xs" data-action="wish">${inWish ? '❤️' : '🤍'}</button>
            <button class="xs" data-action="view">Quick View</button>
            <button class="primary xs" data-action="add">Add</button>
          </div>
        </div>
      </div>
    </article>`;
}

function render(products) {
  els.grid.innerHTML = products.map(productCard).join('');
}
function refreshCounts() {
  els.cartCount.textContent = state.cart.reduce((a, c) => a + c.qty, 0);
  els.wishCount.textContent = state.wishlist.length;
}
function filterSortSearch() {
  const q = els.search.value.trim().toLowerCase();
  const cat = els.categorySelect.value;
  const sort = els.sortSelect.value;

  let list = [...state.products];
  if (cat && cat !== 'All') list = list.filter(p => p.category === cat);
  if (q) list = list.filter(p => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));

  if (sort === 'price_asc') list.sort((a,b)=>a.price-b.price);
  if (sort === 'price_desc') list.sort((a,b)=>b.price-a.price);
  if (sort === 'rating') list.sort((a,b)=>(averageRating(b.id) ?? b.rating) - (averageRating(a.id) ?? a.rating));
  // "popular" fallback is default order

  state.filtered = list;
  render(list);
}
filterSortSearch();

// ===== Search controls =====
els.search.addEventListener('input', filterSortSearch);
els.categorySelect.addEventListener('change', filterSortSearch);
els.sortSelect.addEventListener('change', filterSortSearch);
els.clearSearch.addEventListener('click', () => { els.search.value=''; filterSortSearch(); });

// Voice search (Web Speech API)
els.voiceBtn.addEventListener('click', () => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { alert('Voice search not supported in this browser.'); return; }
  const rec = new SR();
  rec.lang = 'en-IN';
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  rec.onresult = e => {
    const text = e.results[0][0].transcript;
    els.search.value = text;
    filterSortSearch();
  };
  rec.onerror = () => alert('Mic error. Please try again.');
  rec.start();
});

// ===== Product grid interactions =====
els.grid.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;
  const id = +card.dataset.id;
  const product = state.products.find(p => p.id === id);
  if (!product) return;

  const action = e.target.dataset.action;
  if (action === 'add') addToCart(product);
  if (action === 'view') openQuickView(product);
  if (action === 'wish') toggleWishlist(product);
});

// ===== Wishlist =====
function toggleWishlist(p) {
  const i = state.wishlist.findIndex(w => w.id === p.id);
  if (i >= 0) state.wishlist.splice(i,1);
  else state.wishlist.push(p);
  store.set('wishlist', state.wishlist);
  refreshCounts();
  filterSortSearch();
  renderWishlist();
}
els.wishlistBtn.addEventListener('click', () => openDrawer(els.wishDrawer, true));
function renderWishlist() {
  if (!els.wishItems) return;
  if (state.wishlist.length === 0) {
    els.wishItems.innerHTML = `<p class="muted">No items in wishlist.</p>`;
    return;
  }
  els.wishItems.innerHTML = state.wishlist.map(p => `
    <div class="line">
      <span>${p.title}</span>
      <span>
        <button class="ghost xs" data-id="${p.id}" data-act="move">Add to cart</button>
        <button class="ghost xs" data-id="${p.id}" data-act="remove">Remove</button>
      </span>
    </div>`).join('');
}
els.wishItems?.addEventListener('click', (e)=>{
  const id = +e.target.dataset.id;
  const act = e.target.dataset.act;
  const p = state.wishlist.find(w=>w.id===id);
  if (!p) return;
  if (act==='remove') toggleWishlist(p);
  if (act==='move') { addToCart(p); toggleWishlist(p); }
});

// ===== Cart =====
function addToCart(p, qty=1) {
  const found = state.cart.find(c => c.id === p.id);
  if (found) found.qty += qty;
  else state.cart.push({ id: p.id, title: p.title, price: p.price, img: p.img, qty });
  store.set('cart', state.cart);
  refreshCounts();
  renderCart();
  openDrawer(els.cartDrawer, true);
}
function renderCart() {
  if (!els.cartItems) return;
  if (state.cart.length === 0) {
    els.cartItems.innerHTML = `<p class="muted">Your cart is empty.</p>`;
    els.subTotal.textContent = fmt(0); els.tax.textContent = fmt(0); els.shipping.textContent = fmt(0); els.grandTotal.textContent = fmt(0);
    els.checkoutBtn.disabled = true;
    return;
  }
  els.cartItems.innerHTML = state.cart.map(it => `
    <div class="line">
      <span>${it.title} × ${it.qty}</span>
      <span>
        ${fmt(it.price * it.qty)}
        <button class="ghost xs" data-id="${it.id}" data-act="inc">+</button>
        <button class="ghost xs" data-id="${it.id}" data-act="dec">−</button>
        <button class="ghost xs" data-id="${it.id}" data-act="del">Remove</button>
      </span>
    </div>`).join('');
  const sub = state.cart.reduce((s, it)=>s+it.price*it.qty, 0);
  const tax = sub * 0.18;
  const ship = sub > 5000 ? 0 : 99;
  const total = sub + tax + ship;
  els.subTotal.textContent = fmt(sub);
  els.tax.textContent = fmt(tax);
  els.shipping.textContent = fmt(ship);
  els.grandTotal.textContent = fmt(total);
  els.checkoutTotal.textContent = fmt(total);
  els.checkoutBtn.disabled = false;
}
els.cartItems?.addEventListener('click', (e)=>{
  const id = +e.target.dataset.id;
  const act = e.target.dataset.act;
  const idx = state.cart.findIndex(c=>c.id===id);
  if (idx<0) return;
  if (act==='inc') state.cart[idx].qty++;
  if (act==='dec') { state.cart[idx].qty--; if (state.cart[idx].qty<=0) state.cart.splice(idx,1); }
  if (act==='del') state.cart.splice(idx,1);
  store.set('cart', state.cart);
  refreshCounts(); renderCart();
});
$('#clearCart')?.addEventListener('click', ()=>{ state.cart=[]; store.set('cart', state.cart); refreshCounts(); renderCart(); });
els.cartBtn.addEventListener('click', ()=> openDrawer(els.cartDrawer, true));

// ===== Checkout =====
els.checkoutBtn.addEventListener('click', ()=> openModal(els.checkoutModal, true));
els.checkoutForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('Order placed! (Mock)');
  state.cart = []; store.set('cart', state.cart);
  renderCart(); refreshCounts();
  openModal(els.checkoutModal, false);
});

// ===== Quick View & Reviews =====
function openQuickView(p) {
  currentProduct = p;
  els.quickImg.src = p.img;
  els.quickTitle.textContent = p.title;
  els.quickCat.textContent = p.category;
  els.quickDesc.textContent = p.desc;
  els.quickPrice.textContent = fmt(p.price);
  $('#quickAvgRating').innerHTML = stars(averageRating(p.id) ?? p.rating);
  els.quickAdd.onclick = () => addToCart(p);
  els.quickWish.onclick = () => toggleWishlist(p);
  els.openReviews.onclick = () => openReviews(p);
  openModal(els.quickView, true);
}
function openReviews(p) {
  els.revTitle.textContent = p.title;
  renderReviews(p.id);
  els.reviewForm.onsubmit = (e)=>{
    e.preventDefault();
    const fd = new FormData(els.reviewForm);
    const rating = +fd.get('rating');
    const text = String(fd.get('text')).trim();
    if (!text) return;
    const arr = state.reviews[p.id] ?? [];
    arr.push({ rating, text, date: new Date().toISOString() });
    state.reviews[p.id] = arr;
    store.set('reviews', state.reviews);
    els.reviewForm.reset();
    renderReviews(p.id);
    filterSortSearch();
  };
  openModal(els.reviewsModal, true);
}
function renderReviews(pid) {
  const arr = state.reviews[pid] ?? [];
  if (arr.length === 0) {
    els.reviewsList.innerHTML = `<p class="muted">No reviews yet. Be the first!</p>`;
    return;
  }
  els.reviewsList.innerHTML = arr.map(r => `
    <div class="review">
      <div class="meta">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)} • ${new Date(r.date).toLocaleString()}</div>
      <div>${r.text}</div>
    </div>`).join('');
}
function averageRating(pid) {
  const arr = state.reviews[pid];
  if (!arr || arr.length===0) return null;
  return arr.reduce((s,r)=>s+r.rating,0)/arr.length;
}

// ===== Drawers & Modals helpers =====
function openDrawer(el, show) { el.classList.toggle('open', show); el.setAttribute('aria-hidden', show?'false':'true'); }
function openModal(el, show) { el.classList.toggle('show', show); el.setAttribute('aria-hidden', show?'false':'true'); }
document.addEventListener('click', (e)=>{
  const closeTarget = e.target.dataset.close;
  if (closeTarget) {
    const el = document.getElementById(closeTarget);
    if (el?.classList.contains('side-drawer')) openDrawer(el, false);
    if (el?.classList.contains('modal')) openModal(el, false);
  }
});

// ===== Deal of the Day (Countdown) =====
function ensureDealEnd() {
  if (state.dealEnd) return new Date(state.dealEnd);
  const end = new Date(Date.now() + 1000*60*60*6); // 6 hours from now
  state.dealEnd = end.toISOString();
  store.set('dealEnd', state.dealEnd);
  return end;
}
function tickDeal() {
  const end = ensureDealEnd().getTime();
  const now = Date.now();
  const diff = Math.max(0, end - now);
  const h = Math.floor(diff/3_600_000);
  const m = Math.floor((diff%3_600_000)/60_000);
  const s = Math.floor((diff%60_000)/1000);
  els.dealTimer.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  if (diff === 0) { store.set('dealEnd', null); }
}
setInterval(tickDeal, 1000);
els.shopDeal.addEventListener('click', ()=>{
  els.search.value = 'Headphones';
  filterSortSearch();
  window.scrollTo({top: $('.main-grid').offsetTop - 60, behavior: 'smooth'});
});

// ===== Misc init =====
els.year.textContent = new Date().getFullYear();
renderCart(); renderWishlist(); refreshCounts();

// Initial render
filterSortSearch();

// Persist mode on first load
document.addEventListener('DOMContentLoaded', ()=>{
  if (store.get('mode','light')==='dark') document.body.classList.add('dark-mode');
});
