const container = document.getElementById("products");

// Fetch the JSON data
fetch("data.json")
	.then((response) => {
		if (!response.ok) {
			throw new Error("Network response was not ok " + response.statusText);
		}
		return response.json();
	})
	.then((data) => {
		loadDesserts(data);
	})
	.catch((error) => {
		console.error("There was a problem with the fetch operation:", error);
	});

// Function to render desserts
function loadDesserts(desserts) {
	desserts.forEach((dessert) => {
		const card = document.createElement("div");
		card.className = "dessert-card";

		card.innerHTML = `
            <img src="${dessert.image.thumbnail}" alt="${
			dessert.name
		} class="card-image" />
			<button class="card-button">
			<img src="assets/images/icon-add-to-cart.svg" alt="cart" class="cart-icon" />
			Add to Cart</button>
            <div class="card-content">
			    <p class="card-category">${dessert.category}</p>
                <h2 class="card-title">${dessert.name}</h2>
                <p class="card-price">$${dessert.price.toFixed(2)}</p>
            </div>
        `;

		container.appendChild(card);
	});
}
