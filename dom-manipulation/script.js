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

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
    populateCategories();
});
