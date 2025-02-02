// Initialize quotes array and categories
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];
let categories = JSON.parse(localStorage.getItem('categories')) || [];

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

    // Load last selected category from local storage
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
    categoryFilter.value = lastSelectedCategory;
}

// Show random quote from the quotes array
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    document.getElementById('quoteDisplay').textContent = `"${randomQuote.text}" — ${randomQuote.category}`;
}

// Add a new quote to the quotes array
function addQuote() {
    const quoteText = document.getElementById('quoteText').value;
    const quoteCategory = document.getElementById('quoteCategory').value;

    if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        
        // If the category is new, add it to the categories array
        if (!categories.includes(quoteCategory)) {
            categories.push(quoteCategory);
            updateCategoriesInStorage();
        }

        // Update local storage with new quotes
        localStorage.setItem('quotes', JSON.stringify(quotes));
        
        // Clear input fields
        document.getElementById('quoteText').value = '';
        document.getElementById('quoteCategory').value = '';

        // Update the category filter
        populateCategories();

        // Show the most recent quote
        showRandomQuote();
    }
}

// Filter quotes based on the selected category
function filterQuotes() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    // Save the selected category to local storage for future sessions
    localStorage.setItem('lastSelectedCategory', categoryFilter);

    // Use map to filter the quotes based on category
    let filteredQuotes;
    if (categoryFilter === 'all') {
        filteredQuotes = quotes;
    } else {
        filteredQuotes = quotes.filter(quote => quote.category === categoryFilter);
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
function updateCategoriesInStorage() {
    localStorage.setItem('categories', JSON.stringify(categories));
    populateCategories();
}

// Initialize and load quotes and categories when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    showRandomQuote();
});
