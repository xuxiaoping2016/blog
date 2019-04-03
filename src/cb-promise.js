const fs = require("fs");
const util = require('util');

// fs.readFile('./package.json',(err,ret) => {
//     if(err){
//         console.log(err);
//         return;
//     }
//     const data = JSON.parse(ret)
//     console.log(data.name)
// })

// function readFileAsync(filePath){
//     return new Promise(function(resolve,reject){
//         fs.readFile(filePath,(err,data) => {
//             if(err){
//                 reject(err)
//                 return;
//             }
//             resolve(data)
//         })
//     })
// }



const readFileAsync = util.promisify(fs.readFile)

readFileAsync('./package.json').then((data) =>{
    const ret = JSON.parse(data);
    console.log(ret.name)
}).catch((err) => console.log(err))
