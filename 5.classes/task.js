class PrintEditionItem {
    constructor(name, releaseDate, pagesCount){
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this._state = 100;
        this.type = null
    }

    set state(newState) {
        if (newState < 0) {
            this._state = 0;
        }
        else if (newState > 100) {
            this._state = 100;
        }
        else {
            this._state = newState;
        }
    }

    get state() {
        return this._state;
    }

    fix() {
        this.state *= 1.5;
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

    findBookBy(type, value){
        const findResult = this.books.find((item) => item[type] === value);
        return findResult || null;
    }

    giveBookByName(bookName) {
        const findResult = this.books.find((item) => item.name === bookName);
        this.books = this.books.filter((item) => item.name !== bookName);
        return findResult || null;
    }
}

class Mark {
    constructor(value, subject) {
        this.value = value;
        this.subject = subject;
    }
}
class Student {
    constructor(name, gender, age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.marks = [];
    }

    addMark (value, subject) {
        if (value >= 1 && value <= 5) {
            this.marks.push(new Mark(value, subject));
        }
    }

    getAverageBySubject(subjectName) {

        const marksBySubject = this.marks.filter((item) => item.subject === subjectName);
        if (marksBySubject.length > 0) {
            return (marksBySubject.reduce((acc, item) => acc + item.value, 0) / marksBySubject.length);
        }
        else {
            return null;
        }
    }

    getAverage() {

        if (this.marks.length > 0) {
            return this.marks.reduce((acc, item) => acc + item.value, 0) / this.marks.length;
        }
        else {
            return null;
        }
    }
}