
		// function toggleMenu() {
		// 	const mainNav = document.getElementById('main-nav');
		// 	mainNav.classList.toggle('open');
		// }

		// function setPageTitle() {
		// 	const hash = window.location.hash.substr(1);

		// 	// Set page title based on hash
		// 	let pageTitle;
		// 	switch (hash) {
		// 		case 'home':
		// 			pageTitle = 'Home';
		// 			break;
		// 		case 'about':
		// 			pageTitle = 'About Us';
		// 			break;
		// 		case 'contact':
		// 			pageTitle = 'Contact Us';
		// 			break;
		// 		default:
		// 			pageTitle = 'Page Not Found';
		// 			break;
		// 	}
		// 	document.title = pageTitle + ' | My SPA';
		// }

		// Call the setPageTitle function to set the initial page title
		// setPageTitle();

		// Add event listener for hashchange to update page title
		// window.addEventListener('hashchange', setPageTitle);

		// Define a function to validate the contact form
		// function validateForm() {
		// 	const form = document.getElementById('contact-form');
		// 	const nameInput = form.querySelector('#name');
		// 	const emailInput = form.querySelector('#email');
		// 	const messageInput = form.querySelector('#message');

		// 	// Check if inputs are not empty
		// 	if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
		// 		alert('Please fill out all fields.');
		// 		return false;
		// 	}

		// 	// Check if email is valid
		// 	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		// 	if (!emailRegex.test(emailInput.value)) {
		// 		alert('Please enter a valid email address.');
		// 		return false;
		// 	}

		// 	return true;
		// }

		// Define a function to handle form submission
		// function handleSubmit(event) {
		// 	event.preventDefault();

		// 	// Validate form
		// 	if (!validateForm()) {
		// 		return;
		// 	}

		// 	// Process form submission (e.g., send data to server)
		// 	alert('Form submitted successfully!');
		// 	// Clear form fields
		// 	document.getElementById('contact-form').reset();
		// }

		// Add event listener for form submission

		// Define a function to show loading spinner
		// function showLoadingSpinner() {
		// 	const contentDiv = document.getElementById('main-content');
		// 	contentDiv.innerHTML = '<div class="spinner"></div>';
		// }


		// Define a function to load content based on the URL hash
		function loadContent() {
			// showLoadingSpinner(); // Show loading spinner

			const hash = window.location.hash.substr(1);
			const contentDiv = document.getElementById('main-content');
			var nav = document.getElementsByClassName('nav');
			// Fetch content from HTML files dynamically
			if (hash === "")
				return;
			if (nav){
				if (hash === "game"){
					nav[0].style.display = 'none';
				}
				else
					nav[0].style.display = 'flex';
			}

			fetch(`../templates/${hash}.html`)
				.then(response => {
					if (!response.ok) {
						throw new Error('Page not found!');
					}
					return response.text();
				})
				.then(html => {
					contentDiv.innerHTML = html;
				})
				.catch(error => {
					console.error('Error fetching content:', error);
					contentDiv.innerHTML = '';
					window.location.hash = '#404';
				});
		}
		loadContent();
		// Call the loadContent function to initialize the content

		// Add event listener for hashchange to update content
		// document.getElementById('menu-toggle').addEventListener('click', toggleMenu);
		window.addEventListener('hashchange', loadContent);
		// document.getElementById('contact-form').addEventListener('submit', handleSubmit);

		// Function to handle browser history navigation
		// function handleHistoryNavigation() {
		// 	window.addEventListener('popstate', loadContent);
		// }

		// Call the loadContent function to initialize the content

		// Call the handleHistoryNavigation function to handle browser history navigation
		// handleHistoryNavigation();


		// // Smooth scroll behavior for navigation links
		// document.querySelectorAll('nav ul li a').forEach(anchor => {
		//     anchor.addEventListener('click', function(e) {
		//         e.preventDefault();

		//         const hash = this.getAttribute('href');
		//         const target = document.querySelector(hash);

		//         target.scrollIntoView({
		//             behavior: 'smooth',
		//             block: 'start'
		//         });
		//     });
		// });
