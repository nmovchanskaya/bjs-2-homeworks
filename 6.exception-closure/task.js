function parseCount(value) {

    num = Number.parseInt(value);
    if (isNaN(num)) {
        throw new Error("Невалидное значение");
    }
    return num;
}

function validateCount(value) {
    try {
        return parseCount(value);
    }
    catch(exception) {
        return exception;
    }
}

class Triangle {
    constructor(a, b, c) {

        if ((a + b < c) || (a + c < b) || (b + c < a)) {
            throw new Error("Треугольник с такими сторонами не существует");
        }
        this.a = a;
        this.b = b;
        this.c = c;
    }
    getPerimeter() {
        return this.a + this.b + this.c;
    }
    getArea() {
        const halfPerimeter = 0.5 * this.getPerimeter();
        return parseFloat((Math.sqrt(halfPerimeter * (halfPerimeter - this.a) * (halfPerimeter - this.b) * (halfPerimeter - this.c))).toFixed(3));
    }
}

function getTriangle(a, b, c) {
    try {
        return new Triangle(a, b, c);
    }
    catch(exception) {
        let obj = new Object();
        obj.getPerimeter = function f(){return "Ошибка! Треугольник не существует"; };
        obj.getArea = function f(){return "Ошибка! Треугольник не существует"; };
        return obj;
    }
}