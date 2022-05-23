// Book Class
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// Local Storage
let books = [
  {
    title: "Book One",
    author: "Joe Perez",
    isbn: 23124523,
  },
  {
    title: "Book Two",
    author: "Ruben Tineo",
    isbn: 12312843,
  },
];

// Add book to UI table
function addBook(book) {
  // Creating a new table row element and setting it's inner child to fit table
  let row = document.createElement("tr");
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><i id="${book.isbn}" onclick='removeRow(${book.isbn})' class="bi bi-trash"></i>
    </td>`;

  // Adding new element to table as a child
  document.getElementById("tableBody").appendChild(row);
}

// Adds books local storage
function addBookToLocalStorage(book) {
  // Add book to local storage
  books.push({ ...book });
}

// Removing Row & book from storage
function removeRow(isbn) {
  // Remove from table
  document.getElementById(`${isbn}`).parentElement.parentElement.remove();

  // Remove from local storage
  books.splice(books.indexOf(isbn), 1);

  // Check if table is empty
  if (books.length === 0) {
    // document.getElementById("bookTable").style.scale = 0.01;

    let emptyCart = document.createElement("p");
    emptyCart.innerHTML = "No books in shoping cart";

    let emptyCartIcon = document.createElement("h");
    emptyCartIcon.classList.add("bi-cart");
    emptyCartIcon.style.fontSize = "50px";

    document.getElementById("cart").appendChild(emptyCartIcon);
    document.getElementById("cart").appendChild(emptyCart);
  }
}

// Automatically add items in local storage to table
(function autoRun() {
  let book;
  for (let i = 0; i < books.length; i++) {
    book = new Book(books[i].title, books[i].author, books[i].isbn);

    addBook(book);
  }
})();

// Input Error
function confirmation(bool) {
  let err = document.createElement("p");

  err.innerHTML = bool
    ? "✅ Book has been added"
    : "⚠️ Please make sure all fields are filled in";

  err.classList.add(bool ? "success" : "warning");

  document.getElementById("description").appendChild(err);

  setTimeout(() => {
    err.remove();
  }, 7000);
}

// Obtain values from input
document.getElementById("addBookForm").addEventListener("submit", function (e) {
  // Preventing the default parameter submit action (Preventing the console reloads)
  e.preventDefault();

  // Raising error if any input are empty
  if (
    document.getElementById("title").value == "" ||
    document.getElementById("author").value == "" ||
    document.getElementById("isbn").value == ""
  ) {
    confirmation(false);
    throw new Error("Please make sure all fields are filled in");
  }

  // Creating new book object for input
  let book = new Book(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("isbn").value
  );

  // Resetting the values of the input
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";

  // Adding book to table
  addBook(book);

  // Adding book to local storage
  addBookToLocalStorage(book);

  // Add confirmation
  confirmation(true);

  // Remove empty cart state
  if (books.length === 1) {
    // Hide 'Add to cart' message
    let cartChildren = document.getElementById("cart").children;
    // Removes cart icon
    document.getElementById("cart").removeChild(cartChildren[1]);
    // Removes cart icon description
    document.getElementById("cart").removeChild(cartChildren[1]);
  }
});
