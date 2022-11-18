"use strict";
function solveEquation(a, b, c) {

  let arr = [];
  let d;
  let f;

  d = Math.pow(b, 2) - 4 * a * c;


  if (a === 0) {
    if (b === 0) {
      return arr;
    }
    else {
      arr.push(-1 * c / b);
    }
  }
  else {
    if (d > 0) {
      arr.push((-1 * b + Math.sqrt(d)) / (2 * a));
      arr.push((-1 * b - Math.sqrt(d)) / (2 * a));
    }
    else if (d === 0) {
      arr.push(-1 * b / (2 * a));
    }
  }

  return arr; // array
}

function isNaNMessage(param) {

  if (isNaN(Number(param.value)) || param.value === "") {
    return true;
  }
}

function calculateTotalMortgage(percent, contribution, amount, date) {

  let totalAmount;

  let paramArr = [
    {name: "Процентная ставка", value : percent}, 
    {name: "Начальный взнос", value : contribution}, 
    {name: "Общая стоимость", value : amount}
  ];
  
  for (let i = 0; i < paramArr.length; i++) {
    if (isNaNMessage(paramArr[i])) {
      return `Параметр "${paramArr[i].name}" содержит неправильное значение "${paramArr[i].value}"`;
    }
  }

  let per = percent / 100;
  let percentMonthly = per / 12;
  let creditBody = amount - contribution;
  let nowdate = new Date();
  let nYears = date.getYear() - nowdate.getYear();
  let nMonth = date.getMonth() - nowdate.getMonth();
  let nMonthAll = nYears*12 + nMonth;

  if (isNaN(nMonth) || date <= nowdate) {
    return `Параметр "Срок ипотеки" содержит неправильное значение "${date}"`
  }
  else if (nMonthAll === 0) {
    return `Параметр "Срок ипотеки" задан неверно, срок должен быть больше месяца`
  }
 
  if (contribution >= amount) {
    return 0;
  }
  
  let monthAmount = creditBody * (percentMonthly + (percentMonthly / (Math.pow((1 + percentMonthly), nMonthAll) - 1)));
  totalAmount = Number((monthAmount * nMonthAll).toFixed(2));

  console.log("Credit body: " + creditBody);
  console.log("Percent monthly: " + percentMonthly);
  console.log("N monthes: " + nMonthAll);
  console.log("Month amount: " + monthAmount);
  console.log("totalAmount: " + totalAmount);

  return totalAmount;
}
