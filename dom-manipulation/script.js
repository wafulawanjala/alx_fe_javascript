// Array of quotes (including categories)
let quotes = [
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Self" },
    { text: "In three words I can sum up everything I've learned about life: it goes on.", category: "Life" },
    { text: "The only way to do great work is to love what you do.", category: "Work" }
];

// Function to populate categories dynamically
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const categories = Array.from(new Set(quotes.map(quote => quote.category))); // Get unique categories

    // Clear existing options (except the first one)
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Check localStorage for the last selected category and set it
    const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';
    categoryFilter.value = lastSelectedCategory;
    filterQuotes(); // Initially filter quotes based on the selected category
}

// Function to filter quotes based on the selected category
function filterQuotes() {
    const categoryFilter = document.getElementById("categoryFilter");
    const selectedCategory = categoryFilter.value;

    // Save the selected category in localStorage
    localStorage.setItem('selectedCategory', selectedCategory);

    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

    // Display filtered quotes
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = ''; // Clear previous quotes
    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement("p");
        quoteElement.textContent = `"${quote.text}" — ${quote.category}`;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById("quoteText").value;
    const quoteCategory = document.getElementById("quoteCategory").value;

    // Validate input
    if (!quoteText || !quoteCategory) {
        alert("Please enter both quote and category.");
        return;
    }

    // Add new quote to the quotes array
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);

    // Update localStorage
    localStorage.setItem('quotes', JSON.stringify(quotes));

    // Update categories in dropdown (if it's a new category)
    if (!Array.from(document.getElementById("categoryFilter").options).some(option => option.value === quoteCategory)) {
        const categoryFilter = document.getElementById("categoryFilter");
        const newCategoryOption = document.createElement("option");
        newCategoryOption.value = quoteCategory;
        newCategoryOption.textContent = quoteCategory;
        categoryFilter.appendChild(newCategoryOption);
    }

    // Clear input fields after adding the quote
    document.getElementById("quoteText").value = '';
    document.getElementById("quoteCategory").value = '';

    // Re-populate categories and filter quotes
    populateCategories();
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
    // Load quotes from localStorage (if available)
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }

    populateCategories();
});
