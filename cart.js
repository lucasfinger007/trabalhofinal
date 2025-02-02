// Função para adicionar um produto ao carrinho
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} adicionado ao carrinho!`);
    updateCartCount();
}

// Função para atualizar a contagem de itens no carrinho
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
}

// Função para exibir o carrinho
function showCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContent = document.getElementById('cart-content');
    cartContent.innerHTML = '';
    if (cart.length === 0) {
        cartContent.innerHTML = '<p>Carrinho vazio</p>';
    } else {
        cart.forEach((item, index) => {
            let div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <span>${item.name}</span>
                <span>R$ ${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})">Remover</button>
            `;
            cartContent.appendChild(div);
        });
    }
    updateCartTotal();
}

// Função para remover um item do carrinho
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    showCart();
    updateCartCount();
}

// Função para atualizar o total do carrinho
function updateCartTotal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = cart.reduce((acc, item) => acc + item.price, 0);
    document.getElementById('cart-total').textContent = `R$ ${total.toFixed(2)}`;
}

// Função para finalizar a compra
function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    alert('Compra finalizada com sucesso!');
    localStorage.removeItem('cart');
    showCart();
    updateCartCount();
}

// Atualizar a contagem de itens no carrinho ao carregar a página
window.onload = function() {
    updateCartCount();
    showCart();
};
