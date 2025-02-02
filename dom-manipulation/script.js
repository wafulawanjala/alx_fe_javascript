// Simulating the local data
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];
let categories = JSON.parse(localStorage.getItem('categories')) || [];
let selectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';

// Function to simulate fetching quotes from the server (mock API)
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Simulating fetching posts as quotes
        const data = await response.json();
        
        // Simulate structure of server data to match local data
        const serverQuotes = data.map(post => ({
            text: post.body,
            category: 'General' // Assuming all quotes fetched are categorized as 'General'
        }));

        return serverQuotes;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Sync data from server periodically and resolve conflicts
async function syncQuotes() {
    const serverQuotes = await fetchQuotesFromServer();

    if (!serverQuotes) return;

    // Check if server data is different from local data
    if (serverQuotes.length !== quotes.length) {
        // Merge server data into local data (simple conflict resolution - server data takes precedence)
        quotes = serverQuotes;

        // Update local storage with server data
        localStorage.setItem('quotes', JSON.stringify(quotes));

        // Notify user of update via alert
        alert('Quotes synced with server!');
    } else {
        console.log('No new data from the server.');
    }

    // Sync categories and ensure consistency
    await syncCategories();
}

// Sync the categories with the localStorage
async function syncCategories() {
    const serverCategories = quotes.map(quote => quote.category);
    const uniqueCategories = [...new Set(serverCategories)];

    // If there are new categories, update the local storage
    if (uniqueCategories.length > categories.length) {
        categories = uniqueCategories;
        localStorage.setItem('categories', JSON.stringify(categories));

        // Re-populate categories dropdown
        populateCategories();

        // Notify user of new categories via alert
        alert('New categories synced with server!');
    }
}

// Show random quote from the quotes array
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    document.getElementById('quoteDisplay').textContent = `"${randomQuote.text}" — ${randomQuote.category}`;
}

// Add a new quote to the quotes array
async function addQuote() {
    const quoteText = document.getElementById('quoteText').value;
    const quoteCategory = document.getElementById('quoteCategory').value;

    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);

        // If the category is new, add it to the categories array
        if (!categories.includes(quoteCategory)) {
            categories.push(quoteCategory);
            await updateCategoriesInStorage(); // Wait for categories to be updated
        }

        // Update local storage with new quotes
        localStorage.setItem('quotes', JSON.stringify(quotes));

        // Send the new quote to the server (mock API)
        await postQuoteToServer(newQuote);

        // Clear input fields
        document.getElementById('quoteText').value = '';
        document.getElementById('quoteCategory').value = '';

        // Update the category filter
        populateCategories();

        // Show the most recent quote
        showRandomQuote();
    }
}

// Function to post the new quote to the server
async function postQuoteToServer(newQuote) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'New Quote', // For simulation, using title and body for the quote structure
                body: newQuote.text,
                category: newQuote.category,
            }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Quote successfully posted to server:', result);
        } else {
            console.log('Failed to post quote to server:', response.statusText);
        }
    } catch (error) {
        console.error('Error posting quote to server:', error);
    }
}

// Filter quotes based on the selected category
function filterQuotes() {
    selectedCategory = document.getElementById('categoryFilter').value;

    // Save the selected category to local storage for future sessions
    localStorage.setItem('lastSelectedCategory', selectedCategory);

    // Use map to filter the quotes based on category
    let filteredQuotes;
    if (selectedCategory === 'all') {
        filteredQuotes = quotes;
    } else {
        filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    }

    displayQuotes(filteredQuotes);
}

// Display quotes in the #quoteDisplay element
function displayQuotes(filteredQuotes) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';

    if (filteredQuotes.length > 0) {
        filteredQuotes.map(quote => {
            const quoteElement = document.createElement('p');
            quoteElement.textContent = `"${quote.text}" — ${quote.category}`;
            quoteDisplay.appendChild(quoteElement);
        });
    } else {
        quoteDisplay.textContent = 'No quotes available for this category.';
    }
}

// Update categories in local storage and DOM
async function updateCategoriesInStorage() {
    localStorage.setItem('categories', JSON.stringify(categories));
    populateCategories();
}

// Populate categories dynamically in the category filter
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    // Use map to get a list of unique categories
    const uniqueCategories = [...new Set(categories)];

    uniqueCategories.map(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Set the dropdown to the last selected category
    categoryFilter.value = selectedCategory;
}

// Initialize and load quotes and categories when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    showRandomQuote();
    syncQuotes(); // Initial sync with the server

    // Set up periodic syncing every 10 minutes (600000 milliseconds)
    setInterval(syncQuotes, 600000);  // Fetch and sync quotes every 10 minutes
});
