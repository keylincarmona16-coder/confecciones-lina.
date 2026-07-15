const initialProducts = [
  {
    id: 1,
    name: 'Chaqueta Oversize',
    price: 1299,
    category: 'Abrigos',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Pantalón de corte recto',
    price: 899,
    category: 'Pantalones',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Blusa elegante',
    price: 749,
    category: 'Blusas',
    image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Vestido minimalista',
    price: 1199,
    category: 'Vestidos',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'Sudadera premium',
    price: 949,
    category: 'Sudaderas',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    name: 'Zapatillas urbanas',
    price: 1399,
    category: 'Calzado',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
  }
];

const STORAGE_KEY = 'lina-products';
const FAVORITES_KEY = 'lina-favorites';
const THEME_KEY = 'lina-theme';
const CART_KEY = 'lina-cart';
const CURRENT_USER_KEY = 'lina-current-user';
const OWNER_AUTH_KEY = 'lina-owner-auth';
const OWNER_USERNAME = 'dueña.lina';
const OWNER_PASSWORD = 'ConfeccionesLina2026!';
const REGISTERED_USERS_KEY = 'lina-registered-users';

function loadProducts() {
  try {
    const savedProducts = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(savedProducts) && savedProducts.length) return savedProducts;
  } catch (error) {
    console.warn('No se pudieron cargar los productos guardados.', error);
  }
  return initialProducts;
}

function saveProducts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function loadFavorites() {
  try {
    const savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    if (Array.isArray(savedFavorites)) return new Set(savedFavorites);
  } catch (error) {
    console.warn('No se pudieron cargar los favoritos.', error);
  }
  return new Set();
}

function saveFavorites() {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
}

function getCurrentUsername() {
  return localStorage.getItem(CURRENT_USER_KEY) || null;
}

function setCurrentUsername(username) {
  if (username) {
    localStorage.setItem(CURRENT_USER_KEY, username);
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

function currentCartKey() {
  const username = getCurrentUsername();
  return username ? `${CART_KEY}-${username}` : CART_KEY;
}

function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(currentCartKey()));
    if (Array.isArray(savedCart)) return savedCart;
  } catch (error) {
    console.warn('No se pudo cargar el carrito.', error);
  }
  return [];
}

function saveCart() {
  localStorage.setItem(currentCartKey(), JSON.stringify(cart));
}

function loadRegisteredUsers() {
  try {
    const saved = JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveRegisteredUsers(users) {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
}

function loadTheme() {
  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
    );
  }
  localStorage.setItem(THEME_KEY, theme);
}

function getEl(id) {
  return document.getElementById(id);
}

const products = loadProducts();
const favorites = loadFavorites();
let cart = loadCart();
let showFavoritesOnly = false;

const productGrid = getEl('productGrid');
const searchInput = getEl('searchInput');
const favoritesToggle = getEl('favoritesToggle');
const cartCount = getEl('cartCount');
const cartItems = getEl('cartItems');
const cartTotal = getEl('cartTotal');
const checkoutBtn = getEl('checkoutBtn');
const themeToggle = getEl('themeToggle');
const loginBtn = getEl('loginBtn');
const cartBtn = getEl('cartBtn');
const loginModal = getEl('loginModal');
const cartModal = getEl('cartModal');
const closeLogin = getEl('closeLogin');
const closeCart = getEl('closeCart');
const productForm = getEl('productForm');
const productNameInput = getEl('productName');
const productPriceInput = getEl('productPrice');
const productCategoryInput = getEl('productCategory');
const productImageFile = getEl('productImageFile');
const productImageInput = getEl('productImage');
const ownerPreviewImage = getEl('ownerPreviewImage');
const ownerPreviewName = getEl('ownerPreviewName');
const ownerPreviewCategory = getEl('ownerPreviewCategory');
const ownerPreviewPrice = getEl('ownerPreviewPrice');
const loginForm = getEl('loginForm');
const authTitle = getEl('authTitle');
const authInfo = getEl('authInfo');
const loginUsernameInput = getEl('loginUsername');
const loginPasswordInput = getEl('loginPassword');
const passwordGroup = getEl('passwordGroup');
const togglePassword = getEl('togglePassword');
const toggleRegister = getEl('toggleRegister');
const submitButton = getEl('submitButton');
const loginError = getEl('loginError');
const registeredUsersContainer = getEl('registeredUsers');
const ownerPage = getEl('ownerPage');
const ownerLogoutBtn = getEl('ownerLogoutBtn');

