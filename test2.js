
// const b = (x, y) => x + y;

// const c = a;

// const c = (x, y) => console.log('i am c', x + y);
// function mycallback(...args) {
//   console.log(args);
  // console.log('mycallback', param1, param2);
// }

// function d(x, callback) {
//   if (x > 10) {
//     setTimeout(() => callback(true), 1000);
//   } else {
//     setTimeout(() => callback(false, 'param2'), 1000);
//   }
//   console.log('d end');
// }

// d(1, mycallback);

function e(x) {
  console.log('e start');
  let result;
  if (x > 10) {
    result = Promise.resolve({
      result: '>10',
    });
  } else {
    result = Promise.reject(new Error('<=10'));
  }
  console.log('e end');
  return result;
}

async function f() {
  console.log('f start');
  const result = await e(11);
  console.log('f end');
  return result;
}

// a();
// console.log(b(1 ,1));
// c(1, 2);

// d(11, (result) => {
//   console.log(result);
// });
// console.log('after e');

// e(11)
//   .then(result => console.log(result))
//   .catch(error => console.log(error));
// e(10)
//   .then(result => console.log(result))
//   .catch(error => console.log(error));

f().catch;
