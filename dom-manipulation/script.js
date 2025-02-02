// Step 1: Load quotes from local storage
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivational" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Inspirational" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivational" },
];

// Step 2: Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    // Store the last viewed quote in session storage
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));

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
            localStorage.setItem("quotes", JSON.stringify(quotes)); // Save the updated quotes array to local storage
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

// Step 4: JSON Export function
function exportToJSON() {
    const quotesData = JSON.stringify(quotes, null, 2);
    const blob = new Blob([quotesData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    // Create a download link and click it to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = "quotes.json";
    link.click();
    URL.revokeObjectURL(url); // Clean up the object URL
}

// Step 5: JSON Import function
function importFromJSON(event) {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = function(fileEvent) {
            const importedQuotes = JSON.parse(fileEvent.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes = importedQuotes; // Update the quotes array with the imported data
                localStorage.setItem("quotes", JSON.stringify(quotes)); // Save it to local storage
                alert("Quotes imported successfully!");
                showRandomQuote(); // Show the imported quote
            } else {
                alert("Invalid file format.");
            }
        };
        reader.readAsText(file);
    } else {
        alert("Please upload a valid JSON file.");
    }
}

// Step 6: Attach Event Listeners for Export and Import
function createExportImportButtons() {
    const exportButton = document.createElement("button");
    exportButton.textContent = "Export Quotes to JSON";
    exportButton.addEventListener("click", exportToJSON);

    const importButton = document.createElement("input");
    importButton.type = "file";
    importButton.accept = ".json";
    importButton.addEventListener("change", importFromJSON);

    document.body.appendChild(exportButton);
    document.body.appendChild(importButton);
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    showRandomQuote(); // Display a random quote when the page loads
    const newQuoteButton = document.getElementById("newQuote");
    newQuoteButton.addEventListener("click", showRandomQuote); // Show a new quote when the button is clicked
    
    createAddQuoteForm(); // Create the form to add a new quote
    createExportImportButtons(); // Create the buttons for export/import functionality
});