let selectedImage = '';
let authMode = 'login';

function formatPrice(value) {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0
  }).format(value);
}

function renderProducts() {
  if (!productGrid) return;

  const query = (searchInput?.value || '').toLowerCase();
  const visibleProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);
    const matchesFavorites = !showFavoritesOnly || favorites.has(product.id);
    return matchesSearch && matchesFavorites;
  });

  productGrid.innerHTML = '';

  visibleProducts.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <div class="product-top">
          <div>
            <p class="eyebrow">${product.category}</p>
            <h3>${product.name}</h3>
          </div>
          <button class="favorite-btn" data-id="${product.id}" aria-label="Agregar a favoritos">
            ${favorites.has(product.id) ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="price-row">
          <strong>${formatPrice(product.price)}</strong>
          <button class="primary-btn add-btn" data-id="${product.id}">Agregar</button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

function renderCart() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) cartCount.textContent = String(totalCount);

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>No hay productos en el carrito todavía.</p>';
    if (cartTotal) cartTotal.textContent = formatPrice(0);
    return;
  }

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item) => {
    const product = products.find((entry) => entry.id === item.id);
    if (!product) return;
    total += product.price * item.quantity;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div>
        <strong>${product.name}</strong>
        <p>x${item.quantity}</p>
      </div>
      <div class="cart-row-actions">
        <strong>${formatPrice(product.price * item.quantity)}</strong>
        <button class="secondary-btn remove-cart-btn" data-id="${item.id}" type="button">Eliminar</button>
      </div>
    `;
    cartItems.appendChild(row);
  });

  if (cartTotal) cartTotal.textContent = formatPrice(total);
}

function renderRegisteredUsers() {
  if (!registeredUsersContainer) return;
  const users = loadRegisteredUsers();
  if (users.length === 0) {
    registeredUsersContainer.innerHTML = '<p>No hay usuarios registrados aún.</p>';
    return;
  }
  registeredUsersContainer.innerHTML = '';
  users.forEach((user) => {
    const item = document.createElement('div');
    item.className = 'registered-user';
    item.textContent = user.username;
    registeredUsersContainer.appendChild(item);
  });
}

function addToCart(productId) {
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  handleCartUpdate();
}

function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    handleCartUpdate();
  }
}

function updateOwnerPreview() {
  if (!ownerPreviewName || !ownerPreviewCategory || !ownerPreviewPrice || !ownerPreviewImage) {
    return;
  }

  const name = productNameInput?.value.trim() || 'Nombre del producto';
  const category = productCategoryInput?.value.trim() || 'Categoría';
  const price = Number(productPriceInput?.value) || 0;

  ownerPreviewName.textContent = name;
  ownerPreviewCategory.textContent = category;
  ownerPreviewPrice.textContent = formatPrice(price);
  ownerPreviewImage.style.backgroundImage = selectedImage
    ? `url("${selectedImage}")`
    : 'linear-gradient(135deg, rgba(199, 166, 123, 0.35), rgba(17, 17, 17, 0.08))';
}

function updatePasswordFieldVisibility() {
  if (!passwordGroup) return;
  const username = loginUsernameInput?.value.trim();
  const registeredUsers = loadRegisteredUsers();
  const isRegisteredUser = registeredUsers.some((user) => user.username === username);

  if (authMode === 'register' || username === OWNER_USERNAME || isRegisteredUser) {
    passwordGroup.classList.remove('hidden');
  } else {
    passwordGroup.classList.add('hidden');
  }
}

function setAuthMode(mode) {
  authMode = mode;
  if (loginError) loginError.textContent = '';
  if (loginUsernameInput) loginUsernameInput.value = '';
  if (loginPasswordInput) loginPasswordInput.value = '';

  if (!authTitle || !authInfo || !submitButton || !toggleRegister || !passwordGroup) return;

  if (mode === 'login') {
    authTitle.textContent = 'Ingreso de usuario';
    authInfo.textContent = 'Ingresa tu usuario y contraseña para entrar.';
    submitButton.textContent = 'Ingresar';
    toggleRegister.textContent = 'Crear cuenta';
    passwordGroup.classList.add('hidden');
    if (loginPasswordInput) loginPasswordInput.required = false;
  } else {
    authTitle.textContent = 'Registro de usuario';
    authInfo.textContent = 'Crea tu cuenta con usuario y contraseña.';
    submitButton.textContent = 'Crear cuenta';
    toggleRegister.textContent = 'Ya tengo cuenta';
    passwordGroup.classList.remove('hidden');
    if (loginPasswordInput) loginPasswordInput.required = true;
  }
}

function updatePasswordVisibility() {
  if (!loginPasswordInput || !togglePassword) return;
  const type = loginPasswordInput.getAttribute('type');
  loginPasswordInput.setAttribute('type', type === 'password' ? 'text' : 'password');
  togglePassword.textContent = loginPasswordInput.getAttribute('type') === 'password' ? 'Mostrar' : 'Ocultar';
}

function isOwnerAuthenticated() {
  return localStorage.getItem(OWNER_AUTH_KEY) === 'true';
}

function openLoginModal() {
  if (isOwnerAuthenticated()) {
    window.location.href = 'owner.html';
    return;
  }
  setAuthMode('login');
  updatePasswordFieldVisibility();
  if (loginModal) {
    loginModal.classList.remove('hidden');
  }
  if (loginUsernameInput) loginUsernameInput.focus();
}

function closeLoginModal() {
  if (loginModal) {
    loginModal.classList.add('hidden');
  }
}

function closeCartModal() {
  if (cartModal) {
    cartModal.classList.add('hidden');
  }
}

function handleCartUpdate() {
  renderCart();
  saveCart();
}

function mergeCarts(existingCart, incomingCart) {
  const merged = [...existingCart];
  incomingCart.forEach((item) => {
    const found = merged.find((entry) => entry.id === item.id);
    if (found) {
      found.quantity += item.quantity;
    } else {
      merged.push({ id: item.id, quantity: item.quantity });
    }
  });
  return merged;
}

function updateAuthUI() {
  const currentUser = getCurrentUsername();
  if (!loginBtn) return;
  if (currentUser) {
    loginBtn.textContent = `Cerrar sesión (${currentUser})`;
    loginBtn.setAttribute('aria-label', `Cerrar sesión de ${currentUser}`);
  } else {
    loginBtn.textContent = 'Iniciar sesión';
    loginBtn.setAttribute('aria-label', 'Iniciar sesión');
  }
}

function handleUserLogout() {
  setCurrentUsername(null);
  cart = loadCart();
  renderCart();
  updateAuthUI();
  alert('Has cerrado sesión. Si deseas iniciar sesión de nuevo, presiona Iniciar sesión.');
}

function buildOrderSummary() {
  const username = getCurrentUsername() || 'Invitado';
  let total = 0;
  const lines = cart.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    if (!product) return null;
    const itemTotal = product.price * item.quantity;
    total += itemTotal;
    return `${item.quantity} x ${product.name} (${formatPrice(product.price)}) = ${formatPrice(itemTotal)}`;
  }).filter(Boolean);

  return {
    username,
    lines,
    total
  };
}

function handleCheckout() {
  const username = getCurrentUsername();
  if (!username) {
    alert('Debes iniciar sesión o crear cuenta para guardar tu carrito y completar el pedido.');
    openLoginModal();
    return;
  }
  if (cart.length === 0) {
    alert('Tu carrito está vacío. Agrega productos antes de pagar.');
    return;
  }

  const { username: currentUser, lines, total } = buildOrderSummary();
  const summaryText = lines.map((line) => `• ${line}`).join('\n');
  const message = `🛍️ *Pedido Lina*\n\n*Cliente:* ${currentUser}\n\n*Productos:*\n${summaryText}\n\n*Total:* ${formatPrice(total)}\n\n*Dirección de entrega:* Casa color esmeralda, 150 metros este de la plaza de deportes, a mano izquierda en Portalón.\n\nGracias por tu pedido ❤️`;
  const confirmation = window.confirm(`Resumen de tu compra:\n\n${summaryText}\n\nTotal: ${formatPrice(total)}\n\n¿Deseas enviar este pedido por WhatsApp?`);
  if (!confirmation) return;

  const waUrl = `https://wa.me/52171826748?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');

  cart.length = 0;
  handleCartUpdate();
  closeCartModal();
}

