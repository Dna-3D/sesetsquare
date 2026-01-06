// Sample Products Data
const sampleProducts = [
    {
        id: 1,
        name: "Calculus Textbook (Thomas)",
        description: "Used but in great condition. Covers Calculus I, II, and III. Some highlights.",
        price: 8000,
        category: "books",
        seller: "John D.",
        whatsapp: "2348012345678",
        image: null,
        emoji: "📚"
    },
    {
        id: 2,
        name: "HP Laptop 15.6\"",
        description: "Intel Core i5, 8GB RAM, 256GB SSD. Perfect for students. Battery lasts 4+ hours.",
        price: 120000,
        category: "electronics",
        seller: "Mary O.",
        whatsapp: "2348023456789",
        image: null,
        emoji: "💻"
    },
    {
        id: 3,
        name: "Desk Chair",
        description: "Comfortable study chair. Adjustable height, mesh back. Great for long study sessions.",
        price: 15000,
        category: "furniture",
        seller: "Ahmed K.",
        whatsapp: "2348034567890",
        image: null,
        emoji: "🪑"
    },
    {
        id: 4,
        name: "Scientific Calculator",
        description: "Casio FX-991ES Plus. Works perfectly, comes with cover.",
        price: 5000,
        category: "electronics",
        seller: "Grace A.",
        whatsapp: "2348045678901",
        image: null,
        emoji: "🔢"
    },
    {
        id: 5,
        name: "Lab Coat (Size M)",
        description: "White lab coat, worn only for one semester. Clean and well-maintained.",
        price: 3500,
        category: "clothing",
        seller: "David E.",
        whatsapp: "2348056789012",
        image: null,
        emoji: "🥼"
    },
    {
        id: 6,
        name: "Organic Chemistry Textbook",
        description: "Morrison and Boyd. Classic textbook for organic chemistry courses.",
        price: 6000,
        category: "books",
        seller: "Fatima U.",
        whatsapp: "2348067890123",
        image: null,
        emoji: "📗"
    },
    {
        id: 7,
        name: "Mini Fridge",
        description: "Small refrigerator perfect for dorm room. Works great, quiet operation.",
        price: 35000,
        category: "other",
        seller: "Chris N.",
        whatsapp: "2348078901234",
        image: null,
        emoji: "❄️"
    },
    {
        id: 8,
        name: "Desk Lamp",
        description: "LED desk lamp with adjustable brightness. USB charging port included.",
        price: 4500,
        category: "furniture",
        seller: "Blessing I.",
        whatsapp: "2348089012345",
        image: null,
        emoji: "💡"
    }
];

// Initialize products in localStorage if not exists
function initializeProducts() {
    if (!localStorage.getItem('campusmart_products')) {
        localStorage.setItem('campusmart_products', JSON.stringify(sampleProducts));
    }
}

// Get all products
function getProducts() {
    initializeProducts();
    return JSON.parse(localStorage.getItem('campusmart_products')) || [];
}

// Add new product
function addNewProduct(product) {
    const products = getProducts();
    const newProduct = {
        id: Date.now(),
        ...product
    };
    products.unshift(newProduct);
    localStorage.setItem('campusmart_products', JSON.stringify(products));
    return newProduct;
}

// Format price
function formatPrice(price) {
    return '₦' + Number(price).toLocaleString();
}

// Get category emoji
function getCategoryEmoji(category) {
    const emojis = {
        books: '📚',
        electronics: '💻',
        furniture: '🪑',
        clothing: '👕',
        other: '📦'
    };
    return emojis[category] || '📦';
}

// Get category label
function getCategoryLabel(category) {
    const labels = {
        books: 'Books',
        electronics: 'Electronics',
        furniture: 'Furniture',
        clothing: 'Clothing',
        other: 'Other'
    };
    return labels[category] || 'Other';
}

// Create product card HTML
function createProductCard(product) {
    const whatsappUrl = `https://wa.me/${product.whatsapp}?text=Hi! I'm interested in your "${product.name}" listed on CampusMart for ${formatPrice(product.price)}`;
    
    return `
        <a href="${whatsappUrl}" target="_blank" class="product-card">
            <div class="product-image">
                ${product.image ? `<img src="${product.image}" alt="${product.name}">` : product.emoji || getCategoryEmoji(product.category)}
                <span class="product-category-badge">${getCategoryLabel(product.category)}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-footer">
                    <div>
                        <div class="product-price">${formatPrice(product.price)}</div>
                        <div class="product-seller">by ${product.seller}</div>
                    </div>
                    <div class="whatsapp-badge">
                        <span>💬</span>
                        WhatsApp
                    </div>
                </div>
            </div>
        </a>
    `;
}

// Render featured products (home page)
function renderFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const products = getProducts().slice(0, 4);
    
    if (products.length === 0) {
        container.innerHTML = '<div class="empty-state"><span>📦</span><p>No products yet. Be the first to list!</p></div>';
        return;
    }

    container.innerHTML = products.map(createProductCard).join('');
}

// Render all products (marketplace page)
function renderAllProducts(products = null) {
    const container = document.getElementById('allProducts');
    if (!container) return;

    const productsToRender = products || getProducts();
    
    if (productsToRender.length === 0) {
        container.innerHTML = '<div class="empty-state"><span>🔍</span><p>No products found. Try a different search or category.</p></div>';
        return;
    }

    container.innerHTML = productsToRender.map(createProductCard).join('');
}

// Filter products by search
function filterProducts() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    const searchTerm = searchInput.value.toLowerCase();
    const products = getProducts();
    
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    renderAllProducts(filtered);
}

// Filter products by category
function filterByCategory(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const products = getProducts();
    
    if (category === 'all') {
        renderAllProducts(products);
        return;
    }

    const filtered = products.filter(product => product.category === category);
    renderAllProducts(filtered);
}

// Modal functions
function openAddProductModal() {
    const modal = document.getElementById('addProductModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAddProductModal() {
    const modal = document.getElementById('addProductModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Add product form submission
function addProduct(event) {
    event.preventDefault();

    const product = {
        name: document.getElementById('productName').value,
        price: Number(document.getElementById('productPrice').value),
        category: document.getElementById('productCategory').value,
        description: document.getElementById('productDescription').value,
        seller: document.getElementById('sellerName').value,
        whatsapp: document.getElementById('sellerWhatsapp').value.replace(/\D/g, ''),
        image: document.getElementById('productImage').value || null,
        emoji: getCategoryEmoji(document.getElementById('productCategory').value)
    };

    // Send WhatsApp message to admin
    const message = `New Product Submission:\n\nName: ${product.name}\nPrice: ₦${product.price}\nCategory: ${getCategoryLabel(product.category)}\nDescription: ${product.description}\nSeller: ${product.seller}\nWhatsApp: ${product.whatsapp}\nImage: ${product.image || 'None'}`;
    const whatsappUrl = `https://wa.me/2348082610560?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    closeAddProductModal();

    // Reset form
    document.getElementById('addProductForm').reset();

    // Show success message
    alert('Your product request has been sent! We\'ll review and add it to the marketplace soon. 🎉');
}

// Mobile menu toggle
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// Close modal on outside click
document.addEventListener('click', function(event) {
    const modal = document.getElementById('addProductModal');
    if (modal && event.target === modal) {
        closeAddProductModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeAddProductModal();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedProducts();
    renderAllProducts();
});
