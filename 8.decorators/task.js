function cachingDecoratorNew(func) {
  let cache = [];
  return function(...args) {
    let newhash = args.join(',');
    let findedItem = cache.find((item) => item.hash.trim() === newhash.trim());
    if (findedItem) {
      console.log("Нашли в кэше: " + findedItem.value);
      return "Из кэша: " + findedItem.value;
    }
    else {
      let result = func(...args);
      cache.push({hash: newhash, value: result});
      if (cache.length > 5) {
        cache.shift();
      }

      console.log("Вычислили: " + result);
      return "Вычисляем: " + result;
    }
  }
}


function debounceDecoratorNew(func, delay) {
  let timeoutId = null;

  function wrapper(...args) {
    wrapper.times.push(Date.now());
    if (wrapper.allCount == 0) {
      func(...args);
      wrapper.count++;
    }
    wrapper.allCount++;
    if (timeoutId) {
      console.log("Удаляем timeout " + timeoutId);
      clearTimeout(timeoutId);
    }
    console.log("Создаем новый timeout ");
    timeoutId = setTimeout(() => {
      timeoutId = null;
      console.log("Вызываем декорируемую функцию");
      func(...args);
      wrapper.count++;
    }, delay);
  }

  wrapper.count = 0;
  wrapper.allCount = 0;
  wrapper.times = [];
  return wrapper;
}

const addThree = (a, b, c) => {
  let result = a + b + c; 
  console.log(result);
  return result
}
cachedAddThree = cachingDecoratorNew(addThree);
cachedAddThree(1,2,3);
cachedAddThree(1,2,3);
cachedAddThree(1,2,4);
cachedAddThree(1,2,5);
cachedAddThree(1,2,4);
cachedAddThree(1,2,6);
cachedAddThree(1,2,7);
cachedAddThree(1,2,8);

const sendSignal = (signalOrder, delay) => console.log("Сигнал отправлен", signalOrder, delay);
const upgradedSendSignal = debounceDecoratorNew(sendSignal, 2000);
setTimeout(() => upgradedSendSignal(1, 0)); // Сигнал отправлен + будет запланирован асинхронный запуск, который будет проигнорирован так как следующий сигнал отменит предыдущий (300 - 0 < 2000)
setTimeout(() => upgradedSendSignal(2, 300), 300); // проигнорировано так как следующий сигнал отменит предыдущий (900 - 300 < 2000)
setTimeout(() => upgradedSendSignal(3, 900), 900); // проигнорировано так как следующий сигнал отменит предыдущий (1200 - 900 < 2000)
setTimeout(() => upgradedSendSignal(4, 1200), 1200); // проигнорировано так как следующий сигнал отменит предыдущий (2300 - 1200 < 2000)
setTimeout(() => upgradedSendSignal(5, 2300), 2300); // Сигнал отправлен так как следующий вызов не успеет отменить текущий: 4400-2300=2100 (2100 > 2000)
setTimeout(() => upgradedSendSignal(6, 4400), 4400); // проигнорировано так как следующий сигнал отменит предыдущий (4500 - 4400 < 2000)
setTimeout(() => upgradedSendSignal(7, 4500), 4500); // Сигнал будет отправлен, так как последний вызов debounce декоратора (спустя 4500 + 2000 = 6500) 6,5с
setTimeout(() => {
  console.log("отправок сигнала: " + upgradedSendSignal.count); // было выполнено 3 отправки сигнала
  console.log("вызовов декоратора: " + upgradedSendSignal.allCount); // было выполнено 7 вызовов декорированной функции
}, 10000);