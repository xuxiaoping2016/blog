const co = require('co')
const fetch = require('node-fetch');

// co(function*(){
//     const res = yield fetch('https://api.douban.com/v2/movie/1291843')

//     const movie = yield res.json();
//     const summary = movie.summary
//     console.log('summary', summary)
// })

// function run(generator){
//     const iterator = generator();
//     const it = iterator.next();
//     console.log('it',it)
//     const promise = it.value;
    
//     promise.then(data => {
//         const it2 = iterator.next(data);
//         console.log("it2,it2",it2)
//         const promise2 = it2.value;

//         promise2.then(data2 => {
//             console.log(data2)
//             iterator.next(data2);
//         })
//     })
// }

// run(function*(){
//     const res = yield fetch('https://api.douban.com/v2/movie/1291843')

//     const movie = yield res.json();
//     const summary = movie.summary
//     console.log('summary', summary)
// })

function* foo(x) {
    console.log(3)
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
  }
  
  var a = foo(5);
  console.log(a.next()) // Object{value:6, done:false}
  console.log(a.next()) // Object{value:NaN, done:false}
  console.log(a.next()) // Object{value:NaN, done:true}
  
  var b = foo(5);
  console.log(b.next()) // { value:6, done:false }
  console.log(b.next(12)) // { value:8, done:false }
  console.log(b.next(13)) //{ value: 42, done: true }
