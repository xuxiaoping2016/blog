function makeIterator(arr){
    let nextIndex = 0;
    return {
        next: () => {
            if(nextIndex < arr.length){
                return {
                    value: arr[nextIndex++],
                    done:false
                }
            }else{
                return {
                    value: undefined,
                    done:true
                }
            }
        }
    }
}


const it = makeIterator(['吃饭','睡觉','打豆豆'])
console.log("1",it.next())
console.log("2",it.next())
console.log("3",it.next())
console.log("4",it.next())
console.log("5",it.next())