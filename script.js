// Step 1: Define an array of quote objects
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivational" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Inspirational" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivational" },
];

// Step 2: Function to display a random quote
function showRandomQuote() {
    // Get a random index from the quotes array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Display the quote in the DOM
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><p><em>- ${quote.category}</em></p>`;
}

// Step 3: Function to create the form for adding new quotes
function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    formContainer.innerHTML = `
        <h3>Add Your Own Quote</h3>
        <form id="addQuoteForm">
            <input type="text" id="quoteText" placeholder="Enter quote text" required>
            <input type="text" id="quoteCategory" placeholder="Enter category" required>
            <button type="submit">Add Quote</button>
        </form>
    `;
    
    // Append the form to the body or a specific section
    document.body.appendChild(formContainer);

    // Handle form submission
    const form = document.getElementById("addQuoteForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from reloading the page

        const newQuoteText = document.getElementById("quoteText").value.trim();
        const newQuoteCategory = document.getElementById("quoteCategory").value.trim();

        // If the form is not empty, add the new quote to the quotes array
        if (newQuoteText && newQuoteCategory) {
            const newQuote = { text: newQuoteText, category: newQuoteCategory };
            quotes.push(newQuote); // Add new quote to the array
            alert("Quote added successfully!");
            showRandomQuote(); // Display the newly added quote

            // Clear the form fields
            document.getElementById("quoteText").value = "";
            document.getElementById("quoteCategory").value = "";
        } else {
            alert("Please fill in both fields.");
        }
    });
}

// Call functions when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    showRandomQuote(); // Display a random quote when the page loads
    const newQuoteButton = document.getElementById("newQuote");
    newQuoteButton.addEventListener("click", showRandomQuote); // Show a new quote when the button is clicked
    
    createAddQuoteForm(); // Create the form to add a new quote
});
