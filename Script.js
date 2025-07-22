let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Phone", price: 20000 },
    { id: 3, name: "Headphones", price: 2000 }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// --- Product Listing Page ---
if (document.getElementById('productList')) {
    displayProducts(products);

    document.getElementById('searchInput').addEventListener('input', function () {
        const searchText = this.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(searchText));
        displayProducts(filtered);
    });
}

function displayProducts(prodList) {
    const container = document.getElementById('productList');
    container.innerHTML = '';
    prodList.forEach(p => {
        const div = document.createElement('div');
        div.innerHTML = `${p.name} - ₹${p.price}
            <button onclick="viewProduct(${p.id})">View</button>
            <button onclick="addToCart(${p.id})">Add to Cart</button>`;
        container.appendChild(div);
    });
}

function viewProduct(id) {
    localStorage.setItem('selectedProductId', id);
    window.location.href = 'product.html';
}

function applyFilters() {
    const maxPrice = document.getElementById('priceFilter').value;
    const filtered = products.filter(p => p.price <= maxPrice);
    displayProducts(filtered);
}

// --- Product Details Page ---
if (document.getElementById('productDetails')) {
    const productId = localStorage.getItem('selectedProductId');
    const product = products.find(p => p.id == productId);

    const container = document.getElementById('productDetails');
    container.innerHTML = `<h2>${product.name}</h2>
        <p>Price: ₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>`;
}

function addToCart(id) {
    cart.push(products.find(p => p.id == id));
    saveCart();
    alert("Product added to cart.");
}

// --- Cart Page ---
if (document.getElementById('cartItems')) {
    const container = document.getElementById('cartItems');
    container.innerHTML = '';
    cart.forEach((p, index) => {
        const div = document.createElement('div');
        div.innerHTML = `${p.name} - ₹${p.price}
            <button onclick="removeFromCart(${index})">Remove</button>`;
        container.appendChild(div);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    window.location.reload();
}

function checkout() {
    cart = [];
    saveCart();
    document.getElementById('confirmation').innerText = "Order Confirmed!";
    document.getElementById('cartItems').innerHTML = '';
}

// --- Admin Dashboard ---
if (document.getElementById('adminProductList')) {
    displayAdminProducts();
}

function displayAdminProducts() {
    const container = document.getElementById('adminProductList');
    container.innerHTML = '';
    products.forEach((p, index) => {
        const div = document.createElement('div');
        div.innerHTML = `${p.name} - ₹${p.price}
            <button onclick="deleteProduct(${index})">Delete</button>`;
        container.appendChild(div);
    });
}

function addProduct() {
    const name = document.getElementById('newProductName').value;
    const price = document.getElementById('newProductPrice').value;
    const newProduct = { id: Date.now(), name: name, price: parseInt(price) };
    products.push(newProduct);
    saveProducts();
    displayAdminProducts();
    alert('Product Added');
}

function deleteProduct(index) {
    products.splice(index, 1);
    saveProducts();
    displayAdminProducts();
}

// --- Mock Login ---
function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'admin') {
        window.location.href = 'admin.html';
    } else {
        document.getElementById('loginMessage').innerText = "Invalid credentials.";
    }
}
