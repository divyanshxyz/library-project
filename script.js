const myLibrary = [];

function Book(id, title, author, numberOfPages, isRead) {
    if (!new.target) {
        throw "Error";
    }
    else {
        this.id = id;
        this.author = author;
        this.title = title;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
    }
};

Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
};

function addBookToLibrary(author, title, numberOfPages, isRead) {
    let id = crypto.randomUUID();
    let newBook = new Book(id, author, title, numberOfPages, isRead);
    myLibrary.push(newBook);
};

function displayBooks() {
    const libraryContainer = document.querySelector("#library-container");
    libraryContainer.id = "library-container";
    libraryContainer.innerHTML = "";

    for (let book of myLibrary) {
        const card = document.createElement('div');
        card.classList.add("book-card");
        card.dataset.id = book.id;
        let title = document.createElement('h3');
        title.textContent = book.title;
        let author = document.createElement('p');
        author.textContent = "Author: "+book.author;
        let numberOfPages = document.createElement('p');
        numberOfPages.textContent = "Number of Pages: "+book.numberOfPages;
        let isRead = document.createElement('p');
        isRead.textContent = "Read Status: "+book.isRead;

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete"
        deleteBtn.addEventListener("click", () => {
            let index = myLibrary.findIndex((delBook) => {
                return delBook.id === book.id;
            });
            myLibrary.splice(index, 1);
            displayBooks();
        });

        let readBtn = document.createElement('button');
        readBtn.textContent = "Read";
        readBtn.addEventListener("click", () => {
            let index = myLibrary.findIndex((readBook) => {
                return readBook.id === book.id;
            });
            myLibrary[index].toggleRead();
            displayBooks();
        });

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(numberOfPages);
        card.appendChild(isRead);
        card.appendChild(deleteBtn);
        card.appendChild(readBtn);

        libraryContainer.appendChild(card);
    }
}



const addNewBookBtn = document.querySelector("#new-book-btn");
const bookDialog = document.querySelector("#book-dialog");
const bookForm = document.querySelector("#book-form");
const formSubmitBtn = document.querySelector("#form-submit-btn");
addNewBookBtn.addEventListener("click", () => {
    bookDialog.showModal();
});

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const selectedRead = document.querySelector('input[name="isRead"]:checked');
    if (!selectedRead) return;
    
    addBookToLibrary(
        document.querySelector("#author").value,
        document.querySelector("#title").value,
        document.querySelector("#numberOfPages").value,
        selectedRead.value === "true"
    );
    
    displayBooks();
    bookForm.reset();
    bookDialog.close();
});

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('Atomic Habits', 'James Clear', 320, true);
displayBooks();