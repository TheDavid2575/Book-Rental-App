// // New Book Object
// function Book(title, author, isbn) {
//   this.title = title;
//   this.author = author;
//   this.isbn = isbn;
// }

// // Jquery
// $(document).ready(function () {
//   let book, titleInp, authorInp, isbnInp, formSubmitBtn;

//   $("p").click(function () {
//     (titleInp = $("#title").val()),
//       (authorInp = $("#author").val()),
//       (isbnInp = $("#isbnum").val()),
//       (formSubmitBtn = $("#formSubmitBtn"));
//     // return new Book(titleInp, authorInp, isbnInp);
//   });
// });

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

function removeRow(isbn) {
  // Remove from table
  document.getElementById(`${isbn}`).parentElement.parentElement.remove();

  // Remove from local storage
  books.splice(books.indexOf(isbn), 1);
}

// Automatically add items in local storage to table
(function autoRun() {
  let book;
  for (let i = 0; i < books.length; i++) {
    book = new Book(books[i].title, books[i].author, books[i].isbn);

    addBook(book);
  }
})();

// Obtain values from input
document.getElementById("addBookForm").addEventListener("submit", function (e) {
  // Preventing the default parameter submit action (Preventing the console reloads)
  e.preventDefault();

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
});

/*
Problem: Add event handler to every delete button that deletes its row parent element.

Methods/Ideas:
- Add a class to each row/book instance which contains the event listner
- 



*/
