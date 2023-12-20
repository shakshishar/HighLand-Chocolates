const chocolates = document.querySelectorAll('.chocolate');
const cartItem = document.getElementById('cartItem');
const total = document.getElementById('total');
const checkoutButton = document.getElementById('checkout');
let cart = [];
let count = 0;
let totalPrice = 0;

// Looping all the add to cart chocolates and what chocolate is add to cart
chocolates.forEach((chocolate) => {
    const addToCartButton = chocolate.querySelector('.add-to-cart');
    const chocolateId = chocolate.dataset.id;
    const chocolateName = chocolate.dataset.name;
    const chocolatePrice = parseInt(chocolate.dataset.price);

    addToCartButton.addEventListener('click', () => {
        if (cart.length < 8) {
            cart.push({ id: chocolateId, name: chocolateName, price: chocolatePrice });
            count++;
            document.getElementById('count').innerHTML = count;
            updateCart();
        } else {
            alert('You can only select up to 8 chocolates');
        }
    });
});

// Update cart after adding the chocolates
function updateCart() {
    totalPrice = 0;
    if (cart.length === 0) {
        cartItem.innerHTML = 'Your cart is empty';
    } else {
        cartItem.innerHTML = '';
        cart.forEach(item => {
            totalPrice += item.price;

            let itemHTML = `<div class="cart-item">
                <h2>${item.name}</h2>
                <p>Price: ${item.price}</p>
                <i class="fa-solid fa-trash"></i>
            </div>`;

            cartItem.innerHTML += itemHTML;
        });

        let deleteIcons = cartItem.querySelectorAll('.fa-solid.fa-trash');
        deleteIcons.forEach((deleteIcon, index) => {
            deleteIcon.addEventListener('click', () => {
                removeFromCart(cart[index].id);
            });
        });
    }

    total.textContent = totalPrice;
}

// Remove from the cart or delete the item
function removeFromCart(itemId) {
    const index = cart.findIndex((item) => item.id === itemId);
    if (index !== -1) {
        totalPrice -= cart[index].price;
        cart.splice(index, 1);
        count--;
        document.getElementById('count').innerHTML = count;
        updateCart();
    }
}

// Click event on checkout button
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add chocolates to your cart before checking out.');
    } else {
        alert(`Total Price: ${totalPrice}`);
    }
});
