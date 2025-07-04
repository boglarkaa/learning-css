const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");

dropZone.addEventListener("click", () => {
	fileInput.click();
});

fileInput.addEventListener("change", () => {
	if (fileInput.files.length > 0) {
		const file = fileInput.files[0];

		dropZone.innerHTML = `<p>${file.name}</p>`;

		if (file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = function (e) {
				dropZone.innerHTML = `<img src="${e.target.result}" alt="Preview" style="width: 50px; border-radius: 10px; border: 0.1px solid hsl(252, 6%, 83%); " />`;
			};
			reader.readAsDataURL(file);
		}
	}
});

const button = document.querySelector(".btn");
const contents = document.querySelectorAll(".content");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const githubInput = document.getElementById("github-user");
const info = document.querySelectorAll(".info p");

const nameError = nameInput.nextElementSibling;
const emailError = emailInput.nextElementSibling;
const githubError = githubInput.nextElementSibling;
const fileError = fileInput.nextElementSibling;

button.addEventListener("click", (e) => {
	e.preventDefault();

	let isValid = true;

	// Reset errors
	[nameInput, emailInput, githubInput, fileInput].forEach((input) => {
		input.classList.remove("error");
	});
	[nameError, emailError, githubError].forEach((span) => {
		span.textContent = "";
	});

	// Validate Name
	if (nameInput.value.trim() === "") {
		isValid = false;
		nameInput.classList.add("error");
		nameError.textContent = "Full Name is required.";
	}

	// Validate Email
	if (!validateEmail(emailInput.value.trim())) {
		isValid = false;
		emailInput.classList.add("error");
		emailError.textContent = "Enter a valid email address.";
	}

	// Validate GitHub
	if (githubInput.value.trim() === "") {
		isValid = false;
		githubInput.classList.add("error");
		githubError.textContent = "GitHub Username is required.";
	}

	// Validate File Upload
	if (fileInput.files.length === 0) {
		isValid = false;
		info[0].classList.add("error");
	}
	// If all valid, show ticket
	if (isValid) {
		document.getElementById("titleName").textContent = nameInput.value.trim();
		document.getElementById("ticketName").textContent = nameInput.value.trim();
		document.getElementById("ticketEmail").textContent =
			emailInput.value.trim();
		document.getElementById("ticketGithub").textContent =
			githubInput.value.trim();

		const avatarImg = document.getElementById("ticketAvatar");
		const file = fileInput.files[0];

		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = function (e) {
				avatarImg.src = e.target.result;
			};
			reader.readAsDataURL(file);
		}

		contents.forEach((section) => {
			section.classList.toggle("hidden");
		});
	}
});

function validateEmail(email) {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
}
