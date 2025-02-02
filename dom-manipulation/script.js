// Store quotes in an array
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Store categories in an array
let categories = JSON.parse(localStorage.getItem('categories')) || ['Inspirational', 'Motivational', 'Funny', 'Life'];

// Load quotes and categories from localStorage
window.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    loadQuotes();
    const lastCategory = localStorage.getItem('lastCategory') || 'all';
    document.getElementById('categoryFilter').value = lastCategory;
});

// Populate categories dynamically
function populateCategories() {
    const categorySelect = document.getElementById('quoteCategory');
    const filterSelect = document.getElementById('categoryFilter');
    
    // Clear previous categories
    categorySelect.innerHTML = '';
    filterSelect.innerHTML = '<option value="all">All Categories</option>';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);

        const filterOption = document.createElement('option');
        filterOption.value = category;
        filterOption.textContent = category;
        filterSelect.appendChild(filterOption);
    });
}

// Load quotes from localStorage or initial array
function loadQuotes() {
    const category = document.getElementById('categoryFilter').value;
    const filteredQuotes = category === 'all' ? quotes : quotes.filter(quote => quote.category === category);

    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = ''; // Clear current quotes

    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Filter quotes by category
function filterQuotes() {
    const category = document.getElementById('categoryFilter').value;
    localStorage.setItem('lastCategory', category); // Save the selected category
    loadQuotes();
}

// Add a new quote
function addQuote() {
    const quoteText = document.getElementById('quoteText').value.trim();
    const quoteCategory = document.getElementById('quoteCategory').value;

    if (quoteText) {
        // Add new quote to quotes array
        const newQuote = {
            id: Math.random().toString(36).substr(2, 9), // Random ID for the quote
            text: quoteText,
            category: quoteCategory
        };
        quotes.push(newQuote);
        
        // Update localStorage
        localStorage.setItem('quotes', JSON.stringify(quotes));
        
        // Add the new category if it doesn't exist
        if (!categories.includes(quoteCategory)) {
            categories.push(quoteCategory);
            localStorage.setItem('categories', JSON.stringify(categories));
            populateCategories(); // Update the categories dropdown
        }

        // Clear the input fields and reload quotes
        document.getElementById('quoteText').value = '';
        loadQuotes();
    }
}

// Show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
}
