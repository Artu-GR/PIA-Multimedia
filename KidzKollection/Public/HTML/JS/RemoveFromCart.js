document.addEventListener("DOMContentLoaded", function() {
    const cartItems = document.getElementById("cartItems");
    if (cartItems) {
        cartItems.addEventListener("click", function(event) {
            if (event.target.classList.contains("remove-button")) {
                const index = event.target.getAttribute("data-index");
                shoppingCart.splice(index, 1); // Remove the item from the cart
                localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
                displayCart(); // Refresh the cart display
            }
        });
    }
});