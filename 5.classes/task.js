class PrintEditionItem {
    constructor(name, releaseDate, pagesCount){
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this.state = 100;
        this.type = null
    }

    set editionState(state) {
        if (state < 0) {
            this.state = 0;
        }
        else if (state > 100) {
            this.state = 100;
        }
        else {
            this.state = state;
        }
    }

    get editionState() {
        return this.state;
    }

    fix() {
        this.editionState *= 1.5;
    }
}

class Magazine extends PrintEditionItem {
    constructor(itemName, releaseDate, pagesCount){
        super(itemName, releaseDate, pagesCount);
        this.type = 'magazine';
    }
}

class Book extends PrintEditionItem {
    constructor(author, itemName, releaseDate, pagesCount){
        super(itemName, releaseDate, pagesCount);
        this.author = author;
        this.type = 'book';
    }
}

class NovelBook extends Book {
    constructor(author, itemName, releaseDate, pagesCount){
        super(author, itemName, releaseDate, pagesCount);
        this.type = 'novel';
    }
}

class FantasticBook extends Book {
    constructor(author, itemName, releaseDate, pagesCount){
        super(author, itemName, releaseDate, pagesCount);
        this.type = 'fantastic';
    }
}

class DetectiveBook extends Book {
    constructor(author, itemName, releaseDate, pagesCount){
        super(author, itemName, releaseDate, pagesCount);
        this.type = 'detective';
    }
}

class Library {
    constructor(name, books) {
        this.name = name;
        this.books = [];
    }

    addBook(book) {
        if (book.state > 30) {
            this.books.push(book);
        }
    }

    findBookBy(etype, value){
        for (let i = 0; i < this.books.length; i++) {
            let book = this.books[i];
            if (book[etype] === value) {
                return book;
            }
        }
        return null;
    }

    giveBookByName(bookName) {
        for (let i = 0; i < this.books.length; i++) {
            let book = this.books[i];
            if (book.name === bookName) {
                this.books.splice(i, 1);
                return book;
            }
        }
        return null;
    }
}