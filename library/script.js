class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? 'Read' : 'Not Read'}`;
    }
}


class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    deleteBook(index) {
        this.books.splice(index, 1);
    }

    toggleReadStatus(index) {
        const book = this.books[index];
        book.isRead = !book.isRead;
    }

    getBook(index) {
        return this.books[index];
    }

    getAllBooks() {
        return this.books;
    }
}


class UI {
    constructor() {
        this.bookGrid = document.getElementById("bookGrid");
        this.bookDialog = document.getElementById("bookDialog");
        this.showButton = document.getElementById("showDialog");
        this.confirmBtn = document.getElementById("confirmBtn");
        this.form = document.getElementById("bookForm");


        this.titleInput = this.bookDialog.querySelector("#title");
        this.authorInput = this.bookDialog.querySelector("#author");
        this.pagesInput = this.bookDialog.querySelector("#pages");
        this.isReadInput = this.bookDialog.querySelector("#isRead");
    }

    displayBooks(books) {
        this.bookGrid.innerHTML = '';

        books.forEach((book, index) => {
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
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                library.deleteBook(index);
                this.displayBooks(library.getAllBooks());
            });
            buttons.appendChild(deleteButton);

            const readButton = document.createElement('button');
            readButton.textContent = book.isRead ? 'Read' : 'Not Read';
            readButton.addEventListener('click', () => {
                library.toggleReadStatus(index);
                this.displayBooks(library.getAllBooks());
            });
            buttons.appendChild(readButton);

            card.appendChild(buttons);

            this.bookGrid.appendChild(card);
        });
    }

    showDialog() {
        this.bookDialog.showModal();
    }

    closeDialog() {
        this.bookDialog.close();
    }

    resetForm() {
        this.form.reset();
    }

    getFormData() {
        const title = this.titleInput.value;
        const author = this.authorInput.value;
        const pages = parseInt(this.pagesInput.value);
        const isRead = this.isReadInput.checked;
        return { title, author, pages, isRead };
    }
}


const library = new Library();
const ui = new UI();


document.addEventListener('DOMContentLoaded', () => {
    createDummyBooks();
});

ui.showButton.addEventListener("click", () => {
    ui.showDialog();
});

ui.bookDialog.addEventListener("close", () => {
    ui.resetForm();
});

ui.confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const { title, author, pages, isRead } = ui.getFormData();
    const newBook = new Book(title, author, pages, isRead);
    library.addBook(newBook);
    ui.displayBooks(library.getAllBooks());
    console.log(library.getAllBooks());
    ui.closeDialog();
});

function createDummyBooks() {
    const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
    const book2 = new Book("1984", "George Orwell", 328, false);
    const book3 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);

    library.addBook(book1);
    library.addBook(book2);
    library.addBook(book3);

    ui.displayBooks(library.getAllBooks());
}
