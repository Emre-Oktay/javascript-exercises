const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function () {
        return (`${title} by ${author}, ${pages}, ${isRead}`)
    };
}


function addBookToLibrary() {
    const book = new Book(title.value, author.value, pages.value, isRead.checked);
    myLibrary.push(book);
}


function deleteBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleReadStatus(index) {
    myLibrary[index].isRead = !myLibrary[index].isRead;
    displayBooks();
}

function displayBooks() {
    bookGrid.innerHTML = '';

    myLibrary.forEach(function (book, index) {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.dataset.id = index;

        const titleElement = document.createElement('h3');
        titleElement.textContent = book.title;
        const authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${book.author}`;
        const pagesElement = document.createElement('p');
        pagesElement.textContent = `Pages: ${book.pages}`;

        card.appendChild(titleElement);
        card.appendChild(authorElement);
        card.appendChild(pagesElement);

        const buttons = document.createElement('div');
        buttons.className = 'buttons';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete'
        deleteButton.addEventListener('click', function () {
            deleteBook(index);
        });
        buttons.appendChild(deleteButton);

        const readButton = document.createElement('button');
        readButton.textContent = book.isRead ? 'Read' : 'Not Read';
        readButton.addEventListener('click', function () {
            toggleReadStatus(index);
        });
        buttons.appendChild(readButton);

        card.appendChild(buttons);

        bookGrid.appendChild(card);
    });
}

const showButton = document.getElementById("showDialog");
const bookDialog = document.getElementById("bookDialog");
const outputBox = document.querySelector("output");
const confirmBtn = bookDialog.querySelector("#confirmBtn");
const bookGrid = document.getElementById("bookGrid")

const title = bookDialog.querySelector("#title");
const author = bookDialog.querySelector("#author");
const pages = bookDialog.querySelector("#pages");
const isRead = bookDialog.querySelector("#isRead");

showButton.addEventListener("click", () => {
    bookDialog.showModal();
});

bookDialog.addEventListener("close", (e) => {
    //Reset the form here
    document.getElementById("bookForm").reset()
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary();
    displayBooks();
    console.log(myLibrary);
    bookDialog.close();
});

function createDummyBooks() {
    const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
    const book2 = new Book("1984", "George Orwell", 328, false);
    const book3 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);

    myLibrary.push(book1, book2, book3);

    displayBooks();
}

document.addEventListener('DOMContentLoaded', () => {
    createDummyBooks();
});