function checkOwnerAccess() {
  if (!ownerPage) return;
  const isOwner = localStorage.getItem(OWNER_AUTH_KEY) === 'true';
  if (!isOwner) {
    window.location.href = 'index.html';
  }
}

if (searchInput) {
  searchInput.addEventListener('input', renderProducts);
}

if (favoritesToggle) {
  favoritesToggle.addEventListener('click', () => {
    showFavoritesOnly = !showFavoritesOnly;
    favoritesToggle.textContent = showFavoritesOnly ? 'Ver todos' : 'Mostrar favoritos';
    renderProducts();
  });
}

if (productForm) {
  productNameInput?.addEventListener('input', updateOwnerPreview);
  productPriceInput?.addEventListener('input', updateOwnerPreview);
  productCategoryInput?.addEventListener('input', updateOwnerPreview);

  if (productImageInput) {
    productImageInput.addEventListener('input', () => {
      selectedImage = productImageInput.value.trim();
      updateOwnerPreview();
    });
  }

  if (productImageFile) {
    productImageFile.addEventListener('change', (event) => {
      const [file] = event.target.files;
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        selectedImage = reader.result;
        updateOwnerPreview();
      };
      reader.readAsDataURL(file);
    });
  }

  productForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newProduct = {
      id: Date.now(),
      name: productNameInput?.value.trim() || 'Producto nuevo',
      price: Number(productPriceInput?.value) || 0,
      category: productCategoryInput?.value.trim() || 'Sin categoría',
      image:
        selectedImage ||
        productImageInput?.value.trim() ||
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80'
    };

    products.unshift(newProduct);
    saveProducts();
    renderProducts();
    if (formFeedback) {
      formFeedback.textContent = 'Producto publicado correctamente.';
    }
    productForm.reset();
    selectedImage = '';
    updateOwnerPreview();
    renderRegisteredUsers();
  });
}

