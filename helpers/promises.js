let p = new Promise((resolve, reject) => {
    let a = Math.random()
    if (a < 0.5) {
        resolve('Success')
    } else {
        reject('Failed')
    }
})

p.then((message) => {
    console.log('This is in the then ' + message)
}).catch((message) => {
    console.log('This is in the catch ' + message)
})  // This is in the then Success
