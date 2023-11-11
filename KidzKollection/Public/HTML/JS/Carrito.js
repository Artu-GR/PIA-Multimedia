document.addEventListener("DOMContentLoaded", function() {

    // Initialize the shopping cart from local storage
    let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    const cartItems = document.getElementById("cartItems");

    // Function to add an item to the shopping cart
    function addToCartFromButton(button) {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        const discount = parseFloat(button.getAttribute("data-discount"));

        const item = {
            name: name,
            price: price - (price * discount) / 100
        };

        shoppingCart.push(item);

        // Update localStorage with the updated cart data
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
        displayCart();
    }

    // Event listeners for the "Agregar al Carrito" buttons
    const addToCartButtons = document.querySelectorAll(".boton-agregar");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            addToCartFromButton(this); // Pass the clicked button to the function.
        });
    });

    // Function to display the cart in the table
    function displayCart() {
        cartItems.innerHTML = ""; // Clear the table

        if (shoppingCart && shoppingCart.length > 0) {
            let totalPrice = 0;
            // Generate rows for each item in the cart
            shoppingCart.forEach((item, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td><button class="remove-button" data-index=${index}>Drop item</button></td>
                `;
                cartItems.appendChild(row);
                totalPrice += item.price;

                const removeButton = row.querySelector(".remove-button");
                removeButton.addEventListener("click", function() {
                    const itemIndex = parseInt(this.getAttribute("data-index"));
                    shoppingCart.splice(itemIndex, 1); // Remove the item from the cart
                    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart)); // Update local storage
                    displayCart(); // Refresh the cart display
                });
            });

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>Total price</td>
                <td>$${totalPrice.toFixed(2)}</td>
            `;
            cartItems.appendChild(row);
        } else {
            // Handle the case when the cart is empty or does not exist
            const emptyRow = document.createElement("tr");
            emptyRow.innerHTML = `
                <td colspan="3">No items in cart</td>
            `;
            cartItems.appendChild(emptyRow);
        }
    }

    // Event listener for the "Limpiar Carrito" button
    document.getElementById("clearCart").addEventListener("click", function() {
        shoppingCart = []; // Clear the cart
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
        displayCart(); // Refresh the cart display
    });

    // Display the cart when the page loads
    displayCart();
});