if (productGrid) {
  productGrid.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('add-btn')) {
      addToCart(Number(target.getAttribute('data-id')));
      if (cartModal) {
        cartModal.classList.remove('hidden');
      }
    }

    if (target.classList.contains('favorite-btn')) {
      const id = Number(target.getAttribute('data-id'));
      if (favorites.has(id)) favorites.delete(id);
      else favorites.add(id);
      saveFavorites();
      renderProducts();
    }
  });
}

if (cartItems) {
  cartItems.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('remove-cart-btn')) {
      removeFromCart(Number(target.getAttribute('data-id')));
    }
  });
}

if (cartBtn && cartModal) {
  cartBtn.addEventListener('click', () => cartModal.classList.remove('hidden'));
}

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    if (getCurrentUsername()) {
      handleUserLogout();
      return;
    }
    openLoginModal();
  });
}

if (closeLogin) {
  closeLogin.addEventListener('click', closeLoginModal);
}

if (closeCart) {
  closeCart.addEventListener('click', closeCartModal);
}

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    if (event.target === loginModal) closeLoginModal();
    if (event.target === cartModal) closeCartModal();
  }
});

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = loginUsernameInput?.value.trim() || '';
    const password = loginPasswordInput?.value.trim() || '';

    if (authMode === 'register') {
      if (!username || !password) {
        if (loginError) loginError.textContent = 'Ingresa usuario y contraseña para registrarte.';
        return;
      }
      if (username === OWNER_USERNAME) {
        if (loginError) loginError.textContent = 'Ese nombre de usuario no está disponible.';
        return;
      }
      const registeredUsers = loadRegisteredUsers();
      const existing = registeredUsers.find((user) => user.username === username);
      if (existing) {
        if (loginError) loginError.textContent = 'Ese usuario ya está registrado.';
        return;
      }
      registeredUsers.push({ username, password });
      saveRegisteredUsers(registeredUsers);

      const guestCart = loadCart();
      setCurrentUsername(username);
      const userCart = loadCart();
      cart = mergeCarts(userCart, guestCart);
      saveCart();
      localStorage.removeItem(CART_KEY);
      renderCart();
      updateAuthUI();
      if (loginError) loginError.textContent = '';
      closeLoginModal();
      alert(`Cuenta creada y has ingresado como ${username}. Tu carrito está guardado.`);
      return;
    }

    if (username === OWNER_USERNAME) {
      if (!password) {
        if (loginError) loginError.textContent = 'Ingresa la contraseña de la dueña.';
        return;
      }
      if (password === OWNER_PASSWORD) {
        localStorage.setItem(OWNER_AUTH_KEY, 'true');
        window.location.href = 'owner.html';
        return;
      }
      if (loginError) loginError.textContent = 'Usuario o contraseña incorrectos.';
      return;
    }

    const registeredUsers = loadRegisteredUsers();
    const existing = registeredUsers.find((user) => user.username === username);
    if (!existing) {
      if (loginError) loginError.textContent = 'Usuario no encontrado. Regístrate primero.';
      return;
    }
    if (!password) {
      if (loginError) loginError.textContent = 'Ingresa tu contraseña.';
      return;
    }
    if (password !== existing.password) {
      if (loginError) loginError.textContent = 'Contraseña incorrecta.';
      return;
    }

    const guestCart = loadCart();
    setCurrentUsername(username);
    const userCart = loadCart();
    cart = mergeCarts(userCart, guestCart);
    saveCart();
    localStorage.removeItem(CART_KEY);
    renderCart();
    updateAuthUI();
    if (loginError) loginError.textContent = '';
    closeLoginModal();
    alert(`Bienvenido, ${username}! Tu carrito está guardado en tu cuenta.`);
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

if (toggleRegister) {
  toggleRegister.addEventListener('click', () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    updatePasswordFieldVisibility();
  });
}

if (loginUsernameInput) {
  loginUsernameInput.addEventListener('input', updatePasswordFieldVisibility);
}

if (togglePassword) {
  togglePassword.addEventListener('click', updatePasswordVisibility);
}

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', handleCheckout);
}

if (ownerLogoutBtn) {
  ownerLogoutBtn.addEventListener('click', () => {
    localStorage.removeItem(OWNER_AUTH_KEY);
    window.location.href = 'index.html';
  });
}

checkOwnerAccess();

if (productGrid) renderProducts();
if (cartItems) renderCart();
if (registeredUsersContainer) renderRegisteredUsers();
if (productForm) updateOwnerPreview();
applyTheme(loadTheme());
updateAuthUI();
